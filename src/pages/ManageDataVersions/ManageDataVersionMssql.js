import React from 'react';
import ManageDataVersions from './Components/ManageDataVersions';
import { SOURCE_DEFINITION_MSSQL_NAME } from 'src/shared/constants/DataFixed';

function ManageDataVersionMssql() {
  return <ManageDataVersions sourceName={SOURCE_DEFINITION_MSSQL_NAME} />;
}

export default ManageDataVersionMssql;
