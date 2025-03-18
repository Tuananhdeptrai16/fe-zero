import React from 'react';
import { TYPE_DATA_MARK_SCHOOL_WAREHOUSE } from 'src/shared/constants/DataFixed';
import DataAggregationMechanism from '../NuclearRegion/Components/DataAggregationMechanism';
import { ROUTER_NAME } from 'src/pages/routeConfig';
// import PropTypes from 'prop-types';

CourseResearchStatus.propTypes = {};

function CourseResearchStatus() {
  return (
    <DataAggregationMechanism
      titleAppMeta={'aggregate_data_mark_course_research_status'}
      type={TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DTM}
      category={TYPE_DATA_MARK_SCHOOL_WAREHOUSE.NCKH}
      pageName={ROUTER_NAME.AGGREGATE_DATA_MARK_COURSE_RESEARCH_STATUS}
    />
  );
}

export default CourseResearchStatus;
