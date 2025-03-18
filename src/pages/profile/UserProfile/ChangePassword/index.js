import React, { useRef } from 'react';
import { Button, Form } from 'antd';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import FormContent from 'src/@crema/component/FormContent';
import FormInputPassword from 'src/@crema/core/Form/FormInputPassword';
import useCallApi from 'src/@crema/hook/useCallApi';
import { changePassword } from 'src/@crema/services/user.service';
import {
  getErrorsResponse,
  getMessageResponse,
} from 'src/shared/utils/Service';
import { isEmpty } from 'src/shared/utils/Typeof';
import notification from 'src/shared/utils/notification';
import { useIntl } from 'react-intl';
import { convertObjectMapper } from 'src/shared/utils/Modal';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const nav = useNavigate();
  const refForm = useRef();
  const { messages } = useIntl();

  const { send, loading } = useCallApi({
    callApi: changePassword,
    error: handleSaveInfoError,
    success: onSuccess,
  });

  function onSuccess() {
    notification.success('Thay đổi mật khẩu thành công');
    refForm.current.resetFields();
  }
  function handleSaveInfoError(err) {
    const messageError = getMessageResponse(err);
    const errors = getErrorsResponse(err?.raw);
    if (isEmpty(errors)) {
      notification.error(messages[messageError] || messageError);
    } else {
      const errorMapper = convertObjectMapper({
        errors,
        fieldMapper: {
          password: 'password',
          new_password: 'newPassword',
          re_password: 'rePassword',
        },
      });
      if (refForm?.current?.setFields) {
        refForm.current.setFields(errorMapper);
      }
    }
  }

  const onFinish = (values) => {
    send({ data: values });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <FormContent
      key={'change-password'}
      id='change-password'
      ref={refForm}
      className='user-profile-form'
      labelAlign={'left'}
      labelCol={{ xxl: { span: 4 }, md: { span: 6 } }}
      labelWrap
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}>
      <h3 className='user-profile-form-title'>
        <IntlMessages id='userProfile.changePassword' />
      </h3>
      <FormInputPassword
        name='password'
        required
        label={'common.oldPassword'}
      />
      <FormInputPassword
        name='new_password'
        label={'common.newPassword'}
        tooltip={{
          title: 'Mật khẩu có độ dài 6 - 32 ký tự, bao gồm a-z,A-Z,0-9',
        }}
        rules={{ is_password: [] }}
        required
      />
      <FormInputPassword
        name={'re_password'}
        label={'common.confirmPassword'}
        tooltip={{
          title: 'Mật khẩu có độ dài 6 - 32 ký tự, bao gồm a-z,A-Z,0-9',
        }}
        rules={{ is_password: [], confirmed: [{ field: 'new_password' }] }}
        required
      />
      <Form.Item className='user-profile-group-btn'>
        <Button type='primary' htmlType='submit' loading={loading}>
          Xác nhận
        </Button>
        <Button
          onClick={() => {
            refForm.current.resetFields();
            nav('/my-profile');
          }}>
          <IntlMessages id={'common.cancel'} />
        </Button>
      </Form.Item>
    </FormContent>
  );
};

export default ChangePassword;
