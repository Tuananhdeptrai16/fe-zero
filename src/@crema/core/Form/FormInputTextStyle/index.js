import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import { useIntl } from 'react-intl';
import InputTextStyle from '../../../component/InputTextStyle';

const FormInputTextStyle = (props) => {
  const { name, label, ...rest } = props;
  const { messages } = useIntl();
  const labelShow = messages[label] || label;
  return (
    <Form.Item name={name} label={labelShow}>
      <InputTextStyle {...rest} />
    </Form.Item>
  );
};

FormInputTextStyle.propTypes = {
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  label: PropTypes.string,
};

FormInputTextStyle.defaultProps = {};

export default FormInputTextStyle;
