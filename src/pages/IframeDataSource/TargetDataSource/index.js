import React from 'react';
import IframeDataSourceShared from '../components/IframeDataSourceShared';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import useIntl from 'react-intl/lib/src/components/useIntl';

function TargetDataSource() {
  const { messages } = useIntl();
  return (
    <div>
      <AppPageMetadata title={messages['sidebar.targetDataSource']} />
      <IframeDataSourceShared urlIframe='https://pdp-airbyte.mhdigital.vn/workspaces/9949d71f-249a-4e6e-a974-cd6497ec4056/destination' />
    </div>
  );
}

export default TargetDataSource;
