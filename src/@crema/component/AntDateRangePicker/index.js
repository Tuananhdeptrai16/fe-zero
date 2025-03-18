import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';
import { DATE_FORMAT, DATE_FORMAT_LIST } from 'src/shared/constants/Date';
import locale from 'src/shared/locale/DatePickerVI';
import moment, { isDate } from 'moment';
import { isString } from 'lodash';

const AntDateRangePicker = ({ value, ...props }) => {
  const valueInput = useMemo(() => {
    const processDate = (value) => {
      if (value) {
        if (moment(value).isValid()) {
          return moment(value);
        } else if (isDate(value)) {
          return moment(value);
        } else if (isString(value)) {
          const trimmedValue = value.trim();
          if (moment(trimmedValue).isValid()) {
            return moment(trimmedValue);
          }
          if (moment(trimmedValue, DATE_FORMAT).isValid()) {
            return moment(trimmedValue, DATE_FORMAT);
          }
        }
      }
      return null;
    };
    if (value) {
      const start = processDate(value[0]);
      const end = processDate(value[1]);

      return [start, end];
    }
  }, [value]);

  return (
    <DatePicker.RangePicker
      value={valueInput}
      format={DATE_FORMAT_LIST}
      locale={locale}
      {...props}
    />
  );
};

export default AntDateRangePicker;

AntDateRangePicker.propTypes = {
  pickerType: PropTypes.string,
};
