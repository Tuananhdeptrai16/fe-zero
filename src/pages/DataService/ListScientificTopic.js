import React from 'react';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import { useIntl } from 'react-intl';
import DataService from './Components';
import { CATEGORY_DATA_SERVICE } from 'src/shared/constants/DataFixed';
import { ROUTER_NAME } from '../routeConfig';

const ListScientificTopic = () => {
  const { messages } = useIntl();
  return (
    <div>
      <AppPageMetadata
        title={messages['sidebar.list_scientific_research_topic']}
      />
      <DataService
        category={CATEGORY_DATA_SERVICE?.SCIENCE_TOPIC}
        pageName={ROUTER_NAME.LIST_SCIENTIFIC_RESEARCH_TOPIC}
      />
    </div>
  );
};

export default ListScientificTopic;
