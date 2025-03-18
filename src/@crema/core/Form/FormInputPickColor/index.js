import { Form } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';
import InputPickColor from '../../../component/InputPickColor';

const FormInputPickColor = (props) => {
  const { name, label } = props;

  const { messages } = useIntl();
  const labelShow = messages[label] || label;
  return (
    <Form.Item name={name} label={labelShow}>
      <InputPickColor />
    </Form.Item>
  );
};

FormInputPickColor.propTypes = {
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  label: PropTypes.string,
};

FormInputPickColor.defaultProps = {};

export default FormInputPickColor;
