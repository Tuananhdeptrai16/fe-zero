import React from 'react';
import AppRowContainer from '../../../@crema/core/AppRowContainer';
import { Card, Col } from 'antd';
import AppPageMetadata from '../../../@crema/core/AppPageMetadata';
import AppAnimateGroup from '../../../@crema/core/AppAnimateGroup';

import './index.style.less';

import { ReactComponent as Logo } from '../../../assets/user/login.svg';
import FormInput from 'src/@crema/core/Form/FormInput/index';
import FormInputPassword from 'src/@crema/core/Form/FormInputPassword';
import FormChangeInfoFirstLogin from 'src/@crema/component/FormChangeInfoFirstLogin';
import AuthWrapper from 'src/pages/auth/AuthWrapper';
import { useAuthUser } from 'src/@crema/utility/AuthHooks';

const ChangeInfoFirstLogin = () => {
  const { user } = useAuthUser();
  return (
    <AuthWrapper>
      <AppPageMetadata title='Login' />
      <div className='change-info-first-login-pages'>
        <AppAnimateGroup type='bottom'>
          <AppPageMetadata title='Signin' />
          <div className='user-container'>
            <Card className='user-card user-card-lg'>
              <AppRowContainer>
                <Col xs={24} md={12}>
                  <div className='user-styled-img'>
                    <Logo />
                  </div>
                </Col>
                <Col xs={24} md={12}>
                  <div className='user-card-header'>
                    <h3>Cập nhật thông tin lần đầu đăng nhập</h3>
                  </div>
                  <FormChangeInfoFirstLogin
                    initialValues={{ email: user?.email }}>
                    <FormInput
                      name='email'
                      label={'Email'}
                      className='form-field'
                      rules={{ email: [] }}
                      required
                    />

                    <FormInputPassword
                      name='new_password'
                      label={'common.newPassword'}
                      rules={{
                        is_password: [],
                      }}
                      tooltip={{
                        title:
                          'Mật khẩu có độ dài 6 - 32 ký tự, bao gồm a-z,A-Z,0-9',
                      }}
                      required
                    />
                    <FormInputPassword
                      name={'re_password'}
                      label={'common.confirmPassword'}
                      rules={{
                        confirmed: [{ field: 'new_password' }],
                        is_password: [],
                      }}
                      tooltip={{
                        title:
                          'Mật khẩu có độ dài 6 - 32 ký tự, bao gồm a-z,A-Z,0-9',
                      }}
                      required
                    />
                    <div className='form-field-row'></div>
                  </FormChangeInfoFirstLogin>
                </Col>
              </AppRowContainer>
            </Card>
          </div>
        </AppAnimateGroup>
      </div>
    </AuthWrapper>
  );
};

export default ChangeInfoFirstLogin;
