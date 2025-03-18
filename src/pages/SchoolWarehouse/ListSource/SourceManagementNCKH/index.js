import IntegrateSourceDatabasePage from 'src/pages/IntegrateSourceDatabase';
import { SCHOOLS_WAREHOUSE_TYPE } from 'src/shared/constants/DataFixed';

// import PropTypes from 'prop-types';
SourceManagementNCKH.propTypes = {};

function SourceManagementNCKH() {
  return (
    <>
      <IntegrateSourceDatabasePage category={SCHOOLS_WAREHOUSE_TYPE?.NCKH} />
    </>
  );
}

export default SourceManagementNCKH;
