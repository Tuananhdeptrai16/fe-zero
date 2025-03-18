import React from 'react';
import { useIntl } from 'react-intl';
import { Form } from 'antd';
import { injectRules } from 'src/validate';
import AntSwitch from 'src/@crema/component/AntSwitch';
import { classList } from 'src/shared/utils/ui';

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
    (messages[placeholder] ||
      placeholder ||
      messages['input.placeholder.input'] ||
      '') + labelShow.toLowerCase();

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
      {...layout}
      className={classList('input-horizontal', layout?.className)}>
      <AntSwitch placeholder={placeholderShow} {...attrs} />
    </Form.Item>
  );
};

FormSwitch.propTypes = {};

FormSwitch.defaultProps = {};

export default FormSwitch;
