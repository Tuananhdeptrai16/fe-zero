import React from 'react';
import NotificationBar from 'src/@crema/core/AppLayout/HorDarkLayout/NotificationBar';
import AppLogo from 'src/@crema/core/AppLayout/components/AppLogo';
import AppLanguageSwitcher from 'src/@crema/core/AppLanguageSwitcher';
import AppNotifications from 'src/@crema/core/AppNotifications';
import UserInfo from 'src/@crema/core/AppLayout/components/UserInfo';
import { Dropdown, Layout } from 'antd';
import { FiMoreVertical } from 'react-icons/fi';
import { AppHelpCenter } from 'src/@crema/core/AppHelpCenter';
import { AppSearch } from 'src/@crema/core/AppSearch';
import { AppGuideCenter } from 'src/@crema/core/AppGuideCenter';
import { AppSetting } from 'src/@crema/core/AppSetting';

export const HeaderWorkspace = () => {
  const items = [
    {
      label: <AppNotifications isWorkspace />,
      key: 'app_header-1',
    },
    {
      label: <AppLanguageSwitcher />,
      key: 'app_header-2',
    },
  ];

  const { Header } = Layout;
  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 10 }}>
      <Header className='app-header-hor-dark'>
        <NotificationBar />

        <div className='header-hor-dark-main'>
          <div className='container'>
            <div className='header-hor-dark-main-flex'>
              <AppLogo
                hasSidebarColor
                darkLogoUrl={'/assets/images/logo/logoTextWhite.svg'}
                lightLogoUrl={'/assets/images/logo/logoTextWhite.svg'}
              />

              <div className='app-header-hor-dark-sectionDesktop ml-auto '>
                <AppSearch isWorkspace />
                {/*<AppHeaderMessages />*/}
                <AppNotifications isWorkspace />
                <AppSetting isWorkspace />
                <AppHelpCenter isWorkspace />
                <AppGuideCenter isWorkspace />
                <UserInfo />
              </div>
              <div className='app-header-hor-dark-section-mobile'>
                <Dropdown menu={{ items }} trigger={['click']}>
                  <a
                    className='ant-dropdown-link'
                    onClick={(e) => e.preventDefault()}>
                    <FiMoreVertical />
                  </a>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </Header>
    </div>
  );
};
