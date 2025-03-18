import { Form } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { injectRules } from 'src/validate';
import TextEditor from 'src/@crema/component/TextEditor';

const FormTextEditor = (props) => {
  const { required, name, label, rules, placeholder, layout, ...attrs } = props;

  const { messages, formatMessage } = useIntl();
  const labelShow = messages[label] || label;

  return (
    <Form.Item
      name={name}
      label={labelShow}
      {...layout}
      rules={injectRules({ required, labelShow, rules, formatMessage })}>
      <TextEditor
        placeholder={messages[placeholder] || placeholder}
        {...attrs}
      />
    </Form.Item>
  );
};

FormTextEditor.propTypes = {
  required: PropTypes.bool,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  label: PropTypes.string,
  rules: PropTypes.object,
  placeholder: PropTypes.string,
};

FormTextEditor.defaultProps = {};

export default FormTextEditor;
