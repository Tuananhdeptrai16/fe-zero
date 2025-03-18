import React from 'react';
import StyledForgotPassword from './StyledForgotPassword';
import './index.style.less';
import AppPageMetadata from '../../../@crema/core/AppPageMetadata';
import AuthWrapper from '../AuthWrapper';

const ForgetPassword = () => {
  return (
    <AuthWrapper type='bottom'>
      <AppPageMetadata title='Forgot Password' />
      <StyledForgotPassword />
    </AuthWrapper>
  );
};

export default ForgetPassword;
