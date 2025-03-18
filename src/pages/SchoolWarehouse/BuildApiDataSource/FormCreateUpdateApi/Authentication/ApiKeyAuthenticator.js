import React, { useEffect } from 'react';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import { Col, Form, Row } from 'antd';
import FormInput from 'src/@crema/core/Form/FormInput';
import AppCard from 'src/@crema/core/AppCard';
import FormHidden from 'src/@crema/core/Form/FormHidden';

export const AUTHENTICATOR_INJECT_INTO = [
  'definitions',
  'base_requester',
  'authenticator',
  'inject_into',
  'inject_into',
];
export const AUTHENTICATOR_INJECT_INTO_TYPE = [
  'definitions',
  'base_requester',
  'authenticator',
  'inject_into',
  'type',
];
export const AUTHENTICATOR_INJECT_INTO_FIELD_NAME = [
  'definitions',
  'base_requester',
  'authenticator',
  'inject_into',
  'field_name',
];
export const AUTHENTICATOR_API_TOKEN = [
  'definitions',
  'base_requester',
  'authenticator',
  'api_token',
];

export default function ApiKeyAuthenticator() {
  const form = Form.useFormInstance();
  useEffect(() => {
    form.setFieldValue(AUTHENTICATOR_INJECT_INTO_TYPE, 'RequestOption');
  }, []);

  return (
    <AppCard>
      <Row>
        <Col span={24}>
          <FormSelect
            allowClear={false}
            label='Chèn vào'
            required
            getPopupContainer={(trigger) => trigger.parentNode}
            name={AUTHENTICATOR_INJECT_INTO}
            options={[
              {
                label: 'Header',
                value: 'header',
              },
              {
                label: 'Query Parameter',
                value: 'request_parameter',
              },
              {
                label: 'Body data',
                value: 'body_data',
              },
              {
                label: 'Body JSON payload',
                value: 'body_json',
              },
            ]}
          />
        </Col>
        <FormHidden name={AUTHENTICATOR_INJECT_INTO_TYPE} />
        <FormHidden name={AUTHENTICATOR_API_TOKEN} />
        <Col span={24}>
          <FormInput
            label='Tên tham số'
            required
            name={AUTHENTICATOR_INJECT_INTO_FIELD_NAME}
          />
        </Col>
      </Row>
    </AppCard>
  );
}
