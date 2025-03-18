import React from 'react';
import AutomaticDataEnrichment from './Components/AutomaticDataEnrichment';
import { SOURCE_DEFINITION_FILE_NAME } from 'src/shared/constants/DataFixed';

AutomaticDataFile.propTypes = {};

function AutomaticDataFile() {
  return <AutomaticDataEnrichment dataType={SOURCE_DEFINITION_FILE_NAME} />;
}

export default AutomaticDataFile;
