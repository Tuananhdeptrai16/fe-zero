import React from 'react';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormTextArea from 'src/@crema/core/Form/FormTextArea/index';
export const FormStatusModal = () => {
  return (
    <div>
      <FormInput label='table.documentTypeCode' name='name' required />
      <FormInput label='table.documentTypeName' name='display_name' required />
      <FormTextArea label='table.description' name='description' />
    </div>
  );
};
