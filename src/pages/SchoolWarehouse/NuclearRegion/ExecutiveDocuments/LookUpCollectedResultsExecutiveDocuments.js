import React from 'react';
import LookCollectedResults from '../Components/LookCollectedResults';
import { SCHOOLS_WAREHOUSE_TYPE } from 'src/shared/constants/DataFixed';
// import PropTypes from 'prop-types';

LookUpCollectedResultsExecutiveDocuments.propTypes = {};

function LookUpCollectedResultsExecutiveDocuments() {
  return (
    <LookCollectedResults
      titleAppMeta='form.formTitleSearch'
      category={SCHOOLS_WAREHOUSE_TYPE?.DOCUMENT}
    />
  );
}

export default LookUpCollectedResultsExecutiveDocuments;
