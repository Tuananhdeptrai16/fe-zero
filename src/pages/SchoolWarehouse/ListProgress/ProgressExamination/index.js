import React from 'react';
import { ROUTER_NAME } from 'src/pages/routeConfig';
import StreamConnection from 'src/pages/streamConnection/infoData';
import { SCHOOLS_WAREHOUSE_TYPE } from 'src/shared/constants/DataFixed';
const ProgressExamination = () => {
  return (
    <StreamConnection
      category={SCHOOLS_WAREHOUSE_TYPE.EXAMINATION}
      pageName={ROUTER_NAME.LIST_PROGRESS_EXAMINATION}
    />
  );
};

ProgressExamination.propTypes = {};

ProgressExamination.defaultProps = {};

export default ProgressExamination;
