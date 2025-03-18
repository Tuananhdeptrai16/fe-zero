import React from 'react';
import { Divider, Spin, Typography } from 'antd';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import FormContent from 'src/@crema/component/FormContent';
import FormInputPassword from 'src/@crema/core/Form/FormInputPassword';
import FormTextArea from 'src/@crema/core/Form/FormTextArea';

const { Title } = Typography;

export const FormDetailApi = ({
  title,
  isLoading,
  initialValues,
  isPushData,
}) => {
  return (
    <>
      <Title level={3}>{title}</Title>
      <Divider />
      <Spin spinning={isLoading}>
        <FormContent
          initialValues={initialValues}
          disabled
          labelCol={{
            xxl: { span: 2 },
            xl: { span: 3 },
            sm: { span: 4 },
          }}
          labelAlign='left'
          wrapperCol={{
            xxl: { span: 8 },
            xl: { span: 12 },
            lg: { span: 10 },
            md: { span: 18 },
          }}
          key={initialValues?.id}>
          <FormInput name={'name'} label={'table.name'} />
          {isPushData && (
            <>
              <FormTextArea
                name={'url'}
                label={'table.url'}
                autoSize={{
                  minRows: 1,
                  maxRows: 4,
                }}
              />
              <FormSelect name={'method'} label={'table.method'} />
              <FormInput name={'client_id'} label={'table.clientId'} />
            </>
          )}
          <FormInputPassword
            name={'client_secret'}
            label={'table.clientSecret'}
          />
        </FormContent>
      </Spin>
    </>
  );
};
