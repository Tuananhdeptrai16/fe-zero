import React from 'react';
import { ROUTER_NAME } from 'src/pages/routeConfig';
import StreamConnection from 'src/pages/streamConnection/infoData';
import { SCHOOLS_WAREHOUSE_TYPE } from 'src/shared/constants/DataFixed';
const ProgressSupportTraining = () => {
  return (
    <StreamConnection
      category={SCHOOLS_WAREHOUSE_TYPE.SUPPORT}
      pageName={ROUTER_NAME.LIST_PROGRESS_SUPPORT_TRAINING}
    />
  );
};

ProgressSupportTraining.propTypes = {};

ProgressSupportTraining.defaultProps = {};

export default ProgressSupportTraining;
