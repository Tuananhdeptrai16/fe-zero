import { Col, Form, Row, Typography } from 'antd';
import React, { useEffect } from 'react';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import FormSelectAsync from 'src/@crema/core/Form/FormSelectAsync';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import API from 'src/@crema/services/apis';
import { SCHEDULE_DATA_AGGREGATION_AUTO } from 'src/shared/constants/DataSelect';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import { isEmpty } from 'src/shared/utils/Typeof';
import clsx from 'clsx';
import style from './FormSynthesisMechanism.module.scss';
import PropTypes from 'prop-types';

FormSynthesisMechanism.propTypes = {
  idOrganization: PropTypes.number,
  isUpdate: PropTypes.bool,
};

function FormSynthesisMechanism({ isUpdate = false }) {
  const form = Form.useFormInstance();
  const TRANSFORM_TABLE = 'transform_table';
  const watchTypeDestinationId = Form.useWatch('destination_id', form) || '';
  const watchNameSourceTable =
    Form.useWatch([TRANSFORM_TABLE, 'source_table'], form) || '';

  useEffect(() => {
    form.setFieldValue('intermediate', watchNameSourceTable);
  }, [watchNameSourceTable, form]);

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
      <Col span={isUpdate ? 24 : 12}>
        <FormInput name={'job_name'} label={'Tên job'} required />
      </Col>
      <Col span={isUpdate ? 24 : 12}>
        <FormSelect
          label='Lịch tổng hợp dữ liệu'
          name={'unit'}
          options={SCHEDULE_DATA_AGGREGATION_AUTO}
          required
        />
      </Col>
      <Col span={24}>
        <FormSelectAsync
          disabled={isUpdate}
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
      <Col span={24}>
        <FormSelect
          label='Chọn bảng'
          name={[TRANSFORM_TABLE, 'source_table']}
          options={optionsTableRender}
          disabled={isUpdate || isEmpty(optionsTableRender)}
          required
        />
      </Col>
      <Col span={24}>
        <FormSelectAsync
          label='Chọn vùng dữ liệu hạt nhân'
          name={'nuclear_region_id'}
          fieldNames={{ label: 'display_name', value: 'id' }}
          configFetch={{
            url: API.GET_LIST_NUCLEAR_REGION,
            method: METHOD_FETCH.GET,
          }}
          required
          disabled={isUpdate}
        />
      </Col>

      <Col span={24}>
        <div className={clsx(style.wrapNuclearRegion)}>
          <Row gutter={[12, 12]}>
            <Col className={clsx(style.columnItem)} span={12}>
              <FormInput
                name={'intermediate'}
                label='Vùng trung gian'
                disabled
              />
            </Col>
            <Col className={clsx(style.columnItem)} span={12}>
              <FormInput
                required
                label='Vùng hạt nhân'
                name={[TRANSFORM_TABLE, 'destination_table']}
              />
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
}

export default FormSynthesisMechanism;
