import React from 'react';
import PropTypes from 'prop-types';
import { toDateTime } from 'src/shared/utils/filter';

const RenderDateTime = ({ value, className }) => {
  if (value) {
    return <span className={className}>{toDateTime(value)}</span>;
  }
  return <span className={className}>-</span>;
};

RenderDateTime.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};

RenderDateTime.defaultProps = {};

export default RenderDateTime;
