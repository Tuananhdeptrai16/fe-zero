import React from 'react';
import DataAggregationMechanism from '../NuclearRegion/Components/DataAggregationMechanism';
import { TYPE_DATA_MARK_SCHOOL_WAREHOUSE } from 'src/shared/constants/DataFixed';
import { ROUTER_NAME } from 'src/pages/routeConfig';

const SummaryDynamicReport = () => {
  return (
    <div>
      <DataAggregationMechanism
        type={TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DTM}
        category={TYPE_DATA_MARK_SCHOOL_WAREHOUSE.REPORT_DYNAMIC}
        pageName={ROUTER_NAME.SUMMARY_DYNAMIC_REPORT}
        titleAppMeta='summary_dynamic_report'
      />
    </div>
  );
};

export default SummaryDynamicReport;
