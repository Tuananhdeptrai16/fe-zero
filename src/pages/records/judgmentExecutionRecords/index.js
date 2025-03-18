import React from 'react';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import { TableRecord } from 'src/pageComponents/records/TableRecord';
import { useIntl } from 'react-intl';
import API from 'src/@crema/services/apis';
import { THA_ID } from 'src/shared/constants/DataFixed';
import { ROUTER_NAME } from 'src/pages/routeConfig';

const JudgmentExecutionRecordPage = () => {
  const { messages } = useIntl();
  return (
    <div>
      <AppPageMetadata title={messages['sidebar.police_record']} />
      <TableRecord
        apiUrl={API.SEARCH_RAW_DOCUMENT_BY_ORGANIZATION}
        initTable={{ body: { organization_id: THA_ID } }}
        routerName={ROUTER_NAME.RAW_DOCUMENT_JUDGMENT_EXECUTION}
        organization_id={THA_ID}
      />
    </div>
  );
};

export default JudgmentExecutionRecordPage;
