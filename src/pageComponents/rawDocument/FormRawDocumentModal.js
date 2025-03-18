import React from 'react';
import FormInput from 'src/@crema/core/Form/FormInput/index';
import FormSelect from 'src/@crema/core/Form/FormSelect/index';
import FormTextArea from 'src/@crema/core/Form/FormTextArea/index';

export const FormRawDocumentModal = () => {
  return (
    <div>
      <FormInput label='table.link' name={'link'} required />
      <FormInput label='table.rawText' name={'raw_text'} />
      <FormSelect
        label='table.documentTemplate'
        name={'document_template_id'}
      />
      <FormSelect label='table.status' name={'state'} />
      <FormSelect label='table.relateDocument' name={'related_document_id'} />
      <FormSelect label='table.verdict' name={'verdict_number'} />
      <FormSelect label={'table.citizen'} name={'citizen_id'} />
      <FormTextArea label='table.contentJson' name={'content'} />
      <FormSelect label='table.documentType' name={'document_type_id'} />
      <FormSelect label='table.approveBy' name={'owner_id'} />
    </div>
  );
};
