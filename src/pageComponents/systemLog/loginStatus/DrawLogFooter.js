import React from 'react';
import { Space } from 'antd';
import AntButton from 'src/@crema/component/AntButton';
import { useIntl } from 'react-intl';

export const DrawLogFooter = ({
  onCloseDrawer,
  onLogout,
  onHandleLogin,
  rowData,
}) => {
  const { messages } = useIntl();
  const isBlock = rowData?.user_info_response?.status === 'locked';
  return (
    <div>
      <Space className='w-full justify-end'>
        <AntButton onClick={onCloseDrawer}>
          {messages['dialog.button.cancel']}
        </AntButton>
        <AntButton type='primary' onClick={onLogout} danger>
          {messages['common.logout']}
        </AntButton>
        <AntButton type='primary' onClick={onHandleLogin}>
          {isBlock
            ? messages['common.unblockLogin']
            : messages['common.blockLogin']}
        </AntButton>
      </Space>
    </div>
  );
};
