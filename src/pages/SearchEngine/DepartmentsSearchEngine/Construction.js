import React from 'react';
import SearchEngine from '../SearchEngine';
import { LIST_ID_ORGANIZATION_SEARCH_ENGINE } from 'src/shared/constants/DataFixed';

function Construction() {
  return (
    <SearchEngine
      idOrganization={LIST_ID_ORGANIZATION_SEARCH_ENGINE.construction}
    />
  );
}

export default Construction;
