import { Form } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { injectRules } from 'src/validate';
import AntInput from 'src/@crema/component/AntInput';

const FormDateText = (props) => {
  const {
    required,
    name,
    label,
    labelHidden,
    rules,
    layout = {},
    ...attrs
  } = props;

  const { messages, formatMessage } = useIntl();
  const labelShow = messages[label] || label || '';
  const labelHiddenShow = messages[labelHidden] || labelHidden;

  return (
    <Form.Item
      name={name}
      label={labelShow}
      rules={injectRules({
        required,
        labelShow,
        labelHidden: labelHiddenShow,
        rules,
        formatMessage,
      })}
      {...layout}>
      <AntInput style={{ width: '100%' }} placeholder='DD/MM/YYYY' {...attrs} />
    </Form.Item>
  );
};

FormDateText.propTypes = {
  required: PropTypes.bool,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  layout: PropTypes.object,
  rules: PropTypes.object,
};

FormDateText.defaultProps = {};

export default FormDateText;
