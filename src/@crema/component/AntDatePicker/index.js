import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';
import { DATE_FORMAT } from 'src/shared/constants/Date';
import locale from 'src/shared/locale/DatePickerVI';
import moment from 'moment/moment';
import { isDate, isString } from 'src/shared/utils/Typeof';

const AntDatePicker = ({ value, format, ...props }) => {
  const formatDate = format || DATE_FORMAT;
  const valueInput = useMemo(() => {
    if (value) {
      switch (true) {
        case moment(value).isValid():
          return moment(value);
        case isDate(value):
          return moment(value.trim());
        case isString(value):
          if (moment(value.trim()).isValid()) {
            return moment(value.trim());
          }

          if (
            moment(value.trim(), formatDate).isValid() ||
            moment(value.trim()).isValid()
          ) {
            return moment(value.trim(), formatDate);
          }
      }
    }
  }, [value, formatDate]);

  return (
    <DatePicker
      value={valueInput}
      format={formatDate}
      locale={locale}
      {...props}
    />
  );
};

export default AntDatePicker;

AntDatePicker.propTypes = {
  pickerType: PropTypes.string,
};
