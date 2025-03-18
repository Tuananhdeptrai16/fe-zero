import { ArrowLeftOutlined } from '@ant-design/icons';
import { Col, Row, Spin, Table, Tag } from 'antd';
import React, { useState } from 'react';
import AntButton from 'src/@crema/component/AntButton';
import AntModal from 'src/@crema/component/AntModal';
import { RenderDateTime } from 'src/@crema/component/TableRender';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import useCallApi from 'src/@crema/hook/useCallApi';
import API from 'src/@crema/services/apis';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import { MODAL_SIZE } from 'src/shared/constants/Modal';

index.propTypes = {};

function index({ setIsGoBack, dataDetailIndex }) {
  const [isError, setIsError] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [logError, setLogError] = useState('');
  const { data, isLoading } = useFetch(
    {
      method: METHOD_FETCH.GET,
      url: API.GET_SCHEDULING_JOB(dataDetailIndex?.dag_id),
    },
    [],
  );

  const dataResponse = data?.result || [];
  const dataRenderTable = dataResponse?.map((item, index) => {
    return {
      ...item,
      key: index,
    };
  });

  // get log
  const { loading: loadingGetLog, send: getLogError } = useCallApi({
    success: (response) => {
      setLogError(
        response?.result?.content ||
          response?.result?.title ||
          'Lỗi không xác định !',
      );
    },
    callApi: (data) => {
      return instanceCoreApi.post(API.GET_LOG_ERROR_SYNC, data);
    },
  });

  // thoi gian da xu ly
  const startDate = new Date(rowData?.start_date);
  const endDate = new Date(rowData?.end_date);
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

  const timeDetails = convertTime(processingTimeMillis);

  const columns = [
    {
      title: 'Tên tiến trình',
      dataIndex: 'dag_id',
      width: 180,
      fixed: 'left',
      key: 'dag_id',
    },
    {
      title: 'Dạng đồng bộ dữ liệu',
      dataIndex: 'run_type',
      width: 220,
      key: 'run_type',
      render: (data) => {
        if (data === 'scheduled') {
          return <span>Lập lịch</span>;
        } else {
          return <span>Đồng bộ ngay</span>;
        }
      },
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
      title: 'Thời gian bắt đầu',
      dataIndex: 'start_date',
      width: 160,
      key: 'start_date',
      align: 'center',
      render: (data) => {
        return <RenderDateTime value={data} />;
      },
    },
    {
      title: 'Thời gian kết thúc',
      dataIndex: 'end_date',
      width: 160,
      key: 'end_date',
      align: 'center',
      render: (data) => {
        return <RenderDateTime value={data} />;
      },
    },
    {
      title: 'Hành động',
      dataIndex: 'end_date',
      width: 120,
      key: 'end_date',
      fixed: 'right',
      align: 'center',
      render: (_, record) => {
        if (record?.state === 'success') {
          return (
            <AntButton
              type='primary'
              onClick={() => {
                setRowData(record);
                setIsError(false);
                setIsModalOpen(true);
              }}>
              Xem kết quả
            </AntButton>
          );
        } else if (record?.state === 'failed') {
          return (
            <AntButton
              type='primary'
              onClick={() => {
                setRowData(record);
                setIsError(true);
                setIsModalOpen(true);
                getLogError({
                  dag_id: record?.dag_id,
                  dag_run_id: record?.dag_run_id,
                });
              }}>
              Xem nguyên nhân
            </AntButton>
          );
        } else {
          return null;
        }
      },
    },
  ];
  return (
    <Row gutter={[12, 12]}>
      <Col span={24}>
        <AntButton
          onClick={() => {
            setIsGoBack(false);
          }}
          icon={<ArrowLeftOutlined />}>
          Trở lại
        </AntButton>
      </Col>
      <Col span={24}>
        <h4>Thang đo tiến độ đồng bộ dữ liệu</h4>
        <Table
          loading={isLoading}
          dataSource={dataRenderTable}
          columns={columns}
          scroll={{
            x: 1500,
          }}
        />
      </Col>
      <AntModal
        title={isError ? 'Nguyên nhân lỗi' : 'Kết quả'}
        open={isModalOpen}
        centered
        bodyStyle={{ maxHeight: '75vh', overflow: 'auto' }}
        onOk={() => {
          setIsModalOpen(false);
        }}
        footer={
          <AntButton
            onClick={() => {
              setIsModalOpen(false);
            }}
            type='primary'>
            Đóng
          </AntButton>
        }
        size={MODAL_SIZE.MEDIUM}
        onCancel={() => {
          setIsModalOpen(false);
        }}>
        {isError ? (
          <div>
            <Spin spinning={loadingGetLog}>
              <p>{logError}</p>
            </Spin>
          </div>
        ) : (
          <>
            <span className='mx-1'>Thời gian đã xử lý:</span>
            <strong>{`${
              timeDetails.days > 0 ? timeDetails.days + 'ngày' : ''
            } ${timeDetails.hours + ' giờ'} - ${
              timeDetails.minutes + ' phút'
            } - ${timeDetails.seconds + ' giây'}`}</strong>
          </>
        )}
      </AntModal>
    </Row>
  );
}

export default index;
