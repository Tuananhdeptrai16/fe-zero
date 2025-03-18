import React, { useEffect } from 'react';
import FormSelectAsync from 'src/@crema/core/Form/FormSelectAsync/index';
import PropTypes from 'prop-types';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import API from 'src/@crema/services/apis/index';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import { Form } from 'antd';
import AntSpin from 'src/@crema/component/AntSpin/index';
const FormConfigDataAccess = ({ id }) => {
  const form = Form.useFormInstance();

  const { isLoading, data } = useFetch({
    url: API.ADMIN_USER_GET_ACCESS_DATA,
    method: METHOD_FETCH.POST,
    body: {
      id: id,
    },
  });

  useEffect(() => {
    if (!isLoading && data) {
      form.setFieldValue(
        'cat_ids',
        data?.cat_ids?.map((cat_id) => cat_id?.id) || [],
      );
      form.setFieldValue(
        'brandname_ids',
        data?.brandnames?.map((brandname) => brandname?.id) || [],
      );
    }
  }, [isLoading, data, form]);

  return (
    <AntSpin delay={100} spinning={isLoading && !data}>
      <FormSelectAsync
        label='Lĩnh vực hoạt động'
        name='cat_ids'
        mode='multiple'
        fieldNames={{ label: 'name', value: 'id' }}
        configFetch={{
          url: API.BUSINESS_ACTIVITY_SELECT,
          method: METHOD_FETCH.POST,
          body: {
            keyword: null,
            page: 1,
          },
        }}
      />
      <FormSelectAsync
        label='Brandname'
        name='brandname_ids'
        mode='multiple'
        fieldNames={{ label: 'name', value: 'id' }}
        configFetch={{
          url: API.BRAND_NAME_SELECT,
          method: METHOD_FETCH.POST,
          body: {
            custom_cat_id: data?.cat_ids?.map((cat_id) => cat_id.id) || [],
            keyword: null,
            page: 1,
          },
        }}
        deps={[data]}
      />
    </AntSpin>
  );
};

export default FormConfigDataAccess;

FormConfigDataAccess.propTypes = {
  id: PropTypes.number,
};
