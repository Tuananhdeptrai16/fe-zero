import React from 'react';

import {
  SOURCE_DEFINITION_API_ID,
  SOURCE_DEFINITION_API_NAME,
} from 'src/shared/constants/DataFixed';
import { FormSourceDataAPIModal } from 'src/pages/sourceAPI/FormSourceDataAPIModal';
import SourceDefinition from 'src/pages/sourceDefinition';

const SourceDataAPI = () => {
  return (
    <SourceDefinition
      ComponentFormModal={FormSourceDataAPIModal}
      sourceName={SOURCE_DEFINITION_API_NAME}
      sourceId={SOURCE_DEFINITION_API_ID}
    />
  );
};
export default SourceDataAPI;
