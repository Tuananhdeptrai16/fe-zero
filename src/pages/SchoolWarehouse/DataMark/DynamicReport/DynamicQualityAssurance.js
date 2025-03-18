import React from 'react';
import { ROUTER_NAME } from 'src/pages/routeConfig';
import DataAggregationMechanism from 'src/pages/SchoolWarehouse/NuclearRegion/Components/DataAggregationMechanism';
import { TYPE_DATA_MARK_SCHOOL_WAREHOUSE } from 'src/shared/constants/DataFixed';

const DynamicQualityAssurance = () => {
  return (
    <div>
      <DataAggregationMechanism
        type={TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DTM}
        category={TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DYNAMIC_QUALITY_ASSURANCE}
        pageName={ROUTER_NAME.DYNAMIC_QUALITY_ASSURANCE}
        titleAppMeta='dynamic_quality_assurance'
      />
    </div>
  );
};

export default DynamicQualityAssurance;
