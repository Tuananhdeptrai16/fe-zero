import React from 'react';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormList from 'src/@crema/core/Form/FormList';
import { Form } from 'antd';
import FormCheckbox from 'src/@crema/core/Form/FormCheckbox';
import TemplateServiceParamsField from './TemplateServiceParamsField';

export const FormSettingServiceParams = () => {
  const configTemplate = Form.useWatch('config_template') || [];
  const configObjectTemplate = Form.useWatch('object_template') || [];

  return (
    <div>
      <FormInput label='table.formTemplateName' name='name' required disabled />
      <FormInput
        name={['organization', 'id']}
        layout={{ style: { display: 'none' } }}
      />
      <FormInput
        label='table.organization'
        name={['organization', 'display_name']}
        required
        disabled
      />
      <FormInput
        name={['document_type', 'id']}
        layout={{ style: { display: 'none' } }}
      />
      <FormInput
        label='table.documentType'
        name={['document_type', 'display_name']}
        required
        disabled
      />
      <FormList
        name='config_template'
        label='table.configTemplate'
        required
        disabledAction
        renderFormItemTitle={({ name, index }) => {
          return (
            <div className='ant-d-flex ant-align-center'>
              <span>Trường dữ liệu {index + 1}</span>
              <span className='mx-3'>-</span>
              <FormCheckbox
                name={[name, 'required']}
                layout={{
                  className: 'ant-form-item-horizontal',
                  wrapperCol: { span: 8 },
                  labelCol: { span: 16 },
                  style: {
                    display: 'inline-block',
                    width: 100,
                    margin: 0,
                  },
                }}
                label={'Bắt buộc'}
                disabled
              />
            </div>
          );
        }}
        renderFormItem={(params) => (
          <TemplateServiceParamsField
            {...params}
            nameList={'config_template'}
            configTemplate={configTemplate}
          />
        )}
      />
      {configObjectTemplate && configObjectTemplate.length > 0 && (
        <FormList
          disabledAction
          name='object_template'
          label='table.configTemplateObject'
          renderFormItemTitle={({ name, index }) => {
            return (
              <div className='ant-d-flex ant-align-center'>
                <span>Trường dữ liệu {index + 1}</span>
                <span className='mx-3'>-</span>
                <FormCheckbox
                  name={[name, 'required']}
                  layout={{
                    className: 'ant-form-item-horizontal',
                    wrapperCol: { span: 8 },
                    labelCol: { span: 16 },
                    style: {
                      display: 'inline-block',
                      width: 100,
                      margin: 0,
                    },
                  }}
                  label={'Bắt buộc'}
                  disabled
                />
              </div>
            );
          }}
          renderFormItem={(params) => (
            <TemplateServiceParamsField
              {...params}
              nameList={'object_template'}
              configTemplate={configObjectTemplate}
            />
          )}
        />
      )}
    </div>
  );
};
