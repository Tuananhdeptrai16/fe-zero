import React from 'react';
import config from 'src/config';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'antd';

export const AppHelpCenter = ({ isWorkspace }) => {
  const nav = useNavigate();
  return (
    <Tooltip title={'Trung tâm trợ giúp'}>
      <QuestionCircleOutlined
        style={{
          fontSize: 20,
          marginLeft: isWorkspace ? 12 : 0,
          color: isWorkspace ? '#FFFFFF' : '#000000',
        }}
        onClick={() => nav(config.routes.helpCenter)}
      />
    </Tooltip>
  );
};
