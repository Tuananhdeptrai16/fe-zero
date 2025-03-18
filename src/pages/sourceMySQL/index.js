import React from 'react';

import {
  SOURCE_DEFINITION_MYSQL_ID,
  SOURCE_DEFINITION_MYSQL_NAME,
} from 'src/shared/constants/DataFixed';
import SourceDefinition from 'src/pages/sourceDefinition';
import { FormSourceMySQL } from './FormSourceMySQL';

const SourceMySQL = () => {
  return (
    <SourceDefinition
      ComponentFormModal={FormSourceMySQL}
      sourceName={SOURCE_DEFINITION_MYSQL_NAME}
      sourceId={SOURCE_DEFINITION_MYSQL_ID}
    />
  );
};
export default SourceMySQL;
