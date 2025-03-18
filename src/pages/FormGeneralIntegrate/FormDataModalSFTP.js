import React, { useEffect } from 'react';
import FormInput from 'src/@crema/core/Form/FormInput';
import { Col, Form, Row } from 'antd';

import { CONNECTION_CONFIGURATION } from 'src/shared/constants/DataFixed';
import FormInputSecret from 'src/@crema/component/FormInputSecret';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import { TYPE_HOST } from 'src/shared/constants/DataSelect';
import FormInputNumber from 'src/@crema/core/Form/FormInputNumber';

export const FormDataModalSFTP = () => {
  const form = Form.useFormInstance();
  const host = Form.useWatch([CONNECTION_CONFIGURATION, 'host']);

  useEffect(() => {
    if (host) {
      if (
        host.startsWith('192.168.') ||
        host.startsWith('10.') ||
        host.startsWith('172.16.')
      ) {
        form.setFieldValue('host_type', 'local');
      } else {
        form.setFieldValue('host_type', 'cloud');
      }
    }
  }, [host]);

  return (
    <div>
      <Row gutter={20}>
        <Col md={24}>
          <FormInput label='Tên đích' name='name' required />
        </Col>
        <Col span={6}>
          <FormSelect
            label='Loại máy chủ'
            name='host_type'
            options={TYPE_HOST}
            disabled
          />
        </Col>
        <Col span={12}>
          <FormInput
            label='common.host'
            name={[CONNECTION_CONFIGURATION, 'host']}
            required
          />
        </Col>
        <Col span={6}>
          <FormInputNumber
            rules={{ digit: [], maxLength: [{ value: 10 }] }}
            label='common.port'
            name={[CONNECTION_CONFIGURATION, 'port']}
            required
          />
        </Col>
        <Col span={12}>
          <FormInput
            label='common.databaseUsername'
            name={[CONNECTION_CONFIGURATION, 'username']}
            required
          />
        </Col>
        <Col span={12}>
          <FormInputSecret
            name={[CONNECTION_CONFIGURATION, 'password']}
            label={'common.password'}
            required
          />
        </Col>
        <Col span={24}>
          <FormInput
            label='Đường dẫn thư mục'
            name={[CONNECTION_CONFIGURATION, 'destination_path']}
            required
          />
        </Col>
      </Row>
    </div>
  );
};
