import React from 'react';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import { useIntl } from 'react-intl';
import { TableShareConfig } from 'src/pageComponents/shareApiConfig/TableShareConfig';
import { KEY_PLATFORM } from 'src/shared/constants/DataTable';
import { initFilterByPlatform } from 'src/pages/shareApiConfig/utils';
import { ROUTER_NAME } from 'src/pages/routeConfig';

const ShareApiLgspPage = () => {
  const { messages } = useIntl();
  return (
    <div>
      <AppPageMetadata title={messages['share_api.lgsp']} />
      <TableShareConfig
        initTable={initFilterByPlatform(KEY_PLATFORM.LGSP)}
        platform={KEY_PLATFORM.LGSP}
        routerName={ROUTER_NAME.SHARE_API_CONFIG_LGSP}
        titleFormCreate='share_api.addBtnForm'
        titleFormUpdate='share_api.editBtnForm'
      />
    </div>
  );
};

export default ShareApiLgspPage;
