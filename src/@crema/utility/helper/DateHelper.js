import moment from 'moment';
import { DATE } from 'src/shared/constants/Format';

export const getFormattedDateTime = (
  value = 0,
  unit = 'days',
  format = 'YYYY-MM-DD',
) => {
  if (value === 0) {
    return moment().format(format);
  } else {
    return moment().add(value, unit).format(format);
  }
};

export const getTimeFromNow = (date) => {
  const timestamp = moment(date).format('X');
  const newDate = moment.unix(timestamp);
  return moment(newDate).fromNow();
};

export const getFormattedTime = (date, format = DATE) => {
  return moment(date).format(format);
};

export const getDateTimeToMoment = (amount, unit) => {
  return moment().subtract(amount, unit).valueOf();
};
