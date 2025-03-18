import React from 'react';
import PropTypes from 'prop-types';
import { GENDER_LIST } from 'src/shared/constants/DataTable';

const RenderGender = ({ value, className }) => {
  const valueShow = GENDER_LIST.find((item) => item.value === value);
  return <span className={className}>{valueShow?.label || value || ''}</span>;
};

RenderGender.propTypes = {
  value: PropTypes.string,
  className: PropTypes.string,
};

RenderGender.defaultProps = {};

export default RenderGender;
