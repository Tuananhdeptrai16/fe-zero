import React from 'react';
import { ROUTER_NAME } from 'src/pages/routeConfig';
import StreamConnection from 'src/pages/streamConnection/infoData';
import { SCHOOLS_WAREHOUSE_TYPE } from 'src/shared/constants/DataFixed';
const ProgressManagementNCKH = () => {
  return (
    <StreamConnection
      category={SCHOOLS_WAREHOUSE_TYPE.NCKH}
      pageName={ROUTER_NAME.LIST_PROGRESS_MANAGEMENT_NCKH}
    />
  );
};

ProgressManagementNCKH.propTypes = {};

ProgressManagementNCKH.defaultProps = {};

export default ProgressManagementNCKH;
