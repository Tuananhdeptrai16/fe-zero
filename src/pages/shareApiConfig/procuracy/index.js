import React from 'react';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import { useIntl } from 'react-intl';
import { TableShareConfig } from 'src/pageComponents/shareApiConfig/TableShareConfig';
import { KEY_PLATFORM } from 'src/shared/constants/DataTable';
import { initFilterByPlatform } from 'src/pages/shareApiConfig/utils';
import { ROUTER_NAME } from 'src/pages/routeConfig';

const ShareApiProcuracyPage = () => {
  const { messages } = useIntl();
  return (
    <div>
      <AppPageMetadata title={messages['sidebar.other_systems_procuracy']} />
      <TableShareConfig
        initTable={initFilterByPlatform(KEY_PLATFORM.OTHER_SYSTEMS_PROCURACY)}
        platform={KEY_PLATFORM.OTHER_SYSTEMS_PROCURACY}
        routerName={ROUTER_NAME.SHARE_API_CONFIG_PROCUREMENT}
        titleFormCreate='share_api.addBtnForm'
        titleFormUpdate='share_api.editBtnForm'
      />
    </div>
  );
};

export default ShareApiProcuracyPage;
