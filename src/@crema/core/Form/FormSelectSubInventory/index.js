import { Form } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import TreeSubInventory from '../../../component/TreeSubInventory';
import { injectRules } from 'src/validate';

const FormSelectSubInventory = (props) => {
  const { name, label, layout, required, rules, ...attr } = props;
  const { messages, formatMessage } = useIntl();
  const labelShow = messages[label] || label;
  return (
    <Form.Item
      rules={injectRules({ required, labelShow, rules, formatMessage })}
      name={name}
      label={labelShow}
      {...(layout || {})}>
      <TreeSubInventory {...attr} />
    </Form.Item>
  );
};

FormSelectSubInventory.defaultProps = {
  name: '',
  label: '',
  layout: {},
  required: true,
  rules: undefined,
};

FormSelectSubInventory.propTypes = {
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  label: PropTypes.string,
  layout: PropTypes.object,
  required: PropTypes.bool,
  rules: PropTypes.array,
};

export default FormSelectSubInventory;
