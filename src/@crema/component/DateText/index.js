import React from 'react';
import { PatternFormat } from 'react-number-format';
import AntInput from 'src/@crema/component/AntInput';
const FORMAT_DATE_TEXT = '##/##/####';

const DateText = (props) => {
  return (
    <PatternFormat
      format={FORMAT_DATE_TEXT}
      allowEmptyFormatting
      mask={['D', 'D', 'M', 'M', 'Y', 'Y', 'Y', 'Y']}
      placeholder='DD/MM/YYYY'
      customInput={AntInput}
      {...props}
    />
  );
};

DateText.propTypes = {};

DateText.defaultProps = {};

export default DateText;
