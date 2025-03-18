import React from 'react';
import { ROUTER_NAME } from 'src/pages/routeConfig';
import StreamConnection from 'src/pages/streamConnection/infoData';
import { SCHOOLS_WAREHOUSE_TYPE } from 'src/shared/constants/DataFixed';
const ProgressOfficeManager = () => {
  return (
    <StreamConnection
      category={SCHOOLS_WAREHOUSE_TYPE.OFFICE}
      pageName={ROUTER_NAME.LIST_PROGRESS_OFFICE_MANAGER}
    />
  );
};

ProgressOfficeManager.propTypes = {};

ProgressOfficeManager.defaultProps = {};

export default ProgressOfficeManager;
