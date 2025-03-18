import React from 'react';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormList from 'src/@crema/core/Form/FormList';
import { Form } from 'antd';
import FormSelectAsync from 'src/@crema/core/Form/FormSelectAsync';
import API from 'src/@crema/services/apis';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import TemplateInputField from 'src/pageComponents/formSetting/TemplateInputField';
import FormCheckbox from 'src/@crema/core/Form/FormCheckbox';
import { FILTER_OPERATION } from 'src/shared/constants/DataTable';

export const FormSettingFormModal = ({ organizationId, groupType }) => {
  const configTemplate = Form.useWatch('config_template') || [];
  const configObjectTemplate = Form.useWatch('object_template') || [];

  const filters = [];

  if (groupType) {
    filters.push({
      name: 'group_type',
      operation: FILTER_OPERATION.EQ,
      value: groupType,
    });
  }

  return (
    <div>
      <FormInput label='table.formTemplateName' name='name' required />
      {!organizationId && (
        <FormSelectAsync
          label='table.organization'
          name='organization'
          fieldNames={{ label: 'display_name', value: 'id' }}
          configFetch={{
            url: API.SELECT_ORGANIZATION,
            method: METHOD_FETCH.POST,
            body: {
              keyword: null,
              page: 1,
            },
          }}
          required
          returnObject
        />
      )}
      <FormSelectAsync
        label='table.documentType'
        name='document_type'
        fieldNames={{ label: 'display_name', value: 'id' }}
        configFetch={{
          url: API.SELECT_DOCUMENT_TYPE,
          method: METHOD_FETCH.POST,
          body: {
            keyword: null,
            page: 1,
            filters,
          },
        }}
        required
        returnObject
      />
      <FormList
        name='config_template'
        label='table.configTemplate'
        required
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
              />
            </div>
          );
        }}
        renderFormItem={(params) => (
          <TemplateInputField
            {...params}
            nameList={'config_template'}
            configTemplate={configTemplate}
            groupType={groupType}
          />
        )}
      />
      <FormList
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
              />
            </div>
          );
        }}
        renderFormItem={(params) => (
          <TemplateInputField
            {...params}
            nameList={'object_template'}
            configTemplate={configObjectTemplate}
            groupType={groupType}
          />
        )}
      />
    </div>
  );
};
