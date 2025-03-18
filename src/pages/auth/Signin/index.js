/* eslint-disable */
import React, { useEffect } from 'react';
import AuthWrapper from '../AuthWrapper';
import AppPageMetadata from '../../../@crema/core/AppPageMetadata';
import { useLocation } from 'react-router-dom';
import notification from 'src/shared/utils/notification';
import { useAuthSSOContext } from 'src/@crema/utility/AuthSSOContext';
import SignInJwtAuth from 'src/pages/auth/Signin/SigninJwtAuth';

const Signin = () => {
  const location = useLocation();
  const { signIn } = useAuthSSOContext();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const reason = queryParams.get('reason');
    if (reason === 'expired') {
      notification.warning('Phiên đăng nhập hết hạn');
    }

    if (reason === 'not_access') {
      notification.error('Tài khoản không có quyền truy câp');
    }

    // if (reason === 'account_error') {
    //   notification.error('Lỗi tài khoản, liên hệ Admin để được hỗ trợ');
    // }

    window.history.replaceState(
      {},
      window.document.title,
      window.location.origin + window.location.pathname,
    );
  }, [location.search]);

  useEffect(() => {
    // signIn();
  }, []);

  return (
    <AuthWrapper>
      <AppPageMetadata title='Login' />
      <SignInJwtAuth />
    </AuthWrapper>
  );

  // return (
  //   <AuthWrapper>
  //     <AppPageMetadata title='Login' />
  //     <div className='loader'>
  //       <div className='site-logo'>
  //         <img src='/assets/images/logo/logo_new.png' alt='logo' />
  //       </div>
  //       <div className='loader-spin'>
  //         <span className='ant-spin-dot ant-spin-dot-spin'>
  //           <i></i>
  //           <i></i>
  //           <i></i>
  //           <i></i>
  //         </span>
  //       </div>
  //     </div>
  //   </AuthWrapper>
  // );
};

export default Signin;
