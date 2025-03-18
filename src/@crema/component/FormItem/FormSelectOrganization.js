import React from 'react';
import API from 'src/@crema/services/apis';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import FormSelect from 'src/@crema/core/Form/FormSelect';

export const FormSelectOrganization = ({
  name = 'organization_id',
  label = 'Đơn vị',
  ...rest
}) => {
  return (
    <FormSelect
      name={name}
      label={label}
      fieldNames={{ label: 'display_name', value: 'id' }}
      configFetch={{
        url: API.SELECT_ORGANIZATION,
        method: METHOD_FETCH.POST,
        body: {
          pageable: { page_size: 200 },
        },
      }}
      {...rest}
    />
  );
};
