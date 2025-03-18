import React from 'react';
import { ROUTER_NAME } from 'src/pages/routeConfig';

import DataAggregationMechanism from 'src/pages/SchoolWarehouse/NuclearRegion/Components/DataAggregationMechanism';
import { TYPE_DATA_MARK_SCHOOL_WAREHOUSE } from 'src/shared/constants/DataFixed';

const InternationalCooperation = () => {
  return (
    <div>
      <DataAggregationMechanism
        type={TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DTM}
        category={TYPE_DATA_MARK_SCHOOL_WAREHOUSE.INTERNATIONAL_COOPERATION}
        pageName={ROUTER_NAME.INTERNATIONAL_COOPERATION}
        titleAppMeta='international_cooperation'
      />
    </div>
  );
};

export default InternationalCooperation;
