import React from 'react';
import { Dropdown, Input, Layout } from 'antd';
import './index.style.less';
import { FiMoreVertical } from 'react-icons/fi';
import AppLogo from '../components/AppLogo';
import { useIntl } from 'react-intl';
import AppLanguageSwitcher from '../../AppLanguageSwitcher';
// import AppHeaderMessages from '../../AppHeaderMessages';
import AppNotifications from '../../AppNotifications';
import UserInfo from '../components/UserInfo';

const AppHeader = () => {
  const { Header } = Layout;
  const { Search } = Input;
  const { messages } = useIntl();

  // const menuMobile = (
  //   <Menu>
  //     {/*<AppHeaderMessages />*/}
  //     <AppNotifications />
  //     <AppLanguageSwitcher />
  //   </Menu>
  // );

  const items = [
    {
      label: <AppNotifications />,
      key: 'app_header-1',
    },
    {
      label: <AppLanguageSwitcher />,
      key: 'app_header-2',
    },
  ];

  return (
    <Header className='app-userMiniHeader'>
      <AppLogo />

      <Search
        className='userMiniHeader-search'
        placeholder={messages['common.searchHere']}
      />
      <div className='app-userMiniHeader-sectionDesktop'>
        <AppLanguageSwitcher />
        {/*<AppHeaderMessages />*/}
        <AppNotifications />
      </div>
      <UserInfo />
      <div className='app-userMiniHeader-section-mobile'>
        <Dropdown menu={{ items }} trigger={['click']}>
          <a className='ant-dropdown-link' onClick={(e) => e.preventDefault()}>
            <FiMoreVertical />
          </a>
        </Dropdown>
      </div>
    </Header>
  );
};

export default AppHeader;

AppHeader.propTypes = {};
