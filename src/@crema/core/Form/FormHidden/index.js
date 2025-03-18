import React, { useEffect } from 'react';
import { Form } from 'antd';
import PropTypes from 'prop-types';

const FormHidden = (props) => {
  const form = Form.useFormInstance();
  const name = props.name;
  const defaultValue = props.defaultValue;
  useEffect(() => {
    if (defaultValue) {
      form.setFieldValue(name, defaultValue);
    }
  }, [defaultValue]);
  return <Form.Item {...props} style={{ display: 'none' }} />;
};

FormHidden.propTypes = {
  name: PropTypes.string,
  defaultValue: PropTypes.string,
};

FormHidden.defaultProps = {};

export default FormHidden;
