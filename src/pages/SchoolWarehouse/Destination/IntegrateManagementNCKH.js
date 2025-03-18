import React from 'react';

import IntegrateDatabasePage from 'src/pages/IntegrateDatabasePage';
import { SCHOOLS_WAREHOUSE_TYPE } from 'src/shared/constants/DataFixed';

IntegrateManagementNCKH.propTypes = {};

function IntegrateManagementNCKH() {
  return (
    <div>
      <IntegrateDatabasePage category={SCHOOLS_WAREHOUSE_TYPE?.NCKH} />
    </div>
  );
}

export default IntegrateManagementNCKH;
