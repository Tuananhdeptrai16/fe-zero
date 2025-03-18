import { Form } from 'antd';
import React from 'react';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import { isEmpty, isFunction } from 'src/shared/utils/Typeof';
import useCallApi from 'src/@crema/hook/useCallApi';
import AntButton from '../AntButton/index';
import PropTypes from 'prop-types';
import { postSignUpUser } from 'src/@crema/services';
import { useDispatch } from 'react-redux';
import { useAuthMethod } from 'src/@crema/utility/AuthHooks';
import { FETCH_START } from 'src/shared/constants/ActionTypes';
import {
  getErrorsResponse,
  getMessageResponse,
} from 'src/shared/utils/Service';
import { useIntl } from 'react-intl';
import { convertObjectMapper } from 'src/shared/utils/Modal';
import FormContent from 'src/@crema/component/FormContent';
import notification from 'src/shared/utils/notification';

const FormSignUp = (props) => {
  const {
    children,
    preSaveData,
    initialValues,
    setSignUpSuccess,
    fieldMapper,
    ...rest
  } = props;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { signUpUser } = useAuthMethod();
  const { messages } = useIntl();
  const { loading, send } = useCallApi({
    success: (data) => {
      signUpSuccess(data);
    },
    callApi: postSignUpUser,
    error: (err) => {
      const messageError = getMessageResponse(err?.raw);
      const errors = getErrorsResponse(err?.raw);
      if (isEmpty(errors)) {
        notification.error(messages[messageError] || messageError);
      } else {
        const errorMapper = convertObjectMapper({ errors, fieldMapper });
        form.setFields(errorMapper);
      }
      signUpError(err);
    },
  });

  const onSave = (data) => {
    let dataSave = data;
    if (isFunction(preSaveData)) {
      dataSave = preSaveData(dataSave);
    }
    dispatch({ type: FETCH_START });
    return send(dataSave);
  };

  function signUpSuccess(data) {
    setSignUpSuccess();
    signUpUser(data, false);
  }

  function signUpError(error) {
    signUpUser(false, error);
  }

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
          <IntlMessages id='common.signup' />
        </AntButton>
      </Form.Item>
    </FormContent>
  );
};

export default FormSignUp;

FormSignUp.propTypes = {
  children: PropTypes.node,
  formType: PropTypes.string,
  preSaveData: PropTypes.func,
  initialValues: PropTypes.object,
  fieldMapper: PropTypes.object,
  setSignUpSuccess: PropTypes.func,
};

FormSignUp.defaultProps = {
  initialValues: {},
  fieldMapper: {},
  preSaveData: null,
};
