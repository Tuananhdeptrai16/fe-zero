import moment from 'moment';

export const DAY_SELECT = [
  {
    value: 'Mon',
    text: 'T2',
  },

  {
    value: 'Tue',
    text: 'T3',
  },
  {
    value: 'Wed',
    text: 'T4',
  },
  {
    value: 'Thu',
    text: 'T5',
  },
  {
    value: 'Fri',
    text: 'T6',
  },
  {
    value: 'Sat',
    text: 'T7',
  },
  {
    value: 'Sun',
    text: 'CN',
  },
];

export const FREQUENCY_SELECT = [
  {
    value: 'month',
    text: 'Tháng',
  },
  {
    value: 'week',
    text: 'Tuần',
  },
  {
    value: 'day',
    text: 'Ngày',
  },
];
export const DATE_RANGE_FUTURE = [
  {
    label: 'Tuần này',
    getDateRange: () => [
      moment().startOf('week').toDate(),
      moment().endOf('week').toDate(),
    ],
  },
  {
    label: 'Tuần trước',
    getDateRange: () => [
      moment().subtract(1, 'week').startOf('week').toDate(),
      moment().subtract(1, 'week').endOf('week').toDate(),
    ],
  },
  {
    label: 'Tháng này',
    getDateRange: () => [
      moment().startOf('month').toDate(),
      moment().endOf('month').toDate(),
    ],
  },
  {
    label: 'Tháng trước',
    getDateRange: () => [
      moment().subtract(1, 'month').startOf('month').toDate(),
      moment().subtract(1, 'month').endOf('month').toDate(),
    ],
  },
  {
    label: 'Một tuần',
    getDateRange: () => [moment().toDate(), moment().add(6, 'days').toDate()],
  },
  {
    label: 'Hai tuần',
    getDateRange: () => [moment().toDate(), moment().add(13, 'days').toDate()],
  },
  {
    label: 'Một tháng',
    getDateRange: () => [moment().toDate(), moment().add(29, 'days').toDate()],
  },
  {
    label: 'Ba tháng',
    getDateRange: () => [moment().toDate(), moment().add(89, 'days').toDate()],
  },
  {
    label: 'Đến hết tuần',
    getDateRange: () => [moment().toDate(), moment().endOf('week').toDate()],
  },
  {
    label: 'Đến hết tháng',
    getDateRange: () => [moment().toDate(), moment().endOf('month').toDate()],
  },
];
