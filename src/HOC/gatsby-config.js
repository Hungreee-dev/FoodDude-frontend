module.exports = {
    siteMetadata: {
        title: `Fooddude`,
        description: `Fooddude website for ordering fresh food around bhubneshwar.`,
        author: `@Kushagra@Haris`,
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        {
            resolve: `fooddude-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/../assets`,
            },
        },
        `fooddude-transformer-sharp`,
        `fooddude-plugin-sharp`,
        {
            resolve: `fooddude-plugin-manifest`,
            options: {
                name: `fooddude-starter-default`,
                short_name: `fooddude`,
                start_url: `/`,
                background_color: `#FF3008`,
                theme_color: `#FF3008`,
                display: `minimal-ui`,
                icon: `src/images/food.png`, // This path is relative to the root of the site.
            },
        },
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
    ],
};
