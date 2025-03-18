import React from 'react';
import SearchEngine from '../SearchEngine';
import { LIST_ID_ORGANIZATION_SEARCH_ENGINE } from 'src/shared/constants/DataFixed';

function JudicialBranch() {
  return (
    <SearchEngine
      idOrganization={LIST_ID_ORGANIZATION_SEARCH_ENGINE.judicialBranch}
    />
  );
}

export default JudicialBranch;
