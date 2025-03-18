import IntegrateSourceDatabasePage from 'src/pages/IntegrateSourceDatabase';
import { SCHOOLS_WAREHOUSE_TYPE } from 'src/shared/constants/DataFixed';

// import PropTypes from 'prop-types';
SourceSupportTraining.propTypes = {};

function SourceSupportTraining() {
  return (
    <>
      <IntegrateSourceDatabasePage category={SCHOOLS_WAREHOUSE_TYPE.SUPPORT} />
    </>
  );
}

export default SourceSupportTraining;
