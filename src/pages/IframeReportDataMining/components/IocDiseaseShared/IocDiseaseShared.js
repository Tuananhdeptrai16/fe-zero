import React from 'react';
import style from './IocDiseaseShared.style.module.scss';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const marginLeft = 0;

function IframeDataLakeShared({ urlIframe, iocMedical = false }) {
  return (
    <div className={clsx(style.wrapIframeIocDiseaseShared)}>
      <iframe
        src={urlIframe}
        height={
          iocMedical
            ? `${window.innerHeight - 76}px`
            : `${window.innerHeight - 6}px`
        }
        className={clsx(style.iframeIocDiseaseShared)}
        style={{
          marginLeft: `${-marginLeft}px`,
          width: `calc(100% + ${marginLeft}px)`,
          marginTop: iocMedical ? '0px' : '-74px',
        }}></iframe>
    </div>
  );
}

IframeDataLakeShared.propTypes = {
  urlIframe: PropTypes.string.isRequired,
};
export default IframeDataLakeShared;
