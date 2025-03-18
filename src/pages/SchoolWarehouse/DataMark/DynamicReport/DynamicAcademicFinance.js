import React from 'react';
import { ROUTER_NAME } from 'src/pages/routeConfig';
import DataAggregationMechanism from 'src/pages/SchoolWarehouse/NuclearRegion/Components/DataAggregationMechanism';
import { TYPE_DATA_MARK_SCHOOL_WAREHOUSE } from 'src/shared/constants/DataFixed';

const DynamicAcademicFinance = () => {
  return (
    <div>
      <DataAggregationMechanism
        type={TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DTM}
        category={TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DYNAMIC_ACADEMIC_FINANCE}
        pageName={ROUTER_NAME.DYNAMIC_ACADEMIC_FINANCE}
        titleAppMeta='dynamic_academic_finance'
      />
    </div>
  );
};

export default DynamicAcademicFinance;
