import React from 'react';

import {
  SOURCE_DEFINITION_ORACLE_ID,
  SOURCE_DEFINITION_ORACLE_NAME,
} from 'src/shared/constants/DataFixed';
import SourceDefinition from 'src/pages/sourceDefinition';
import { FormSourceOracle } from './FormSourceOracle';

const SourceOracle = () => {
  return (
    <SourceDefinition
      ComponentFormModal={FormSourceOracle}
      sourceName={SOURCE_DEFINITION_ORACLE_NAME}
      sourceId={SOURCE_DEFINITION_ORACLE_ID}
    />
  );
};
export default SourceOracle;
