import React from 'react';
import config from 'src/config';
import Icon from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'antd';
import { UsageGuideIcon } from 'src/assets/icon/sidebar';

export const AppGuideCenter = ({ isWorkspace }) => {
  const nav = useNavigate();
  return (
    <Tooltip title={'Hướng dẫn sử dụng'}>
      <Icon
        component={UsageGuideIcon}
        style={{
          marginTop: 2,
          fontSize: 22,
          marginLeft: isWorkspace ? 12 : 0,
          color: isWorkspace ? '#FFFFFF' : '#000000',
        }}
        onClick={() => nav(config.routes.usageGuideView)}
      />
    </Tooltip>
  );
};
