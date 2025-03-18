import IntegrateSourceDatabasePage from 'src/pages/IntegrateSourceDatabase';
import { SCHOOLS_WAREHOUSE_TYPE } from 'src/shared/constants/DataFixed';

// import PropTypes from 'prop-types';
SourceDMDC.propTypes = {};

function SourceDMDC() {
  return (
    <>
      <IntegrateSourceDatabasePage category={SCHOOLS_WAREHOUSE_TYPE?.DMDC} />
    </>
  );
}

export default SourceDMDC;
