import { Form } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import AntSelect from 'src/@crema/component/AntSelect';
import { injectRules } from 'src/validate';

const FormSelect = (props) => {
  const {
    required,
    name,
    label,
    labelHidden,
    placeholder,
    rules,
    layout,
    allowClear: allowClearProps = true,
    ...attrs
  } = props;

  const { messages, formatMessage } = useIntl();
  const labelShow = messages[label] || label;
  const labelHiddenShow = messages[labelHidden] || labelHidden;
  const placeholderShow =
    messages[placeholder] ||
    placeholder ||
    messages['input.placeholder.select'] + labelShow.toLowerCase();
  const allowClear = required ? false : allowClearProps;
  return (
    <Form.Item
      name={name}
      label={labelShow}
      {...layout}
      rules={injectRules({
        required,
        labelShow,
        labelHidden: labelHiddenShow,
        rules,
        formatMessage,
      })}>
      <AntSelect
        placeholder={placeholderShow}
        style={{ width: '100%' }}
        allowClear={allowClear}
        getPopupContainer={(trigger) => trigger.parentNode}
        {...attrs}
      />
    </Form.Item>
  );
};

FormSelect.propTypes = {
  required: PropTypes.bool,
  allowClear: PropTypes.bool,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  rules: PropTypes.object,
  layout: PropTypes.object,
};

FormSelect.defaultProps = {
  label: '',
};

export default FormSelect;
