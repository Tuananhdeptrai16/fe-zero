import React from 'react';
import style from './IframeDataLakeShared.style.module.scss';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const marginLeft = 88;

function IframeDataLakeShared({
  urlIframe,
  sqlRunner = false,
  isDataSet = false,
}) {
  return (
    <div className={clsx(style.wrapIframeDataLakeShared)}>
      <iframe
        src={urlIframe}
        height={
          sqlRunner
            ? `${window.innerHeight}px`
            : `${window.innerHeight - 110}px`
        }
        className={clsx(style.wrapIframeDataLake)}
        style={{
          marginLeft: `${-marginLeft}px`,
          width: `calc(100% + ${marginLeft}px + 30px)`,
        }}></iframe>

      {isDataSet && <div className={clsx(style.hiddenViewDataset)}></div>}
    </div>
  );
}

IframeDataLakeShared.propTypes = {
  urlIframe: PropTypes.string.isRequired,
};
export default IframeDataLakeShared;
