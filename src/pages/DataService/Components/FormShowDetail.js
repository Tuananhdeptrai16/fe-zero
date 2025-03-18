import React from 'react';
import { Col, Row, Space, Tooltip } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { formatDateJs } from 'src/shared/utils/DateTime';
import { copyStringToClipboard } from 'src/shared/utils/Clipboard';
import notification from 'src/shared/utils/notification';
import { truncate } from 'lodash';
import { useIntl } from 'react-intl';

const FormShowDetail = ({ rowData }) => {
  const { messages } = useIntl();
  return (
    <>
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <Space size={[8, 0]}>
            <span className={'font-bold'}>
              {`${messages['form.dataServiceName']}: `}
            </span>
            <span className={'font-bold'}>{rowData?.name}</span>
          </Space>
        </Col>
        <Col span={24}>
          <Space size={[8, 0]}>
            <span
              className={
                'font-bold'
              }>{`${messages['form.dataServiceClientID']}: `}</span>
            <span className={'font-bold'}>{rowData?.client_id}</span>
            <Tooltip
              title={messages['form.dataServiceCopy']}
              key={'form.dataServiceKey'}>
              <CopyOutlined
                style={{ color: '#416ef0', cursor: 'pointer' }}
                onClick={() => {
                  copyStringToClipboard(rowData?.client_id);
                  notification.success('Sao chép Client ID thành công');
                }}
              />
            </Tooltip>
          </Space>
        </Col>
        <Col span={24}>
          <Space size={[8, 0]}>
            <span
              className={
                'font-bold'
              }>{`${messages['form.dataServiceKey']}: `}</span>
            <span className={'font-bold'}>
              {truncate(rowData?.token, { length: 30, omission: '...' })}
            </span>
            <Tooltip
              title={messages['form.dataServiceCopy']}
              key={'form.dataServiceKey'}>
              <CopyOutlined
                style={{ color: '#416ef0', cursor: 'pointer' }}
                onClick={() => {
                  copyStringToClipboard(rowData?.token);
                  notification.success('Sao chép Khóa truy cập thành công');
                }}
              />
            </Tooltip>
          </Space>
        </Col>
        {rowData?.type === 'public' && (
          <Col span={24}>
            <Space size={[8, 0]}>
              <span
                className={
                  'font-bold'
                }>{`${messages['form.dataServiceExpire']}: `}</span>
              <span className={'font-bold'}>
                {formatDateJs(rowData?.expired_time)}
              </span>
            </Space>
          </Col>
        )}
      </Row>
    </>
  );
};

export default FormShowDetail;
