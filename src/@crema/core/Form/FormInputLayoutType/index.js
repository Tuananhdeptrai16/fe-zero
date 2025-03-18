import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Form } from 'antd';
import InputLayoutType from '../../../component/InputLayoutType';

const FormLayoutType = (props) => {
  const { name, label } = props;

  const { messages } = useIntl();
  const labelShow = messages[label] || label;
  return (
    <Form.Item name={name} label={labelShow}>
      <InputLayoutType />
    </Form.Item>
  );
};

FormLayoutType.propTypes = {
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  label: PropTypes.string,
};

FormLayoutType.defaultProps = {};
export default FormLayoutType;
