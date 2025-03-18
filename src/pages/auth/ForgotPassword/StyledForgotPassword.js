import React, { useState } from 'react';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import AppAnimateGroup from '../../../@crema/core/AppAnimateGroup';
import { Button, Card, Col, Form } from 'antd';
import AppRowContainer from '../../../@crema/core/AppRowContainer';
import { useIntl } from 'react-intl';
import './styledForgotPassword.style.less';
import AppPageMetadata from '../../../@crema/core/AppPageMetadata';
import { ReactComponent as Logo } from '../../../assets/user/forgot-password.svg';
import useCallApi from 'src/@crema/hook/useCallApi';
import { postForgotPassword } from 'src/@crema/services';
import notification from 'src/shared/utils/notification';
import FormInput from 'src/@crema/core/Form/FormInput/index';
import {
  getErrorsResponse,
  getMessageResponse,
} from 'src/shared/utils/Service';
import { isEmpty } from 'src/shared/utils/Typeof';
import { convertObjectMapper } from 'src/shared/utils/Modal';
import FormContent from 'src/@crema/component/FormContent';

const StyledForgotPassword = () => {
  const { messages } = useIntl();
  const [form] = Form.useForm();
  const [isSuccessSendMail, setIsSuccessSendMail] = useState(null);
  const { send } = useCallApi({
    success: () => {
      setIsSuccessSendMail(true);
    },
    error: (err) => {
      const messageError = getMessageResponse(err);
      const errors = getErrorsResponse(err?.raw);
      if (isEmpty(errors)) {
        notification.error(messages[messageError] || messageError);
      } else {
        const fieldMapper = {};
        const errorMapper = convertObjectMapper({ errors, fieldMapper });
        form.setFields(errorMapper);
      }
    },
    callApi: postForgotPassword,
  });

  return (
    <div className='user-pages'>
      <AppAnimateGroup type='bottom'>
        <AppPageMetadata title='Forgot Password' />
        <div className='user-container' key='a'>
          <Card className='user-card user-card-lg user-card-for-password'>
            <AppRowContainer>
              <Col xs={24} lg={12}>
                <div className='user-styled-img'>
                  <Logo />
                </div>
              </Col>
              {isSuccessSendMail ? (
                <Col xs={24} lg={12}>
                  <div className='user-styled-for-password'>
                    <div className='user-card-header'>
                      <h3>
                        <IntlMessages id='common.sendMail' />
                      </h3>
                    </div>
                    <div className='user-card-para'>
                      <p className='mb-0'>
                        <IntlMessages id='common.checkMail' />
                      </p>
                    </div>
                  </div>
                </Col>
              ) : (
                <Col xs={24} lg={12}>
                  <div className='user-styled-for-password'>
                    <div className='user-card-header'>
                      <h3>
                        <IntlMessages id='common.forgetPassword' />
                      </h3>
                    </div>

                    <div className='user-card-para'>
                      <p className='mb-0'>
                        <IntlMessages id='common.forgetPasswordTextOne' />
                      </p>
                      <p className='mb-0'>
                        <IntlMessages id='common.forgetPasswordTextTwo' />
                      </p>
                    </div>

                    <FormContent
                      form={form}
                      layout='vertical'
                      className='user-form mb-0'
                      initialValues={{ remember: true }}
                      onFinish={(e) => send(e.email)}>
                      <FormInput
                        label='common.email'
                        name='email'
                        className='form-field-lg'
                        required
                        rules={{ email: [] }}
                        placeholder={messages['common.emailAddress']}
                      />
                      <Button
                        type='primary'
                        htmlType='submit'
                        className='user-form-btn'>
                        <IntlMessages id='common.sendNewPassword' />
                      </Button>
                    </FormContent>
                  </div>
                </Col>
              )}
            </AppRowContainer>
          </Card>
        </div>
      </AppAnimateGroup>
    </div>
  );
};

export default StyledForgotPassword;
