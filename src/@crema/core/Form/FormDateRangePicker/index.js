import { Form } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import AntDateRangePicker from 'src/@crema/component/AntDateRangePicker';
import { injectRules } from 'src/validate';

const FormDateRangePicker = (props) => {
  const { required, name, label, placeholder, rules, layout, ...attrs } = props;

  const { messages, formatMessage } = useIntl();
  const labelShow = messages[label] || label;

  return (
    <Form.Item
      name={name}
      label={labelShow}
      {...layout}
      rules={injectRules({ required, labelShow, rules, formatMessage })}>
      <AntDateRangePicker
        placeholder={messages[placeholder] || placeholder}
        style={{ width: '100%' }}
        {...attrs}
      />
    </Form.Item>
  );
};

FormDateRangePicker.propTypes = {
  required: PropTypes.bool,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  rules: PropTypes.object,
  layout: PropTypes.object,
};

FormDateRangePicker.defaultProps = {};

export default FormDateRangePicker;
