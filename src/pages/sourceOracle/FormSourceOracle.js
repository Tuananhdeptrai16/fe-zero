import { Col, Form, Row } from 'antd';
import React from 'react';
import { FormSelectTunnelMethod } from 'src/@crema/component/FormItem';
import FormInput from 'src/@crema/core/Form/FormInput/index';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import FormTextArea from 'src/@crema/core/Form/FormTextArea';
import {
  ORACLE_CONNECTION_TYPE,
  ORACLE_ENCRYPTION_KEY,
  oracleConnectionTypeOptions,
  oracleEncryptionAlgorithmOptions,
  oracleEncryptionOptions,
} from 'src/shared/constants/DataSelect';
import FormInputSecret from 'src/@crema/component/FormInputSecret';
import { CONNECTION_CONFIGURATION } from 'src/shared/constants/DataFixed';
import FormInputNumber from 'src/@crema/core/Form/FormInputNumber';

const autoSize = { minRows: 2, maxRows: 5 };
export const FormSourceOracle = ({ isEdit }) => {
  const connectionTypeWatch =
    Form.useWatch([
      CONNECTION_CONFIGURATION,
      'connection_data',
      'connection_type',
    ]) || ORACLE_CONNECTION_TYPE.SERVICE_NAME;
  const encryptionMethodWatch = Form.useWatch([
    CONNECTION_CONFIGURATION,
    'encryption',
    'encryption_method',
  ]);

  return (
    <Row gutter={20}>
      <Col span={12}>
        <FormInput
          name={'name'}
          label={'common.sourceName'}
          required
          disabled={isEdit}
          rules={{ maxLength: [{ value: 128 }] }}
        />
      </Col>
      <Col span={12}>
        <FormSelect
          name={[
            CONNECTION_CONFIGURATION,
            'connection_data',
            'connection_type',
          ]}
          label='select.connectionType'
          disabled={isEdit}
          options={oracleConnectionTypeOptions}
          required
        />
      </Col>
      <Col span={12}>
        <FormInput
          name={[CONNECTION_CONFIGURATION, 'username']}
          label='common.username'
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
          name={[CONNECTION_CONFIGURATION, 'password']}
          label={'common.password'}
          disabled={isEdit}
          required
          rules={{ betweenLength: [{ value: 6 }, { value: 32 }] }}
        />
      </Col>
      <Col span={12}>
        {connectionTypeWatch === ORACLE_CONNECTION_TYPE.SERVICE_NAME && (
          <FormInput
            name={[CONNECTION_CONFIGURATION, 'connection_data', 'service_name']}
            label='Tên dịch vụ'
            disabled={isEdit}
            required
            rules={{ maxLength: [{ value: 128 }] }}
          />
        )}
        {connectionTypeWatch === ORACLE_CONNECTION_TYPE.SID && (
          <FormInput
            name={[CONNECTION_CONFIGURATION, 'connection_data', 'sid']}
            label='ID hệ thống (SID)'
            disabled={isEdit}
            required
          />
        )}
      </Col>
      <Col span={8}>
        <FormInput
          name={[CONNECTION_CONFIGURATION, 'host']}
          label={'common.host'}
          required
          disabled={isEdit}
          rules={{ maxLength: [{ value: 128 }] }}
        />
      </Col>
      <Col span={4}>
        <FormInputNumber
          rules={{ digit: [], maxLength: [{ value: 10 }] }}
          name={[CONNECTION_CONFIGURATION, 'port']}
          label={'common.port'}
          disabled={isEdit}
          required
        />
      </Col>
      <Col span={24}>
        <div className='border-b mb-4' />
      </Col>

      <Col span={24}>
        <FormSelect
          name={[CONNECTION_CONFIGURATION, 'encryption', 'encryption_method']}
          label={'Mã hóa'}
          options={oracleEncryptionOptions}
          required
          disabled={isEdit}
        />
        {encryptionMethodWatch === ORACLE_ENCRYPTION_KEY.NNE && (
          <FormSelect
            label='Thuật toán mã hóa'
            name={[
              CONNECTION_CONFIGURATION,
              'encryption',
              'encryption_algorithm',
            ]}
            required
            options={oracleEncryptionAlgorithmOptions}
          />
        )}
        {encryptionMethodWatch === ORACLE_ENCRYPTION_KEY.TLS && (
          <FormTextArea
            label={'Tệp SSL PEM'}
            name={[CONNECTION_CONFIGURATION, 'encryption', 'ssl_certificate']}
            autoSize={autoSize}
            required
            rules={{ maxLength: [{ value: 64 }] }}
          />
        )}
      </Col>
      <Col span={24}>
        <div className='border-b mb-4' />
      </Col>
      <Col span={24}>
        <FormSelectTunnelMethod required disabled={isEdit} />
      </Col>

      <Col span={24}>
        <FormInput
          // mode={'tags'}
          name={[CONNECTION_CONFIGURATION, 'schemas']}
          label={'Lược đồ'}
          disabled={isEdit}
          required
          rules={{ maxLength: [{ value: 128 }] }}
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
