import React from 'react';
import { Form } from 'antd';
import { injectRules } from 'src/validate';
import { useIntl } from 'react-intl';
import AntCheckboxGroup from 'src/@crema/component/AntCheckboxGroup';

const FormCheckboxGroup = (props) => {
  const { required, name, label, rules, layout, ...attrs } = props;

  const { messages, formatMessage } = useIntl();
  const labelShow = messages[label] || label;

  return (
    <>
      <Form.Item
        name={name}
        label={labelShow}
        {...layout}
        rules={injectRules({ required, labelShow, rules, formatMessage })}>
        <AntCheckboxGroup {...attrs} />
      </Form.Item>
    </>
  );
};

export default FormCheckboxGroup;
