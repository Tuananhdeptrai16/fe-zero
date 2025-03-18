import React from 'react';
import SourceDefinition from 'src/pages/sourceDefinition/index';
import { SCHOOLS_WAREHOUSE_TYPE } from 'src/shared/constants/DataFixed';
const SearchELearning = () => {
  return <SourceDefinition category={SCHOOLS_WAREHOUSE_TYPE.E_LEARNING} />;
};
export default SearchELearning;
