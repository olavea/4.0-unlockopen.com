// import React from "react";
// import { graphql } from "gatsby";
// import { SectionTitle } from "../components/Section";

// // import * as Content from "../Content";
// import Curriculum from "../Curriiculum";
// import Layout from "../components/layout";

// const IndexPage = ({ data }) => {
//   return (
//     <Layout>
//       <Curriculum
//         videos={data.ytPlaylist.childrenYtVideo}
//         articles={
//           new Map(
//             data.allMarkdownRemark.edges.map(({ node }) => [
//               node.frontmatter.videoId,
//               node
//             ])
//           )
//         }
//       />
//     </Layout>
//   );
// };

// export default IndexPage;

// export const query = graphql`
//   query articlesAndLwypPlaylist {
//     ytPlaylist(playlistKey: { eq: "react" }) {
//       childrenYtVideo {
//         id
//         videoId
//         title
//         description
//       }
//     }

//     allMarkdownRemark(filter: { frontmatter: { videoId: { ne: "" } } }) {
//       edges {
//         node {
//           html
//           frontmatter {
//             videoId
//           }
//           fields {
//             pagePath
//           }
//         }
//       }
//     }
//   }
// `;
