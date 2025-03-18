import React from 'react';
import DataAggregationMechanism from '../NuclearRegion/Components/DataAggregationMechanism';
import { TYPE_DATA_MARK_SCHOOL_WAREHOUSE } from 'src/shared/constants/DataFixed';
import { ROUTER_NAME } from 'src/pages/routeConfig';
// import PropTypes from 'prop-types';

DataMarkTraining.propTypes = {};

function DataMarkTraining() {
  return (
    <DataAggregationMechanism
      titleAppMeta={'aggregate_data_mark_training'}
      type={TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DTM}
      category={TYPE_DATA_MARK_SCHOOL_WAREHOUSE.THDT}
      pageName={ROUTER_NAME.AGGREGATE_DATA_MARK_TRAINING}
    />
  );
}

export default DataMarkTraining;
