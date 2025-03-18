import { Col, Row, Skeleton, Space, Table } from 'antd';
import React from 'react';
import AntButton from 'src/@crema/component/AntButton';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import API from 'src/@crema/services/apis';
import { RenderDateTime } from 'src/@crema/component/TableRender';
import useIntl from 'react-intl/lib/src/components/useIntl';

ResultTableHistory.propTypes = {
  prev: PropTypes.func,
};

function ResultTableHistory({ prev }) {
  const { messages } = useIntl();
  const keyRecord = useSelector(
    (state) => state?.common?.manageDataVersions?.keyRecord,
  );
  const tableName = useSelector(
    (state) => state?.common?.manageDataVersions?.nameTable,
  );
  const idDestination = useSelector(
    (state) => state?.common?.manageDataVersions?.destinationId,
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
        table_name: tableName,
        is_history: true,
      },
    },
    [tableName, idDestination],
  );
  const dataListHistory = data?.result?.items || [];
  const dataFilterByKeyRecord = dataListHistory?.filter((item) => {
    return item?._airbyte_unique_key === keyRecord;
  });
  const columnsByData =
    dataFilterByKeyRecord.length > 0
      ? Object.keys(dataFilterByKeyRecord[0])?.map((item, index) => {
          return {
            title: item,
            dataIndex: item,
            key: `${item},${index}`,
            width: 200,
          };
        })
      : [];
  const columns = [
    ...columnsByData,
    {
      title: messages['table.name_version'],
      dataIndex: '_airbyte_active_row',
      key: '_airbyte_active_row',
      width: 200,
      render: (value) => {
        if (Number.parseInt(value) === 1) {
          return messages['table.name_version_current'];
        } else {
          return messages['table.name_version_old'];
        }
      },
    },
    {
      title: messages['table.start_date'],
      dataIndex: '_airbyte_start_at',
      key: '_airbyte_start_at',
      width: 200,
      render: (data) => {
        return <RenderDateTime value={data} />;
      },
    },
    {
      title: messages['table.end_date'],
      dataIndex: '_airbyte_end_at',
      key: '_airbyte_end_at',
      width: 200,
      render: (data) => {
        return <RenderDateTime value={data} />;
      },
    },
  ];

  const dataRenderTable = dataFilterByKeyRecord?.map((item, index) => {
    return {
      ...item,
      key: index,
    };
  });
  const dataSortByVersion = dataRenderTable?.sort((a, b) =>
    Number.parseInt(b?._airbyte_active_row - a?._airbyte_active_row),
  );

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
          {' '}
          <div>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <h4>{messages['sidebar.history']}</h4>
                <Table
                  columns={columns}
                  scroll={{ y: 450 }}
                  dataSource={dataSortByVersion}
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
                </Space>
              </Col>
            </Row>
          </div>
        </>
      )}
    </>
  );
}

export default ResultTableHistory;
