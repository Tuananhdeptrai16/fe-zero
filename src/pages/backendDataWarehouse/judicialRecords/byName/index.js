import React from 'react';
import { FILTER_TYPE } from 'src/shared/constants/DataTable';
import { useIntl } from 'react-intl';
import { TableJucidialRecordInfo } from 'src/pageComponents/backendDataWarehouse/judicialRecords/TableJucidialRecordInfo';

const SearchJudicialRecordsPageByName = () => {
  const { messages } = useIntl();

  const filters = [
    {
      type: FILTER_TYPE.TEXT,
      label: messages['table.citizen'],
      name: 'full_name',
    },
  ];

  return <TableJucidialRecordInfo filters={filters} />;
};

export default SearchJudicialRecordsPageByName;
