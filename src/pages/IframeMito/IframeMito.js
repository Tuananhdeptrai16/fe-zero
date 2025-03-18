import React from 'react';
import style from './IframeMito.module.scss';
import clsx from 'clsx';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import useIntl from 'react-intl/lib/src/components/useIntl';

const marginLeft = 52;
const marginTop = 46;

function IframeMito() {
  const { messages } = useIntl();
  return (
    <div className={clsx(style.wrapIframeMito)}>
      <AppPageMetadata title={messages['sidebar.mito']} />
      <iframe
        title='Inline Frame Example'
        src='https://datamine.dth.com.vn/jupyter/lab?token=e7c15c55d728e51dbe48aa446306addf99c53af1c4b8f372'
        height={`${window.innerHeight - 64}px`}
        className={clsx(style.iframeMito)}
        style={{
          marginLeft: `${-marginLeft}px`,
          marginTop: `${-marginTop}px`,
          width: `calc(100% + ${marginLeft}px + 24px)`,
        }}></iframe>
    </div>
  );
}

export default IframeMito;
