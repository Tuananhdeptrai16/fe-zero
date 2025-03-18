import React from 'react';
import ManageDataVersions from './Components/ManageDataVersions';
import { SOURCE_DEFINITION_API_NAME } from 'src/shared/constants/DataFixed';

function ManageDataVersionAPI() {
  return <ManageDataVersions sourceName={SOURCE_DEFINITION_API_NAME} />;
}

export default ManageDataVersionAPI;
