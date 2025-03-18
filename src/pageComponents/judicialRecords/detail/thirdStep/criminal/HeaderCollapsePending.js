import React, { useCallback } from 'react';
import {
  CheckOutlined,
  ClockCircleOutlined,
  DownOutlined,
  UpOutlined,
} from '@ant-design/icons';
import AntDatePicker from 'src/@crema/component/AntDatePicker';
import { Badge, Space } from 'antd';
import { KEY_STATUS_CREATE_JUDICIAL_RECORD } from 'src/pages/judicialRecords/createRecordInformation/utils';
import { useIntl } from 'react-intl';

const statusConfig = {
  [KEY_STATUS_CREATE_JUDICIAL_RECORD.PENDING]: {
    icon: <ClockCircleOutlined style={{ color: 'orange' }} />,
    text: 'Chờ xác thực',
    textClass: 'text-secondary',
  },
  [KEY_STATUS_CREATE_JUDICIAL_RECORD.VERIFIED]: {
    icon: <ClockCircleOutlined style={{ color: 'orange' }} />,
    text: 'Chờ xác thực',
    textClass: 'text-secondary',
  },
  [KEY_STATUS_CREATE_JUDICIAL_RECORD.APPROVED]: {
    icon: <CheckOutlined className='text-primary' />,
    text: 'Đã xác thực',
    textClass: 'text-primary',
  },
};

export const HeaderCollapsePending = ({
  id,
  title,
  isOpenPanel,
  verifyRequests,
}) => {
  const { messages } = useIntl();
  const isChecked = (verifyRequests || []).some(
    (item) => item?.organization_id === id,
  );
  const itemChecked = (verifyRequests || []).find(
    (item) => item?.organization_id === id,
  );

  const renderContentByStatus = useCallback(() => {
    if (!isChecked) {
      return (
        <Space>
          <span className='text-secondary italic'>Không yêu cầu xác thực</span>{' '}
          <Badge color='rgba(0, 0, 0, 0.25)' />
        </Space>
      );
    }

    const status = itemChecked?.status;
    const { icon, text, textClass } = statusConfig[status] || {};
    return (
      <Space>
        {icon}
        <span className={textClass}>{text}</span>
        <Badge color='rgba(0, 0, 0, 0.25)' />
      </Space>
    );
  }, [isChecked, itemChecked?.status]);

  return (
    <div className='d-flex items-center'>
      <span className='mr-2'>{title}</span>
      {isOpenPanel ? <UpOutlined /> : <DownOutlined />}
      <div className='ml-auto' onClick={(e) => e.stopPropagation()}>
        <Space size={'large'}>
          {renderContentByStatus()}
          <div>
            <label className={'mr-2'}>{messages['common.feedbackDate']}:</label>
            <AntDatePicker
              value={
                verifyRequests?.find((item) => item?.organization_id === id)
                  ?.due_date
              }
              disabled
            />
          </div>
        </Space>
      </div>
    </div>
  );
};
