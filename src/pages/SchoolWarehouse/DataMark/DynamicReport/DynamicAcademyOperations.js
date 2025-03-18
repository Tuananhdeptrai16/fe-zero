import React from 'react';
import { ROUTER_NAME } from 'src/pages/routeConfig';
import DataAggregationMechanism from 'src/pages/SchoolWarehouse/NuclearRegion/Components/DataAggregationMechanism';
import { TYPE_DATA_MARK_SCHOOL_WAREHOUSE } from 'src/shared/constants/DataFixed';

const DynamicAcademyOperations = () => {
  return (
    <div>
      <DataAggregationMechanism
        type={TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DTM}
        category={TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DYNAMIC_ACADEMY_OPERATIONS}
        pageName={ROUTER_NAME.DYNAMIC_ACADEMY_OPERATIONS}
        titleAppMeta='dynamic_academy_operations'
      />
    </div>
  );
};

export default DynamicAcademyOperations;
