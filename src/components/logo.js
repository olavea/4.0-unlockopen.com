/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Image from "gatsby-image";
import classNames from "classnames";

const Logo = ({ variant, component, ...props }) => {
  const Component = component || "div";
  return (
    <StaticQuery
      query={logoQuery}
      render={data => {
        const { author, title } = data.site.siteMetadata;
        return (
          <Component
            {...props}
            className={classNames("Logo", { isSmall: variant === "small" })}
          >
            {variant !== "small" && (
              <Image
                className="avatar"
                fixed={data.avatar.childImageSharp.fixed}
                alt={author}
              />
            )}
            <h1 className="text">{title}</h1>
          </Component>
        );
      }}
    />
  );
};

const logoQuery = graphql`
  query logoQuery {
    avatar: file(absolutePath: { regex: "/avatar.jpg/" }) {
      childImageSharp {
        fixed(width: 70, height: 70) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        title
        author
      }
    }
  }
`;

export default Logo;
