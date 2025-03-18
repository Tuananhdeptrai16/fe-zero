import React from 'react';
import IframeDataSourceShared from '../components/IframeDataSourceShared';
import style from './DataSourceName.module.scss';
import clsx from 'clsx';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import useIntl from 'react-intl/lib/src/components/useIntl';

function DataSourceName() {
  const { messages } = useIntl();
  return (
    <div className={clsx(style.wrapDataSourceName)}>
      <AppPageMetadata title={messages['sidebar.sourceData']} />
      <IframeDataSourceShared urlIframe='https://pdp-airbyte.mhdigital.vn/workspaces/9949d71f-249a-4e6e-a974-cd6497ec4056/source' />
    </div>
  );
}

export default DataSourceName;
