import { Col, Row, Skeleton, Space, Table } from 'antd';
import React, { useState } from 'react';
import AntButton from 'src/@crema/component/AntButton';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import API from 'src/@crema/services/apis';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import {
  ADD_DESTINATION_ID,
  ADD_NAME_TABLE,
} from 'src/shared/constants/ActionTypes';
import useIntl from 'react-intl/lib/src/components/useIntl';

SelectTable.propTypes = {
  next: PropTypes.func,
  prev: PropTypes.func,
};

function SelectTable({ next, prev }) {
  const { messages } = useIntl();
  const tableOld = useSelector(
    (state) => state?.common?.manageDataVersions?.nameTable,
  );
  const [selectedRowKeys, setSelectedRowKeys] = useState(
    tableOld ? [tableOld] : [],
  );
  const dispatch = useDispatch();
  const idConnection = useSelector(
    (state) => state?.common?.manageDataVersions?.idConnection,
  );

  const { data, isLoading } = useFetch(
    {
      method: METHOD_FETCH.POST,
      url: API.DETAIL_CONNECTION_AIR_BYTE,
      body: {
        connection_id: idConnection,
      },
    },
    [idConnection],
  );

  const listTableByConnection = data?.result?.sync_catalog?.streams || [];
  const idDestination = data?.result?.destination_id || '';

  const dataRenderTable = listTableByConnection?.map((item) => {
    return {
      ...item,
      key: item?.stream?.name,
    };
  });

  const columns = [
    {
      title: messages['table.name_table'],
      dataIndex: 'name',
      key: 'name',
      render: (_, value) => {
        return <span>{value?.stream?.name}</span>;
      },
    },
  ];

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    type: 'radio',
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleContinue = () => {
    dispatch({ type: ADD_NAME_TABLE, payload: selectedRowKeys[0] });
    dispatch({ type: ADD_DESTINATION_ID, payload: idDestination });
    next();
  };
  return (
    <>
      {isLoading ? (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      ) : (
        <>
          <div>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <h4>{messages['sidebar.select_table']}</h4>
                <Table
                  rowSelection={rowSelection}
                  columns={columns}
                  scroll={{ y: 450 }}
                  dataSource={dataRenderTable}
                  // pagination={false}
                />
              </Col>
              <Col span={24}>
                <Space
                  align='center'
                  style={{
                    width: '100%',
                    justifyContent: 'flex-end',
                  }}>
                  <AntButton onClick={() => prev()}>
                    {messages['dialog.button.goBack']}
                  </AntButton>
                  <AntButton
                    type='primary'
                    disabled={selectedRowKeys.length > 0 ? false : true}
                    onClick={handleContinue}>
                    {messages['table.continue']}
                  </AntButton>
                </Space>
              </Col>
            </Row>
          </div>
        </>
      )}
    </>
  );
}

export default SelectTable;
