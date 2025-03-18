import React from 'react';
import ManageDataVersions from './Components/ManageDataVersions';
import { SOURCE_DEFINITION_POSTGRES_NAME } from 'src/shared/constants/DataFixed';

function ManageDataVersionPostgreSQL() {
  return <ManageDataVersions sourceName={SOURCE_DEFINITION_POSTGRES_NAME} />;
}

export default ManageDataVersionPostgreSQL;
