import React, { useState } from 'react';
import { Col, Input, Row, Skeleton, Table, Tag } from 'antd';
import style from './ChooseTable.module.scss';
import clsx from 'clsx';
import AntButton from 'src/@crema/component/AntButton';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  CHOOSE_COLUMNS,
  CHOOSE_NAME_TABLE,
} from 'src/shared/constants/ActionTypes';
import HOCSourceTable from '../HOCSourceTable/HOCSourceTable';
import { matchText } from 'src/shared/utils/String';

ChooseTable.propTypes = {
  nextStep: PropTypes.func,
  prevStep: PropTypes.func,
  isLoading: PropTypes.bool,
  data: PropTypes.object,
};

function ChooseTable({ nextStep, prevStep, data, isLoading }) {
  const { Search } = Input;
  const oldChooseTable = useSelector(
    (state) => state?.common?.dataSourceAddIndex?.nameTable,
  );
  const [selectedRowKeys, setSelectedRowKeys] = useState(
    oldChooseTable ? [oldChooseTable] : [],
  );
  const [valueSearch, setValueSearch] = useState('');

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    type: 'radio',
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const dispatch = useDispatch();
  const handleContinue = () => {
    dispatch({ type: CHOOSE_NAME_TABLE, payload: selectedRowKeys[0] });
    dispatch({ type: CHOOSE_COLUMNS, payload: [] });
    nextStep();
  };

  const tableColumns = data?.tables || [];

  const dataTableRender = tableColumns?.map((item) => {
    return {
      key: item?.table_name,
      id: item?.table_name,
      name: item?.table_name,
    };
  });

  const columns = [
    {
      key: 'name_table',
      title: 'Tên bảng',
      dataIndex: 'name',
    },
  ];

  const onSearch = (value) => {
    setValueSearch(value);
  };

  let dataRenderSearch = [];
  if (valueSearch) {
    dataRenderSearch = dataTableRender?.filter((item) => {
      return matchText(item?.id, valueSearch);
    });
  } else {
    dataRenderSearch = dataTableRender;
  }

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
              <Row gutter={[12, 12]}>
                <Col span={12}>
                  <h4
                    style={{
                      marginTop: '10px',
                    }}>
                    Danh sách {dataTableRender?.length} bảng trong nguồn dữ
                    liệu:
                    <Tag
                      color='cyan'
                      style={{ fontSize: '16px', marginLeft: '3px' }}>
                      {data?.database_name}
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
                      onClick={handleContinue}
                      type='primary'
                      disabled={selectedRowKeys.length > 0 ? false : true}>
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

export default HOCSourceTable(ChooseTable);
