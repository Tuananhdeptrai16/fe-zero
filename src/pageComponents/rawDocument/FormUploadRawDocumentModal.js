import React from 'react';
import FormAntUploadFile from 'src/@crema/core/Form/FormAntUploadFile';
import API from 'src/@crema/services/apis';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import FormSelectAsync from 'src/@crema/core/Form/FormSelectAsync';
import { DOCUMENT_EXTENSION } from 'src/shared/constants/FileExtension';

export const FormUploadRawDocumentModal = () => {
  return (
    <div>
      <FormAntUploadFile
        name='link'
        labelHidden={'Tệp hồ sơ'}
        multiple={false}
        accept={DOCUMENT_EXTENSION}
        maxSize={20}
        required
      />
      <FormSelectAsync
        label='table.documentType'
        name='document_template_id'
        fieldNames={{ label: 'name', value: 'id' }}
        configFetch={{
          url: API.SELECT_DOCUMENT_TEMPLATE,
          method: METHOD_FETCH.POST,
          body: {
            keyword: null,
            page: 1,
          },
        }}
        required
      />
    </div>
  );
};
