import React from 'react';
import PropTypes from 'prop-types';
import { formatDateJs } from 'src/shared/utils/DateTime';

const RenderDate = ({ value, formatTime = 'DD/MM/YYYY', className }) => {
  if (value) {
    return <span className={className}>{formatDateJs(value, formatTime)}</span>;
  }
  return null;
};

RenderDate.propTypes = {
  value: PropTypes.string,
  className: PropTypes.string,
  formatTime: PropTypes.string,
};

RenderDate.defaultProps = {};

export default RenderDate;
