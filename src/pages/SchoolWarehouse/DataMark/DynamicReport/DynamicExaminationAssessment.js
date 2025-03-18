import React from 'react';
import { ROUTER_NAME } from 'src/pages/routeConfig';
import DataAggregationMechanism from 'src/pages/SchoolWarehouse/NuclearRegion/Components/DataAggregationMechanism';
import { TYPE_DATA_MARK_SCHOOL_WAREHOUSE } from 'src/shared/constants/DataFixed';

const DynamicExaminationAssessment = () => {
  return (
    <div>
      <DataAggregationMechanism
        type={TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DTM}
        category={
          TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DYNAMIC_EXAMINATION_ASSESSMENT
        }
        pageName={ROUTER_NAME.DYNAMIC_EXAMINATION_ASSESSMENT}
        titleAppMeta='dynamic_examination_assessment'
      />
    </div>
  );
};

export default DynamicExaminationAssessment;
