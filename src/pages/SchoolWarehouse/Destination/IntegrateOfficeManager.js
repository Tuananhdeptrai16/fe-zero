import React from 'react';

import IntegrateDatabasePage from 'src/pages/IntegrateDatabasePage';
import { SCHOOLS_WAREHOUSE_TYPE } from 'src/shared/constants/DataFixed';

IntegrateOfficeManager.propTypes = {};

function IntegrateOfficeManager() {
  return (
    <div>
      <IntegrateDatabasePage category={SCHOOLS_WAREHOUSE_TYPE.OFFICE} />
    </div>
  );
}

export default IntegrateOfficeManager;
