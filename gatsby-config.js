module.exports = {
  siteMetadata: {
    title: `UnlockOpen`,
    author: `Tobie Langel`,
    description: `UnlockOpen is a boutique consulting firm that helps organizations understand and leverage the value of contributing to open source.`,
    siteUrl: `https://unlockopen.com/`
    // social: {
    //   twitter: `raae`,
    //   instagram: `raae.codes`,
    //   github: "raae"
    // }
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/pages`,
        name: `blog`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: []
      }
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `raae.codes`,
        short_name: `raae`,
        start_url: `/`,
        background_color: `floralwhite`,
        theme_color: `orangered`,
        display: `minimal-ui`,
        icon: `content/assets/avatar.jpg`
      }
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-fathom",
      options: {
        // your Fathom server URL
        trackingUrl: "raae.usesfathom.com",
        // unique site id (optional, required for Fathom v1.1.0+)
        siteId: "SALDPLQV"
      }
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-embed-video",
            options: {
              width: 800,
              ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
              height: 400, // Optional: Overrides optional.ratio
              related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
              noIframeBorder: true, //Optional: Disable insertion of <style> border: 0,
              urlOverrides: [
                {
                  id: "youtube",
                  embedURL: videoId =>
                    `https://www.youtube-nocookie.com/embed/${videoId}`
                }
              ] //Optional: Override URL of a service provider, e.g to enable youtube-nocookie support
            }
          }
        ]
      }
    }

    // Note: if you also rely on gatsby-remark-responsive-iframe, you have to define the embed-youtube plugin first:

    // plugins: [
    //   "gatsby-remark-embed-video",
    //   "gatsby-remark-responsive-iframe"
    // ]
  ]
};
