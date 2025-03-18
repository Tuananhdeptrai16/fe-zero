import React from 'react';

import IntegrateDatabasePage from 'src/pages/IntegrateDatabasePage';
import { SCHOOLS_WAREHOUSE_TYPE } from 'src/shared/constants/DataFixed';

IntegrateExecutiveDocuments.propTypes = {};

function IntegrateExecutiveDocuments() {
  return (
    <div>
      <IntegrateDatabasePage category={SCHOOLS_WAREHOUSE_TYPE.DOCUMENT} />
    </div>
  );
}

export default IntegrateExecutiveDocuments;
