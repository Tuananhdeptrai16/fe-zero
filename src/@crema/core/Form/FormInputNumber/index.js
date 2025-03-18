import { Form } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import AntInputNumber from 'src/@crema/component/AntInputNumber';
import { injectRules } from 'src/validate';

const FormInputNumber = (props) => {
  const { required, name, label, placeholder, rules, ...attrs } = props;

  const { messages, formatMessage } = useIntl();
  const labelShow = messages[label] || label || '';
  const placeholderShow =
    messages[placeholder] ||
    placeholder ||
    (messages['input.placeholder.input'] || '') + labelShow.toLowerCase();

  return (
    <Form.Item
      name={name}
      label={labelShow}
      rules={injectRules({ required, labelShow, rules, formatMessage })}>
      <AntInputNumber
        placeholder={placeholderShow}
        style={{ width: '100%' }}
        {...attrs}
      />
    </Form.Item>
  );
};

FormInputNumber.propTypes = {
  required: PropTypes.bool,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  rules: PropTypes.object,
};

FormInputNumber.defaultProps = {};

export default FormInputNumber;
