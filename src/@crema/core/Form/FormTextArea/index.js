import { Form } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { injectRules } from 'src/validate';
import AntTextArea from 'src/@crema/component/AntTextArea/index';

const FormTextArea = (props) => {
  const {
    required,
    name,
    row,
    label,
    labelHidden,
    placeholder,
    rules,
    layout,
    ...attrs
  } = props;

  const { messages, formatMessage } = useIntl();
  const labelShow = messages[label] || label;
  const labelHiddenShow = messages[labelHidden] || labelHidden;

  return (
    <Form.Item
      name={name}
      label={labelShow}
      {...layout}
      rules={injectRules({
        required,
        labelShow,
        labelHidden: labelHiddenShow,
        rules,
        formatMessage,
      })}>
      <AntTextArea
        placeholder={messages[placeholder] || placeholder}
        style={{ width: '100%', height: `${row * 18}px` }}
        {...attrs}
      />
    </Form.Item>
  );
};

FormTextArea.propTypes = {
  required: PropTypes.bool,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  label: PropTypes.any,
  placeholder: PropTypes.string,
  rules: PropTypes.object,
  row: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  maxLength: PropTypes.number,
};

FormTextArea.defaultProps = { row: 6, maxLength: 500 };

export default FormTextArea;
