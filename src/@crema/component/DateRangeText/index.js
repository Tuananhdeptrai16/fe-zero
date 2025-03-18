import React from 'react';
import { PatternFormat } from 'react-number-format';
import AntInput from 'src/@crema/component/AntInput';
const FORMAT_DATE_TEXT = '##/##/#### - ##/##/####';
const MASK = ['D', 'D', 'M', 'M', 'Y', 'Y', 'Y', 'Y'];
const DateRangeText = (props) => {
  return (
    <PatternFormat
      format={FORMAT_DATE_TEXT}
      allowEmptyFormatting
      mask={[...MASK, ...MASK]}
      placeholder='DD/MM/YYYY - DD/MM/YYYY'
      customInput={AntInput}
      {...props}
    />
  );
};

DateRangeText.propTypes = {};

DateRangeText.defaultProps = {};

export default DateRangeText;
