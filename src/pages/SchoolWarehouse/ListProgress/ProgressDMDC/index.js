import React from 'react';
import { ROUTER_NAME } from 'src/pages/routeConfig';
import StreamConnection from 'src/pages/streamConnection/infoData';
import { SCHOOLS_WAREHOUSE_TYPE } from 'src/shared/constants/DataFixed';
const ProgressDMDC = () => {
  return (
    <StreamConnection
      category={SCHOOLS_WAREHOUSE_TYPE.DMDC}
      pageName={ROUTER_NAME.LIST_PROGRESS_DMDC}
    />
  );
};

ProgressDMDC.propTypes = {};

ProgressDMDC.defaultProps = {};

export default ProgressDMDC;
