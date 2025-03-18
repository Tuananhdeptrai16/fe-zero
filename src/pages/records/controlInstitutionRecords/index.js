import React from 'react';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import { TableRecord } from 'src/pageComponents/records/TableRecord';
import { useIntl } from 'react-intl';
import API from 'src/@crema/services/apis';
import { VKS_ID } from 'src/shared/constants/DataFixed';
import { ROUTER_NAME } from 'src/pages/routeConfig';

const controlInstitutionRecordPage = () => {
  const { messages } = useIntl();
  return (
    <div>
      <AppPageMetadata title={messages['sidebar.police_record']} />
      <TableRecord
        apiUrl={API.SEARCH_RAW_DOCUMENT_BY_ORGANIZATION}
        initTable={{ body: { organization_id: VKS_ID } }}
        routerName={ROUTER_NAME.RAW_DOCUMENT_CONTROL_INSTITUTE}
        organization_id={VKS_ID}
      />
    </div>
  );
};

export default controlInstitutionRecordPage;
