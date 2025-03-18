import { Col, Form, Row } from 'antd';
import React from 'react';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormInputPassword from 'src/@crema/core/Form/FormInputPassword';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import {
  TUNNEL_METHOD_KEY,
  tunnelMethodOptions,
} from 'src/shared/constants/DataSelect';
import FormTextArea from 'src/@crema/core/Form/FormTextArea';
import FormInputNumber from 'src/@crema/core/Form/FormInputNumber';

export const FormSelectTunnelMethod = ({
  rootName = 'connection_configuration',
  name = ['connection_configuration', 'tunnel_method', 'tunnel_method'],
  label = 'SSH Phương pháp đường hầm',
  ...rest
}) => {
  const form = Form.useFormInstance();
  const tunnelMethodWatch = Form.useWatch(name, form);

  return (
    <>
      <FormSelect
        name={name}
        label={label}
        options={tunnelMethodOptions}
        required
        {...rest}
      />
      {tunnelMethodWatch && tunnelMethodWatch !== TUNNEL_METHOD_KEY.NO_TUNNEL && (
        <Row gutter={10}>
          <Col span={12}>
            <FormInput
              name={[rootName, 'tunnel_method', 'tunnel_host']}
              label={'Máy chủ trung gian'}
              required
              rules={{
                maxLength: [{ value: 64 }],
              }}
            />
          </Col>
          <Col span={12}>
            <FormInputNumber
              rules={{ digit: [], maxLength: [{ value: 10 }] }}
              name={[rootName, 'tunnel_method', 'tunnel_port']}
              label={'SSH Cổng kết nối'}
              required
            />
          </Col>
          <Col span={12}>
            <FormInput
              name={[rootName, 'tunnel_method', 'tunnel_user']}
              label={'Tên đăng nhập SSH'}
              required
              rules={{
                maxLength: [{ value: 64 }],
              }}
            />
          </Col>
          <Col span={12}>
            {tunnelMethodWatch === TUNNEL_METHOD_KEY.PASSWORD_AUTH && (
              <FormInputPassword
                name={[rootName, 'tunnel_method', 'tunnel_user_password']}
                label={'Mật khẩu'}
                required
                rules={{
                  maxLength: [{ value: 64 }],
                }}
              />
            )}
            {tunnelMethodWatch === TUNNEL_METHOD_KEY.SSH_KEY_AUTH && (
              <FormTextArea
                name={[rootName, 'tunnel_method', 'ssh_key']}
                label={'Khóa riêng SSH'}
                required
                rules={{
                  maxLength: [{ value: 64 }],
                }}
              />
            )}
          </Col>
        </Row>
      )}
    </>
  );
};
