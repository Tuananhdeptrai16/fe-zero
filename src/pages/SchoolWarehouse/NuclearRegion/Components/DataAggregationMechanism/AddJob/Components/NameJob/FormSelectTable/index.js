import { Col, Form, Row } from 'antd';
import React, { useEffect } from 'react';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import API from 'src/@crema/services/apis';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import { getDataContextAddJob } from '../../..';
import { isEmpty } from 'src/shared/utils/Typeof';
import { TYPE_DATA_MARK_SCHOOL_WAREHOUSE } from 'src/shared/constants/DataFixed';
import style from './FormSelectTable.module.scss';
import clsx from 'clsx';
import FormSelectDataRegion from '../FormSelectDataRegion';
// import PropTypes from 'prop-types';

FormSelectTable.propTypes = {};

function FormSelectTable() {
  const form = Form.useFormInstance();
  const watchTypeDestinationId = Form.useWatch('destination_id', form) || '';
  const watchNuclearId = Form.useWatch('nuclear_region_id', form) || '';
  const watchDtmId = Form.useWatch('dtm_region_id', form) || '';
  const isSelectTableWaiting =
    Form.useWatch('select_table_waiting', form) || false;

  const { dataCreateJob } = getDataContextAddJob();
  const { category, typeDataMark } = dataCreateJob || {};

  useEffect(() => {
    form.setFieldValue('select_table', []);
    form.setFields([
      {
        name: 'select_table',
        errors: [],
      },
    ]);
  }, [
    watchTypeDestinationId,
    watchNuclearId,
    watchDtmId,
    isSelectTableWaiting,
    form,
  ]);

  // get list table destination
  const { data, error } = useFetch(
    {
      enabled: typeDataMark === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.ATM,
      method: METHOD_FETCH.GET,
      url: isSelectTableWaiting
        ? API.GET_LIST_TABLE_WAITING_DESTINATION(watchTypeDestinationId)
        : API.GET_LIST_TABLE_DESTINATION(watchTypeDestinationId),
    },
    [watchTypeDestinationId, isSelectTableWaiting],
  );

  // get list table nuclear region
  const { data: dataTableNuclear, error: errorNuclear } = useFetch(
    {
      enabled: typeDataMark === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DTM,
      method: METHOD_FETCH.GET,
      url: isSelectTableWaiting
        ? API.GET_LIST_TABLE_WAITING_NUCLEAR_REGION(watchNuclearId)
        : API.GET_LIST_TABLE_NUCLEAR_REGION(watchNuclearId),
    },
    [watchNuclearId, isSelectTableWaiting],
  );

  // get list table dtm
  const { data: dataTableDtm, error: errorDtm } = useFetch(
    {
      enabled: typeDataMark === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.FML,
      method: METHOD_FETCH.GET,
      url: isSelectTableWaiting
        ? API.GET_LIST_TABLE_WAITING_DATA_MARK(watchDtmId)
        : API.GET_LIST_TABLE_DATA_MARK(watchDtmId),
    },
    [watchDtmId, isSelectTableWaiting],
  );

  //
  const listTableByDestination = data?.result?.tables || [];
  const listTableByNuclear = dataTableNuclear?.result?.tables || [];
  const listTableByDtm = dataTableDtm?.result?.tables || [];

  const optionsTableRenderDestination = !isEmpty(error)
    ? []
    : listTableByDestination?.map((item) => {
        return {
          label: item?.table_name,
          value: item?.table_name,
        };
      });

  const optionsTableNuclear = !isEmpty(errorNuclear)
    ? []
    : listTableByNuclear?.map((item) => {
        return {
          label: item?.table_name,
          value: item?.table_name,
        };
      });

  const optionsTableDtm = !isEmpty(errorDtm)
    ? []
    : listTableByDtm?.map((item) => {
        return {
          label: item?.table_name,
          value: item?.table_name,
        };
      });

  const renderOptionsByType = (type) => {
    if (type === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.ATM) {
      return optionsTableRenderDestination;
    }
    if (type === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DTM) {
      return optionsTableNuclear;
    }
    if (type === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.FML) {
      return optionsTableDtm;
    }
  };

  return (
    <Row className={clsx(style.wrapFormSelectTable)}>
      <FormSelectDataRegion typeDataMark={typeDataMark} category={category} />

      <Col span={24}>
        <FormSelect
          label={isSelectTableWaiting ? 'Chọn bảng tạm' : 'Chọn bảng'}
          placeholder={isSelectTableWaiting ? 'Chọn bảng tạm' : 'Chọn bảng'}
          name={'select_table'}
          options={renderOptionsByType(typeDataMark)}
          required
        />
      </Col>

      {/* <Col span={24} className={clsx(style.formCheckBox)}>
        <FormCheckbox label='Chọn bảng tạm' name={'select_table_waiting'} />
      </Col> */}
    </Row>
  );
}

export default FormSelectTable;
