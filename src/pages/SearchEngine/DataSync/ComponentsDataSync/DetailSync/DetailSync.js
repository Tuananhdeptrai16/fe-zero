import { Col, Row, Skeleton, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import AntModal from 'src/@crema/component/AntModal';
import style from './DetailSync.module.scss';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import AntButton from 'src/@crema/component/AntButton';
import {
  ArrowLeftOutlined,
  CheckCircleFilled,
  ExclamationCircleFilled,
  ExclamationCircleOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import ModalReport from '../ModalReport';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import API from 'src/@crema/services/apis';
import { RenderDateTime } from 'src/@crema/component/TableRender';
import notification from 'src/shared/utils/notification';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import useCallApi from 'src/@crema/hook/useCallApi';
import { MODAL_SIZE } from 'src/shared/constants/Modal';
import { useRef } from 'react';

DetailSync.propTypes = {
  setIsGoBack: PropTypes.func,
  dataDetailIndex: PropTypes.object,
};

function DetailSync({ setIsGoBack, dataDetailIndex, type }) {
  const [isModalReport, setIsModalReport] = useState(false);
  const [isModalOpenLog, setIsModalOpenLog] = useState(false);
  const [isError, setIsError] = useState(false);
  const [listLogError, setLogError] = useState([]);
  const refReloading = useRef(true);

  const { data, isLoading, fetchData } = useFetch(
    {
      method: METHOD_FETCH.GET,
      url: API.GET_VIEW_SYNC_STATUS({
        name: dataDetailIndex?.name || dataDetailIndex?.index_name,
        type: type || 'scheduled',
      }),
    },
    [dataDetailIndex],
  );
  const dataDetailsSync = data?.result;
  const statusSync = dataDetailsSync?.state;

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

  useEffect(() => {
    if (statusSync) {
      if (statusSync === 'failed') {
        notification.error('Đồng bộ dữ liệu thất bại');
      } else if (statusSync === 'running') {
        notification.info('Đang đồng bộ dữ liệu');
      } else if (statusSync === 'success') {
        notification.success('Đồng bộ dữ liệu thành công');
      } else {
        notification.info('Đang chờ đồng bộ');
      }
    }
  }, [statusSync]);

  // view log nguyen nhan loi
  const onSaveToServer = (data) => {
    return instanceCoreApi.post(API.GET_LOG_ERROR_SYNC, data);
  };

  const { loading: loadingViewLogError, send: GetViewLogError } = useCallApi({
    success: (response) => {
      setIsModalOpenLog(true);
      setIsError(true);
      setLogError(
        response?.result?.content ||
          response?.result?.title ||
          'Lỗi không xác định !',
      );
    },
    callApi: onSaveToServer,
  });

  // get log error
  const handleGetLogError = () => {
    GetViewLogError({
      dag_id: dataDetailsSync.dag_id,
      dag_run_id: dataDetailsSync.dag_run_id,
    });
  };
  // handleGetResult - xem thong tin ket qua
  const handleGetResult = () => {
    setIsModalOpenLog(true);
    setIsError(false);
  };

  // thoi gian da xu ly
  const startDate = new Date(dataDetailsSync?.start_date);
  const endDate = new Date(dataDetailsSync?.end_date);
  const processingTimeMillis = endDate - startDate;

  function convertTime(processingTimeMillis) {
    let seconds = Math.floor(processingTimeMillis / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    seconds %= 60;
    minutes %= 60;
    hours %= 24;

    return { days, hours, minutes, seconds };
  }

  // Sử dụng hàm convertTime để chuyển đổi thời gian xử lý
  const timeDetails = convertTime(processingTimeMillis);

  const columns = [
    {
      title: 'Tên tiến trình',
      dataIndex: 'dag_id',
      key: 'dag_id',
      render: (value) => {
        if (value) {
          return <span>{value}</span>;
        } else {
          return <></>;
        }
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'state',
      key: 'state',
      render: (value) => {
        if (value.trim() === 'running') {
          return <span>Đang đồng bộ</span>;
        } else if (value.trim() === 'success') {
          return <span>Đã đồng bộ</span>;
        } else if (value.trim() === 'queued') {
          return <span>Chờ đồng bộ</span>;
        } else {
          return <span>Đồng bộ thất bại</span>;
        }
      },
    },
    {
      title: 'Thời gian bắt đầu',
      dataIndex: 'start_date',
      key: 'start_date',
      align: 'center',
      render: (data) => {
        if (data) {
          return (
            <span>
              <RenderDateTime value={data} />
            </span>
          );
        } else {
          return <></>;
        }
      },
    },
    {
      title: 'Thời gian kết thúc',
      dataIndex: 'end_date',
      key: 'end_date',
      align: 'center',
      render: (data) => {
        if (data) {
          return (
            <span>
              <RenderDateTime value={data} />
            </span>
          );
        } else {
          return <></>;
        }
      },
    },
  ];
  const notDataSync = [
    {
      dag_id: dataDetailIndex?.name || dataDetailIndex?.index_name,
      start_date: dataDetailIndex?.start_date,
      state: 'queued',
      key: 1,
    },
  ];
  const dataRenderTable = dataDetailsSync
    ? [
        {
          ...dataDetailsSync,
          key: '1',
        },
      ]
    : notDataSync;

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
          <div className={clsx(style.wrapSyncNow)}>
            <div className={clsx(style.viewSync)}>
              <div className={clsx(style.viewSync_header)}>
                <AntButton
                  onClick={() => {
                    setIsGoBack(false);
                  }}
                  icon={<ArrowLeftOutlined />}>
                  Trở lại
                </AntButton>
                <AntButton
                  onClick={() => {
                    setIsModalReport(true);
                  }}
                  icon={<ExclamationCircleOutlined />}>
                  Báo cáo
                </AntButton>
              </div>
              <div className={clsx(style.viewSync_content)}>
                <div className={clsx(style.viewSync_content_header)}>
                  {dataDetailsSync?.state === 'failed' ? (
                    <div
                      className={clsx(
                        style.viewSync_content_title,
                        style.viewSync_error,
                      )}>
                      <div className={clsx(style.syncError_title)}>
                        <ExclamationCircleFilled
                          className={clsx(style.icon, style.SyncError)}
                        />
                        <span style={{ fontWeight: '500' }}>
                          Đồng bộ dữ liệu thất bại
                        </span>
                      </div>
                    </div>
                  ) : dataDetailsSync?.state === 'running' ? (
                    <div className={clsx(style.viewSync_content_title)}>
                      <LoadingOutlined
                        className={clsx(style.icon, style.icon_progress)}
                      />
                      <span style={{ fontWeight: '500' }}>
                        Đang đồng bộ dữ liệu
                      </span>
                    </div>
                  ) : dataDetailsSync?.state === 'success' ? (
                    <div className={clsx(style.viewSync_content_title)}>
                      <CheckCircleFilled className={clsx(style.icon)} />
                      <span style={{ fontWeight: '500' }}>
                        Đồng bộ dữ liệu thành công
                      </span>
                    </div>
                  ) : (
                    <div className={clsx(style.viewSync_content_title)}>
                      <LoadingOutlined
                        className={clsx(style.icon, style.icon_progress)}
                      />
                      <span style={{ fontWeight: '500' }}>
                        Đang chờ đồng bộ dữ liệu
                      </span>
                    </div>
                  )}
                </div>
                <>
                  {statusSync === 'success' && (
                    <AntButton onClick={handleGetResult} type='primary'>
                      Xem kết quả
                    </AntButton>
                  )}
                  {statusSync === 'failed' && (
                    <AntButton
                      loading={loadingViewLogError}
                      onClick={handleGetLogError}
                      type='primary'>
                      Xem nguyên nhân
                    </AntButton>
                  )}
                </>

                <div className={clsx(style.tableSync)}>
                  <h4>Thang đo tiến độ đồng bộ dữ liệu</h4>
                  <Table
                    columns={columns}
                    dataSource={dataRenderTable}
                    pagination={false}
                  />
                </div>
              </div>
            </div>
            {/* modal details error */}
            <AntModal
              title={
                isError
                  ? 'Nguyên nhân đồng bộ thất bại'
                  : 'Xem kết quả đồng bộ dữ liệu '
              }
              size={MODAL_SIZE.MEDIUM}
              open={isModalOpenLog}
              centered
              onOk={() => {
                setIsModalOpenLog(false);
              }}
              footer={null}
              className={clsx(style.wrapModalErrorStatus)}
              onCancel={() => {
                setIsModalOpenLog(false);
              }}>
              <Row gutter={[16, 16]}>
                {isError ? (
                  <>
                    <Col span={24}>
                      <h4 className={clsx(style.modal_title_error)}>
                        Nguyên nhân lỗi
                      </h4>
                      <div className={clsx(style.content_error)}>
                        <p>{listLogError}</p>
                      </div>
                    </Col>
                  </>
                ) : (
                  <>
                    <Col span={12}>
                      <span className='mx-1'>Thời gian đã xử lý:</span>
                      <strong>{`${
                        timeDetails.days > 0 ? timeDetails.days + 'ngày' : ''
                      } ${timeDetails.hours + ' giờ'} - ${
                        timeDetails.minutes + ' phút'
                      } - ${timeDetails.seconds + ' giây'}`}</strong>
                    </Col>
                  </>
                )}
              </Row>
            </AntModal>

            {/* modal report */}
            <ModalReport
              isModalReport={isModalReport}
              setIsModalReport={setIsModalReport}
            />
          </div>
        </>
      )}
    </>
  );
}

export default DetailSync;
