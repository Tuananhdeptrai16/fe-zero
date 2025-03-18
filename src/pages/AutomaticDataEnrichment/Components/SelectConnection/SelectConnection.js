import { Col, Row, Skeleton, Space, Table } from 'antd';
import React, { useState } from 'react';
import AntButton from 'src/@crema/component/AntButton';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import API from 'src/@crema/services/apis';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import { ADD_ID_CONNECTION_AUTO_DATA } from 'src/shared/constants/ActionTypes';
import useIntl from 'react-intl/lib/src/components/useIntl';

SelectConnection.propTypes = {
  next: PropTypes.func,
  prev: PropTypes.func,
};

function SelectConnection({ next, prev }) {
  const { messages } = useIntl();
  const idConnectionOld = useSelector(
    (state) => state?.common?.automaticDataEnrichment?.idConnection,
  );
  const [selectedRowKeys, setSelectedRowKeys] = useState(
    idConnectionOld ? [idConnectionOld] : [],
  );
  const dispatch = useDispatch();
  const idSourceOld = useSelector(
    (state) => state?.common?.automaticDataEnrichment?.sourceId,
  );

  const { data, isLoading } = useFetch(
    {
      method: METHOD_FETCH.POST,
      url: API.GET_CONNECTION_AIR_BYTE,
      body: {
        filters: [],
        pageable: {
          page: 1,
          page_size: 100000,
        },
        types: [],
        source_id: [idSourceOld],
      },
    },
    [idSourceOld],
  );
  const dataListAllConnections = data?.result?.items || [];

  const dataRenderTable = dataListAllConnections?.map((item) => {
    return {
      ...item,
      key: item?.connection_id,
    };
  });

  const columns = [
    {
      title: messages['table.nameConnection'],
      dataIndex: 'name',
      key: 'name',
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

  const handelContinue = () => {
    dispatch({
      type: ADD_ID_CONNECTION_AUTO_DATA,
      payload: selectedRowKeys[0],
    });
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
                <h4>{messages['sidebar.select_connection']}</h4>
                <Table
                  rowSelection={rowSelection}
                  columns={columns}
                  dataSource={dataRenderTable}
                  scroll={{ y: 450 }}
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
                    onClick={handelContinue}>
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

export default SelectConnection;
