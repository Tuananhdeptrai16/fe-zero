import React from 'react';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import { useIntl } from 'react-intl';
import DataService from './Components';
import { CATEGORY_DATA_SERVICE } from 'src/shared/constants/DataFixed';
import { ROUTER_NAME } from '../routeConfig';

const ListScientificAward = () => {
  const { messages } = useIntl();
  return (
    <div>
      <AppPageMetadata
        title={messages['sidebar.list_scientific_research_award']}
      />
      <DataService
        category={CATEGORY_DATA_SERVICE?.PRIZE}
        pageName={ROUTER_NAME.LIST_SCIENTIFIC_RESEARCH_AWARD}
      />
    </div>
  );
};

export default ListScientificAward;
