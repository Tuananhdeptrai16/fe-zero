import React from 'react';
import { Divider, Typography } from 'antd';
import FormContent from 'src/@crema/component/FormContent';
import AppCard from 'src/@crema/core/AppCard';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import { Button, Space } from 'antd';

const { Title } = Typography;

const FormatType = [
  { label: 'csv', value: 'csv' },
  { label: 'json', value: 'json' },
  { label: 'excel', value: 'excel' },
];

const StorageProvide = [
  { label: 'HTTPS: Public Web', value: 'HTTPS: Public Web' },
  { label: 'S3: Amazon Web Services', value: 'S3: Amazon Web Services' },
];

const Setting = () => {
  return (
    <>
      <div style={{ padding: '15px' }}>
        <AppCard>
          <Title level={3}>Cài đặt nguồn</Title>
          <Divider />
          <FormContent
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
            }}>
            <FormInput name='Source_name' label='Tên nguồn' />
          </FormContent>
        </AppCard>
      </div>
      <div style={{ padding: '15px' }}>
        <AppCard>
          <FormContent
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
            }}>
            <FormInput name='user_name' label='Tên tập dữ liệu' />
            <FormSelect
              name='file'
              label='Tệp định dạng'
              options={FormatType}
              required
            />
            <FormSelect
              name='name'
              label='Nhà cung cấp lưu trữ'
              options={StorageProvide}
            />
            <FormInput name='url' label='URL' />
          </FormContent>
        </AppCard>
        <Space style={{ marginTop: '15px', float: 'right' }}>
          <Button type='primary' danger style={{ marginRight: '15px' }}>
            Xóa Nguồn
          </Button>

          <Button type='primary'>Cập nhật</Button>
        </Space>
      </div>
    </>
  );
};
export default Setting;
