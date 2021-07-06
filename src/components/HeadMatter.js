import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import { useLocation } from '@reach/router';
import { truncate } from '../utils';

export const HeadMatter = ({
  title,
  description = '',
  img,
  twitterType,
  ogType
}) => {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `);

  const location = useLocation();
  const shortDescription = truncate(
    description.replace(/\s+/g, ' '),
    200
  ).trim();
  const imgUrl = /^http/.test(img) ? img : data.site.siteMetadata.siteUrl + img;
  const pageUrl = data.site.siteMetadata.siteUrl + location.pathname;
  return (
    <Helmet>
      <title>{title}</title>
      {/* Twitter */}
      <meta
        name="twitter:card"
        content={twitterType || img ? 'summary_large_image' : 'summary'}
      />
      <meta name="twitter:site" content="@ProcessingOrg" />
      <meta name="twitter:creator" content="@ProcessingOrg" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={shortDescription} />
      {img && <meta name="twitter:image" content={imgUrl} />}

      {/* Open Graph */}
      <meta property="og:url" content={pageUrl} />
      <meta property="og:site_name" content={'Processing'} />
      <meta property="og:type" content={ogType || 'website'} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={shortDescription} />
      {img && <meta property="og:image" content={imgUrl} />}
    </Helmet>
  );
};

export default HeadMatter;