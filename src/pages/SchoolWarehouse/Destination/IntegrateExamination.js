import React from 'react';

import IntegrateDatabasePage from 'src/pages/IntegrateDatabasePage';
import { SCHOOLS_WAREHOUSE_TYPE } from 'src/shared/constants/DataFixed';

IntegrateExamination.propTypes = {};

function IntegrateExamination() {
  return (
    <div>
      <IntegrateDatabasePage category={SCHOOLS_WAREHOUSE_TYPE.EXAMINATION} />
    </div>
  );
}

export default IntegrateExamination;
