import React, { useState } from 'react';
import { Collapse, Divider, Empty, Pagination, Space, Spin } from 'antd';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import API from 'src/@crema/services/apis';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import { FILTER_OPERATION } from 'src/shared/constants/DataTable';
import AntInput from 'src/@crema/component/AntInput';
import RenderContentHTML from 'src/@crema/component/TableRender/RenderContentHTML';
import { CATEGORY_TOPIC } from 'src/shared/constants/help.constant';
import {
  DownOutlined,
  FilePdfOutlined,
  PrinterOutlined,
} from '@ant-design/icons';
import AppIconButton from 'src/@crema/core/AppIconButton';
import { isEmpty } from 'src/shared/utils/Typeof';
import { PdfDocument } from 'src/pageComponents/help/ListQA_PDF/ListQA_PDF';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { convertLabel2Name } from 'src/shared/utils/String';

const { Panel } = Collapse;

export const ListUsageGuide = ({ activePage, handlePrint }) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchValue, setSearchValue] = useState('');

  const { data, isLoading } = useFetch(
    {
      url: API.SEARCH_USAGE,
      method: METHOD_FETCH.POST,
      body: {
        keyword: searchValue,
        filters:
          activePage?.id === CATEGORY_TOPIC.ALL
            ? []
            : [
                {
                  name: 'page_name',
                  value: activePage?.id,
                  operation: FILTER_OPERATION.EQ,
                },
              ],
        pageable: {
          page,
          page_size: pageSize,
          sort: [{ property: 'id', direction: 'desc' }],
        },
      },
    },
    [page, pageSize, activePage, searchValue],
  );
  const totalRows = data?.result?.total || 0;
  const listUsageGuide = data?.result?.items || [];
  <div className='container'></div>;
  return (
    <div>
      <div className={'d-flex items-center'}>
        <h4>Nội dung chức năng</h4>
        <Space className={'ml-auto'} size={[8, 0]}>
          <AppIconButton
            icon={<PrinterOutlined />}
            title={'In'}
            onClick={handlePrint}
          />
          {!isLoading && !isEmpty(data) && (
            <PDFDownloadLink
              document={
                <PdfDocument
                  data={listUsageGuide}
                  title={`Danh sách hướng dẫn sử dụng chức năng ${activePage?.label}`}
                />
              }
              fileName={`${convertLabel2Name(
                `Danh sách hướng dẫn sử dụng chức năng ${activePage?.label}`,
              )}.pdf`}>
              {({ loading }) => (
                <AppIconButton
                  loading={loading}
                  icon={<FilePdfOutlined />}
                  title={'Tải file PDF'}
                />
              )}
            </PDFDownloadLink>
          )}
        </Space>
      </div>
      <AntInput
        placeholder={'Nhập nội dung tìm kiếm'}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Divider className={'mb-0'} />
      {!isLoading && listUsageGuide.length === 0 && (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
      <Spin spinning={isLoading}>
        <Collapse
          ghost
          expandIconPosition={'end'}
          accordion
          expandIcon={({ isActive }) => (
            <DownOutlined rotate={isActive ? 180 : 0} />
          )}>
          {listUsageGuide.map((qa) => (
            <Panel
              className={'border-bottom-collapse-item'}
              key={qa?.id}
              header={<h5 className={'mb-0 '}>{qa?.display_name}</h5>}>
              <RenderContentHTML
                shortNumWord={300}
                content={qa?.content}
                isShowHTML={true}
              />
            </Panel>
          ))}
        </Collapse>
      </Spin>
      <br />
      <div className={'d-flex justify-end'}>
        {totalRows > 0 && (
          <Pagination
            total={totalRows}
            showTotal={(total, range) => (
              <p className={'mr-2'}>
                {range[0]} - {range[1]} của {total} mục
              </p>
            )}
            pageSize={pageSize}
            current={page}
            onChange={(newPage, newPageSize) => {
              setPage(newPage);
              setPageSize(newPageSize);
            }}
            showSizeChanger
            onShowSizeChanged={(current, size) => {
              setPage(1);
              setPageSize(size);
            }}
          />
        )}
      </div>
    </div>
  );
};
