import React from 'react';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import { TableRecord } from 'src/pageComponents/records/TableRecord';
import { useIntl } from 'react-intl';
import API from 'src/@crema/services/apis';
import { CA_ID } from 'src/shared/constants/DataFixed';
import { ROUTER_NAME } from 'src/pages/routeConfig';

const PoliceRecordPage = () => {
  const { messages } = useIntl();
  return (
    <div>
      <AppPageMetadata title={messages['sidebar.police_record']} />
      <TableRecord
        apiUrl={API.SEARCH_RAW_DOCUMENT_BY_ORGANIZATION}
        initTable={{ body: { organization_id: CA_ID } }}
        routerName={ROUTER_NAME.RAW_DOCUMENT_POLICE}
        organization_id={CA_ID}
      />
    </div>
  );
};

export default PoliceRecordPage;
