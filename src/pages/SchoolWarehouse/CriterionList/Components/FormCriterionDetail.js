// import { Col, Row } from 'antd';
import React from 'react';
import FormInput from 'src/@crema/core/Form/FormInput';
// import FormSelect from 'src/@crema/core/Form/FormSelect';
import FormSelectAsync from 'src/@crema/core/Form/FormSelectAsync';
import FormTextArea from 'src/@crema/core/Form/FormTextArea';
import API from 'src/@crema/services/apis';
// import { CLASSIFY } from 'src/shared/constants/DataSelect';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';

const FormCriterionDetail = () => {
  return (
    <>
      <FormInput
        name={'criterion_name'}
        required
        label={'table.criterionName'}
        rules={{ maxLength: [{ value: 128 }] }}
      />
      <FormTextArea
        name={'description'}
        label={'input.description'}
        rules={{ maxLength: [{ value: 255 }] }}
      />
      {/* <FormSelect
        name={'classify'}
        options={CLASSIFY}
        required
        label={'sidebar.select_columns_type'}
      /> */}
      <FormSelectAsync
        label={'sidebar.select_columns_type'}
        name={'criterion_types_id'}
        fieldNames={{ label: 'criterion_types_name', value: 'id' }}
        configFetch={{
          url: API.GET_LIST_CRITERION_TYPES,
          method: METHOD_FETCH.POST,
          body: {
            keyword: null,
            page: 1,
          },
        }}
        required
      />
      <FormInput
        name={'unit'}
        required
        label={'table.criterionUnit'}
        rules={{ maxLength: [{ value: 32 }] }}
      />
    </>
  );
};

export default FormCriterionDetail;
