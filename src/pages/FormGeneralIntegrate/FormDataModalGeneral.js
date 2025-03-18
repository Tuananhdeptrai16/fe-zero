import React from 'react';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormInputPassword from 'src/@crema/core/Form/FormInputPassword';
import { Col, Row } from 'antd';
import { FormSelectTunnelMethod } from 'src/@crema/component/FormItem/FormSelectTunnelMethod';
import FormInputNumber from 'src/@crema/core/Form/FormInputNumber';
export const FormDataModalGeneral = ({ placeholder }) => {
  return (
    <div>
      <Row gutter={20}>
        <Col span={12}>
          <FormInput
            label='Tên dữ liệu đích'
            name='name'
            required
            placeholder={placeholder}
          />
        </Col>

        <Col span={12}>
          <FormInput label='Host' name='username' required />
        </Col>
      </Row>

      <Row gutter={20}>
        <Col span={12}>
          <FormInputNumber
            rules={{ digit: [], maxLength: [{ value: 10 }] }}
            label='Port'
            name='port'
            required
          />
        </Col>
        <Col span={12}>
          <FormInput label='Tên DB' name='db_name' required />
        </Col>
      </Row>

      <Row gutter={20}>
        <Col span={12}>
          <FormInput label='User' name='user' required />
        </Col>
        <Col span={12}>
          <FormInputPassword label='Password' name='password' />
        </Col>
      </Row>

      <FormSelectTunnelMethod />

      <FormInput label={'Thông số JDBC URL'} rules={{ url_jdbc: [] }} />
    </div>
  );
};
