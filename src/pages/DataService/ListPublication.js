import React from 'react';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import { useIntl } from 'react-intl';
import DataService from './Components';
import { CATEGORY_DATA_SERVICE } from 'src/shared/constants/DataFixed';
import { ROUTER_NAME } from '../routeConfig';

const ListPublication = () => {
  const { messages } = useIntl();
  return (
    <div>
      <AppPageMetadata title={messages['sidebar.list_publication']} />
      <DataService
        category={CATEGORY_DATA_SERVICE?.PUBLICATIONS}
        pageName={ROUTER_NAME.LIST_PUBLICATION}
      />
    </div>
  );
};

export default ListPublication;
