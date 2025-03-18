import React from 'react';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import API from 'src/@crema/services/apis';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';

export const FormSelectDocumentType = ({
  name = 'document_type',
  label = 'table.documentType',
}) => {
  return (
    <FormSelect
      name={name}
      label={label}
      fieldNames={{ label: 'display_name', value: 'id' }}
      configFetch={{
        url: API.SELECT_DOCUMENT_TYPE,
        method: METHOD_FETCH.POST,
        body: {
          pageable: { page_size: 1000 },
        },
      }}
    />
  );
};
