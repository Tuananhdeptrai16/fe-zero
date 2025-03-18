import React from 'react';
import LookCollectedResults from '../Components/LookCollectedResults';
import { SCHOOLS_WAREHOUSE_TYPE } from 'src/shared/constants/DataFixed';
// import PropTypes from 'prop-types';

LookUpCollectedResultsSupportTraining.propTypes = {};

function LookUpCollectedResultsSupportTraining() {
  return (
    <LookCollectedResults
      titleAppMeta='form.formTitleSearch'
      category={SCHOOLS_WAREHOUSE_TYPE?.SUPPORT}
    />
  );
}

export default LookUpCollectedResultsSupportTraining;
