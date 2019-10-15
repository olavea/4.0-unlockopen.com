// Woops videoId

import React from "react";

import Layout from "../components/layout";
import ResponsivePlayer from "../components/ResponsivePlayer";

export default ({ data, pathContext }) => {
  const article = data.markdownRemark;
  const title = article.frontmatter.title;
  //   const { slug } = pathContext;
  //   const url = `https://learnwhileyoupoop.com${slug}`;

  const yt = data.ytVideo;

  return (
    <Layout
      location={location}
      title={post.frontmatter.title}
      description={post.excerpt}
    >
      <article className={post.fields.slug}>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
    </Layout>
  );
};

export const query = graphql`
  query ArticleQuery($slug: String!, $videoId: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
    ytVideo(videoId: { eq: $videoId }) {
      title
      videoId
      thumbnails {
        high {
          url
          width
          height
        }
      }
      description
    }
  }
`;
