import React from 'react';
import AutomaticDataEnrichment from './Components/AutomaticDataEnrichment';
import { SOURCE_DEFINITION_MYSQL_NAME } from 'src/shared/constants/DataFixed';

AutomaticDataMySQL.propTypes = {};

function AutomaticDataMySQL() {
  return <AutomaticDataEnrichment dataType={SOURCE_DEFINITION_MYSQL_NAME} />;
}

export default AutomaticDataMySQL;
