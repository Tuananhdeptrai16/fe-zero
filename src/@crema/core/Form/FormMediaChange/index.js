import { Form } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { injectRules } from 'src/validate';
import MediasChange from 'src/@crema/component/MediasChange';

const FormMediaChange = (props) => {
  const {
    required,
    name,
    label,
    rules,
    options,
    layout = {},
    ...attrs
  } = props;

  const { messages, formatMessage } = useIntl();
  const labelShow = messages[label] || label;

  return (
    <Form.Item
      name={name}
      label={labelShow}
      rules={injectRules({ required, labelShow, rules, formatMessage })}
      {...layout}>
      <MediasChange options={options} {...attrs} />
    </Form.Item>
  );
};

FormMediaChange.propTypes = {
  required: PropTypes.bool,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  label: PropTypes.string,
  layout: PropTypes.object,
  rules: PropTypes.object,
  options: PropTypes.array,
  disabled: PropTypes.bool,
};

FormMediaChange.defaultProps = {};

export default FormMediaChange;
