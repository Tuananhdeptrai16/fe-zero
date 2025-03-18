import React from 'react';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import { useIntl } from 'react-intl';
import DataService from './Components';
import { CATEGORY_DATA_SERVICE } from 'src/shared/constants/DataFixed';
import { ROUTER_NAME } from '../routeConfig';

const ListScientist = () => {
  const { messages } = useIntl();
  return (
    <div>
      <AppPageMetadata title={messages['sidebar.list_scientist']} />
      <DataService
        category={CATEGORY_DATA_SERVICE?.SCIENTIST}
        pageName={ROUTER_NAME.LIST_SCIENTIST}
      />
    </div>
  );
};

export default ListScientist;
