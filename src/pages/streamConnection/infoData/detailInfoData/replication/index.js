import React from 'react';
import { Divider, Typography } from 'antd';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import FormContent from 'src/@crema/component/FormContent';
import AppCard from 'src/@crema/core/AppCard';

const { Title } = Typography;

const GROUP_TYPES = [
  { label: 'Lên kế hoạch', value: 'Lên kế hoạch' },
  { label: 'Thủ công', value: 'Thủ công' },
  { label: 'Cron', value: 'Cron' },
];

const Replication = () => {
  return (
    <AppCard>
      <Title level={3}>Cấu hình</Title>
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
        <>
          <FormSelect
            name='Schedule'
            label='Loại lịch trình'
            options={GROUP_TYPES}
          />
          <FormSelect name={'frequency'} label='Tần số sao chép' />
          <FormSelect name={'method'} label='Không gian tên đích' />
          <FormSelect name={'method'} label='Tiền tố luồng đích' />
          <FormSelect
            name={'method'}
            label='Phát hiện và tuyên truyền các thay đổi lược đồ'
          />
        </>
      </FormContent>
    </AppCard>
  );
};
export default Replication;
