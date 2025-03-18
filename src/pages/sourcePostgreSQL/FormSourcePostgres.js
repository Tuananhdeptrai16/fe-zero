import { Col, Form, Row } from 'antd';
import React from 'react';
import { FormSelectTunnelMethod } from 'src/@crema/component/FormItem';
import FormInput from 'src/@crema/core/Form/FormInput/index';
import FormInputNumber from 'src/@crema/core/Form/FormInputNumber';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import FormTextArea from 'src/@crema/core/Form/FormTextArea';
import {
  SSL_MODE_KEY,
  UPDATE_METHOD_POSTGRES_KEY,
  lsnCommitBehaviourOptions,
  sslModeOptions,
  updateMethodPostgresOptions,
} from 'src/shared/constants/DataSelect';
import { CONNECTION_CONFIGURATION } from 'src/shared/constants/DataFixed';
import FormInputSecret from 'src/@crema/component/FormInputSecret';

const autoSize = { minRows: 2, maxRows: 5 };

export const FormSourcePostgres = ({ isEdit }) => {
  const sslModeWatch = Form.useWatch([
    CONNECTION_CONFIGURATION,
    'ssl_mode',
    'mode',
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

      <Col span={6}>
        <FormInput
          name={[CONNECTION_CONFIGURATION, 'host']}
          label={'common.host'}
          disabled={isEdit}
          required
          rules={{ maxLength: [{ value: 128 }] }}
        />
      </Col>
      <Col span={6}>
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
          // mode={'tags'}
          name={[CONNECTION_CONFIGURATION, 'schemas']}
          label={'Lược đồ'}
          disabled={isEdit}
          required
          rules={{ maxLength: [{ value: 128 }] }}
        />
      </Col>

      <Col span={12}>
        <FormInput
          name={[CONNECTION_CONFIGURATION, 'username']}
          label={'common.databaseUsername'}
          disabled={isEdit}
          required
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
      <Col span={24}>
        <div className='border-b mb-4' />
      </Col>
      <Col span={24}>
        <FormSelect
          name={[CONNECTION_CONFIGURATION, 'ssl_mode', 'mode']}
          label='Chế độ SSL'
          required
          disabled={isEdit}
          options={sslModeOptions}
        />
        {(sslModeWatch === SSL_MODE_KEY.VERIFY_CA ||
          sslModeWatch === SSL_MODE_KEY.VERIFY_FULL) && (
          <>
            <FormTextArea
              name={[CONNECTION_CONFIGURATION, 'ssl_mode', 'ca_certificate']}
              label={'Chứng chỉ CA'}
              autoSize={autoSize}
              required
              rules={{ maxLength: [{ value: 64 }] }}
            />
            <FormTextArea
              name={[
                CONNECTION_CONFIGURATION,
                'ssl_mode',
                'client_certificate',
              ]}
              label={'Chứng chỉ khách hàng'}
              autoSize={autoSize}
              rules={{ maxLength: [{ value: 64 }] }}
            />
            <FormTextArea
              name={[CONNECTION_CONFIGURATION, 'ssl_mode', 'client_key']}
              label={'Khóa chứng chỉ khách hàng'}
              autoSize={autoSize}
              rules={{ maxLength: [{ value: 64 }] }}
            />
            <FormInputSecret
              name={[
                CONNECTION_CONFIGURATION,
                'ssl_mode',
                'client_key_password',
              ]}
              label='Mật khẩu khóa chứng chỉ khách hàng'
              rules={{ maxLength: [{ value: 64 }] }}
            />
          </>
        )}
      </Col>
      <Col span={24}>
        <div className='border-b mb-4' />
      </Col>

      <Col span={24}>
        <FormSelectTunnelMethod required disabled={isEdit} />
      </Col>
      <Col span={24}>
        <div className='border-b mb-4' />
      </Col>

      <Col span={24}>
        <FormSelect
          name={[CONNECTION_CONFIGURATION, 'replication_method', 'method']}
          label={'Phương pháp cập nhật'}
          required
          options={updateMethodPostgresOptions}
          disabled={isEdit}
        />
        {updateMethodWatch === UPDATE_METHOD_POSTGRES_KEY.CDC && (
          <>
            <FormInput
              name={[
                CONNECTION_CONFIGURATION,
                'replication_method',
                'replication_slot',
              ]}
              label={'Vị trí nhân rộng'}
              required
              rules={{
                maxLength: [{ value: 64 }],
              }}
            />
            <FormInput
              name={[
                CONNECTION_CONFIGURATION,
                'replication_method',
                'publication',
              ]}
              label={'Nhân bản'}
              required
              rules={{
                maxLength: [{ value: 64 }],
              }}
            />
            <FormInputNumber
              rules={{ digit: [], maxLength: [{ value: 10 }] }}
              name={[
                CONNECTION_CONFIGURATION,
                'replication_method',
                'initial_waiting_seconds',
              ]}
              label={'Thời gian chờ ban đầu tính bằng giây (Nâng cao)'}
            />
            <FormInputNumber
              rules={{ digit: [], maxLength: [{ value: 10 }] }}
              name={[
                CONNECTION_CONFIGURATION,
                'replication_method',
                'queue_size',
              ]}
              label={'Kích thước của hàng đợi (Nâng cao)'}
            />
            <FormSelect
              name={[
                CONNECTION_CONFIGURATION,
                'replication_method',
                'lsn_commit_behaviour',
              ]}
              label='Hành vi cam kết LSN'
              options={lsnCommitBehaviourOptions}
            />
          </>
        )}
      </Col>
      <Col span={24}>
        <div className='border-b mb-4' />
      </Col>
      <Col span={24}>
        <FormInput
          name={[CONNECTION_CONFIGURATION, 'jdbc_url_params']}
          label={'Tham số URL JDBC của hộp văn bản (Nâng cao)'}
          rules={{ url_jdbc: [] }}
        />
      </Col>
    </Row>
  );
};
