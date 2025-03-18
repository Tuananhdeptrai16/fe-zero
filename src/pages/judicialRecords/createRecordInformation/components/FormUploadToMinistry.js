import React from 'react';
import FormInput from 'src/@crema/core/Form/FormInput';

export const FormUploadToMinistry = () => {
  return (
    <div>
      <FormInput
        name={'province_code'}
        required
        label={'judicial.province_code'}
      />
      <FormInput
        name={'ministry_code'}
        required
        label={'judicial.ministry_code'}
      />
      <FormInput name={'profile_id'} required label={'judicial.profile_id'} />
    </div>
  );
};
