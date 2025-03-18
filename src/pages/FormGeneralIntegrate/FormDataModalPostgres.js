import { Col, Form, Row } from 'antd';
import React from 'react';
import { FormSelectTunnelMethod } from 'src/@crema/component/FormItem';
import FormInput from 'src/@crema/core/Form/FormInput/index';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import FormTextArea from 'src/@crema/core/Form/FormTextArea';
import { SSL_MODE_KEY, sslModeOptions } from 'src/shared/constants/DataSelect';
import { CONNECTION_CONFIGURATION } from 'src/shared/constants/DataFixed';
import FormSwitch from 'src/@crema/component/FormSwitch';
import FormInputSecret from 'src/@crema/component/FormInputSecret';
import FormInputNumber from 'src/@crema/core/Form/FormInputNumber';

const autoSize = { minRows: 2, maxRows: 5 };

export const FormDataModalPostgres = ({ isDetail }) => {
  const sslModeWatch = Form.useWatch([
    CONNECTION_CONFIGURATION,
    'ssl_mode',
    'mode',
  ]);

  return (
    <Row gutter={20}>
      <Col span={12}>
        <FormInput
          disabled={isDetail}
          name={'name'}
          label={'common.destination'}
          required
          rules={{ maxLength: [{ value: 128 }] }}
        />
      </Col>
      <Col span={12}>
        <FormInput
          name={[CONNECTION_CONFIGURATION, 'database']}
          label={'common.databaseName'}
          required
          rules={{ maxLength: [{ value: 128 }] }}
        />
      </Col>
      <Col span={6}>
        <FormInput
          name={[CONNECTION_CONFIGURATION, 'host']}
          label={'common.host'}
          required
          rules={{ maxLength: [{ value: 128 }] }}
        />
      </Col>
      <Col span={6}>
        <FormInputNumber
          rules={{ digit: [], maxLength: [{ value: 10 }] }}
          name={[CONNECTION_CONFIGURATION, 'port']}
          label={'common.port'}
          required
        />
      </Col>
      <Col span={12}>
        <FormInput
          name={[CONNECTION_CONFIGURATION, 'schema']}
          label={'Lược đồ'}
          required
          rules={{ maxLength: [{ value: 128 }] }}
        />
      </Col>

      <Col span={12}>
        <FormInput
          name={[CONNECTION_CONFIGURATION, 'username']}
          label={'common.databaseUsername'}
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
        <FormSelectTunnelMethod required />
      </Col>
      <Col span={24}>
        <div className='border-b mb-4' />
      </Col>
      <Col span={24}>
        <div className='border-b mb-4' />
      </Col>
      <Col span={24}>
        <FormSwitch
          name={[CONNECTION_CONFIGURATION, 'ssl']}
          label={'Kết nối SSL'}
        />
      </Col>
      <Col span={24}>
        <FormInput
          name={[CONNECTION_CONFIGURATION, 'jdbc_url_params']}
          label={'Tham số URL JDBC của hộp văn bản (Nâng cao)'}
          rules={{ url_jdbc: [] }}
        />
      </Col>
      <Col span={24}>
        <div className='border-b mb-4' />
      </Col>
      <Col span={24}>
        <FormSwitch
          name={[CONNECTION_CONFIGURATION, 'use_1s1t_format']}
          label={'Sử dụng điểm đến V2 (Truy cập sớm)'}
        />
      </Col>
      <Col span={24}>
        <FormInput
          name={[CONNECTION_CONFIGURATION, 'raw_data_schema']}
          label={'Lược đồ bảng thô đích V2 (Truy cập sớm)'}
        />
      </Col>
    </Row>
  );
};
