import React from 'react';
import { Layout } from 'antd';
import './index.style.less';
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';
import PropTypes from 'prop-types';
// import { useIntl } from 'react-intl';
// import AppLanguageSwitcher from '../../AppLanguageSwitcher';
// import AppHeaderMessages from '../../AppHeaderMessages';
import AppNotifications from '../../AppNotifications';
// import { FiMoreVertical } from 'react-icons/fi';
import { useSubHeaderApp } from 'src/@crema/component/SubHeaderApp/SubHeaderAppContext';
import { AppHelpCenter } from 'src/@crema/core/AppHelpCenter';
import UserInfo from 'src/@crema/core/AppLayout/components/UserInfo';
import { AppSearch } from 'src/@crema/core/AppSearch';
import { AppGuideCenter } from 'src/@crema/core/AppGuideCenter';
import { AppSetting } from 'src/@crema/core/AppSetting';
// import UserBalance from '../components/UserInfoMiniToggle/UserBalance';
// import ButtonOutline from 'src/@crema/component/ButtonOutline';

const AppHeader = ({ isCollapsed, onToggleSidebar }) => {
  const { Header } = Layout;
  const { content: subHeaderApp } = useSubHeaderApp();

  // const { Search } = Input;
  // const { messages } = useIntl();

  // const menuMobile = (
  //   <Menu>
  //     {/* <AppHeaderMessages /> */}
  //     <AppNotifications />
  //     <AppLanguageSwitcher />
  //   </Menu>
  // );

  // const items = [
  //   {
  //     label: <AppNotifications />,
  //     key: 'app_header-1',
  //   },
  //   {
  //     label: <AppLanguageSwitcher />,
  //     key: 'app_header-2',
  //   },
  // ];

  return (
    <Header className='app-header-mini-sidebar'>
      <div className='app-header-mini-sidebar--action'>
        {React.createElement(
          isCollapsed ? AiOutlineMenuUnfold : AiOutlineMenuFold,
          {
            className: 'trigger',
            onClick: onToggleSidebar,
          },
        )}
      </div>

      {subHeaderApp}

      <div className='app-header-mini-sidebar__user-info'>
        {/*<Search*/}
        {/*  className='header-search-mini-sidebar'*/}
        {/*  placeholder={messages['common.searchHere']}*/}
        {/*/>*/}
        <AppSearch />
        <AppNotifications />
        <AppSetting />
        <AppHelpCenter />
        <AppGuideCenter />
        <UserInfo />
      </div>

      {/*<div className='app-header-mini-sidebar-sectionDesktop'>*/}
      {/*  <AppLanguageSwitcher />*/}
      {/*   <AppHeaderMessages /> */}
      {/*</div>*/}
      {/*<div className='app-header-mini-sidebar-section-mobile'>*/}
      {/*<Dropdown menu={{ items }} trigger={['click']}>*/}
      {/*  <a className='ant-dropdown-link' onClick={(e) => e.preventDefault()}>*/}
      {/*    <FiMoreVertical />*/}
      {/*  </a>*/}
      {/*</Dropdown>*/}
      {/*</div>*/}
    </Header>
  );
};

export default AppHeader;

AppHeader.propTypes = {
  isCollapsed: PropTypes.bool,
  onToggleSidebar: PropTypes.func,
};
