import React from 'react';
import { Dropdown, Input, Layout } from 'antd';
import './index.style.less';
import AppLogo from '../components/AppLogo';
import { useIntl } from 'react-intl';
import AppLanguageSwitcher from '../../AppLanguageSwitcher';
// import AppHeaderMessages from '../../AppHeaderMessages';
import AppNotifications from '../../AppNotifications';
import PropTypes from 'prop-types';
import { FiMoreVertical } from 'react-icons/fi';
import { AiOutlineMenu } from 'react-icons/ai';

const AppHeader = ({ showDrawer }) => {
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
    <Header className='app-DrawerLayout-header'>
      <a className='trigger' onClick={showDrawer}>
        <AiOutlineMenu />
      </a>
      <AppLogo />
      <Search
        className='drawerLayout-header-search'
        placeholder={messages['common.searchHere']}
      />
      <div className='app-DrawerLayout-header-sectionDesktop'>
        <AppLanguageSwitcher />
        {/*<AppHeaderMessages />*/}
        <AppNotifications />
      </div>
      <div className='app-DrawerLayout-header-section-mobile'>
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

AppHeader.propTypes = {
  showDrawer: PropTypes.func,
};
