import React from 'react';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import { useIntl } from 'react-intl';
import { TableShareConfig } from 'src/pageComponents/shareApiConfig/TableShareConfig';
import { KEY_PLATFORM } from 'src/shared/constants/DataTable';
import { initFilterByPlatform } from 'src/pages/shareApiConfig/utils';
import { ROUTER_NAME } from 'src/pages/routeConfig';

const ShareApiDistrictPage = () => {
  const { messages } = useIntl();
  return (
    <div>
      <AppPageMetadata title={messages['share_api.district']} />
      <TableShareConfig
        initTable={initFilterByPlatform(KEY_PLATFORM.DISTRICT)}
        platform={KEY_PLATFORM.DISTRICT}
        routerName={ROUTER_NAME.SHARE_API_CONFIG_DISTRICT}
        titleFormCreate='share_api.districtAddBtn'
        titleFormUpdate='share_api.districtEditBtn'
      />
    </div>
  );
};

export default ShareApiDistrictPage;
