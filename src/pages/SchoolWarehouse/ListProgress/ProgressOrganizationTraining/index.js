import React from 'react';
import { ROUTER_NAME } from 'src/pages/routeConfig';
import StreamConnection from 'src/pages/streamConnection/infoData';
import { SCHOOLS_WAREHOUSE_TYPE } from 'src/shared/constants/DataFixed';
const ProgressOrganizationTraining = () => {
  return (
    <StreamConnection
      category={SCHOOLS_WAREHOUSE_TYPE.ORGANIZATION}
      pageName={ROUTER_NAME.LIST_PROGRESS_ORGANIZATION}
    />
  );
};

ProgressOrganizationTraining.propTypes = {};

ProgressOrganizationTraining.defaultProps = {};

export default ProgressOrganizationTraining;
