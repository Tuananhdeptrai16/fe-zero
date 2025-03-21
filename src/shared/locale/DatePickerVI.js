// import _extends from "@babel/runtime/helpers/esm/extends";
import _extends from '@babel/runtime/helpers/extends';
import CalendarLocale from 'rc-picker/es/locale/vi_VN';
import TimePickerLocale from 'antd/es/time-picker/locale/vi_VN';

// Merge into a locale object
const locale = {
  lang: _extends(
    {
      placeholder: 'Chọn thời điểm',
      rangePlaceholder: ['Ngày bắt đầu', 'Ngày kết thúc'],
    },
    CalendarLocale,
  ),
  timePickerLocale: _extends({}, TimePickerLocale),
};
// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json
export default locale;
