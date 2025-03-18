import React, { useState } from 'react';
import { Collapse, Divider, Empty, Pagination, Spin } from 'antd';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import API from 'src/@crema/services/apis';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import { FILTER_OPERATION } from 'src/shared/constants/DataTable';
import AntInput from 'src/@crema/component/AntInput';
import RenderContentHTML from 'src/@crema/component/TableRender/RenderContentHTML';
import { CATEGORY_TOPIC } from 'src/shared/constants/help.constant';
import { DownOutlined } from '@ant-design/icons';
import AntButton from 'src/@crema/component/AntButton';
import FormRowDataTable from 'src/@crema/component/FormRowDataTable';
import { FORM_TYPES } from 'src/shared/constants/FormDataTable';
import { MODAL_SIZE } from 'src/shared/constants/Modal';
const { Panel } = Collapse;

export const ListQA = ({ activeTopic, handleRunButtonClick }) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchValue, setSearchValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading } = useFetch(
    {
      url: API.SEARCH_QA,
      method: METHOD_FETCH.POST,
      body: {
        keyword: searchValue,
        filters:
          activeTopic === CATEGORY_TOPIC.ALL
            ? []
            : [
                {
                  name: 'category_code',
                  value: activeTopic,
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
    [page, pageSize, activeTopic, searchValue],
  );
  const totalRows = data?.result?.total || 0;
  const listQa = data?.result?.items || [];

  return (
    <div>
      <h4>Tất cả chủ đề</h4>
      <div className={'d-flex justify-end mb-2 gap-2'}>
        <AntButton onClick={() => setIsModalOpen(true)}>
          Tham quan sản phẩm
        </AntButton>
        <AntButton onClick={() => handleRunButtonClick()}>
          Tham quan trang
        </AntButton>
      </div>

      <FormRowDataTable
        size={MODAL_SIZE.MEDIUM}
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formType={FORM_TYPES.ADD_VIDEO}>
        <video width='100%' height='315' controls>
          <source
            src='/assets/video/video_tham_quan_trang.mp4'
            type='video/mp4'
          />
          <source
            src='%PUBLIC_URL%/assets/video/video_tham_quan_trang.mp4'
            type='video/mp4'
          />
          Trình duyệt không hỗ trợ xem video
        </video>
      </FormRowDataTable>

      <AntInput
        placeholder={'Nhập nội dung tìm kiếm'}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Divider className={'mb-0'} />
      {!isLoading && listQa.length === 0 && (
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
          {listQa.map((qa) => (
            <Panel
              className={'border-bottom-collapse-item'}
              key={qa?.id}
              header={<h5 className={'mb-0 '}>{qa?.name}</h5>}>
              <RenderContentHTML shortNumWord={300} content={qa?.content} />
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
