import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
// import { useStaticQuery, graphql } from 'gatsby';

function SEO({ description, lang, meta, title }) {
    // const { site } = useStaticQuery(
    //     graphql`
    //         query {
    //             site {
    //                 siteMetadata {
    //                     title
    //                     description
    //                     author
    //                 }
    //             }
    //         }
    //     `
    // );
    const site = '';

    const metaDescription = description || site?.siteMetadata?.description;

    return (
        <Helmet
            htmlAttributes={{
                lang,
            }}
            title={title}
            titleTemplate={`%s | ${title}`}
            meta={[
                {
                    name: `description`,
                    content: metaDescription,
                },
                {
                    property: `og:title`,
                    content: title,
                },
                {
                    property: `og:description`,
                    content: metaDescription,
                },
                {
                    property: `og:type`,
                    content: `https://fooddude.in`,
                },
                {
                    name: `twitter:card`,
                    content: `foodude a food providing orgnisation in bhubnaeshwar.`,
                },
                {
                    name: `twitter:creator`,
                    content: `https://twitter.com/wefooddude`,
                },
                {
                    name: `twitter:title`,
                    content: title,
                },
                {
                    name: `twitter:description`,
                    content: description,
                },
            ].concat(meta)}
        />
    );
}

SEO.defaultProps = {
    lang: `en`,
    meta: [],
    description: ``,
};

SEO.propTypes = {
    description: PropTypes.string,
    lang: PropTypes.string,
    meta: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string.isRequired,
};

export default SEO;
