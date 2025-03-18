import React, { useEffect, useState } from 'react';
import { Card, Layout } from 'antd';
import AppHeader from './AppHeader';
import './index.style.less';
import { AppContentView } from '../../../index';
import AppFooter from '../components/AppFooter';
import clsx from 'clsx';
import { FooterType, LayoutType } from 'src/shared/constants/AppEnums';
import AppSidebar from './AppSidebar';
import { useLayoutContext } from '../../../utility/AppContextProvider/LayoutContextProvider';
import { useSubHeaderApp } from 'src/@crema/component/SubHeaderApp/SubHeaderAppContext';
import ConditionalWrapper from 'src/@crema/core/ConditionalWrapper';
import { useLocation } from 'react-router-dom';
// import Workspace from 'src/pages/workspaceUsecase';
import AppSideBarLeft from '../components/AppSideBarLeft';
import WorkspaceDashboard from 'src/pages/workspaceDashboard';
const { Sider, Content } = Layout;

const HorDarkLayout = () => {
  const [isVisible, setVisible] = useState(true);
  const [siderWidth, setSiderWidth] = useState(256);
  const { footer, footerType, layoutType } = useLayoutContext();
  const { pathname } = useLocation();
  const { content: subHeaderApp } = useSubHeaderApp();
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 768) {
        setSiderWidth(0);
      } else if (screenWidth < 1024) {
        setSiderWidth(200);
      } else {
        setSiderWidth(256);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Gọi ngay khi render lần đầu

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (layoutType === LayoutType.FRAMED) {
      document.body.classList.add('framedHorDarkLayout');
    } else {
      document.body.classList.remove('framedHorDarkLayout');
    }
  }, [layoutType]);

  return (
    <Layout
      className={clsx('app-layout-hor-dark', {
        appMainFooter: footer && footerType === FooterType.FLUID,
        appMainFixedFooter: footer && footerType === FooterType.FIXED,
      })}>
      <AppSidebar visible={isVisible} onClose={onClose} />
      <AppHeader showDrawer={showDrawer} />

      <Layout className='app-layout-hor-dark-main'>
        {pathname === '/workspace' || pathname === '/' ? (
          // <Workspace />
          <WorkspaceDashboard />
        ) : (
          <ConditionalWrapper
            condition={pathname === '/workspace'}
            wrapper={(children) => <Card bordered={false}>{children}</Card>}>
            {pathname !== '/my-profile' && (
              <Sider
                theme='light'
                width={siderWidth}
                trigger={null}
                collapsible
                style={{ transition: 'width 0.3s' }}>
                <AppSideBarLeft />
              </Sider>
            )}
            <Content>
              <div className='container pl-10'>
                {subHeaderApp}
                <AppContentView />
                <AppFooter />
              </div>
            </Content>
          </ConditionalWrapper>
        )}
      </Layout>
      {/*<AppThemeSetting />*/}
    </Layout>
  );
};

export default HorDarkLayout;
