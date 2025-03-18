import { Col, Row, Skeleton, Space, Table } from 'antd';
import React, { useState } from 'react';
import AntButton from 'src/@crema/component/AntButton';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import API from 'src/@crema/services/apis';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import { ADD_KEY_RECORD } from 'src/shared/constants/ActionTypes';
import useIntl from 'react-intl/lib/src/components/useIntl';

SelectRecord.propTypes = {
  prev: PropTypes.func,
  next: PropTypes.func,
};

function SelectRecord({ prev, next }) {
  const { messages } = useIntl();
  const keyRecordOld = useSelector(
    (state) => state?.common?.manageDataVersions?.keyRecord,
  );
  const [selectedRowKeys, setSelectedRowKeys] = useState(
    keyRecordOld ? [keyRecordOld] : [],
  );
  const dispatch = useDispatch();
  const idDestination = useSelector(
    (state) => state?.common?.manageDataVersions?.destinationId,
  );
  const nameTable = useSelector(
    (state) => state?.common?.manageDataVersions?.nameTable,
  );

  const { data, isLoading } = useFetch(
    {
      method: METHOD_FETCH.POST,
      url: API.GET_HISTORY_TABLE_AIR_BYTE,
      body: {
        filters: [],
        pageable: {
          page: 1,
          page_size: 10000,
        },
        destination_id: idDestination,
        table_name: nameTable,
        is_history: false,
      },
    },
    [nameTable, idDestination],
  );

  const recordResponse = data?.result?.items || [];

  const dataTableRender = recordResponse?.map((item) => {
    return {
      ...item,
      key: item?._airbyte_unique_key,
    };
  });

  const filterNotAirbyteUniqueKey = dataTableRender?.filter((item) => {
    return (
      item?._airbyte_unique_key !== null && item?._airbyte_unique_key !== ''
    );
  });

  const keyColumnNumberOne = recordResponse[0];
  const listNameColumnByData = keyColumnNumberOne
    ? Object.keys(keyColumnNumberOne).map((item, index) => {
        return {
          title: item,
          dataIndex: item,
          key: `${item},${index}`,
          width: 200,
        };
      })
    : [];

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    type: 'radio',
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const handleContinue = () => {
    dispatch({ type: ADD_KEY_RECORD, payload: selectedRowKeys[0] });
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
                <h4>{messages['sidebar.select_record']}</h4>
                <Table
                  rowSelection={rowSelection}
                  columns={listNameColumnByData}
                  scroll={{ y: 450 }}
                  dataSource={filterNotAirbyteUniqueKey}
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
                    onClick={handleContinue}
                    disabled={selectedRowKeys.length > 0 ? false : true}>
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

export default SelectRecord;
