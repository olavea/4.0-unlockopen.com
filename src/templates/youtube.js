// import React from "react";
// import { graphql } from "gatsby";

// import Layout from "../components/layout";

// Component = ({ data }) => {
//   const videos = data.ytPlaylist.childrenYtVideo;

//   return (
//     <div>
//       {videos.map(video => (
//         <div>
//           <h3>{video.title}</h3>
//           {video.description}
//         </div>
//       ))}
//     </div>
//   );
// };

// // export const query = graphql`
// //   query LwypPlaylist {
// //     ytPlaylist(id: { eq: "lwypPlaylist" }) {
// //       childrenYtVideo {
// //         id
// //         title
// //         description
// //       }
// //     }
// //   }
// // `;
// export const query = graphql`
//   query YouTube {
//     allYoutubeVideo {
//       edges {
//         node {
//           id
//           title
//           description
//           videoId
//           publishedAt
//           privacyStatus
//         }
//       }
//     }
//   }
// `;
