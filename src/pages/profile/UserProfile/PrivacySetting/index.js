import React from 'react';
import { Typography } from 'antd';
import { useIntl } from 'react-intl';
import AppTabs from 'src/@crema/core/AppTabs/AppTabs';
import { TablePermissionProfile } from 'src/pages/profile/UserProfile/PrivacySetting/TablePermissionProfile';
import { TableGroupPermissionProfile } from 'src/pages/profile/UserProfile/PrivacySetting/TableGroupPermissionProfile';
import { useNavigate } from 'react-router-dom';
import { KEY_TAB_PROFILE } from 'src/shared/constants/userProfile.constant';

export const PrivacySetting = () => {
  const { messages } = useIntl();
  const nav = useNavigate();
  const tabItems = [
    {
      label: 'Danh sách nhóm quyền',
      key: 'list_group_permission',
      children: (
        <>
          <TableGroupPermissionProfile />
        </>
      ),
    },
    {
      label: 'Danh sách hành động',
      key: 'list_permission',
      children: (
        <>
          <TablePermissionProfile />
        </>
      ),
    },
  ];
  return (
    <div>
      <Typography.Title level={4}>
        {messages['userProfile.privacy']}
      </Typography.Title>
      <AppTabs
        items={tabItems}
        className={'userProfilePrivacy'}
        onChange={() => {
          nav({ search: `?tab=${KEY_TAB_PROFILE.PRIVACY}&p=1` });
        }}
      />
    </div>
  );
};
