import React from 'react';
import { FormSelectDocumentType } from 'src/@crema/component/FormItem/FormSelectDocumentType';
import FormDatePicker from 'src/@crema/core/Form/FormDatePicker/index';
import FormInput from 'src/@crema/core/Form/FormInput/index';
import FormSelect from 'src/@crema/core/Form/FormSelect/index';

export const FormDocumentJudgmentModal = () => {
  return (
    <div>
      <FormSelectDocumentType />
      <FormInput
        label='table.documentNumber'
        name={'document_number'}
        required
      />
      <FormDatePicker
        label='table.document.publishDate'
        name={'publish_date'}
      />
      <FormSelect name={'judgment_id'} label='table.judgment' />
    </div>
  );
};
