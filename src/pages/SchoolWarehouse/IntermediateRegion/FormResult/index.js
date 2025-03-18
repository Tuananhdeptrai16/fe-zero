import { Col, Form, Row, Typography } from 'antd';
import React from 'react';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import FormSelectAsync from 'src/@crema/core/Form/FormSelectAsync';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import API from 'src/@crema/services/apis';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import { isEmpty } from 'src/shared/utils/Typeof';
// import PropTypes from 'prop-types';

FormResult.propTypes = {};

function FormResult({ idOrganization }) {
  const form = Form.useFormInstance();
  const watchTypeDestinationId = Form.useWatch('destination_id', form) || '';
  // get list table destination
  const { data } = useFetch(
    {
      enabled: !isEmpty(watchTypeDestinationId),
      method: METHOD_FETCH.GET,
      url: API.GET_LIST_TABLE_DESTINATION(watchTypeDestinationId),
    },
    [watchTypeDestinationId],
  );

  const listTableByDestination = data?.result?.tables || [];
  const optionsTableRender = listTableByDestination?.map((item) => {
    return {
      label: item?.table_name,
      value: item?.table_name,
    };
  });
  return (
    <Row gutter={[12, 12]}>
      <Col span={8}>
        <FormSelectAsync
          label='Chọn vùng dữ liệu trung gian'
          name={'destination_id'}
          fieldNames={{ label: 'name', value: 'destination_id' }}
          configFetch={{
            url: API.GET_LIST_DESTINATION_AIR_BYTE,
            method: METHOD_FETCH.POST,
            body: {
              keyword: null,
              pageable: {
                page: 1,
                page_size: 100,
              },
              organization_id: idOrganization,
            },
          }}
          required
          renderItem={(option, index) => {
            return (
              <div key={`item-${index}`}>
                <div>{option.name}</div>
                <Typography.Text type='secondary'>
                  {option.destination_name}
                </Typography.Text>
              </div>
            );
          }}
        />
      </Col>
      <Col span={8}>
        <FormSelect
          label='Chọn bảng'
          name={'table_name'}
          options={optionsTableRender}
          required
        />
      </Col>
    </Row>
  );
}

export default FormResult;
