import React from 'react';
import { ROUTER_NAME } from 'src/pages/routeConfig';
import DataAggregationMechanism from 'src/pages/SchoolWarehouse/NuclearRegion/Components/DataAggregationMechanism';
import { TYPE_DATA_MARK_SCHOOL_WAREHOUSE } from 'src/shared/constants/DataFixed';

const CredentialIssuance = () => {
  return (
    <div>
      <DataAggregationMechanism
        type={TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DTM}
        category={TYPE_DATA_MARK_SCHOOL_WAREHOUSE.CREDENTIAL_ISSUANCE}
        pageName={ROUTER_NAME.CREDENTIAL_ISSUANCE}
        titleAppMeta='credential_issuance'
      />
    </div>
  );
};

export default CredentialIssuance;
