import React, { useState } from 'react';
import { Col, Input, Row, Skeleton, Table, Tag } from 'antd';
import style from './ChooseColumnsData.module.scss';
import clsx from 'clsx';
import AntButton from 'src/@crema/component/AntButton';
import PropTypes from 'prop-types';
import HOCSourceTable from '../HOCSourceTable/HOCSourceTable';
import { useDispatch, useSelector } from 'react-redux';
import { CHOOSE_COLUMNS, LIST_COLUMNS } from 'src/shared/constants/ActionTypes';
import { matchText } from 'src/shared/utils/String';

ChooseColumnsData.propTypes = {
  nextStep: PropTypes.func,
  prevStep: PropTypes.func,
  data: PropTypes.object,
  isLoading: PropTypes.bool,
};

function ChooseColumnsData({ nextStep, prevStep, data, isLoading }) {
  const { Search } = Input;
  // all table resource
  const tableAll = data?.tables || [];
  const oldChooseColumns = useSelector(
    (state) => state?.common?.dataSourceAddIndex?.chooseColumns,
  );
  const [selectedRowKeys, setSelectedRowKeys] = useState(
    oldChooseColumns ? oldChooseColumns : [],
  );
  const dispatch = useDispatch();
  const nameChooseTable = useSelector(
    (state) => state?.common?.dataSourceAddIndex?.nameTable,
  );
  const [valueSearch, setValueSearch] = useState('');

  // filter column by choose name table
  const columnsBuyTableChoose = tableAll?.find((item) => {
    return (
      item?.table_name.trim().toLowerCase() ===
      nameChooseTable.trim().toLowerCase()
    );
  });

  const dataRenderTable =
    columnsBuyTableChoose?.column_list?.map((item, index) => {
      return {
        key: `${item?.column_name},${index}`,
        id: item?.column_name,
        name: item?.column_name,
        type: item?.data_type,
      };
    }) || [];

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    type: 'checkbox',
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handelContinue = () => {
    dispatch({ type: LIST_COLUMNS, payload: dataRenderTable });
    dispatch({ type: CHOOSE_COLUMNS, payload: selectedRowKeys });
    nextStep();
  };

  const onSearch = (value) => {
    setValueSearch(value);
  };

  let dataRenderSearch = [];
  if (valueSearch) {
    dataRenderSearch = dataRenderTable?.filter((item) => {
      return matchText(item?.id, valueSearch);
    });
  } else {
    dataRenderSearch = dataRenderTable;
  }

  const columns = [
    {
      title: 'Tên cột',
      dataIndex: 'name',
    },
    {
      title: 'Phân loại',
      dataIndex: 'type',
    },
  ];

  return (
    <div>
      <Row gutter={[6, 6]}>
        {isLoading ? (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        ) : (
          <>
            <Col span={24}>
              <Row gutter={[6, 6]}>
                <Col span={12}>
                  <h4
                    style={{
                      marginTop: '10px',
                    }}>
                    Danh sách {dataRenderTable?.length} cột trong bảng:
                    <Tag
                      color='cyan'
                      style={{ fontSize: '16px', marginLeft: '3px' }}>
                      {columnsBuyTableChoose?.table_name}
                    </Tag>
                  </h4>
                </Col>
                <Col span={12}>
                  <Search
                    placeholder='Tìm kiếm'
                    onSearch={onSearch}
                    style={{
                      width: '100%',
                    }}
                    allowClear
                  />
                </Col>
                <Col span={24}>
                  {selectedRowKeys?.length > 0 && (
                    <h6>
                      Đã chọn:
                      <Tag
                        color='processing'
                        style={{ fontSize: '14px', marginLeft: '3px' }}>
                        {selectedRowKeys?.length} cột
                      </Tag>
                    </h6>
                  )}
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Col span={24}>
                <Table
                  rowSelection={rowSelection}
                  columns={columns}
                  dataSource={dataRenderSearch}
                />
                <div className={clsx(style.actions)}>
                  <AntButton onClick={prevStep}>Quay lại</AntButton>
                  {
                    <AntButton
                      onClick={handelContinue}
                      type='primary'
                      disabled={selectedRowKeys?.length > 0 ? false : true}>
                      Tiếp theo
                    </AntButton>
                  }
                </div>
              </Col>
            </Col>
          </>
        )}
      </Row>
    </div>
  );
}

export default HOCSourceTable(ChooseColumnsData);
