import IntegrateSourceDatabasePage from 'src/pages/IntegrateSourceDatabase';
import { SCHOOLS_WAREHOUSE_TYPE } from 'src/shared/constants/DataFixed';

// import PropTypes from 'prop-types';
SourceOfficeManager.propTypes = {};

function SourceOfficeManager() {
  return (
    <>
      <IntegrateSourceDatabasePage category={SCHOOLS_WAREHOUSE_TYPE.OFFICE} />
    </>
  );
}

export default SourceOfficeManager;
