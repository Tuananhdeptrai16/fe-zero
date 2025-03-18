import React from 'react';
import { Form } from 'antd';
import FormInput from 'src/@crema/core/Form/FormInput/index';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import {
  REPLICATION_FREQUENCY,
  SCHEDULE_TYPES,
} from 'src/shared/constants/DataSelect';

export const FormConfigureScheduling = () => {
  const scheduleType = Form.useWatch('schedule_type');
  return (
    <div>
      <FormSelect
        label='Chế độ lập lịch'
        name={'schedule_type'}
        options={SCHEDULE_TYPES}
        required
      />
      {scheduleType === 'basic' && (
        <>
          <FormSelect
            label='Thời gian lập lịch'
            name={'replication_frequency'}
            options={REPLICATION_FREQUENCY}
            required
          />
        </>
      )}
      {scheduleType === 'cron' && (
        <>
          <FormInput
            label='Biểu thức cron'
            name={'cron_expression'}
            required
            rules={{ maxLength: [{ value: 64 }], cron: [] }}
          />
        </>
      )}
    </div>
  );
};
