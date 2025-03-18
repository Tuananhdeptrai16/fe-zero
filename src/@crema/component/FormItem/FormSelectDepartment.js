import React from 'react';
import FormSelectAsync from 'src/@crema/core/Form/FormSelectAsync';
import API from 'src/@crema/services/apis';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import { FILTER_OPERATION } from 'src/shared/constants/DataTable';

export const FormSelectDepartment = ({
  name,
  label = 'table.detailOrganization',
  organizationId,
  ...rest
}) => {
  return (
    <FormSelectAsync
      name={name}
      label={label}
      fieldNames={{ label: 'department_name', value: 'id' }}
      configFetch={{
        url: API.SELECT_DEPARTMENT,
        method: METHOD_FETCH.POST,
        body: {
          filters: organizationId
            ? [
                {
                  name: 'organization_id',
                  operation: FILTER_OPERATION.EQ,
                  value: organizationId,
                },
              ]
            : [],
          pageable: { page_size: 20 },
        },
      }}
      deps={[organizationId]}
      {...rest}
    />
  );
};
