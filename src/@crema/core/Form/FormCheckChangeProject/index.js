import { Form } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { injectRules } from 'src/validate';
import CheckChangeProject from 'src/@crema/component/CheckChangeProject';

const FormCheckChangeProject = (props) => {
  const { required, name, label = '', rules, layout = {}, ...attrs } = props;

  const { messages, formatMessage } = useIntl();
  const labelShow = label ? messages[label] || label : '';

  return (
    <Form.Item
      name={name}
      label={labelShow}
      rules={injectRules({ required, labelShow, rules, formatMessage })}
      {...layout}>
      <CheckChangeProject style={{ width: '100%' }} {...attrs} />
    </Form.Item>
  );
};

FormCheckChangeProject.propTypes = {
  required: PropTypes.bool,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  label: PropTypes.string,
  layout: PropTypes.object,
  rules: PropTypes.object,
};

FormCheckChangeProject.defaultProps = {};

export default FormCheckChangeProject;
