import React from 'react';
import { useLocation } from 'react-router-dom';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { useAuthUser } from 'src/@crema/utility/AuthHooks';
import { WORKDIR_LOGO_DYNAMIC } from 'src/shared/constants/DataFixed';

const SITE_URL = process.env.NODE_ENV === window.location.origin;
const FACEBOOK_APP_ID = 'XXXXXXXXX';

const defaultTitle = 'Kho dữ liệu trường';
const defaultDescription = 'Trang quản trị kho dữ liệu';
const defaultImage = '/assets/images/logo/logo_new.png';
const defaultTwitter = '@LLTP';
const defaultSep = ' | ';

const AppPageMetadata = ({ children, ...rest }) => {
  const { pathname } = useLocation();
  const { user } = useAuthUser();
  const imageContent =
    `${WORKDIR_LOGO_DYNAMIC}${user?.logo_url}` ?? defaultImage;

  const getMetaTags = (
    {
      title,
      description,
      // image,
      contentType,
      twitter,
      noCrawl,
      published = '01-05-2021',
      updated,
      category = 'cms, kho du lieu, pdmp',
      tags = 'CNS Kho du lieu',
    },
    pathname,
  ) => {
    const theTitle = title
      ? (title + defaultSep + defaultTitle).substring(0, 60)
      : defaultTitle;
    const theDescription = description
      ? description.substring(0, 155)
      : defaultDescription;
    // const theImage = image ? `${SITE_URL}${image}` : defaultImage;

    const metaTags = [
      { itemprop: 'name', content: theTitle },
      { itemprop: 'description', content: theDescription },
      { itemprop: 'image', content: imageContent },
      { name: 'description', content: theDescription },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: defaultTwitter },
      { name: 'twitter:title', content: theTitle },
      { name: 'twitter:description', content: theDescription },
      { name: 'twitter:creator', content: twitter || defaultTwitter },
      { name: 'twitter:image:src', content: imageContent },
      { property: 'og:title', content: theTitle },
      { property: 'og:type', content: contentType || 'website' },
      { property: 'og:url', content: SITE_URL + pathname },
      { property: 'og:description', content: theDescription },
      { property: 'og:site_name', content: defaultTitle },
      { property: 'fb:app_id', content: FACEBOOK_APP_ID },
    ];

    if (noCrawl) {
      metaTags.push({ name: 'robots', content: 'noindex, nofollow' });
    }

    if (published) {
      metaTags.push({ name: 'article:published_time', content: published });
    }
    if (updated) {
      metaTags.push({ name: 'article:modified_time', content: updated });
    }
    if (category) {
      metaTags.push({ name: 'article:section', content: category });
    }
    if (tags) {
      metaTags.push({ name: 'article:tag', content: tags });
    }

    return metaTags;
  };

  return (
    <>
      <Helmet
        htmlAttributes={{
          lang: 'en',
          itemscope: undefined,
        }}
        title={
          rest.title ? rest.title + defaultSep + defaultTitle : defaultTitle
        }
        link={[
          {
            rel: 'canonical',
            href: SITE_URL + pathname,
          },
          {
            rel: 'icon',
            type: 'image/png',
            href: imageContent,
          },
          {
            rel: 'apple-touch-icon',
            type: 'image/png',
            href: imageContent,
          },
        ]}
        meta={getMetaTags(rest, pathname)}
      />
      {children}
    </>
  );
};

export default AppPageMetadata;

AppPageMetadata.propTypes = {
  children: PropTypes.node,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  description: PropTypes.string,
};
