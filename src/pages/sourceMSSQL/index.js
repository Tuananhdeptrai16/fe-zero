import React from 'react';

import {
  SOURCE_DEFINITION_MSSQL_ID,
  SOURCE_DEFINITION_MSSQL_NAME,
} from 'src/shared/constants/DataFixed';
import SourceDefinition from 'src/pages/sourceDefinition';
import { FormSourceMSSQL } from './FormSourceMSSQL';

const SourceMSSQL = () => {
  return (
    <SourceDefinition
      ComponentFormModal={FormSourceMSSQL}
      sourceName={SOURCE_DEFINITION_MSSQL_NAME}
      sourceId={SOURCE_DEFINITION_MSSQL_ID}
    />
  );
};
export default SourceMSSQL;
