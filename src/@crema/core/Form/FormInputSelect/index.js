import React from 'react';
import { Form } from 'antd';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { injectRules } from 'src/validate';
import InputSelect from '../../../component/InputSelect';
const FormInputSelect = (props) => {
  const { required, name, label, rules, ...attrs } = props;

  const { messages, formatMessage } = useIntl();
  const labelShow = messages[label] || label;
  return (
    <Form.Item
      name={name}
      label={labelShow}
      rules={injectRules({ required, labelShow, rules, formatMessage })}>
      <InputSelect {...attrs} />
    </Form.Item>
  );
};

FormInputSelect.propTypes = {
  required: PropTypes.bool,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  label: PropTypes.string,
  rules: PropTypes.object,
};

FormInputSelect.defaultProps = {};

export default FormInputSelect;
