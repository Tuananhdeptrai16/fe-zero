import React from 'react';
import SearchEngine from '../SearchEngine';
import { LIST_ID_ORGANIZATION_SEARCH_ENGINE } from 'src/shared/constants/DataFixed';

function InformationCommunication() {
  return (
    <SearchEngine
      idOrganization={
        LIST_ID_ORGANIZATION_SEARCH_ENGINE.informationCommunication
      }
    />
  );
}

export default InformationCommunication;
