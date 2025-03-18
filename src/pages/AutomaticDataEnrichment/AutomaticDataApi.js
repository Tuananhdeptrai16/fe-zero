import React from 'react';
import AutomaticDataEnrichment from './Components/AutomaticDataEnrichment';
import { DESTINATION_BASIC_AUTH_API_NAME } from 'src/shared/constants/DataFixed';

AutomaticDataApi.propTypes = {};

function AutomaticDataApi() {
  return <AutomaticDataEnrichment dataType={DESTINATION_BASIC_AUTH_API_NAME} />;
}

export default AutomaticDataApi;
