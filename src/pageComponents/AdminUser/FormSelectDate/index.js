import React, { useEffect } from 'react';
import FormDateRangePicker from 'src/@crema/core/Form/FormDateRangePicker/index';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import API from 'src/@crema/services/apis';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Form } from 'antd';
import AntSpin from 'src/@crema/component/AntSpin/index';
const FormSelectData = ({ id }) => {
  const form = Form.useFormInstance();

  const { isLoading, data } = useFetch({
    url: API.ADMIN_USER_GET_REPORT_TIME_RANGE,
    method: METHOD_FETCH.POST,
    body: {
      id: id,
    },
  });

  useEffect(() => {
    if (!isLoading && data) {
      const { start_time, end_time } = data?.data || {};
      if (start_time && end_time) {
        form.setFieldValue('time_range', [
          moment(start_time),
          moment(end_time),
        ]);
      }
    }
  }, [isLoading, data, form]);

  return (
    <AntSpin delay={100} spinning={isLoading && !data}>
      <FormDateRangePicker name='time_range' label='confirm.labelDataAccess' />
    </AntSpin>
  );
};

FormSelectData.propTypes = {
  id: PropTypes.number,
};

export default FormSelectData;
