import { Col, Typography } from 'antd';
import React from 'react';
import FormSelectAsync from 'src/@crema/core/Form/FormSelectAsync';
import API from 'src/@crema/services/apis';
import { TYPE_DATA_MARK_SCHOOL_WAREHOUSE } from 'src/shared/constants/DataFixed';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import { getDataContextAddJob } from '../..';
// import PropTypes from 'prop-types';

FormSelectDataRegion.propTypes = {};

function FormSelectDataRegion({ isReturnObject = false }) {
  const { dataCreateJob } = getDataContextAddJob();
  const { category, typeDataMark } = dataCreateJob || {};
  return (
    <>
      {typeDataMark === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.ATM && (
        <Col span={24}>
          <FormSelectAsync
            label='Chọn vùng dữ liệu trung gian'
            placeholder='Lựa chọn vùng dữ liệu trung gian'
            name={'destination_id'}
            returnObject={isReturnObject}
            fieldNames={{ label: 'display_name', value: 'id' }}
            configFetch={{
              url: API.GET_LIST_DESTINATION_AIR_BYTE,
              method: METHOD_FETCH.POST,
              body: {
                keyword: null,
                pageable: {
                  page: 1,
                  page_size: 100,
                },
                filters: [
                  {
                    name: 'category',
                    operation: 'eq',
                    value: category,
                  },
                ],
              },
            }}
            required
            renderItem={(option, index) => {
              return (
                <div key={`item-${index}`}>
                  <div>{option.display_name}</div>
                  <Typography.Text type='secondary'>
                    {option.destination_type}
                  </Typography.Text>
                </div>
              );
            }}
          />
        </Col>
      )}

      {typeDataMark === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DTM && (
        <Col span={24}>
          <FormSelectAsync
            label='Chọn vùng dữ liệu hạt nhân'
            placeholder='Lựa chọn vùng dữ liệu hạt nhân'
            name={'nuclear_region_id'}
            fieldNames={{ label: 'display_name', value: 'id' }}
            configFetch={{
              url: API.GET_SEARCH_NUCLEAR_REGION,
              method: METHOD_FETCH.POST,
              body: {
                keyword: null,
                page: 1,
              },
            }}
            required
            renderItem={(option, index) => {
              return (
                <div key={`item-${index}`}>
                  <div>{option?.display_name}</div>
                  <Typography.Text type='secondary'>
                    {option?.database}
                  </Typography.Text>
                </div>
              );
            }}
          />
        </Col>
      )}
      {typeDataMark === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.FML && (
        <Col span={24}>
          <FormSelectAsync
            label='Chọn vùng dữ liệu chuyên ngành'
            placeholder='Lựa chọn vùng dữ liệu chuyên ngành'
            name={'dtm_region_id'}
            fieldNames={{ label: 'display_name', value: 'id' }}
            configFetch={{
              url: API.GET_LIST_DATA_MARK,
              method: METHOD_FETCH.GET,
            }}
            required
            renderItem={(option, index) => {
              return (
                <div key={`item-${index}`}>
                  <div>{option?.display_name}</div>
                  <Typography.Text type='secondary'>
                    {option?.database}
                  </Typography.Text>
                </div>
              );
            }}
          />
        </Col>
      )}
    </>
  );
}

export default FormSelectDataRegion;
