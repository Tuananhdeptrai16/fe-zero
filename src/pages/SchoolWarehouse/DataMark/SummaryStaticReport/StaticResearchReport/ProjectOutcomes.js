import React from 'react';
import { ROUTER_NAME } from 'src/pages/routeConfig';
import DataAggregationMechanism from 'src/pages/SchoolWarehouse/NuclearRegion/Components/DataAggregationMechanism';
import { TYPE_DATA_MARK_SCHOOL_WAREHOUSE } from 'src/shared/constants/DataFixed';

const ProjectOutcomes = () => {
  return (
    <div>
      <DataAggregationMechanism
        type={TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DTM}
        category={TYPE_DATA_MARK_SCHOOL_WAREHOUSE.PROJECT_OUTCOMES}
        pageName={ROUTER_NAME.PROJECT_OUTCOMES}
        titleAppMeta='project_outcomes'
      />
    </div>
  );
};

export default ProjectOutcomes;
