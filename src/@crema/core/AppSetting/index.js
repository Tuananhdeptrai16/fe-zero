import React from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { KEY_TAB_PROFILE } from 'src/shared/constants/userProfile.constant';
import config from 'src/config';

export const AppSetting = ({ isWorkspace, ...rest }) => {
  const { messages } = useIntl();
  const nav = useNavigate();
  return (
    <Tooltip title={messages['userProfile.workspace']}>
      <SettingOutlined
        style={{
          fontSize: 20,
          marginLeft: isWorkspace ? 18 : 0,
          color: isWorkspace ? '#FFFFFF' : '#000000',
        }}
        onClick={() => {
          nav(config.routes.profileByTab(KEY_TAB_PROFILE.WORKSPACE));
        }}
        {...rest}
      />
    </Tooltip>
  );
};
