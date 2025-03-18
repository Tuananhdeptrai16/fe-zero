import React from 'react';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import { useIntl } from 'react-intl';
import { TableShareConfig } from 'src/pageComponents/shareApiConfig/TableShareConfig';
import { KEY_PLATFORM } from 'src/shared/constants/DataTable';
import { initFilterByPlatform } from 'src/pages/shareApiConfig/utils';
import { ROUTER_NAME } from 'src/pages/routeConfig';

const ShareApiProvincePage = () => {
  const { messages } = useIntl();
  return (
    <div>
      <AppPageMetadata title={messages['share_api.province']} />
      <TableShareConfig
        initTable={initFilterByPlatform(KEY_PLATFORM.PROVINCE)}
        platform={KEY_PLATFORM.PROVINCE}
        routerName={ROUTER_NAME.SHARE_API_CONFIG_PROVINCE}
        titleFormCreate='share_api.provinceAddBtn'
        titleFormUpdate='share_api.provinceEditBtn'
      />
    </div>
  );
};

export default ShareApiProvincePage;
