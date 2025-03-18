import React from 'react';
import FormInput from 'src/@crema/core/Form/FormInput/index';
import FormInputByType from 'src/@crema/core/Form/FormInputByType';
import { Form } from 'antd';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import { TYPE_SETTING_SYSTEM } from 'src/shared/constants/SettingSystem';

const SystemSettingForm = ({ isEdit }) => {
  const type = Form.useWatch('type');
  return (
    <div>
      <FormInput label='table.name' name='description' />

      <FormInput
        disabled={isEdit}
        label='table.systemSettingName'
        required
        name='name'
      />
      <FormSelect
        options={TYPE_SETTING_SYSTEM}
        disabled={isEdit}
        label='table.systemSettingType'
        required
        name='type'
      />
      <FormInputByType
        label='table.systemSettingValue'
        type={type}
        required
        preview={{
          width: 300,
          height: 200,
        }}
        name='value'
      />
    </div>
  );
};

export default SystemSettingForm;
