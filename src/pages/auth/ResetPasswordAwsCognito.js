import React, { useEffect, useState } from 'react';
import IntlMessages from '../../@crema/utility/IntlMessages';
import useIntl from 'react-intl/lib/src/components/useIntl';
import AppPageMetadata from '../../@crema/core/AppPageMetadata';
import AuthWrapper from './AuthWrapper';
import { useLocation, useNavigate } from 'react-router-dom';
import AppAnimateGroup from '../../@crema/core/AppAnimateGroup';
import { Button, Card, Col, Form } from 'antd';
import AppRowContainer from '../../@crema/core/AppRowContainer';
import { ReactComponent as Logo } from '../../assets/user/reset-password.svg';
import useCallApi from 'src/@crema/hook/useCallApi';
import {
  getAuthMeByAuthen,
  postDataResetPasswordByToken,
} from 'src/@crema/services';
import FormInput from 'src/@crema/core/Form/FormInput/index';
import notification from 'src/shared/utils/notification';
import AntSpin from 'src/@crema/component/AntSpin/index';
import { saveToken } from 'src/@crema/services/Application/AuthenStorage';
import { useAuthMethod } from 'src/@crema/utility/AuthHooks';
const ResetPasswordAwsCognito = () => {
  const { messages } = useIntl();
  const { search } = useLocation();
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [isValidToken, setIsValidToken] = useState(null);
  const [isChangePasswordError, setIsChangePasswordError] = useState(null);
  const { signInUser } = useAuthMethod();
  const data = useCallApi({
    success: (data) => {
      setUserId(data.user.id);
      const [keySearch, valueSearch] = search.split('=');
      if (keySearch.includes('token')) {
        notification.success(messages['success.emailVerificationSuccess']);
        saveToken(valueSearch);
        signInUser(data, null);
        navigate('/');
      }
    },
    callApi: getAuthMeByAuthen,
    error: (error) => {
      notification.error(error.message, 3);
      setIsValidToken({ ...error, isValid: true });
    },
  });

  const { send } = useCallApi({
    success: () => {
      notification.success(messages['aws.passwordSet'], 3);
      navigate('/signin');
    },
    error: (error) => {
      setIsChangePasswordError({
        isError: true,
        ...error,
      });
      notification.error(error.message, 3);
    },
    callApi: postDataResetPasswordByToken,
  });

  useEffect(() => {
    const [keySearch, valueSearch] = search.split('=');
    if (keySearch?.includes('error')) {
      notification.error(valueSearch);
      navigate('/');
    }
    if (keySearch?.includes('token')) {
      data.send(valueSearch);
      setAuthToken(valueSearch);
    }
  }, [data, navigate, search]);

  console.log(isChangePasswordError);

  if (data?.loading) {
    return (
      <div className='user-pages'>
        <AntSpin />;
      </div>
    );
  }

  return (
    <AuthWrapper>
      <AppPageMetadata title='Reset Password' />

      <div className='user-pages'>
        <AppAnimateGroup type='bottom'>
          <AppPageMetadata title='Reset Password' />
          <div className='user-container' key='a'>
            <Card className='user-card user-card-lg'>
              <AppRowContainer>
                <Col xs={24} md={12}>
                  <div className='user-styled-img'>
                    <Logo />
                  </div>
                </Col>
                {isValidToken?.isValid ? (
                  <Col xs={24} md={12}>
                    <div className='user-card-header '>
                      <h3 className='user-card-header__error'>
                        <IntlMessages id='error.somethingWentWrong' />
                      </h3>
                    </div>
                    <div className='user-card-error__message'>
                      <p>{isValidToken?.message}</p>
                    </div>
                  </Col>
                ) : isChangePasswordError?.isError ? (
                  <Col xs={24} md={12}>
                    <div className='user-card-header'>
                      <h3>
                        <IntlMessages id='error.somethingWentWrong' />
                      </h3>
                    </div>
                    <div className='user-card-error__message'>
                      <p>{isChangePasswordError?.message}</p>
                    </div>
                  </Col>
                ) : (
                  <Col xs={24} md={12}>
                    <div className='user-card-header'>
                      <h3>
                        <IntlMessages id='common.resetPassword' />
                      </h3>
                    </div>

                    <Form
                      className='user-form mb-0'
                      layout='vertical'
                      onFinish={(e) => {
                        send({
                          password: e.newPassword,
                          id: userId,
                          token: authToken,
                        });
                      }}>
                      <FormInput
                        name='newPassword'
                        label='common.newPassword'
                        required
                        rules={{ is_password: [] }}
                        className='form-field'
                        type='password'
                        placeholder={messages['common.newPassword']}
                      />
                      <FormInput
                        name='confirmPassword'
                        label='common.confirmPassword'
                        className='form-field'
                        required
                        type='password'
                        placeholder={messages['common.retypePassword']}
                        rules={{
                          confirmed: [{ field: 'newPassword' }],
                          is_password: [],
                        }}
                      />

                      <Button
                        type='primary'
                        htmlType='submit'
                        className='user-form-btn'>
                        <IntlMessages id='common.resetMyPassword' />
                      </Button>
                    </Form>
                  </Col>
                )}
              </AppRowContainer>
            </Card>
          </div>
        </AppAnimateGroup>
      </div>
    </AuthWrapper>
  );
};

export default ResetPasswordAwsCognito;
