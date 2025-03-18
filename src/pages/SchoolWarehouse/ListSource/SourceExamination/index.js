import IntegrateSourceDatabasePage from 'src/pages/IntegrateSourceDatabase';
import { SCHOOLS_WAREHOUSE_TYPE } from 'src/shared/constants/DataFixed';

// import PropTypes from 'prop-types';
SourceExamination.propTypes = {};

function SourceExamination() {
  return (
    <>
      <IntegrateSourceDatabasePage
        category={SCHOOLS_WAREHOUSE_TYPE?.EXAMINATION}
      />
    </>
  );
}

export default SourceExamination;
