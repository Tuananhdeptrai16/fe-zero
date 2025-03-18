import { Form } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { injectRules } from 'src/validate';
import ProjectDescChange from 'src/@crema/component/ProjectDescChange';

const FormProjectDescChange = (props) => {
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
      <ProjectDescChange options={options} {...attrs} />
    </Form.Item>
  );
};

FormProjectDescChange.propTypes = {
  required: PropTypes.bool,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  label: PropTypes.string,
  layout: PropTypes.object,
  rules: PropTypes.object,
  options: PropTypes.array,
  disabled: PropTypes.bool,
};

FormProjectDescChange.defaultProps = {};

export default FormProjectDescChange;
