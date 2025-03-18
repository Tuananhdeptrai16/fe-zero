import React from 'react';
import { ROUTER_NAME } from 'src/pages/routeConfig';
import DataAggregationMechanism from 'src/pages/SchoolWarehouse/NuclearRegion/Components/DataAggregationMechanism';
import { TYPE_DATA_MARK_SCHOOL_WAREHOUSE } from 'src/shared/constants/DataFixed';

const ResearchAchievements = () => {
  return (
    <div>
      <DataAggregationMechanism
        type={TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DTM}
        category={TYPE_DATA_MARK_SCHOOL_WAREHOUSE.RESEARCH_ACHIEVEMENTS}
        pageName={ROUTER_NAME.RESEARCH_ACHIEVEMENTS}
        titleAppMeta='research_achievements'
      />
    </div>
  );
};

export default ResearchAchievements;
