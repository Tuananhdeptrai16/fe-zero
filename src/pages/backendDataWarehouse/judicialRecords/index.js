import React from 'react';
import { FILTER_TYPE } from 'src/shared/constants/DataTable';
import { useIntl } from 'react-intl';
import { TableJucidialRecordInfo } from 'src/pageComponents/backendDataWarehouse/judicialRecords/TableJucidialRecordInfo';

const SearchJudicialRecordsPage = () => {
  const { messages } = useIntl();

  const filters = [
    {
      type: FILTER_TYPE.TEXT,
      label: messages['table.citizen'],
      name: 'full_name',
    },
    {
      type: FILTER_TYPE.TEXT,
      label: messages['judicial.idCard'],
      name: 'cccd_number',
    },
  ];

  return <TableJucidialRecordInfo filters={filters} />;
};

export default SearchJudicialRecordsPage;
