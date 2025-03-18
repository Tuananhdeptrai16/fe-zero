import React, { useRef, useState } from 'react';
import { Col, Form, Row, Table } from 'antd';
import {
  DeleteOutlined,
  PlusOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import AntButton from 'src/@crema/component/AntButton';
import FormHidden from 'src/@crema/core/Form/FormHidden';
import { isEmpty } from 'src/shared/utils/Typeof';
import FormContent from 'src/@crema/component/FormContent';
import notification from 'src/shared/utils/notification';
import AntModal from 'src/@crema/component/AntModal';
import FormStream from './FormStream';
import { MODAL_SIZE } from 'src/shared/constants/Modal';

Streams.propTypes = {};

export const STREAMS = ['definitions', 'streams'];

function Streams() {
  const refFormStream = useRef();
  const [isOpenDialogStream, setOpenDialogStream] = useState(false);
  const [isOpenDialogDeleteStream, setOpenDialogDeleteStream] = useState(false);
  const [rowData, setRowData] = useState(null);

  const streams = Form.useWatch(STREAMS);
  const form = Form.useFormInstance();
  const dataSourceRender = Object.values(streams || {})?.map((item, index) => {
    return {
      index: index,
      key: item?.name_schema,
      ...item,
    };
  });
  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'stt',
      render: (value) => value + 1,
      width: 80,
    },
    {
      title: 'Tên luồng',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Thao tác',
      key: 'actions',
      width: 100,
      fixed: 'right',
      render: (_, record) => {
        return (
          <div className='d-flex items-center justify-center'>
            <AntButton
              shape='circle'
              icon={<SettingOutlined />}
              className='icon-btn'
              onClick={() => {
                const parameterizedRequests = (
                  record?.retriever?.partition_router || []
                ).find((item) => item?.type === 'ListPartitionRouter');
                const parentStream = (
                  record?.retriever?.partition_router || []
                ).find((item) => item?.type === 'SubstreamPartitionRouter');
                setRowData({
                  ...record,
                  retriever: {
                    ...(record?.retriever || {}),
                    parameterized_requests: parameterizedRequests,
                    parent_stream: parentStream,
                  },
                });
                setOpenDialogStream(true);
              }}
            />
            <AntButton
              shape='circle'
              icon={<DeleteOutlined />}
              className='icon-btn'
              onClick={() => {
                setRowData(record);
                setOpenDialogDeleteStream(true);
              }}
            />
          </div>
        );
      },
    },
  ];

  const defaultRequestParametersTemp =
    rowData?.retriever?.requester?.request_parameters || {};
  const keysDefaultParamsTemp =
    Object.keys(defaultRequestParametersTemp || {}) || [];

  const initParametersTemp = keysDefaultParamsTemp?.map((key) => {
    return {
      key,
      value: defaultRequestParametersTemp[key],
    };
  });

  const defaultRequestHeaderTemp =
    rowData?.retriever?.requester?.request_headers || {};
  const keysDefaultHeaderTemp =
    Object.keys(defaultRequestHeaderTemp || {}) || [];

  const initRequestHeaderTemp = keysDefaultHeaderTemp?.map((key) => {
    return {
      key,
      value: defaultRequestHeaderTemp[key],
    };
  });

  const defaultBodyTemp =
    rowData?.retriever?.requester?.request_body_json || {};
  const keysDefaultBodyTemp = Object.keys(defaultBodyTemp || {}) || [];

  const initBodyTemp = keysDefaultBodyTemp?.map((key) => {
    return {
      key,
      value: defaultBodyTemp[key],
    };
  });

  const initialValues = {
    ...rowData,
    request_parameters_temp: initParametersTemp,
    request_headers_temp: initRequestHeaderTemp,
    request_body_temp: initBodyTemp,
  };

  return (
    <div className={'mt-6'}>
      <FormHidden name={STREAMS} />
      <Row>
        <Col span={24}>
          <div className='d-flex items-center justify-between mb-3'>
            <h5 className='mb-0'>Luồng</h5>
            <AntButton
              icon={<PlusOutlined />}
              onClick={() => {
                setRowData(null);
                setOpenDialogStream(true);
              }}>
              Thêm mới
            </AntButton>
          </div>
        </Col>
        <Col span={24}>
          <Table
            dataSource={dataSourceRender}
            columns={columns}
            pagination={false}
          />
          <AntModal
            key={`modal_stream_${isOpenDialogStream}_${rowData?.name}`}
            size={MODAL_SIZE.MEDIUM}
            bodyStyle={{ maxHeight: '75vh', overflow: 'auto' }}
            centered
            title={isEmpty(rowData) ? 'Thêm mới luồng' : 'Chỉnh sửa luồng'}
            open={isOpenDialogStream}
            onOk={() => {
              if (refFormStream.current) {
                refFormStream.current.submit();
              }
            }}
            okText={isEmpty(rowData) ? 'Thêm mới' : 'Cập nhật'}
            onCancel={() => {
              setOpenDialogStream(false);
              setRowData(null);
            }}>
            <FormContent
              key={`form-stream-${rowData?.name}-${isOpenDialogStream}`}
              initialValues={rowData ? initialValues : {}}
              layout='vertical'
              onFinish={(data) => {
                const indexStream = rowData?.index;
                const streamSameNameIndex = (dataSourceRender || []).findIndex(
                  (item, index) =>
                    item.name === data?.name && index !== indexStream,
                );

                if (streamSameNameIndex !== -1) {
                  notification.warning(
                    'Tên luồng đã tồn tại, vui lòng nhập tên luồng khác !',
                  );
                  return;
                }

                const { type, name, primary_key, retriever } = data;
                const partitionRouter = [
                  retriever.parameterized_requests,
                  retriever.parent_stream,
                ].filter((item) => !isEmpty(item));
                const stream = {
                  type,
                  name,
                  primary_key,
                  retriever: {
                    type: 'SimpleRetriever',
                    requester: retriever.requester,
                    record_selector: retriever.record_selector,
                    paginator: retriever.paginator,
                    partition_router: !isEmpty(partitionRouter)
                      ? partitionRouter
                      : undefined,
                  },
                  schema_loader: {
                    type: 'InlineSchemaLoader',
                    schema: {
                      $ref: `#/schemas/${name}`,
                    },
                  },
                };
                if (indexStream) {
                  delete (streams || {})[rowData?.name];
                }
                form.setFieldValue(STREAMS, {
                  ...(streams || {}),
                  [name]: stream,
                });
                setOpenDialogStream(false);
                setRowData(null);
              }}
              ref={refFormStream}>
              <FormStream listStream={dataSourceRender} />
            </FormContent>
          </AntModal>
          <AntModal
            key={`modal_delete_stream_${isOpenDialogDeleteStream}_${rowData?.name}`}
            bodyStyle={{ maxHeight: '75vh', overflow: 'auto' }}
            centered
            title={'Xóa luồng'}
            open={isOpenDialogDeleteStream}
            onOk={() => {
              delete (streams || {})[rowData?.name];
              form.setFieldValue(STREAMS, { ...(streams || {}) });
              setOpenDialogDeleteStream(false);
              notification.success('Xóa luồng thành công');
              setRowData(null);
            }}
            okText='Xác nhận'
            onCancel={() => {
              setOpenDialogDeleteStream(false);
            }}>
            <span>Bạn có chắc chắn muốn xóa luồng: </span>
            <span className='warning-text-color'>{rowData?.name}</span>
          </AntModal>
        </Col>
      </Row>
    </div>
  );
}

export default Streams;
