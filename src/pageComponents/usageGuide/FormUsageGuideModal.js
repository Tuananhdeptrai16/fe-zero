import React from 'react';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import FormTextEditor from 'src/@crema/core/Form/FormTextEditor';
import API from 'src/@crema/services/apis';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import { DEFAULT_PERMISSION_SELECT } from 'src/shared/constants/DataSelect';

export const FormUsageGuideModal = () => {
  const { data } = useFetch({
    url: API.GET_ALL_PERMISSIONS,
    method: METHOD_FETCH.GET,
  });
  const listPagePermission =
    DEFAULT_PERMISSION_SELECT(data?.result?.items) || [];

  return (
    <div>
      <FormInput name={'display_name'} label={'table.name'} required />
      <FormSelect
        name={'page_name'}
        label={'usage.page'}
        required
        options={listPagePermission.map((item) => ({
          label: item.label,
          value: item.id,
        }))}
      />
      <FormTextEditor name={'content'} label={'table.contentName'} required />
    </div>
  );
};
