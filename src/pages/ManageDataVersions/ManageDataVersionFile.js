import React from 'react';
import ManageDataVersions from './Components/ManageDataVersions';
import { SOURCE_DEFINITION_FILE_NAME } from 'src/shared/constants/DataFixed';

function ManageDataVersionFile() {
  return <ManageDataVersions sourceName={SOURCE_DEFINITION_FILE_NAME} />;
}

export default ManageDataVersionFile;
