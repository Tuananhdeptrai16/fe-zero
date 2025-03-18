import React from 'react';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import { GROUP_TYPES } from 'src/shared/constants/DataSelect';

export const FormDocumentTypeModal = () => {
  return (
    <div>
      <FormInput label='table.documentTypeCode' name='name' required />
      <FormInput label='table.documentTypeName' name='display_name' required />
      <FormSelect
        label='table.documentType'
        name={'group_type'}
        options={GROUP_TYPES}
      />
    </div>
  );
};
