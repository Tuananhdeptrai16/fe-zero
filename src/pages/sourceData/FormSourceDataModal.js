import React from 'react';
import FormInput from 'src/@crema/core/Form/FormInput/index';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import { Col, Form, Row } from 'antd';
import {
  DATA_SOURCE_FORMAT_TYPE,
  DATA_SOURCE_STORAGE_PROVIDE,
} from 'src/shared/constants/DataSelect';
import FormSwitch from 'src/@crema/component/FormSwitch';

import { CONNECTION_CONFIGURATION } from 'src/shared/constants/DataFixed';
import FormInputSecret from 'src/@crema/component/FormInputSecret';
import FormInputNumber from 'src/@crema/core/Form/FormInputNumber';

export const FormSourceDataModal = ({ isEdit }) => {
  const storage = Form.useWatch([
    CONNECTION_CONFIGURATION,
    'provider',
    'storage',
  ]);
  return (
    <div>
      <FormInput
        label='Tên nguồn dữ liệu'
        name='name'
        required
        rules={{ maxLength: [{ value: 128 }] }}
      />
      <Row gutter={20}>
        <Col md={16}>
          <FormInput
            label='Tên tập dữ liệu'
            name={[CONNECTION_CONFIGURATION, 'dataset_name']}
            disabled={isEdit}
            required
            rules={{ maxLength: [{ value: 128 }] }}
          />
        </Col>
        <Col md={8}>
          <FormSelect
            name={[CONNECTION_CONFIGURATION, 'format']}
            label='Tệp định dạng'
            options={DATA_SOURCE_FORMAT_TYPE}
            disabled={isEdit}
            required
          />
        </Col>
      </Row>
      <FormSelect
        name={[CONNECTION_CONFIGURATION, 'provider', 'storage']}
        label='Nhà cung cấp lưu trữ'
        options={DATA_SOURCE_STORAGE_PROVIDE}
        disabled={isEdit}
        required
      />
      {storage === 'HTTPS' && (
        <>
          <FormSwitch
            label='User-Agent'
            name={[CONNECTION_CONFIGURATION, 'provider', 'user_agent']}
          />
        </>
      )}
      {storage === 'GCS' && (
        <FormInputSecret
          label='Tài khoản dịch vụ JSON'
          name={[CONNECTION_CONFIGURATION, 'provider', 'service_account_json']}
          required
        />
      )}
      {storage === 'S3' && (
        <>
          <FormInput
            label='ID khóa truy cập AWS'
            name={[
              CONNECTION_CONFIGURATION,
              'provider',
              'aws_secret_access_key',
            ]}
            required
          />
          <FormInputSecret
            label='Khóa truy cập bí mật AWS'
            name={[CONNECTION_CONFIGURATION, 'provider', 'aws_access_key_id']}
            required
          />
        </>
      )}
      {storage === 'AzBlob' && (
        <>
          <FormInput
            label='Tài khoản lưu trữ'
            name={[CONNECTION_CONFIGURATION, 'provider', 'storage_account']}
            required
          />
          <FormInputSecret
            label='Mã thông báo SAS'
            name={[CONNECTION_CONFIGURATION, 'provider', 'sas_token']}
          />
          <FormInputSecret
            label='Chìa khóa chung'
            name={[CONNECTION_CONFIGURATION, 'provider', 'shared_key']}
          />
        </>
      )}
      {(storage === 'SSH' || storage === 'SCP' || storage === 'SFTP') && (
        <Row gutter={20}>
          <Col span={12}>
            <FormInput
              label='common.host'
              name={[CONNECTION_CONFIGURATION, 'provider', 'host']}
              required
              rules={{ maxLength: [{ value: 64 }] }}
            />
          </Col>
          <Col span={12}>
            <FormInputNumber
              rules={{ digit: [], maxLength: [{ value: 10 }] }}
              label='common.port'
              name={[CONNECTION_CONFIGURATION, 'provider', 'port']}
              required
            />
          </Col>
          <Col span={12}>
            <FormInput
              label='common.databaseUsername'
              name={[CONNECTION_CONFIGURATION, 'provider', 'user']}
              required
              rules={{ maxLength: [{ value: 64 }] }}
            />
          </Col>
          <Col span={12}>
            <FormInputSecret
              label='common.password'
              name={[CONNECTION_CONFIGURATION, 'provider', 'password']}
              rules={{ maxLength: [{ value: 64 }] }}
            />
          </Col>
        </Row>
      )}
      <FormInput
        label='URL'
        name={[CONNECTION_CONFIGURATION, 'url']}
        required
        disabled={isEdit}
        rules={{ url: [] }}
      />
      <FormInput
        label='Tùy chọn đầu đọc'
        name={[CONNECTION_CONFIGURATION, 'reader_options']}
        disabled={isEdit}
        rules={{ maxLength: [{ value: 128 }] }}
      />
    </div>
  );
};
