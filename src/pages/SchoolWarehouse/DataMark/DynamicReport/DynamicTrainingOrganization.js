import React from 'react';
import { ROUTER_NAME } from 'src/pages/routeConfig';
import DataAggregationMechanism from 'src/pages/SchoolWarehouse/NuclearRegion/Components/DataAggregationMechanism';
import { TYPE_DATA_MARK_SCHOOL_WAREHOUSE } from 'src/shared/constants/DataFixed';

const DynamicTrainingOrganization = () => {
  return (
    <div>
      <DataAggregationMechanism
        type={TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DTM}
        category={TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DYNAMIC_TRAINING_ORGANIZATION}
        pageName={ROUTER_NAME.DYNAMIC_TRAINING_ORGANIZATION}
        titleAppMeta='dynamic_training_organization'
      />
    </div>
  );
};

export default DynamicTrainingOrganization;
