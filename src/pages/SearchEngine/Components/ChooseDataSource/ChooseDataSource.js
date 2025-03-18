import React, { memo, useState } from 'react';
import { Table, Input, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import AntButton from 'src/@crema/component/AntButton';
import style from './ChooseDataSource.module.scss';
import clsx from 'clsx';
import { RenderDate } from 'src/@crema/component/TableRender';
import { useDispatch, useSelector } from 'react-redux';
import {
  ADD_ID_DATA_SOURCE,
  CHOOSE_NAME_TABLE,
} from 'src/shared/constants/ActionTypes';
const { Search } = Input;

ChooseDataSource.propTypes = {
  nextStep: PropTypes.func,
  listDataSource: PropTypes.array,
};

function ChooseDataSource({ nextStep, listDataSource }) {
  const idDataSourceSaveRedux = useSelector(
    (state) => state?.common?.dataSourceAddIndex?.idSource,
  );
  const [selectedRowKeys, setSelectedRowKeys] = useState(
    idDataSourceSaveRedux ? [idDataSourceSaveRedux] : [],
  );
  const [valueSearch, setValueSearch] = useState('');

  const dispatch = useDispatch();

  const handelClickContinue = () => {
    dispatch({ type: ADD_ID_DATA_SOURCE, payload: selectedRowKeys[0] });
    dispatch({ type: CHOOSE_NAME_TABLE, payload: '' });
    nextStep();
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    type: 'radio',
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onSearch = (value) => {
    setValueSearch(value.trim());
  };

  const columns = [
    {
      title: 'Tên các nguồn dữ liệu',
      dataIndex: 'source_name',
      render: (_, record) => {
        if (record?.source_name) {
          return <span>{record?.source_name}</span>;
        } else {
          if (record?.destination_type === 'Postgres') {
            return <span>{record?.schema}</span>;
          } else {
            return <span>{record?.database}</span>;
          }
        }
      },
    },
    {
      title: 'Ngày chỉnh sửa ',
      dataIndex: 'updateData',
      align: 'center',
      render: (data) => {
        return <RenderDate value={data} />;
      },
    },
    {
      title: 'Ngày khởi tạo',
      dataIndex: 'createDate',
      align: 'center',
      render: (data) => {
        return <RenderDate value={data} />;
      },
    },
  ];
  const dataSourceTable = listDataSource?.map((item) => {
    return {
      ...item,
      key: item?.id,
      id: item?.id,
      nameSource: item?.database,
      createDate: item?.created_at,
      updateData: item?.updated_at || item?.created_at,
    };
  });

  let dataRenderTable = dataSourceTable;

  if (valueSearch) {
    dataRenderTable = dataSourceTable?.filter((item) => {
      if (item?.source_name) {
        return item?.source_name
          .toLowerCase()
          .includes(valueSearch.trim().toLowerCase());
      } else {
        return item?.nameSource
          .toLowerCase()
          .includes(valueSearch.trim().toLowerCase());
      }
    });
  }

  return (
    <div className={clsx(style.wrapChooseDataSource)}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <h4 className={clsx(style.dataSource_title)}>
                Danh sách các nguồn database
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
          <Table
            // pagination={false}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={dataRenderTable}
            loading={false}
          />
          <div className={clsx(style.actions)}>
            <AntButton
              onClick={handelClickContinue}
              type='primary'
              disabled={selectedRowKeys.length > 0 ? false : true}>
              Tiếp theo
            </AntButton>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default memo(ChooseDataSource);
