import React, { useEffect, useRef, useState } from 'react';
import style from './ManageDataSyncProcess.module.scss';
import clsx from 'clsx';
import { Skeleton, Space, Table, Tag } from 'antd';
import AntButton from 'src/@crema/component/AntButton';
import {
  DeleteOutlined,
  EyeOutlined,
  QuestionCircleOutlined,
  StopOutlined,
} from '@ant-design/icons';
import ModalReport from '../ModalReport';
import DialogConfirm from 'src/@crema/component/DialogConfirm';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import PropTypes from 'prop-types';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import API from 'src/@crema/services/apis';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import ProgressList from './ProgressList';

ManageDataSyncProcess.propTypes = {
  keyTab: PropTypes.string,
  dataDetailIndex: PropTypes.object,
};

function ManageDataSyncProcess({ keyTab, dataDetailIndex }) {
  const [detailSync, setDetailSync] = useState(false);
  const [isModalReport, setIsModalReport] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [rowData, setRowData] = useState(false);
  const [isPauseProcess, setIsPauseProcess] = useState(false);
  const refReloading = useRef(true);

  const { data, isLoading, fetchData } = useFetch(
    {
      method: METHOD_FETCH.GET,
      url: API.GET_VIEW_SYNC_STATUS({
        name: dataDetailIndex?.index_name,
        type: 'manual',
      }),
    },
    [keyTab, dataDetailIndex],
  );
  const dataDetailsSync = data?.result;
  const statusSync = dataDetailsSync?.state;

  const dataRenderTable = dataDetailsSync
    ? [dataDetailsSync]?.map((item, index) => {
        return {
          ...item,
          key: index,
          index: index + 1,
        };
      })
    : [];

  useEffect(() => {
    if (data) {
      refReloading.current = false;
    } else {
      refReloading.current = true;
    }
  }, [data]);

  useEffect(() => {
    if (statusSync === 'running' || statusSync === 'queued' || !statusSync) {
      const idInterval = setInterval(() => {
        fetchData();
      }, 2000);
      return () => {
        clearInterval(idInterval);
      };
    }
  }, [statusSync]);

  // delete dag
  const deleteToServerScheduling = () => {
    if (isPauseProcess) {
      return instanceCoreApi.put(
        API.TOGGLE_DAG({
          dag_id: rowData?.dag_id,
          is_pause_dag: true,
        }),
      );
    } else {
      return instanceCoreApi.delete(API.DELETE_DAG(rowData?.dag_id));
    }
  };
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
      title: 'Tên tiến trình',
      dataIndex: 'dag_id',
      key: 'dag_id',
      with: 180,
    },
    {
      title: <IntlMessages id='common.status' />,
      dataIndex: 'state',
      width: 180,
      key: 'state',
      render: (_, data) => {
        if (data.state === 'failed') {
          return <Tag color='#416ef0'>{'Thất bại'}</Tag>;
        } else if (data.state === 'success') {
          return <Tag color='#389e0d'>{'Thành công'}</Tag>;
        } else if (data.state === 'running') {
          return <Tag color='#13c2c2'>{'Đang chạy'}</Tag>;
        } else if (data.state === 'queued') {
          return <Tag color='#1677ff'>{'Đang chờ đồng bộ'}</Tag>;
        } else {
          return <Tag>{data?.state}</Tag>;
        }
      },
    },
    {
      title: 'Hành động',
      key: 'address',
      align: 'center',
      width: 400,
      fixed: 'right',
      render: (_, record) => {
        return (
          <Space className='d-flex flex-wrap justify-center'>
            <AntButton
              icon={<EyeOutlined />}
              onClick={() => {
                setRowData(record);
                setDetailSync(true);
              }}>
              Xem chi tiết
            </AntButton>
            <AntButton
              icon={<QuestionCircleOutlined />}
              onClick={() => {
                setIsModalReport(true);
              }}>
              Báo cáo
            </AntButton>
            <AntButton
              icon={<StopOutlined />}
              disabled={
                record?.state === 'failed' || record?.state === 'success'
              }
              onClick={() => {
                setRowData(record);
                setIsDialogOpen(true);
                setIsPauseProcess(true);
              }}>
              Dừng tiến trình
            </AntButton>
            <AntButton
              icon={<DeleteOutlined />}
              onClick={() => {
                setRowData(record);
                setIsPauseProcess(false);
                setIsDialogOpen(true);
              }}>
              Xoá tiến trình
            </AntButton>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      {isLoading && refReloading.current ? (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      ) : (
        <>
          {' '}
          <div className={clsx(style.wrapManageDataSyncProcess)}>
            <h4>Danh sách tiến trình đồng bộ dữ liệu </h4>
            {!detailSync ? (
              <>
                <Table columns={columns} dataSource={dataRenderTable} />
              </>
            ) : (
              <>
                <ProgressList
                  dataDetailIndex={rowData}
                  setIsGoBack={setDetailSync}
                />
              </>
            )}
            {/* modal report */}
            <ModalReport
              isModalReport={isModalReport}
              setIsModalReport={setIsModalReport}
            />
            <DialogConfirm
              key={'delete_sync'}
              visible={isDialogOpen}
              onSuccess={() => {
                fetchData();
              }}
              onClose={() => setIsDialogOpen(false)}
              textTitle={
                isPauseProcess
                  ? 'confirm.pauseProcessSync'
                  : 'confirm.deleteProcessSync'
              }
              textSuccess={
                isPauseProcess
                  ? 'confirm.pauseProcessSyncSuccess'
                  : 'confirm.deleteProcessSyncSuccess'
              }
              onSaveToServer={deleteToServerScheduling}>
              <p>
                <IntlMessages
                  id={
                    isPauseProcess
                      ? 'confirm.pauseProcessSyncSure'
                      : 'confirm.deleteProcessSyncSure'
                  }
                />
                <span className='warning-text-color'>{rowData?.dag_id}</span>
              </p>
            </DialogConfirm>
          </div>
        </>
      )}
    </>
  );
}

export default ManageDataSyncProcess;
