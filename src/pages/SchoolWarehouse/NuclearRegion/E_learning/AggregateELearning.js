import React from 'react';
import DataAggregationMechanism from '../Components/DataAggregationMechanism';
import { SCHOOLS_WAREHOUSE_TYPE } from 'src/shared/constants/DataFixed';
import { ROUTER_NAME } from 'src/pages/routeConfig';

// import PropTypes from 'prop-types';

AggregateELearning.propTypes = {};

function AggregateELearning() {
  return (
    <DataAggregationMechanism
      category={SCHOOLS_WAREHOUSE_TYPE.E_LEARNING}
      pageName={ROUTER_NAME.DATA_AGGREGATION_MECHANISM_E_LEARNING}
    />
  );
}

export default AggregateELearning;
