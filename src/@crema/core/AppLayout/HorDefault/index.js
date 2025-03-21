import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import AppHeader from './AppHeader';
import './index.style.less';
import { AppContentView } from '../../../index';
// import AppThemeSetting from '../../AppThemeSetting';
import AppFooter from '../components/AppFooter';
import clsx from 'clsx';
import { FooterType, LayoutType } from '../../../../shared/constants/AppEnums';
import AppSidebar from './AppSidebar';
import { useLayoutContext } from '../../../utility/AppContextProvider/LayoutContextProvider';

const HorDefault = () => {
  const [isVisible, setVisible] = useState(false);
  const { footer, footerType, layoutType } = useLayoutContext();

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (layoutType === LayoutType.FRAMED) {
      document.body.classList.add('framedHorLayout');
    } else {
      document.body.classList.remove('framedHorLayout');
    }
  }, [layoutType]);

  return (
    <Layout
      className={clsx('app-layout-hor', {
        appMainFooter: footer && footerType === FooterType.FLUID,
        appMainFixedFooter: footer && footerType === FooterType.FIXED,
      })}>
      <AppSidebar visible={isVisible} onClose={onClose} />
      <AppHeader showDrawer={showDrawer} />
      <Layout className='app-layout-hor-main'>
        <div className='container'>
          <AppContentView />
          <AppFooter />
        </div>
      </Layout>
      {/*<AppThemeSetting />*/}
    </Layout>
  );
};

export default HorDefault;
