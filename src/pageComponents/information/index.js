import React from 'react';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormTextArea from 'src/@crema/core/Form/FormTextArea/index';

export const FormInformationModal = () => {
  return (
    <div>
      <FormInput label='table.informationCode' name='code' required />
      <FormInput label='table.informationName' name='name' required />
      <FormInput
        label='table.informationDisplayName'
        name='display_name'
        required
      />
      <FormTextArea label='table.description' name='description' />
    </div>
  );
};
