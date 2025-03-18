import React from 'react';
import { Layout } from 'antd';
import './AppFooter.style.less';
import { useLayoutContext } from '../../../utility/AppContextProvider/LayoutContextProvider';

const { Footer } = Layout;

const AppFooter = () => {
  const { footer } = useLayoutContext();

  if (footer) {
    return (
      <Footer className='app-main-footer'>
        <p>Copy right Ad Network 2021</p>
      </Footer>
    );
  }
  return null;
};

export default AppFooter;
