import React from 'react';
import AutomaticDataEnrichment from './Components/AutomaticDataEnrichment';
import { SOURCE_DEFINITION_POSTGRES_NAME } from 'src/shared/constants/DataFixed';

AutomaticDataPostgreSQL.propTypes = {};

function AutomaticDataPostgreSQL() {
  return <AutomaticDataEnrichment dataType={SOURCE_DEFINITION_POSTGRES_NAME} />;
}

export default AutomaticDataPostgreSQL;
