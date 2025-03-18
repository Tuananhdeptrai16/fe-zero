import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import { useIntl } from 'react-intl';
import AppRowContainer from '../../../@crema/core/AppRowContainer';
import { Button, Card, Checkbox, Col, Form } from 'antd';
import AppPageMetadata from '../../../@crema/core/AppPageMetadata';
import { ReactComponent as Logo } from '../../../assets/user/signup.svg';
import { useNavigate } from 'react-router-dom';
import FormSignUp from 'src/@crema/component/FormSignUp/index';
import FormInput from 'src/@crema/core/Form/FormInput/index';
import FormSelect from 'src/@crema/core/Form/FormSelect/index';

const SignupJwtAuth = () => {
  const { messages } = useIntl();
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(null);
  const navigate = useNavigate();

  const successRegister = () => {
    setIsRegisterSuccess(true);
  };

  const onGoBackToHome = () => {
    navigate('/');
  };

  return (
    <div className='user-pages'>
      <AppPageMetadata title='Signup' />
      <div className='user-container' key='a'>
        <Card className='user-card user-card-lg'>
          <AppRowContainer>
            <Col xs={24} lg={12}>
              <div className='user-styled-img mln'>
                <Logo />
              </div>
            </Col>
            {isRegisterSuccess ? (
              <Col xs={24} md={12} className='user-auth-col'>
                <div className='user-card-header '>
                  <h3>
                    <IntlMessages id='common.sendMail' />
                  </h3>
                </div>
                <div className='user-card-para'>
                  <p className='mb-0'>
                    <IntlMessages id='common.checkMail' />
                    {', '}
                    <IntlMessages id='common.verifyEmail' />
                  </p>
                </div>
                <Button
                  type='primary'
                  className='user-form-btn'
                  htmlType='submit'
                  onClick={onGoBackToHome}>
                  <IntlMessages id='error.goBackToHome' />
                </Button>
              </Col>
            ) : (
              <Col xs={24} md={12} className='user-auth-col'>
                <div className='user-card-header '>
                  <h3>
                    <IntlMessages id='common.signup' />
                  </h3>
                </div>

                <FormSignUp
                  className='user-form'
                  setSignUpSuccess={successRegister}>
                  <FormSelect
                    name='role'
                    className='form-field'
                    required
                    placeholder='Loại tài khoản*'
                    label='Loại tài khoản'
                    options={[
                      { value: 'agency', label: 'Agency' },
                      { value: 'publisher', label: 'Publisher' },
                    ]}
                  />
                  <FormInput
                    name='email'
                    label={messages['common.email']}
                    className='form-field'
                    rules={{ email: [] }}
                    required
                    placeholder={messages['common.email'] + '*'}
                  />
                  <FormInput
                    name='password'
                    label={messages['common.password']}
                    className='form-field'
                    type='password'
                    required
                    placeholder={messages['common.password'] + '*'}
                    rules={{ is_password: [] }}
                  />
                  <FormInput
                    label={messages['common.name']}
                    name='full_name'
                    className='form-field'
                    required
                    placeholder={messages['common.name'] + '*'}
                  />
                  <FormInput
                    name='phone_number'
                    className='form-field'
                    required
                    label={messages['common.phone']}
                    placeholder={messages['common.phone'] + '*'}
                  />
                  <FormInput
                    name='website'
                    className='form-field'
                    label={messages['common.yourBusinessWebsite']}
                    placeholder={messages['common.yourBusinessWebsite']}
                  />

                  <Form.Item
                    className='user-field-action user-field-action-row'
                    name='remember'
                    valuePropName='checked'
                    rules={[
                      {
                        validator: (_, value) => {
                          if (value) {
                            return Promise.resolve();
                          } else {
                            return Promise.reject(
                              new Error(
                                messages['validation.termConditionsRequired'],
                              ),
                            );
                          }
                        },
                      },
                    ]}>
                    <Checkbox>
                      <IntlMessages id='common.iAgreeTo' />{' '}
                      <span className='user-field-action-link'>
                        <IntlMessages id='common.termConditions' />
                      </span>
                    </Checkbox>
                  </Form.Item>
                </FormSignUp>

                <div className='user-card-footer'>
                  <span>
                    <IntlMessages id='common.alreadyHaveAccount' />
                  </span>
                  <Link to='/signin'>
                    <span className='user-card-footer-link'>
                      <IntlMessages id='common.signInHere' />
                    </span>
                  </Link>
                </div>
              </Col>
            )}
          </AppRowContainer>
        </Card>
      </div>
    </div>
  );
};

export default SignupJwtAuth;
