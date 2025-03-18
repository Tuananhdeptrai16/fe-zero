import React from 'react';
import SourceDefinition from 'src/pages/sourceDefinition/index';
import { SCHOOLS_WAREHOUSE_TYPE } from 'src/shared/constants/DataFixed';
const SearchOrganization = () => {
  return <SourceDefinition category={SCHOOLS_WAREHOUSE_TYPE?.ORGANIZATION} />;
};
export default SearchOrganization;
