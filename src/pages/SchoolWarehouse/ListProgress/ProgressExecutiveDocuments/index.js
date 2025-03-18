import React from 'react';
import { ROUTER_NAME } from 'src/pages/routeConfig';
import StreamConnection from 'src/pages/streamConnection/infoData';
import { SCHOOLS_WAREHOUSE_TYPE } from 'src/shared/constants/DataFixed';
const ProgressExecutiveDocuments = () => {
  return (
    <StreamConnection
      category={SCHOOLS_WAREHOUSE_TYPE.DOCUMENT}
      pageName={ROUTER_NAME.LIST_PROGRESS_EXECUTIVE_DOCUMENT}
    />
  );
};

ProgressExecutiveDocuments.propTypes = {};

ProgressExecutiveDocuments.defaultProps = {};

export default ProgressExecutiveDocuments;
