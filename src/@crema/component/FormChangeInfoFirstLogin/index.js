import React from 'react';
import { Form } from 'antd';
import useCallApi from 'src/@crema/hook/useCallApi';
import { postGetAuthMe } from 'src/@crema/services';
import PropTypes from 'prop-types';
import AntButton from '../AntButton/index';
import { isEmpty, isFunction } from 'src/shared/utils/Typeof';
import {
  getMessageResponse,
  getErrorsResponse,
} from 'src/shared/utils/Service';
import { useIntl } from 'react-intl';
import { convertObjectMapper } from 'src/shared/utils/Modal';
import { useDispatch } from 'react-redux';
import { FETCH_START } from 'src/shared/constants/ActionTypes';
import { useAuthMethod } from 'src/@crema/utility/AuthHooks';
import { logout } from 'src/@crema/services/Application/AuthenStorage';
import FormContent from 'src/@crema/component/FormContent';
import notification from 'src/shared/utils/notification';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import API from 'src/@crema/services/apis';

const FormChangeInfoFirstLogin = (props) => {
  const { children, preSaveData, initialValues, fieldMapper, ...rest } = props;
  const [form] = Form.useForm();
  const { signInUser } = useAuthMethod();
  const { messages } = useIntl();
  const dispatch = useDispatch();

  const { loading, send } = useCallApi({
    success: () => {
      getAuthMe();
    },
    callApi: (data) =>
      instanceCoreApi.post(API.CHANGE_USER_INFO_FIRST_LOGIN, {
        email: data?.email,
        new_password: data?.new_password,
      }),
    error: (err) => {
      const messageError = getMessageResponse(err);
      const errors = getErrorsResponse(err?.raw);
      if (isEmpty(errors)) {
        notification.error(messages[messageError] || messageError);
      } else {
        const errorMapper = convertObjectMapper({ errors, fieldMapper });
        form.setFields(errorMapper);
      }
    },
  });

  const { send: sendAuthen } = useCallApi({
    success: (success) => {
      const userInfo = success?.result;
      if (userInfo) {
        getAuthMeSuccess(success);
      } else {
        getAuthMeError({
          message: 'Lỗi tài khoản, liên hệ Admin để được hỗ trợ',
        });
        logout('account_error');
      }
    },
    callApi: postGetAuthMe,
    error: (error) => {
      getAuthMeError(error);
    },
  });

  const onSave = (data) => {
    let dataSave = data;
    if (isFunction(preSaveData)) {
      dataSave = preSaveData(dataSave);
    }
    return send(dataSave);
  };

  const getAuthMe = () => {
    dispatch({ type: FETCH_START });
    return sendAuthen();
  };

  const getAuthMeSuccess = (success) => {
    signInUser(success, null);
  };

  const getAuthMeError = (error) => {
    signInUser(null, error);
  };

  return (
    <FormContent
      initialValues={initialValues}
      form={form}
      layout='vertical'
      onFinish={onSave}
      {...rest}>
      {children}
      <Form.Item>
        <AntButton
          style={{ width: '100%' }}
          loading={loading}
          type='primary'
          htmlType='submit'>
          Cập nhật
        </AntButton>
      </Form.Item>
    </FormContent>
  );
};

export default FormChangeInfoFirstLogin;
FormChangeInfoFirstLogin.propTypes = {
  children: PropTypes.node,
  preSaveData: PropTypes.func,
  initialValues: PropTypes.object,
  fieldMapper: PropTypes.object,
};

FormChangeInfoFirstLogin.defaultProps = {
  initialValues: {},
  fieldMapper: {},
  preSaveData: null,
};
