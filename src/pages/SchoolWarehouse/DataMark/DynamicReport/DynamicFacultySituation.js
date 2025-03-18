import React from 'react';
import { ROUTER_NAME } from 'src/pages/routeConfig';
import DataAggregationMechanism from 'src/pages/SchoolWarehouse/NuclearRegion/Components/DataAggregationMechanism';
import { TYPE_DATA_MARK_SCHOOL_WAREHOUSE } from 'src/shared/constants/DataFixed';

const DynamicFacultySituation = () => {
  return (
    <div>
      <DataAggregationMechanism
        type={TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DTM}
        category={TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DYNAMIC_FACULTY_SITUATION}
        pageName={ROUTER_NAME.DYNAMIC_FACULTY_SITUATION}
        titleAppMeta='dynamic_faculty_situation'
      />
    </div>
  );
};

export default DynamicFacultySituation;
