import React from 'react';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import { CATEGORY_TOPIC } from 'src/shared/constants/help.constant';
import FormTextEditor from 'src/@crema/core/Form/FormTextEditor';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import API from 'src/@crema/services/apis';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import { DEFAULT_PERMISSION_SELECT } from 'src/shared/constants/DataSelect';

export const FormQAModal = () => {
  const { data } = useFetch({
    url: API.GET_ALL_PERMISSIONS,
    method: METHOD_FETCH.GET,
  });

  const listPagePermission = DEFAULT_PERMISSION_SELECT(data?.result?.items);

  const formSelectOptions = [
    { id: CATEGORY_TOPIC.ALL, label: 'Tất cả' },
    ...listPagePermission,
  ];
  return (
    <div>
      <FormInput name={'name'} label={'qa.questionTitle'} required />
      <FormSelect
        name={'category_code'}
        label={'qa.topicTitle'}
        required
        options={formSelectOptions.map((item) => ({
          value: item.id,
          label: item.label,
        }))}
      />
      <FormTextEditor name={'content'} label={'qa.answerContent'} required />
    </div>
  );
};
