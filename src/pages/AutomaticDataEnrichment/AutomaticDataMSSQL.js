import React from 'react';
import AutomaticDataEnrichment from './Components/AutomaticDataEnrichment';
import { SOURCE_DEFINITION_MSSQL_NAME } from 'src/shared/constants/DataFixed';

AutomaticDataMSSQL.propTypes = {};

function AutomaticDataMSSQL() {
  return <AutomaticDataEnrichment dataType={SOURCE_DEFINITION_MSSQL_NAME} />;
}

export default AutomaticDataMSSQL;
