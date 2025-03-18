import React from 'react';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import { Col, Form, Row } from 'antd';
import {
  SSL_METHOD_KEY,
  SslMethodOptions,
} from 'src/shared/constants/DataSelect';
import FormTextArea from 'src/@crema/core/Form/FormTextArea';
import FormInputNumber from 'src/@crema/core/Form/FormInputNumber';
import { FormSelectTunnelMethod } from 'src/@crema/component/FormItem/FormSelectTunnelMethod';
import { CONNECTION_CONFIGURATION } from 'src/shared/constants/DataFixed';
import FormInputSecret from 'src/@crema/component/FormInputSecret';

export const FormDataModalMSSQL = ({ isEdit }) => {
  const sslMethodWatch = Form.useWatch([
    CONNECTION_CONFIGURATION,
    'ssl_method',
    'ssl_method',
  ]);

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
          label={'common.databaseUsername'}
          required
        />
      </Col>
      <Col span={12}>
        <FormInputSecret
          label={'common.password'}
          name={[CONNECTION_CONFIGURATION, 'password']}
          required={!isEdit}
        />
      </Col>
      <Col span={24}>
        <div className='border-b mb-4' />
      </Col>

      <Col span={24}>
        <FormSelect
          name={[CONNECTION_CONFIGURATION, 'ssl_method', 'ssl_method']}
          label={'common.sslMethod'}
          options={SslMethodOptions}
          required
        />
        {sslMethodWatch === SSL_METHOD_KEY.VERIFY_CERTIFICATE && (
          <>
            <FormInput
              name={[
                CONNECTION_CONFIGURATION,
                'ssl_method',
                'hostNameInCertificate',
              ]}
              label={'Tên máy chủ trong chứng chỉ'}
              rules={{
                maxLength: [{ value: 64 }],
              }}
            />
            <FormTextArea
              name={[CONNECTION_CONFIGURATION, 'ssl_method', 'certificate']}
              label={'Chứng chỉ'}
              rules={{
                maxLength: [{ value: 64 }],
              }}
            />
          </>
        )}
      </Col>
      <Col span={24}>
        <div className='border-b mb-4' />
      </Col>

      <Col span={24}>
        <FormSelectTunnelMethod />
      </Col>
      <Col span={24}>
        <div className='border-b mb-4' />
      </Col>

      <Col span={24}>
        <FormInput
          name={[CONNECTION_CONFIGURATION, 'schema']}
          label={'Lược đồ'}
          required
        />
      </Col>

      <Col span={24}>
        <FormInput
          name={[CONNECTION_CONFIGURATION, 'jdbc_url_params']}
          label={'Thông số JDBC URL'}
          rules={{ url_jdbc: [] }}
        />
      </Col>
    </Row>
  );
};
