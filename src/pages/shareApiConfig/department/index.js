import React from 'react';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import { useIntl } from 'react-intl';
import { TableShareConfig } from 'src/pageComponents/shareApiConfig/TableShareConfig';
import { KEY_PLATFORM } from 'src/shared/constants/DataTable';
import { initFilterByPlatform } from 'src/pages/shareApiConfig/utils';
import { ROUTER_NAME } from 'src/pages/routeConfig';

const ShareApiDepartmentPage = () => {
  const { messages } = useIntl();
  return (
    <div>
      <AppPageMetadata title={messages['share_api.department']} />
      <TableShareConfig
        initTable={initFilterByPlatform(KEY_PLATFORM.DEPARTMENT)}
        platform={KEY_PLATFORM.DEPARTMENT}
        routerName={ROUTER_NAME.SHARE_API_CONFIG_DEPARTMENT}
        titleFormCreate='share_api.departmentAddBtn'
        titleFormUpdate='share_api.departmentEditBtn'
      />
    </div>
  );
};

export default ShareApiDepartmentPage;
