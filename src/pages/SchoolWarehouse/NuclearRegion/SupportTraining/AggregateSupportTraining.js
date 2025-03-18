import React from 'react';
import DataAggregationMechanism from '../Components/DataAggregationMechanism';
import { SCHOOLS_WAREHOUSE_TYPE } from 'src/shared/constants/DataFixed';
import { ROUTER_NAME } from 'src/pages/routeConfig';

// import PropTypes from 'prop-types';

AggregateManagementSupportTraining.propTypes = {};

function AggregateManagementSupportTraining() {
  return (
    <DataAggregationMechanism
      category={SCHOOLS_WAREHOUSE_TYPE.SUPPORT}
      pageName={ROUTER_NAME.DATA_AGGREGATION_MECHANISM_SUPPORT_TRAINING}
    />
  );
}

export default AggregateManagementSupportTraining;
