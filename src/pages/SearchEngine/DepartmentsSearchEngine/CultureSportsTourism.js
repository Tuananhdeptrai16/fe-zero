import React from 'react';
import SearchEngine from '../SearchEngine';
import { LIST_ID_ORGANIZATION_SEARCH_ENGINE } from 'src/shared/constants/DataFixed';

function CultureSportsTourism() {
  return (
    <SearchEngine
      idOrganization={LIST_ID_ORGANIZATION_SEARCH_ENGINE.cultureSportsTourism}
    />
  );
}

export default CultureSportsTourism;
