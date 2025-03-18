import React from 'react';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import { Col, Form, Row } from 'antd';
import {
  SSL_METHOD_KEY,
  SslMethodOptions,
  UPDATE_METHOD_MSSQL_KEY,
  updateMethodMssqlOption,
} from 'src/shared/constants/DataSelect';
import FormTextArea from 'src/@crema/core/Form/FormTextArea';
import { FormSelectTunnelMethod } from 'src/@crema/component/FormItem/FormSelectTunnelMethod';
import FormInputSecret from 'src/@crema/component/FormInputSecret';
import FormInputNumber from 'src/@crema/core/Form/FormInputNumber';
import { CONNECTION_CONFIGURATION } from 'src/shared/constants/DataFixed';

export const FormSourceMSSQL = ({ isEdit }) => {
  const sslMethodWatch = Form.useWatch([
    CONNECTION_CONFIGURATION,
    'ssl_method',
    'ssl_method',
  ]);
  const updateMethodWatch = Form.useWatch([
    CONNECTION_CONFIGURATION,
    'replication_method',
    'method',
  ]);

  return (
    <Row gutter={20}>
      <Col span={12}>
        <FormInput
          name={'name'}
          label={'common.sourceName'}
          required
          rules={{ maxLength: [{ value: 128 }] }}
        />
      </Col>
      <Col span={12}>
        <FormInput
          name={[CONNECTION_CONFIGURATION, 'database']}
          label={'common.databaseName'}
          disabled={isEdit}
          required
          rules={{ maxLength: [{ value: 128 }] }}
        />
      </Col>
      <Col span={12}>
        <FormInput
          name={[CONNECTION_CONFIGURATION, 'host']}
          label={'common.host'}
          disabled={isEdit}
          required
          rules={{ maxLength: [{ value: 128 }] }}
        />
      </Col>
      <Col span={12}>
        <FormInputNumber
          rules={{ digit: [], maxLength: [{ value: 10 }] }}
          name={[CONNECTION_CONFIGURATION, 'port']}
          label={'common.port'}
          disabled={isEdit}
          required
        />
      </Col>
      <Col span={12}>
        <FormInput
          name={[CONNECTION_CONFIGURATION, 'username']}
          label={'common.databaseUsername'}
          required
          disabled={isEdit}
          rules={{
            maxLength: [{ value: 128 }],
            special_characters: [],
            check_accented_characters: [],
            check_begin_with_number: [],
          }}
        />
      </Col>
      <Col span={12}>
        <FormInputSecret
          label={'common.password'}
          name={[CONNECTION_CONFIGURATION, 'password']}
          disabled={isEdit}
          required
          rules={{ betweenLength: [{ value: 6 }, { value: 32 }] }}
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
          disabled={isEdit}
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
        <FormSelect
          name={[CONNECTION_CONFIGURATION, 'replication_method', 'method']}
          label={'Phương pháp cập nhật'}
          required
          options={updateMethodMssqlOption}
          disabled={isEdit}
        />
        {updateMethodWatch === UPDATE_METHOD_MSSQL_KEY.CDC && (
          <FormInputNumber
            rules={{ digit: [], maxLength: [{ value: 10 }] }}
            name={[
              CONNECTION_CONFIGURATION,
              'replication_method',
              'initial_waiting_seconds',
            ]}
            label={'Thời gian chờ tính bằng giây (Nâng cao)'}
          />
        )}
      </Col>
      <Col span={24}>
        <div className='border-b mb-4' />
      </Col>

      <Col span={24}>
        <FormSelectTunnelMethod disabled={isEdit} />
      </Col>
      <Col span={24}>
        <div className='border-b mb-4' />
      </Col>

      <Col span={24}>
        <FormInput
          // mode={'tags'}
          name={[CONNECTION_CONFIGURATION, 'schemas']}
          label={'Lược đồ'}
          required
          rules={{ maxLength: [{ value: 128 }] }}
          disabled={isEdit}
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
