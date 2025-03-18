import { CheckOutlined, CopyOutlined } from '@ant-design/icons';
import { Tooltip, Typography } from 'antd';
import React from 'react';
import AntTextArea from 'src/@crema/component/AntTextArea';
import {
  getLongToken,
  getToken,
} from 'src/@crema/services/Application/AuthenStorage';
import {
  CLIENT_ID,
  getLocalData,
} from 'src/@crema/services/Application/LocalStorage';
import { useCopyToClipboard } from 'src/hooks/useCopyToClipboard';

export const TokenVerifyForm = () => {
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  const longToken = getLongToken();
  const token = getToken();
  const clientId = getLocalData(CLIENT_ID);

  const value = `client_id=${clientId}&token=${token}&long_token=${longToken}`;
  const handleCopy = () => {
    copyToClipboard(value);
  };
  return (
    <div>
      <Typography.Title level={4}>Mã xác thực</Typography.Title>
      <div className='d-flex gap-2'>
        <AntTextArea
          value={value}
          disabled
          autoSize={{ minRows: 1, maxRows: 3 }}
          style={{ maxWidth: 500 }}
        />
        <Tooltip title={isCopied ? 'Đã sao chép' : 'Sao chép'}>
          {isCopied ? (
            <CheckOutlined style={{ color: '#4caf50', fontSize: 20 }} />
          ) : (
            <CopyOutlined style={{ fontSize: 20 }} onClick={handleCopy} />
          )}
        </Tooltip>
      </div>
    </div>
  );
};
