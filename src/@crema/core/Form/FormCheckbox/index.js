import AntCheckbox from 'src/@crema/component/AntCheckbox';
import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { injectRules } from 'src/validate';
import { Form } from 'antd';

const FormCheckbox = (props) => {
  const {
    required,
    name,
    label,
    rules,
    layout = {},
    defaultChecked,
    ...attrs
  } = props;

  const { messages, formatMessage } = useIntl();
  const labelShow = messages[label] || label;

  return (
    <Form.Item
      name={name}
      label={labelShow}
      valuePropName={'checked'}
      initialValue={defaultChecked ? true : false}
      rules={injectRules({ required, labelShow, rules, formatMessage })}
      {...layout}>
      <AntCheckbox style={{ width: '100%' }} {...attrs} />
    </Form.Item>
  );
};

FormCheckbox.propTypes = {
  required: PropTypes.bool,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  label: PropTypes.string,
  rules: PropTypes.object,
  layout: PropTypes.object,
};

FormCheckbox.defaultProps = {};

export default FormCheckbox;
