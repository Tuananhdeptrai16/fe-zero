import React from 'react';
import PropTypes from 'prop-types';
import { getFormattedCurrency } from '../../../utility/helper/NumberHelper';

const RenderCurrency = ({ value, className }) => {
  return <span className={className}>{getFormattedCurrency(value)}</span>;
};

RenderCurrency.propTypes = {
  value: PropTypes.number,
  className: PropTypes.string,
};

RenderCurrency.defaultProps = {};

export default RenderCurrency;
