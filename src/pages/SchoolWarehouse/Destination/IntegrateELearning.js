import React from 'react';

import IntegrateDatabasePage from 'src/pages/IntegrateDatabasePage';
import { SCHOOLS_WAREHOUSE_TYPE } from 'src/shared/constants/DataFixed';

IntegrateELearning.propTypes = {};

function IntegrateELearning() {
  return (
    <div>
      <IntegrateDatabasePage category={SCHOOLS_WAREHOUSE_TYPE.E_LEARNING} />
    </div>
  );
}

export default IntegrateELearning;
