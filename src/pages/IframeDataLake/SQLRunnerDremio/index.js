import React from 'react';
import IframeDataLakeShared from '../components/IframeDataSourceShared/IframeDataLakeShared';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import useIntl from 'react-intl/lib/src/components/useIntl';

function SQLRunnerDremio() {
  const { messages } = useIntl();
  return (
    <div>
      <AppPageMetadata title={messages['sidebar.dremio_SQL Runner']} />
      <IframeDataLakeShared
        urlIframe='https://dreamio.mhdigital.vn/new_query'
        sqlRunner={true}
      />
    </div>
  );
}

export default SQLRunnerDremio;
