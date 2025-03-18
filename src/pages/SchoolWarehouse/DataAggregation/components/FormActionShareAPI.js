import { Col, Form, Row, Table } from 'antd';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import style from './FormActionShareAPI.module.scss';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import API from 'src/@crema/services/apis';
import { isEmpty } from 'src/shared/utils/Typeof';
import FormHidden from 'src/@crema/core/Form/FormHidden';

function FormActionShareAPI({ isUpdate, columns_selected, tableNameReset }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const form = Form.useFormInstance();
  const watchTableName = Form.useWatch('table_name', form) || '';

  useEffect(() => {
    let isMounted = true;
    if (isUpdate && isMounted) {
      const selectedOld = columns_selected?.map((item) => {
        return {
          column_name: item,
          data_type: '',
        };
      });
      const selectedRowKeyOld = columns_selected?.map((item) => item);
      setSelectedColumns(selectedOld);
      setSelectedRowKeys(selectedRowKeyOld);
    }
    return () => {
      isMounted = false;
    };
  }, [columns_selected, isUpdate]);

  // Get list table
  const { data: dataListTable, isLoading: isLoadingGetListTable } = useFetch(
    {
      method: METHOD_FETCH.GET,
      url: API.GET_LIST_TABLE_API_DATA_AGGREGATE,
    },
    [],
  );
  const tableOptions = dataListTable?.result?.tables?.map((table) => ({
    label: table.table_name,
    value: table.table_name,
  }));

  // Get list columns by table
  const { data: listDataColumns, isLoading: isLoadinglistDataColumns } =
    useFetch(
      {
        method: METHOD_FETCH.GET,
        enabled: !isEmpty(watchTableName),
        url: API.GET_LIST_COLUMNS_BY_TABLENAME(watchTableName),
      },
      [watchTableName],
    );

  const columns = [
    {
      title: 'Tên cột',
      dataIndex: 'column_name',
      key: 'column_name',
    },
  ];
  const listDataColumnsAll =
    listDataColumns?.result?.tables[0]?.column_list || [];

  const onSelectChange = (newSelectedRowKeys, selectedRows) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedColumns(selectedRows);
    form.setFieldValue('selected_columns', selectedRows);
  };

  useEffect(() => {
    form.setFieldsValue({
      column_name: selectedColumns,
    });
  }, [selectedColumns, form]);

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  useEffect(() => {
    if (watchTableName && watchTableName !== tableNameReset) {
      setSelectedRowKeys([]);
      setSelectedColumns([]);
    }
  }, [watchTableName]);

  return (
    <Row gutter={[12, 12]}>
      <Col span={24}>
        <FormInput
          name={'api_name'}
          label={'Tên API chia sẻ'}
          required
          rules={{ maxLength: [{ value: 128 }] }}
        />
      </Col>
      <Col span={24}>
        <FormSelect
          label='Chọn bảng'
          name={'table_name'}
          options={tableOptions}
          required
        />
      </Col>
      <Col span={24}>
        <label className={clsx(style.label_select_table)}>Chọn cột</label>
        <Table
          key={`form-action-share-api-${isLoadingGetListTable}`}
          loading={isLoadinglistDataColumns}
          rowSelection={rowSelection}
          rowKey='column_name'
          columns={columns}
          dataSource={listDataColumnsAll}
        />
      </Col>
      <Col span={24}>
        <FormHidden name='column_name' />
      </Col>
    </Row>
  );
}

export default FormActionShareAPI;
