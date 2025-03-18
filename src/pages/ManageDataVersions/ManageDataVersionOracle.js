import React from 'react';
import ManageDataVersions from './Components/ManageDataVersions';
import { SOURCE_DEFINITION_ORACLE_NAME } from 'src/shared/constants/DataFixed';

function ManageDataVersionOracle() {
  return <ManageDataVersions sourceName={SOURCE_DEFINITION_ORACLE_NAME} />;
}

export default ManageDataVersionOracle;
