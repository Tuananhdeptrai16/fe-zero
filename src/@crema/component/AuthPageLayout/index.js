/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import AppLogo from 'src/@crema/core/AppLayout/components/AppLogo';
import './index.styles.less';
import { Link } from 'react-router-dom';
import IntlMessages from '../../../@crema/utility/IntlMessages';
// import AppIconButton from 'src/@crema/core/AppIconButton';
// import { useLocation } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import AppLanguageSwitcher from 'src/@crema/core/AppLanguageSwitcher/index';
const { Header, Footer, Content } = Layout;
const AuthPageLayout = ({ children }) => {
  // const { pathname } = useLocation();
  // const navigate = useNavigate();
  // let messageId = 'common.signIn';
  // let path = '/signin';

  // if (pathname === '/signin') {
  //   messageId = 'common.signup';
  //   path = '/signup';
  // }

  return (
    <Layout className='auth-page-layout'>
      <Header className='auth-page-layout__header-container'>
        <div className='auth-page-layout__header'>
          <Link to='/'>
            <AppLogo />
          </Link>
          <div className='auth-page-layout__header-action'>
            {/*<AppLanguageSwitcher />*/}
            {/*<Link to='/help'>*/}
            {/*  <span className='auth-page-layout__header-link'>*/}
            {/*    <IntlMessages id='header.helps' />*/}
            {/*  </span>*/}
            {/*</Link>*/}
            {/*<AppIconButton*/}
            {/*  className='auth-page-layout__header-btn'*/}
            {/*  shape='round'*/}
            {/*  Cổng thông tin*/}
            {/*</AppIconButton>*/}
          </div>
        </div>
      </Header>
      <Content className='auth-page-layout__body'>{children}</Content>
      {/*<Footer className='auth-page-layout__footer-container'>*/}
      {/*  <div className='auth-page-layout__footer'>*/}
      {/*    <IntlMessages id='footer.copyRight' />*/}
      {/*  </div>*/}
      {/*</Footer>*/}
    </Layout>
  );
};

export default AuthPageLayout;

AuthPageLayout.propTypes = {
  children: PropTypes.node,
};
