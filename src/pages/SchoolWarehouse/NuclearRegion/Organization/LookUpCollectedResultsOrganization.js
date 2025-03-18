import React from 'react';
import LookCollectedResults from '../Components/LookCollectedResults';
import { SCHOOLS_WAREHOUSE_TYPE } from 'src/shared/constants/DataFixed';
// import PropTypes from 'prop-types';

LookUpCollectedResultsOrganization.propTypes = {};

function LookUpCollectedResultsOrganization() {
  return (
    <LookCollectedResults
      titleAppMeta='form.formTitleSearch'
      category={SCHOOLS_WAREHOUSE_TYPE?.ORGANIZATION}
    />
  );
}

export default LookUpCollectedResultsOrganization;
