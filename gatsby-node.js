const { createFilePath } = require(`gatsby-source-filesystem`);

// require("now-env");
const crypto = require("crypto");
const ypi = require("youtube-playlist-info");
const YT_KEY = require("./client_secrets.json")["yt_key"];
// require("./client_secrets.json")["yt_key"];
const playlistIds = {
  react: "PLF8WgaD4xmjWuh7FTYTealxehOuNor_2S",
  state: "PLF8WgaD4xmjUwRQMfDtGjJ1_UhOVMTjR9"
};

// const slugify = require("slugify");
const path = require("path");

if (process.env.NODE_ENV === "development") {
  process.env.GATSBY_WEBPACK_PUBLICPATH = "/";
}

exports.sourceNodes = ({ actions }) => {
  const { createNode } = actions;
  const makeNode = node => {
    node.internal.contentDigest = crypto
      .createHash("md5")
      .update(JSON.stringify(node))
      .digest("hex");

    createNode(node);
  };

  let ytNode = {
    id: "youtube",
    children: ["ytPlaylists"],
    parent: null,
    internal: {
      type: "youtube"
    }
  };

  let playlistsNode = {
    id: "ytPlaylists",
    parent: "youtube",
    children: [],
    internal: {
      type: "ytPlaylists"
    }
  };

  const basePlaylistNode = ([playlistKey, playlistId]) => ({
    id: `ytPlaylist-${playlistId}`,
    playlistKey: playlistKey,
    playlistId: playlistId,
    parent: "ytPlaylists",
    children: [],
    internal: {
      type: "ytPlaylist"
    }
  });

  return Promise.all(
    Object.entries(playlistIds).map(async ([playlistKey, playlistId]) => {
      const items = await ypi(YT_KEY, playlistId);
      const playlistNode = basePlaylistNode([playlistKey, playlistId]);

      playlistNode.children = items.map(
        ({ title, description, resourceId, thumbnails, position }) => {
          const id = `ytVideo-${resourceId.videoId}`;
          makeNode({
            id,

            title,
            description,
            thumbnails,
            position,
            resourceId,
            videoId: resourceId.videoId,
            internal: {
              type: "ytVideo"
            },
            parent: playlistNode.id,
            children: []
          });
          return id;
        }
      );

      makeNode(playlistNode);
      return playlistNode.id;
    })
  ).then(playlistNodeIds => {
    playlistsNode.children = playlistNodeIds;
    makeNode(playlistsNode);
    makeNode(ytNode);
  });
};

// exports.onCreateNode = ({ node, getNode, actions }) => {
//   if (node.internal.type === "MarkdownRemark") {
//     const fileNode = getNode(node.parent);
//     const slug =
//       fileNode.relativeDirectory +
//       "/" +
//       slugify(node.frontmatter.title, { lower: true });

//     actions.createNodeField({
//       node,
//       name: "pagePath",
//       value: "/" + slug
//     });
//   }
// };

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value
    });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const pageTemplate = path.resolve(`./src/templates/page.js`);
  // Why not const result = await like in
  //https://www.gatsbyjs.org/tutorial/part-seven/#creating-pages
  return graphql(
    `
      {
        allMarkdownRemark(limit: 1000) {
          edges {
            node {
              frontmatter {
                title
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors;
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges;

    posts.forEach((post, articles, index) => {
      createPage({
        path: post.node.fields.slug,
        component: pageTemplate,
        context: {
          slug: post.node.fields.slug
          // videoId: node.frontmatter.videoId,
          // prevPagePath:
          //   articles[index - 1] && articles[index - 1].node.fields.slug,
          // nextPagePath:
          //   articles[index + 1] && articles[index + 1].node.fields.slug,
          // prevTitle:
          //   articles[index - 1] && articles[index - 1].node.frontmatter.title,
          // nextTitle:
          //   articles[index + 1] && articles[index + 1].node.frontmatter.title
        }
      });
    });

    return null;
  });
};

// Why not       value: slug, Like in :
// https://www.gatsbyjs.org/tutorial/part-seven/#creating-slugs-for-pages
