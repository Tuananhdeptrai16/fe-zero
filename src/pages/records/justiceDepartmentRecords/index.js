import React from 'react';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import { TableRecord } from 'src/pageComponents/records/TableRecord';
import { useIntl } from 'react-intl';
import { ROUTER_NAME } from 'src/pages/routeConfig';

const JusticeDepartmentRecordPage = () => {
  const { messages } = useIntl();
  return (
    <div>
      <AppPageMetadata title={messages['sidebar.police_record']} />
      <TableRecord
        initTable={{}}
        routerName={ROUTER_NAME.RAW_DOCUMENT_JUSTICE_LGSP}
      />
    </div>
  );
};

export default JusticeDepartmentRecordPage;
