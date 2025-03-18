import React from 'react';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import { Col, Form, Row } from 'antd';
import {
  UPDATE_METHOD_URL_KEY,
  authenticationOptionPagination,
} from 'src/shared/constants/DataSelect';
import FormTextArea from 'src/@crema/core/Form/FormTextArea';
import FormInputSecret from 'src/@crema/component/FormInputSecret';

const ROOT_NAME = 'connection_configuration';
const ROOT_CREDENTIALS = 'credentials';
export const FormDataModalNonPaginated = () => {
  const updateMethodWatch = Form.useWatch([
    ROOT_NAME,
    ROOT_CREDENTIALS,
    'auth_type',
  ]);

  return (
    <Row gutter={20}>
      <Col span={24}>
        <FormInput name={'name'} label={'common.destination'} required />
      </Col>
      <Col span={24}>
        <FormInput name={[ROOT_NAME, 'api_url']} label={'API_URL'} required />
      </Col>
      <Col span={24}>
        <FormSelect
          name={[ROOT_NAME, ROOT_CREDENTIALS, 'auth_type']}
          label={'Phương thức xác thực'}
          required
          options={authenticationOptionPagination}
        />
      </Col>

      {updateMethodWatch === UPDATE_METHOD_URL_KEY.BASIC && (
        <>
          <Col span={12}>
            <FormInput
              name={[ROOT_NAME, ROOT_CREDENTIALS, 'user_name']}
              label={'Tên đăng nhập'}
              required
            />
          </Col>
          <Col span={12}>
            <FormInputSecret
              label='Mật khẩu'
              required
              name={[ROOT_NAME, ROOT_CREDENTIALS, 'password']}
            />
          </Col>
        </>
      )}
      {updateMethodWatch === UPDATE_METHOD_URL_KEY.OAUTH && (
        <>
          <Col span={24}>
            <FormInputSecret
              addonBefore='Bearer'
              name={[ROOT_NAME, ROOT_CREDENTIALS, 'auth_endpoint']}
              label={'Token'}
              required
            />
          </Col>
          <Col span={12}>
            <FormInputSecret
              label='ID khóa'
              name={[ROOT_NAME, ROOT_CREDENTIALS, 'client_id']}
              required
            />
          </Col>
          <Col span={12}>
            <FormInputSecret
              label='Khóa truy cập'
              name={[ROOT_NAME, ROOT_CREDENTIALS, 'client_secret']}
              required
            />
          </Col>
        </>
      )}
      <Col span={24}>
        <FormSelect
          name={[ROOT_NAME, 'http_method']}
          label={'Phương thức kết nối HTTP'}
          required
          options={[
            {
              label: 'GET',
              value: 'GET',
            },
            {
              label: 'POST',
              value: 'POST',
            },
            {
              label: 'PUT',
              value: 'PUT',
            },
          ]}
        />
      </Col>
      <Col span={24}>
        <FormTextArea name={'payLoad'} label={'Phần dữ liệu'} />
      </Col>
    </Row>
  );
};
