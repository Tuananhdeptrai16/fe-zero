import React from 'react';
import { Dropdown, Input, Layout } from 'antd';
import './index.style.less';
import { FiMoreVertical } from 'react-icons/fi';
import AppLogo from '../components/AppLogo';
import { useIntl } from 'react-intl';
import AppLanguageSwitcher from '../../AppLanguageSwitcher';
// import AppHeaderMessages from '../../AppHeaderMessages';
import AppNotifications from '../../AppNotifications';

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
    <Header className='app-header-mini'>
      <AppLogo />

      <Search
        className='header-search-mini'
        placeholder={messages['common.searchHere']}
      />
      <div className='app-header-mini-sectionDesktop'>
        <AppLanguageSwitcher />
        {/*<AppHeaderMessages />*/}
        <AppNotifications />
      </div>
      <div className='app-header-mini-section-mobile'>
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
