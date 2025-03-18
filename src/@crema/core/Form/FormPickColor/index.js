import { Form } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';
import BasicPickColor from '../../../component/BasicPickColor';
import './form-pick-color.styles.less';
const FormPickColor = (props) => {
  const { name, label, ...attrs } = props;

  const { messages } = useIntl();
  const labelShow = messages[label] || label;
  return (
    <Form.Item name={name} label={labelShow}>
      <BasicPickColor {...attrs} className='form-pick-color-picker-container' />
    </Form.Item>
  );
};

FormPickColor.propTypes = {
  required: PropTypes.bool,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  label: PropTypes.string,
  rules: PropTypes.object,
};

FormPickColor.defaultProps = {};

export default FormPickColor;
