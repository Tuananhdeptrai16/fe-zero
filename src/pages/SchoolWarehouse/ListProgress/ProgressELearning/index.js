import React from 'react';
import { ROUTER_NAME } from 'src/pages/routeConfig';
import StreamConnection from 'src/pages/streamConnection/infoData';
import { SCHOOLS_WAREHOUSE_TYPE } from 'src/shared/constants/DataFixed';
const ProgressELearning = () => {
  return (
    <StreamConnection
      category={SCHOOLS_WAREHOUSE_TYPE.E_LEARNING}
      pageName={ROUTER_NAME.LIST_PROGRESS_E_LEARNING}
    />
  );
};

ProgressELearning.propTypes = {};

ProgressELearning.defaultProps = {};

export default ProgressELearning;
