import React, { useState } from 'react';
import { Layout } from 'antd';
import AppSidebar from './AppSidebar';
import AppHeader from './AppHeader';
import './index.style.less';
import { AppContentView } from '../../../index';
// import AppThemeSetting from '../../AppThemeSetting';
import AppFooter from '../components/AppFooter';
import clsx from 'clsx';
import { FooterType } from '../../../../shared/constants/AppEnums';
import { useLayoutContext } from '../../../utility/AppContextProvider/LayoutContextProvider';

const MiniSidebarToggle = () => {
  const [isCollapsed, setCollapsed] = useState(false);
  const { footer, footerType } = useLayoutContext();

  const onToggleSidebar = () => {
    setCollapsed(!isCollapsed);
  };
  return (
    <Layout
      className={clsx('app-layout-mini-sidebar', {
        appMainFooter: footer && footerType === FooterType.FLUID,
        appMainFixedFooter: footer && footerType === FooterType.FIXED,
      })}>
      <AppSidebar isCollapsed={isCollapsed} onToggleSidebar={onToggleSidebar} />

      <Layout className='app-layout-mini-sidebar-main'>
        <AppHeader
          isCollapsed={isCollapsed}
          onToggleSidebar={onToggleSidebar}
        />
        <AppContentView />
        <AppFooter />
      </Layout>
      {/*<AppThemeSetting />*/}
    </Layout>
  );
};

export default MiniSidebarToggle;
