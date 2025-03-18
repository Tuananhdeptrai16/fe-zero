import { Form } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { injectRules } from 'src/validate';
import AntInputPassword from 'src/@crema/component/AntInputPassword';

const FormInputPassword = (props) => {
  const {
    required,
    name,
    label,
    placeholder,
    rules,
    layout = {},
    tooltip,
    ...attrs
  } = props;

  const { messages, formatMessage } = useIntl();
  const labelShow = messages[label] || label;
  const placeholderShow =
    messages[placeholder] ||
    placeholder ||
    messages['input.placeholder.input'] + labelShow.toLowerCase();

  return (
    <Form.Item
      name={name}
      tooltip={tooltip}
      label={labelShow}
      rules={injectRules({ required, labelShow, rules, formatMessage })}
      {...layout}>
      <AntInputPassword
        placeholder={placeholderShow}
        style={{ width: '100%' }}
        {...attrs}
      />
    </Form.Item>
  );
};

FormInputPassword.propTypes = {
  required: PropTypes.bool,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  layout: PropTypes.object,
  rules: PropTypes.object,
};

FormInputPassword.defaultProps = {};

export default FormInputPassword;
