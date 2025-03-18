import IntegrateSourceDatabasePage from 'src/pages/IntegrateSourceDatabase';
import { SCHOOLS_WAREHOUSE_TYPE } from 'src/shared/constants/DataFixed';

// import PropTypes from 'prop-types';
SourceELearning.propTypes = {};

function SourceELearning() {
  return (
    <>
      <IntegrateSourceDatabasePage
        category={SCHOOLS_WAREHOUSE_TYPE.E_LEARNING}
      />
    </>
  );
}

export default SourceELearning;
