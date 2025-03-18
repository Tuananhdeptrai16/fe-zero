import { Form } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { injectRules } from 'src/validate';
import { isEmpty } from 'src/shared/utils/Typeof';
import AntSwitch from 'src/@crema/component/AntSwitch';

const FormSwitch = (props) => {
  const {
    required,
    name,
    label,
    labelHidden,
    placeholder,
    rules,
    layout = {},
    ...attrs
  } = props;

  const { messages, formatMessage } = useIntl();
  const labelShow = messages[label] || label || '';
  const labelHiddenShow = messages[labelHidden] || labelHidden;
  const placeholderShow =
    messages[placeholder] ||
    placeholder ||
    (messages['input.placeholder.input'] || '') + labelShow.toLowerCase();
  return (
    <Form.Item
      name={name}
      label={labelShow}
      labelCol={isEmpty(labelShow) ? { span: 0 } : undefined}
      wrapperCol={isEmpty(labelShow) ? { span: 24 } : undefined}
      rules={injectRules({
        required,
        labelShow,
        labelHidden: labelHiddenShow,
        rules,
        formatMessage,
      })}
      {...layout}>
      <AntSwitch
        placeholder={placeholderShow}
        style={{ width: '100%' }}
        {...attrs}
      />
    </Form.Item>
  );
};

FormSwitch.propTypes = {
  required: PropTypes.bool,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  label: PropTypes.any,
  placeholder: PropTypes.string,
  layout: PropTypes.object,
  rules: PropTypes.object,
};

FormSwitch.defaultProps = {};

export default FormSwitch;
