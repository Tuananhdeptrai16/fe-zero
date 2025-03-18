import React from 'react';
import ManageDataVersions from './Components/ManageDataVersions';
import { SOURCE_DEFINITION_MYSQL_NAME } from 'src/shared/constants/DataFixed';

function ManageDataVersionMySQL() {
  return <ManageDataVersions sourceName={SOURCE_DEFINITION_MYSQL_NAME} />;
}

export default ManageDataVersionMySQL;
