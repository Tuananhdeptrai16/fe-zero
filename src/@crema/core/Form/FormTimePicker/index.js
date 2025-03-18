import { Form, TimePicker } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { injectRules } from 'src/validate';

const FormTimePicker = (props) => {
  const { required, name, label, placeholder, rules, layout, ...attrs } = props;

  const { messages, formatMessage } = useIntl();
  const labelShow = messages[label] || label;

  return (
    <Form.Item
      name={name}
      label={labelShow}
      {...layout}
      rules={injectRules({ required, labelShow, rules, formatMessage })}>
      <TimePicker
        placeholder={
          messages[placeholder] ||
          placeholder ||
          `Chọn ${(labelShow || '').toLocaleLowerCase()}`
        }
        style={{ width: '100%' }}
        {...attrs}
      />
    </Form.Item>
  );
};

FormTimePicker.propTypes = {
  required: PropTypes.bool,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  rules: PropTypes.object,
};

FormTimePicker.defaultProps = {};

export default FormTimePicker;
