import React from 'react';
import { useIntl } from 'react-intl';
import { Form } from 'antd';
import { isEmpty } from 'src/shared/utils/Typeof';
import { injectRules } from 'src/validate';

const wrapperFormItem = (Component) => {
  return (props) => {
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
        <Component
          placeholder={placeholderShow}
          style={{ width: '100%' }}
          {...attrs}
        />
      </Form.Item>
    );
  };
};

wrapperFormItem.propTypes = {};

wrapperFormItem.defaultProps = {};

export default wrapperFormItem;
