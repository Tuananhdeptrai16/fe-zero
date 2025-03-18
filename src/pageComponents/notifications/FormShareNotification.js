import React from 'react';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormTextArea from 'src/@crema/core/Form/FormTextArea';
import FormSelectAsync from 'src/@crema/core/Form/FormSelectAsync';
import API from 'src/@crema/services/apis';

export const FormShareNotification = () => {
  return (
    <div>
      <FormInput label={'table.time'} name={'created_at'} disabled />
      <FormTextArea label={'tab.content'} name={'content'} disabled />
      <FormInput label={'table.link'} name={'link'} disabled />
      <FormSelectAsync
        name={'user_ids'}
        mode={'multiple'}
        label={'Chia sẻ đến'}
        fieldNames={{
          label: 'username',
          value: 'id',
        }}
        configFetch={{
          url: API.SELECT_USER,
          method: 'POST',
        }}
      />
    </div>
  );
};
