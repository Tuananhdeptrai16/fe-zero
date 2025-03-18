import React from 'react';
import IframeDataLakeShared from '../components/IframeDataSourceShared/IframeDataLakeShared';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import useIntl from 'react-intl/lib/src/components/useIntl';

function DatasetsDremio() {
  const { messages } = useIntl();
  return (
    <div>
      <AppPageMetadata title={messages['sidebar.dremio_datasets']} />
      <IframeDataLakeShared
        urlIframe='https://dreamio.mhdigital.vn/'
        isDataSet={true}
      />
    </div>
  );
}

export default DatasetsDremio;
