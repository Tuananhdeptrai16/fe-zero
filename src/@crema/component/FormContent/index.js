import React, { forwardRef, useImperativeHandle } from 'react';
import { Form } from 'antd';
import { handleRedundantData } from 'src/shared/utils/Object';
const FormContent = forwardRef((props, ref) => {
  const { initialValues, layout, children, onFinish: onSave, ...attrs } = props;
  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    setFields: (fields) => form.setFields(fields),
    setFieldsValue: (values) => form.setFieldsValue(values),
    setFieldValue: (value) => form.setFieldValue(value),
    resetFields: (fields) => form.resetFields(fields),
    validateFields: (fields) => form.validateFields(fields),
    getFieldsValue: (nameList) => form.getFieldsValue(nameList),
    submit: () => form.submit(),
  }));

  const onSubmit = (data) => {
    const dataSave = handleRedundantData(data);

    return onSave(dataSave);
  };

  return (
    <Form
      initialValues={initialValues}
      form={form}
      layout={layout}
      onFinish={onSubmit}
      {...attrs}>
      {children}
    </Form>
  );
});

FormContent.propTypes = {};

FormContent.defaultProps = {};

export default FormContent;
