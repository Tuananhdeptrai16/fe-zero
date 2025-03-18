import React from 'react';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import { METHOD_LIST } from 'src/shared/constants/DataTable';
import FormInputSecret from 'src/@crema/component/FormInputSecret';

export const FormConnectApiModal = ({ isPushApi }) => {
  return (
    <>
      <FormInput name={'name'} label={'table.name'} required />
      {isPushApi && (
        <>
          <FormInput
            name={'url'}
            label={'table.url'}
            required
            rules={{ url: [] }}
          />
          <FormSelect
            name={'method'}
            label={'table.method'}
            required
            options={METHOD_LIST}
          />
          <FormInput name={'client_id'} label={'table.clientId'} required />
        </>
      )}
      <FormInputSecret
        name={'client_secret'}
        label={'table.clientSecret'}
        required
      />
    </>
  );
};
