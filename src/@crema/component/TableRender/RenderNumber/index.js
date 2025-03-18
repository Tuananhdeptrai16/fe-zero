import React from 'react';
import PropTypes from 'prop-types';

const RenderNumber = ({ value, className, suffix }) => {
  if (value) {
    return (
      <span className={className}>
        {value} <span className='render-number-suffix'>{suffix}</span>
      </span>
    );
  }
  return (
    <span className={className}>
      0 <span className='render-number-suffix'>{suffix}</span>
    </span>
  );
};

RenderNumber.propTypes = {
  value: PropTypes.number,
  className: PropTypes.string,
  suffix: PropTypes.node,
};

RenderNumber.defaultProps = {};

export default RenderNumber;
