import React from 'react';
import PropTypes from 'prop-types';
import FormDateRangePicker from 'src/@crema/core/Form/FormDateRangePicker';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormInputNumberRange from 'src/@crema/core/Form/FormInputNumberRange';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import FormSelectAsync from 'src/@crema/core/Form/FormSelectAsync';
import FormSlider from 'src/@crema/core/Form/FormSlider';
import { FILTER_TYPE } from 'src/shared/constants/DataTable';
import moment from 'moment/moment';
import FormSelectProvince from 'src/@crema/core/Form/FormSelectProvince';
import FormSelectArea from 'src/@crema/core/Form/FormSelectArea';

const FilterItem = ({
  type,
  layout,
  name,
  label,
  placeholder,
  size = 'middle',
  ...attrs
}) => {
  const disabledDate = (current) => {
    // Can not select days after today
    return current && current > moment().endOf('day');
  };

  switch (type) {
    case FILTER_TYPE.DATE:
    case FILTER_TYPE.RANGE_DATE_PICKER:
      return (
        <FormDateRangePicker
          name={name}
          size={size}
          label={label}
          layout={layout}
          disabledDate={disabledDate}
          {...attrs}
        />
      );
    case FILTER_TYPE.SELECT_AREA:
      return (
        <FormSelectArea
          allowClear
          name={name}
          size={size}
          label={label}
          layout={layout}
          {...attrs}
        />
      );
    case FILTER_TYPE.SELECT_PROVINCE:
      return (
        <FormSelectProvince
          allowClear
          name={name}
          size={size}
          label={label}
          layout={layout}
          {...attrs}
        />
      );
    case FILTER_TYPE.SELECT:
      return (
        <FormSelect
          allowClear
          name={name}
          size={size}
          label={label}
          layout={layout}
          {...attrs}
        />
      );
    case FILTER_TYPE.SELECT_ASYNC:
      return (
        <FormSelectAsync
          allowClear
          name={name}
          size={size}
          label={label}
          layout={layout}
          {...attrs}
        />
      );
    case FILTER_TYPE.PERCENT:
      return (
        <FormInputNumberRange
          name={name}
          size={size}
          label={label}
          layout={layout}
          {...attrs}
          suffix='%'
          placeholderMin='0'
          placeholderMax='100'
          rules={{ percent_range: [{ value: 0 }, { value: 100 }] }}
        />
      );
    case FILTER_TYPE.NUMBER:
      return (
        <FormInputNumberRange
          name={name}
          size={size}
          label={label}
          layout={layout}
          {...attrs}
        />
      );
    case FILTER_TYPE.SLIDER:
      return (
        <FormSlider
          name={name}
          size={size}
          label={label}
          layout={layout}
          {...attrs}
        />
      );
    case FILTER_TYPE.TEXT:
    default:
      return (
        <FormInput
          name={name}
          size={size}
          label={label}
          layout={layout}
          placeholder={placeholder}
          {...attrs}
        />
      );
  }
};

FilterItem.propTypes = {
  type: PropTypes.string.isRequired,
  layout: PropTypes.object,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  label: PropTypes.string,
};

FilterItem.defaultProps = {};

export default FilterItem;
