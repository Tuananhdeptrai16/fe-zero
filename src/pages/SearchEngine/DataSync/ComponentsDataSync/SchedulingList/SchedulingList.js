import React, { useState } from 'react';
import PropTypes from 'prop-types';
import style from './SchedulingList.module.scss';
import clsx from 'clsx';
import { Col, Row, Table } from 'antd';
import AntButton from 'src/@crema/component/AntButton';
import { DeleteOutlined } from '@ant-design/icons';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import API from 'src/@crema/services/apis';
import DialogConfirm from 'src/@crema/component/DialogConfirm';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import { RenderDate } from 'src/@crema/component/TableRender';

SchedulingList.propTypes = {
  activeTab: PropTypes.string,
  dataDetailIndex: PropTypes.object,
  keyTab: PropTypes.string,
};

function SchedulingList({ activeTab, dataDetailIndex, keyTab }) {
  const [rowData, setRowData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    data: dataScheduling,
    isLoading,
    fetchData,
  } = useFetch(
    {
      method: METHOD_FETCH.POST,
      url: API.SCHEDULING_LIST,
      body: {
        filters: [
          {
            name: 'source_index_id',
            operation: 'eq',
            value: dataDetailIndex?.id,
          },
        ],
        pageable: {
          page: 1,
          page_size: 10000,
        },
      },
    },
    [activeTab, keyTab, dataDetailIndex],
  );
  const listResponseScheduling =
    dataScheduling?.result?.items.sort((a, b) => b?.id - a?.id) || [];

  const dataRenderTable = listResponseScheduling?.map((item, index) => {
    return {
      ...item,
      key: index + 1,
      index: index + 1,
    };
  });

  // delete Scheduling
  const deleteToServerScheduling = () => {
    return instanceCoreApi.delete(
      API.DELETE_SCHEDULING(rowData?.source_index_id),
    );
  };
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  // data table
  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      width: 68,
      align: 'center',
      fixed: 'left',
    },
    {
      title: 'Tên tiến trình lập lịch',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'start_date',
      key: 'start_date',
      with: 100,
      align: 'center',
      render: (data) => {
        if (data) {
          return <RenderDate value={data} />;
        }
      },
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'end_date',
      with: 100,
      key: 'start_date',
      align: 'center',
      render: (data) => {
        if (data) {
          return <RenderDate value={data} />;
        }
      },
    },
    {
      title: 'Lặp lại mỗi',
      dataIndex: 'unit',
      key: 'unit',
      with: 160,
      render: (value) => {
        if (value === 'week') {
          return <span>Tuần</span>;
        }
        if (value === 'hour') {
          return <span>Giờ</span>;
        }
        if (value === 'date') {
          return <span>Ngày</span>;
        }
        if (value === 'month') {
          return <span>Tháng</span>;
        }
      },
    },
    {
      title: 'Hành động',
      key: 'address',
      align: 'center',
      width: 180,
      fixed: 'right',
      render: (_, record) => {
        return (
          <>
            <AntButton
              icon={<DeleteOutlined />}
              onClick={() => {
                setRowData(record);
                setIsDialogOpen(true);
              }}>
              Xóa tiến trình
            </AntButton>
          </>
        );
      },
    },
  ];

  return (
    <div className={clsx(style.contentListTableSync)}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <h4>Thông tin lập lịch chỉ mục tìm kiếm</h4>
          <Table
            loading={isLoading}
            columns={columns}
            dataSource={dataRenderTable}
            scroll={{
              y: 'calc(100vh - 400px)',
              x: 1200,
            }}
          />
          <DialogConfirm
            key={rowData?.id}
            visible={isDialogOpen}
            onSuccess={() => {
              fetchData();
            }}
            onClose={handleCloseDialog}
            textTitle={'confirm.deleteProcessSync'}
            textSuccess={'confirm.deleteProcessSyncSuccess'}
            onSaveToServer={deleteToServerScheduling}>
            <p>
              <IntlMessages id='confirm.deleteProcessSyncSure' />
              <span className='warning-text-color'>{rowData?.name}</span>
            </p>
          </DialogConfirm>
        </Col>
      </Row>
    </div>
  );
}

export default SchedulingList;
