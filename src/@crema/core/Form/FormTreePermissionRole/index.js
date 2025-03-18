import { Form } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { injectRules } from 'src/validate';
import TreePermissionRole from 'src/@crema/component/TreePermissionRole';

const FormTreePermissionRole = (props) => {
  const { required, name, label, rules, layout = {}, ...attrs } = props;

  const { messages, formatMessage } = useIntl();
  const labelShow = messages[label] || label;

  return (
    <Form.Item
      name={name}
      label={labelShow}
      rules={injectRules({ required, labelShow, rules, formatMessage })}
      {...layout}>
      <TreePermissionRole {...attrs} />
    </Form.Item>
  );
};

FormTreePermissionRole.propTypes = {
  required: PropTypes.bool,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  label: PropTypes.string,
  layout: PropTypes.object,
  rules: PropTypes.object,
};

FormTreePermissionRole.defaultProps = {};

export default FormTreePermissionRole;
