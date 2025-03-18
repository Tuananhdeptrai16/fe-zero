import React from 'react';
import API from 'src/@crema/services/apis';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import FormSelectAsync from 'src/@crema/core/Form/FormSelectAsync';

const FormChangeDocumentType = () => {
  return (
    <div>
      <FormSelectAsync
        label='table.documentType'
        name='document_template'
        fieldNames={{ label: 'name', value: 'id' }}
        configFetch={{
          url: API.SELECT_DOCUMENT_TEMPLATE,
          method: METHOD_FETCH.POST,
          body: {
            keyword: null,
            page: 1,
          },
        }}
        returnObject
        required
      />
    </div>
  );
};

FormChangeDocumentType.propTypes = {};

FormChangeDocumentType.defaultProps = {};

export default FormChangeDocumentType;
