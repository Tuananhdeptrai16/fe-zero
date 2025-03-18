import { Col, Row } from 'antd';
import React from 'react';
import { FormSelectTunnelMethod } from 'src/@crema/component/FormItem';
import FormSwitch from 'src/@crema/component/FormSwitch';
import FormInput from 'src/@crema/core/Form/FormInput/index';
import FormInputNumber from 'src/@crema/core/Form/FormInputNumber';
import { CONNECTION_CONFIGURATION } from 'src/shared/constants/DataFixed';
import FormInputSecret from 'src/@crema/component/FormInputSecret';

export const FormDataModalMySQL = () => {
  return (
    <Row gutter={20}>
      <Col span={12}>
        <FormInput name={'name'} label={'common.destination'} required />
      </Col>
      <Col span={12}>
        <FormInput
          name={[CONNECTION_CONFIGURATION, 'database']}
          label={'common.databaseName'}
          required
        />
      </Col>
      <Col span={12}>
        <FormInput
          name={[CONNECTION_CONFIGURATION, 'host']}
          label={'common.host'}
          required
        />
      </Col>
      <Col span={12}>
        <FormInputNumber
          rules={{ digit: [], maxLength: [{ value: 10 }] }}
          name={[CONNECTION_CONFIGURATION, 'port']}
          label={'common.port'}
          required
        />
      </Col>
      <Col span={12}>
        <FormInput
          name={[CONNECTION_CONFIGURATION, 'username']}
          label={'common.username'}
          required
        />
      </Col>
      <Col span={12}>
        <FormInputSecret
          label={'common.password'}
          name={[CONNECTION_CONFIGURATION, 'password']}
          required
        />
      </Col>
      <Col span={24}>
        <div className='border-b mb-4' />
      </Col>
      <Col span={24}>
        <FormSelectTunnelMethod required />
      </Col>
      <Col span={24}>
        <div className='border-b mb-4' />
      </Col>

      <Col span={24}>
        <FormInput
          name={[CONNECTION_CONFIGURATION, 'jdbc_url_params']}
          label={'Thông số JDBC URL'}
          rules={{ url_jdbc: [] }}
        />
      </Col>
      <Col span={24}>
        <FormSwitch
          name={[CONNECTION_CONFIGURATION, 'ssl']}
          label={'Kết nối SSL'}
        />
      </Col>
    </Row>
  );
};
