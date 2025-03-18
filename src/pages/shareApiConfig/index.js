import React from 'react';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import { useIntl } from 'react-intl';
import { TableShareConfig } from 'src/pageComponents/shareApiConfig/TableShareConfig';
import { ROUTER_NAME } from 'src/pages/routeConfig';

const ShareApiConfigPage = () => {
  const { messages } = useIntl();
  return (
    <div>
      <AppPageMetadata title={messages['sidebar.share_api_list']} />
      <TableShareConfig
        routerName={ROUTER_NAME.SHARE_API_CONFIG_ALL}
        titleFormCreate={'share_api.lltpAddBtn'}
        titleFormUpdate={'share_api.lltpEditBtn'}
      />
    </div>
  );
};

export default ShareApiConfigPage;
