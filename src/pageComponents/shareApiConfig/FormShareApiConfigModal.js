import React from 'react';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormTextArea from 'src/@crema/core/Form/FormTextArea';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import { METHOD_LIST, PLATFORMS } from 'src/shared/constants/DataTable';

export const FormShareApiConfigModal = ({ platform }) => {
  return (
    <div>
      <FormInput name={'name'} label={'table.name'} required />
      <FormTextArea name={'desc'} label={'table.description'} />
      <FormInput name={'path'} label={'Path'} required />
      <FormSelect
        name={'method'}
        label={'table.method'}
        options={METHOD_LIST}
        required
      />
      <FormSelect
        name={'platform'}
        label={'table.platform'}
        options={PLATFORMS}
        layout={{ initialValue: platform }}
        disabled={!!platform}
        required
      />
      <FormTextArea
        name='response_format'
        label={'table.response_format'}
        rules={{ json_object: [] }}
      />
      <FormTextArea
        name='errors_map'
        label={'table.errors_map'}
        rules={{ json_array_object: [] }}
      />
    </div>
  );
};
