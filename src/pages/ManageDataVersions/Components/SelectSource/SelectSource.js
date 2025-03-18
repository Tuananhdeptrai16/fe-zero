import { Col, Row, Skeleton, Space, Table, Avatar } from 'antd';
import React, { useState } from 'react';
import AntButton from 'src/@crema/component/AntButton';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import API from 'src/@crema/services/apis';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import {
  ADD_ID_CONNECTION,
  ADD_SOURCE_ID,
} from 'src/shared/constants/ActionTypes';
import useIntl from 'react-intl/lib/src/components/useIntl';

SelectSource.propTypes = {
  next: PropTypes.func,
  prev: PropTypes.func,
  sourceName: PropTypes.string,
};

function SelectSource({ next, prev, sourceName }) {
  const { messages } = useIntl();
  const idOrganization = useSelector(
    (state) => state?.common?.manageDataVersions?.organizationId,
  );
  const idSource = useSelector(
    (state) => state?.common?.manageDataVersions?.sourceId,
  );
  const [selectedRowKeys, setSelectedRowKeys] = useState(
    idSource ? [idSource] : [],
  );
  const dispatch = useDispatch();

  const { data, isLoading } = useFetch(
    {
      method: METHOD_FETCH.POST,
      url: API.SEARCH_SOURCE_AIR_BYTE,
      body: {
        filters: [],
        pageable: {
          page: 1,
          page_size: 100000,
        },
        types: [sourceName],
        organization_id: idOrganization,
      },
    },
    [idOrganization],
  );
  const dataSource = data?.result?.items || [];

  const dataTableRender = dataSource?.map((item) => {
    return {
      ...item,
      key: item?.source_id,
    };
  });

  const columns = [
    {
      title: messages['sidebar.data_source_name'],
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: messages['sidebar.data_type'],
      dataIndex: 'source_name',
      key: 'source_name',
      render: (value, record) => {
        return (
          <Space>
            <Avatar src={record?.icon} />
            <span>{value}</span>
          </Space>
        );
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
    dispatch({ type: ADD_SOURCE_ID, payload: selectedRowKeys[0] });
    dispatch({ type: ADD_ID_CONNECTION, payload: '' });
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
                <h4>{messages['sidebar.select_source']}</h4>
                <Table
                  rowSelection={rowSelection}
                  columns={columns}
                  scroll={{ y: 450 }}
                  dataSource={dataTableRender}
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
          </div>{' '}
        </>
      )}
    </>
  );
}

export default SelectSource;
