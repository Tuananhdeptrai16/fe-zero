import React from 'react';

import IntegrateDatabasePage from 'src/pages/IntegrateDatabasePage';
import { SCHOOLS_WAREHOUSE_TYPE } from 'src/shared/constants/DataFixed';

IntegrateDMDC.propTypes = {};

function IntegrateDMDC() {
  return (
    <div>
      <IntegrateDatabasePage category={SCHOOLS_WAREHOUSE_TYPE.DMDC} />
    </div>
  );
}

export default IntegrateDMDC;
