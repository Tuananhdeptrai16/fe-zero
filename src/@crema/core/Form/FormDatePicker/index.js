import { Form } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import AntDatePicker from 'src/@crema/component/AntDatePicker';
import { injectRules } from 'src/validate';

const FormDatePicker = (props) => {
  const { required, name, label, placeholder, rules, layout, ...attrs } = props;

  const { messages, formatMessage } = useIntl();
  const labelShow = messages[label] || label;

  return (
    <Form.Item
      name={name}
      label={labelShow}
      {...layout}
      rules={injectRules({ required, labelShow, rules, formatMessage })}>
      <AntDatePicker
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

FormDatePicker.propTypes = {
  required: PropTypes.bool,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  rules: PropTypes.object,
};

FormDatePicker.defaultProps = {};

export default FormDatePicker;
