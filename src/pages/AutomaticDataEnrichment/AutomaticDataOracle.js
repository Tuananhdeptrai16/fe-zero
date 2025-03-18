import React from 'react';
import AutomaticDataEnrichment from './Components/AutomaticDataEnrichment';
import { SOURCE_DEFINITION_ORACLE_NAME } from 'src/shared/constants/DataFixed';

AutomaticDataOracle.propTypes = {};

function AutomaticDataOracle() {
  return <AutomaticDataEnrichment dataType={SOURCE_DEFINITION_ORACLE_NAME} />;
}

export default AutomaticDataOracle;
