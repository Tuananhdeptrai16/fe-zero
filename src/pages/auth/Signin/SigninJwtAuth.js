import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import AppRowContainer from '../../../@crema/core/AppRowContainer';
import { Card, Col } from 'antd';
import AppPageMetadata from '../../../@crema/core/AppPageMetadata';
import AppAnimateGroup from '../../../@crema/core/AppAnimateGroup';

import './index.style.less';

// import { GithubOutlined, TwitterOutlined } from '@ant-design/icons';
import { ReactComponent as Logo } from '../../../assets/user/login.svg';
import FormSignIn from 'src/@crema/component/FormSignIn/index';
import FormInput from 'src/@crema/core/Form/FormInput/index';
import FormInputPassword from 'src/@crema/core/Form/FormInputPassword';

const SignInJwtAuth = () => {
  // const navigate = useNavigate();

  // const onGoToForgetPassword = () => {
  //   navigate('/forget-password', { tab: 'jwtAuth' });
  // };

  const { messages } = useIntl();

  return (
    <div className='user-pages'>
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
                  <h3>
                    <IntlMessages id='common.login' />
                  </h3>
                </div>

                <FormSignIn
                  className='user-form'
                  initialValues={{ remember: true }}>
                  <FormInput
                    name='username'
                    label={messages['common.username']}
                    className='form-field'
                    // rules={{ username: [] }}
                    required
                  />

                  <FormInputPassword
                    name='password'
                    label={'common.password'}
                    required
                    className='form-field'
                  />
                  <div className='form-field-row'>
                    {/*<Form.Item*/}
                    {/*  className='user-field-action'*/}
                    {/*  name='remember'*/}
                    {/*  valuePropName='checked'>*/}
                    {/*  <Checkbox>*/}
                    {/*    <IntlMessages id='common.rememberMe' />*/}
                    {/*  </Checkbox>*/}
                    {/*</Form.Item>*/}
                    {/*<span*/}
                    {/*  className='user-field-action-link ml-auto'*/}
                    {/*  onClick={onGoToForgetPassword}>*/}
                    {/*  <IntlMessages id='common.forgetPassword' />*/}
                    {/*</span>*/}
                  </div>
                </FormSignIn>

                {/* <div className='user-card-footer-action'>
                  <span>
                    <IntlMessages id='common.orLoginWith' />
                  </span>
                  <div className='user-social-link'>
                    <Button>
                      <FaFacebookF />
                    </Button>
                    <Button>
                      <GithubOutlined />
                    </Button>
                    <Button>
                      <TwitterOutlined />
                    </Button>
                  </div>
                </div> */}

                {/*<div className='user-card-footer'>*/}
                {/*  <span>*/}
                {/*    <IntlMessages id='common.dontHaveAccount' />*/}
                {/*  </span>*/}
                {/*  <span className='user-card-footer-link'>*/}
                {/*    <Link to='/signup'>*/}
                {/*      <IntlMessages id='common.signup' />*/}
                {/*    </Link>*/}
                {/*  </span>*/}
                {/*</div>*/}
              </Col>
            </AppRowContainer>
          </Card>
        </div>
      </AppAnimateGroup>
    </div>
  );
};

export default SignInJwtAuth;
