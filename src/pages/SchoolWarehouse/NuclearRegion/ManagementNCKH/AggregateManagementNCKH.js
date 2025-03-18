import React from 'react';
import DataAggregationMechanism from '../Components/DataAggregationMechanism';
import { SCHOOLS_WAREHOUSE_TYPE } from 'src/shared/constants/DataFixed';
import { ROUTER_NAME } from 'src/pages/routeConfig';

// import PropTypes from 'prop-types';

AggregateManagementNCKH.propTypes = {};

function AggregateManagementNCKH() {
  return (
    <DataAggregationMechanism
      category={SCHOOLS_WAREHOUSE_TYPE.NCKH}
      pageName={ROUTER_NAME.DATA_AGGREGATION_MECHANISM_MANAGEMENT_NCKH}
    />
  );
}

export default AggregateManagementNCKH;
