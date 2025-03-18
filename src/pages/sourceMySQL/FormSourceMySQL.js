import { Col, Form, Row } from 'antd';
import React from 'react';
import { FormSelectTunnelMethod } from 'src/@crema/component/FormItem';
import FormSwitch from 'src/@crema/component/FormSwitch';
import FormInput from 'src/@crema/core/Form/FormInput/index';
import FormInputNumber from 'src/@crema/core/Form/FormInputNumber';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import FormTextArea from 'src/@crema/core/Form/FormTextArea';
import {
  SSL_MODE_MYSQL_KEY,
  UPDATE_METHOD_POSTGRES_KEY,
  sslModeMysqlOptions,
  updateMethodMysqlOption,
} from 'src/shared/constants/DataSelect';
import FormInputSecret from 'src/@crema/component/FormInputSecret';

const ROOT_NAME = 'connection_configuration';

const autoSize = { minRows: 2, maxRows: 5 };

export const FormSourceMySQL = ({ isEdit }) => {
  const sslModeWatch = Form.useWatch([ROOT_NAME, 'ssl_mode', 'mode']);
  const updateMethodWatch = Form.useWatch([
    ROOT_NAME,
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
          name={[ROOT_NAME, 'database']}
          label={'common.databaseName'}
          required
          rules={{ maxLength: [{ value: 128 }] }}
          disabled={isEdit}
        />
      </Col>
      <Col span={12}>
        <FormInput
          name={[ROOT_NAME, 'host']}
          label={'common.host'}
          required
          rules={{ maxLength: [{ value: 128 }] }}
          disabled={isEdit}
        />
      </Col>
      <Col span={12}>
        <FormInputNumber
          rules={{ digit: [], maxLength: [{ value: 10 }] }}
          name={[ROOT_NAME, 'port']}
          label={'common.port'}
          required
          disabled={isEdit}
        />
      </Col>
      <Col span={12}>
        <FormInput
          name={[ROOT_NAME, 'username']}
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
          name={[ROOT_NAME, 'password']}
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
          name={[ROOT_NAME, 'ssl_mode', 'mode']}
          label='Chế độ SSL'
          required
          disabled={isEdit}
          options={sslModeMysqlOptions}
        />
        {(sslModeWatch === SSL_MODE_MYSQL_KEY.VERIFY_CA ||
          sslModeWatch === SSL_MODE_MYSQL_KEY.VERIFY_IDENTITY) && (
          <>
            <FormTextArea
              name={[ROOT_NAME, 'ssl_mode', 'ca_certificate']}
              label={'Chứng chỉ CA'}
              autoSize={autoSize}
              required
              rules={{ maxLength: [{ value: 64 }] }}
            />
            <FormTextArea
              name={[ROOT_NAME, 'ssl_mode', 'client_certificate']}
              label={'Chứng chỉ khách hàng'}
              autoSize={autoSize}
              rules={{ maxLength: [{ value: 64 }] }}
            />
            <FormTextArea
              name={[ROOT_NAME, 'ssl_mode', 'client_key']}
              label={'Khóa chứng chỉ khách hàng'}
              autoSize={autoSize}
              rules={{ maxLength: [{ value: 64 }] }}
            />
            <FormInputSecret
              name={[ROOT_NAME, 'ssl_mode', 'client_key_password']}
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
        <FormSelect
          name={[ROOT_NAME, 'replication_method', 'method']}
          label={'Phương pháp cập nhật'}
          required
          disabled={isEdit}
          options={updateMethodMysqlOption}
        />
        {updateMethodWatch === UPDATE_METHOD_POSTGRES_KEY.CDC && (
          <>
            <FormInputNumber
              rules={{ digit: [], maxLength: [{ value: 10 }] }}
              name={[
                ROOT_NAME,
                'replication_method',
                'initial_waiting_seconds',
              ]}
              label={'Thời gian chờ ban đầu tính bằng giây (Nâng cao)'}
            />
            <FormInputNumber
              rules={{ digit: [], maxLength: [{ value: 10 }] }}
              name={[ROOT_NAME, 'replication_method', 'server_time_zone']}
              label={
                'Múi giờ của máy chủ được định cấu hình cho nguồn MySQL (Nâng cao)'
              }
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
        <FormInput
          name={[ROOT_NAME, 'jdbc_url_params']}
          label={'Thông số JDBC URL'}
          rules={{ url_jdbc: [] }}
        />
      </Col>
      <Col span={24}>
        <FormSwitch
          name={[ROOT_NAME, 'ssl']}
          label={'Kết nối SSL'}
          disabled={isEdit}
        />
      </Col>
    </Row>
  );
};
