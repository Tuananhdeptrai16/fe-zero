import React from 'react';
import DataAggregationMechanism from '../Components/DataAggregationMechanism';
import { SCHOOLS_WAREHOUSE_TYPE } from 'src/shared/constants/DataFixed';
import { ROUTER_NAME } from 'src/pages/routeConfig';

// import PropTypes from 'prop-types';

AggregateExecutiveDocuments.propTypes = {};

function AggregateExecutiveDocuments() {
  return (
    <DataAggregationMechanism
      category={SCHOOLS_WAREHOUSE_TYPE.DOCUMENT}
      pageName={ROUTER_NAME.DATA_AGGREGATION_MECHANISM_EXECUTIVE_DOCUMENT}
    />
  );
}

export default AggregateExecutiveDocuments;
