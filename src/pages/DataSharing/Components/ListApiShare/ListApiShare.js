import React, { useEffect, useState } from 'react';
import { Col, Row, Table } from 'antd';
import { useIntl } from 'react-intl';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import PropTypes from 'prop-types';

ListApiShare.propTypes = {
  dataRenderRetry: PropTypes.array,
};

function ListApiShare({
  dataRenderRetry,
  loadingGetRetryApi = false,
  pageSizeTable,
}) {
  const { messages } = useIntl();
  const [page, setPage] = useState(pageSizeTable?.page);
  const [pageSize, setPageSize] = useState(pageSizeTable?.page_size);

  useEffect(() => {
    setPage(pageSizeTable?.page);
    setPageSize(pageSizeTable?.page_size);
  }, [pageSizeTable]);

  const columns =
    dataRenderRetry.length > 0
      ? Object.keys(dataRenderRetry[0]).map((item, index) => {
          return {
            title: item,
            dataIndex: item,
            width: 180,
            key: `${item},${index}`,
          };
        })
      : [];

  const dataRenderTable = dataRenderRetry?.map((item, index) => {
    return {
      key: index,
      ...item,
    };
  });

  return (
    <div>
      <AppPageMetadata title={messages['sidebar.list_api_share']} />
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <Table
            pagination={{
              current: page,
              pageSize: pageSize,
              onChange: (page, pageSize) => {
                setPage(page);
                setPageSize(pageSize);
              },
            }}
            loading={loadingGetRetryApi}
            dataSource={dataRenderTable}
            columns={columns}
            scroll={{
              x: 1200,
            }}
          />
        </Col>
      </Row>
    </div>
  );
}

export default ListApiShare;
