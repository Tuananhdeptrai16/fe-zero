import React from 'react';

import {
  SOURCE_DEFINITION_POSTGRES_ID,
  SOURCE_DEFINITION_POSTGRES_NAME,
} from 'src/shared/constants/DataFixed';
import SourceDefinition from 'src/pages/sourceDefinition';
import { FormSourcePostgres } from './FormSourcePostgres';

const SourcePostgreSQL = () => {
  return (
    <SourceDefinition
      ComponentFormModal={FormSourcePostgres}
      sourceName={SOURCE_DEFINITION_POSTGRES_NAME}
      sourceId={SOURCE_DEFINITION_POSTGRES_ID}
    />
  );
};
export default SourcePostgreSQL;
