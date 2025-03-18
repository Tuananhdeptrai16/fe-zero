import React from 'react';
import LookCollectedResults from '../Components/LookCollectedResults';
import { SCHOOLS_WAREHOUSE_TYPE } from 'src/shared/constants/DataFixed';
// import PropTypes from 'prop-types';

LookUpCollectedResultsExamination.propTypes = {};

function LookUpCollectedResultsExamination() {
  return (
    <LookCollectedResults
      titleAppMeta='form.formTitleSearch'
      category={SCHOOLS_WAREHOUSE_TYPE?.EXAMINATION}
    />
  );
}

export default LookUpCollectedResultsExamination;
