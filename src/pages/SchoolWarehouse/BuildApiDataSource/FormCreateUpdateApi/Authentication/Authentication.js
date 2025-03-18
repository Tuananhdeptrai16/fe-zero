import React from 'react';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import { Col, Form, Row } from 'antd';
import ApiKeyAuthenticator, {
  AUTHENTICATOR_API_TOKEN,
} from 'src/pages/SchoolWarehouse/BuildApiDataSource/FormCreateUpdateApi/Authentication/ApiKeyAuthenticator';
import BearerAuthenticator from 'src/pages/SchoolWarehouse/BuildApiDataSource/FormCreateUpdateApi/Authentication/BearerAuthenticator';
import BasicHttpAuthenticator, {
  AUTHENTICATOR_PASSWORD,
  AUTHENTICATOR_USERNAME,
} from 'src/pages/SchoolWarehouse/BuildApiDataSource/FormCreateUpdateApi/Authentication/BasicHttpAuthenticator';
import OAuthAuthenticator, {
  AUTHENTICATOR_CLIENT_ID,
  AUTHENTICATOR_CLIENT_SECRET,
  AUTHENTICATOR_GRANT_TYPE,
  AUTHENTICATOR_REFRESH_TOKEN,
} from 'src/pages/SchoolWarehouse/BuildApiDataSource/FormCreateUpdateApi/Authentication/OAuthAuthenticator';
import useAutoMaticFieldAuthentication from 'src/pages/SchoolWarehouse/BuildApiDataSource/FormCreateUpdateApi/Authentication/useAutoMaticFieldAuthentication';
import FormHidden from 'src/@crema/core/Form/FormHidden';

export const AUTHENTICATOR_TYPE = [
  'definitions',
  'base_requester',
  'authenticator',
  'type',
];

export default function Authentication() {
  const grantType = Form.useWatch(AUTHENTICATOR_GRANT_TYPE);
  const authenticatorType = Form.useWatch(AUTHENTICATOR_TYPE);

  useAutoMaticFieldAuthentication({
    active:
      authenticatorType === 'ApiKeyAuthenticator' ||
      authenticatorType === 'BearerAuthenticator',
    propertiesFrom: [
      {
        name: 'api_key',
        source: AUTHENTICATOR_API_TOKEN,
      },
    ],
  });

  useAutoMaticFieldAuthentication({
    active: authenticatorType === 'OAuthAuthenticator',
    propertiesFrom: [
      {
        name: 'client_id',
        source: AUTHENTICATOR_CLIENT_ID,
        propertyInit: {
          type: 'string',
          title: 'Client ID',
          airbyte_secret: true,
          order: 0,
        },
      },
      {
        name: 'client_secret',
        source: AUTHENTICATOR_CLIENT_SECRET,
        propertyInit: {
          type: 'string',
          title: 'Client secret',
          airbyte_secret: true,
          order: 1,
        },
      },
      grantType === 'refresh_token'
        ? {
            name: 'refresh_token',
            source: AUTHENTICATOR_REFRESH_TOKEN,
            propertyInit: {
              type: 'string',
              title: 'Refresh token',
              airbyte_secret: true,
              order: 2,
            },
          }
        : null,
    ],
  });

  useAutoMaticFieldAuthentication({
    active: authenticatorType === 'BasicHttpAuthenticator',
    propertiesFrom: [
      {
        name: 'username',
        source: AUTHENTICATOR_USERNAME,
        propertyInit: {
          type: 'string',
          title: 'Tên đăng nhập',
          order: 0,
        },
      },
      {
        name: 'password',
        source: AUTHENTICATOR_PASSWORD,
        propertyInit: {
          type: 'string',
          title: 'Mật khẩu',
          airbyte_secret: true,
          order: 1,
        },
      },
    ],
  });

  return (
    <Row>
      <Col span={24}>
        <FormHidden name={AUTHENTICATOR_API_TOKEN} />
        <FormHidden name={AUTHENTICATOR_USERNAME} />
        <FormHidden name={AUTHENTICATOR_PASSWORD} />
        <FormHidden name={AUTHENTICATOR_API_TOKEN} />
        <FormHidden name={AUTHENTICATOR_CLIENT_ID} />
        <FormHidden name={AUTHENTICATOR_CLIENT_SECRET} />
        <FormHidden name={AUTHENTICATOR_REFRESH_TOKEN} />
        <div className={'d-flex items-center justify-between'}>
          <h5 className='mb-0'>Phương pháp</h5>
          <FormSelect
            allowClear={false}
            getPopupContainer={(trigger) => trigger.parentNode}
            name={AUTHENTICATOR_TYPE}
            style={{
              minWidth: '180px',
            }}
            options={[
              {
                label: 'Không xác thực',
                value: 'not_auth',
              },
              {
                label: 'API key',
                value: 'ApiKeyAuthenticator',
              },
              {
                label: 'Bearer token',
                value: 'BearerAuthenticator',
              },
              {
                label: 'Basic HTTP',
                value: 'BasicHttpAuthenticator',
              },
              {
                label: 'OAuth',
                value: 'OAuthAuthenticator',
              },
            ]}
          />
        </div>
      </Col>
      <Col span={24}>
        {authenticatorType === 'ApiKeyAuthenticator' && <ApiKeyAuthenticator />}
        {authenticatorType === 'BearerAuthenticator' && <BearerAuthenticator />}
        {authenticatorType === 'BasicHttpAuthenticator' && (
          <BasicHttpAuthenticator />
        )}
        {authenticatorType === 'OAuthAuthenticator' && <OAuthAuthenticator />}
      </Col>
    </Row>
  );
}
