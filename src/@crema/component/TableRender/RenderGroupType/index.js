import React from 'react';
import PropTypes from 'prop-types';
import { GROUP_TYPES } from 'src/shared/constants/DataSelect';

const RenderGroupType = ({ value, className }) => {
  const valueShow = GROUP_TYPES.find((item) => item.value === value);
  return <span className={className}>{valueShow?.label || ''}</span>;
};

RenderGroupType.propTypes = {
  value: PropTypes.string,
  className: PropTypes.string,
};

RenderGroupType.defaultProps = {};

export default RenderGroupType;
