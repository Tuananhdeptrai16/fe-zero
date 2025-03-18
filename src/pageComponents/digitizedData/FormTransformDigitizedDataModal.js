import React from 'react';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import {
  METHOD_LIST,
  TYPE_DIGITIZED_DATA_LIST,
} from 'src/shared/constants/DataTable';
import FormTextArea from 'src/@crema/core/Form/FormTextArea';

export const FormTransformDigitizedDataModal = ({ isPushData }) => {
  return (
    <>
      <FormInput name={'name'} label={'table.name'} required />
      <FormInput
        name={'url'}
        label={'table.url'}
        rules={{ url: [] }}
        required
      />
      <FormSelect
        name={'method'}
        label={'table.method'}
        required
        options={METHOD_LIST}
      />
      {isPushData && (
        <FormSelect
          name={'type'}
          label={'table.type'}
          required
          options={TYPE_DIGITIZED_DATA_LIST}
        />
      )}
      <FormTextArea name={'config'} label={'table.config'} />
    </>
  );
};
