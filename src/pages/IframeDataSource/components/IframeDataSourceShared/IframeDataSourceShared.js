import React from 'react';
import style from './IframeDataSourceShared.style.module.scss';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const marginLeft = 230;

function IframeDataSourceShared({ urlIframe }) {
  return (
    <div className={clsx(style.wrapIframeDataSourceShared)}>
      <iframe
        src={urlIframe}
        height={`${window.innerHeight - 110}px`}
        className={clsx(style.wrapIframeDataSource)}
        style={{
          marginLeft: `${-marginLeft}px`,
          width: `calc(100% + ${marginLeft}px + 28px)`,
        }}></iframe>
    </div>
  );
}

IframeDataSourceShared.propTypes = {
  urlIframe: PropTypes.string.isRequired,
};
export default IframeDataSourceShared;
