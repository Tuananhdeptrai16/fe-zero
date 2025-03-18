import { Col, Collapse, Form, Row } from 'antd';
import React from 'react';
import { Panel } from 'src/@crema/component/AntCollapse';
import AppCard from 'src/@crema/core/AppCard';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import FormHidden from 'src/@crema/core/Form/FormHidden';
import RefreshRequestBody from 'src/pages/SchoolWarehouse/BuildApiDataSource/FormCreateUpdateApi/Authentication/RefreshRequestBody';

export const AUTHENTICATOR_GRANT_TYPE = [
  'definitions',
  'base_requester',
  'authenticator',
  'grant_type',
];

export const AUTHENTICATOR_CLIENT_ID = [
  'definitions',
  'base_requester',
  'authenticator',
  'client_id',
];

export const AUTHENTICATOR_CLIENT_SECRET = [
  'definitions',
  'base_requester',
  'authenticator',
  'client_secret',
];

export const AUTHENTICATOR_REFRESH_TOKEN = [
  'definitions',
  'base_requester',
  'authenticator',
  'refresh_token',
];

export default function OAuthAuthenticator() {
  const grantType = Form.useWatch(AUTHENTICATOR_GRANT_TYPE);
  return (
    <div>
      <AppCard>
        <Row>
          <Col span={24}>
            <FormInput
              label='Điểm cập nhật Token'
              name={[
                'definitions',
                'base_requester',
                'authenticator',
                'token_refresh_endpoint',
              ]}
              required
            />
          </Col>
          <Col span={24}>
            <FormSelect
              required
              name={AUTHENTICATOR_GRANT_TYPE}
              label='Loại cấp quyền'
              options={[
                {
                  label: 'Làm mới token',
                  value: 'refresh_token',
                },
                {
                  label: 'Thông tin xác thực người dùng',
                  value: 'client_credentials',
                },
              ]}
            />
            <FormHidden name={AUTHENTICATOR_CLIENT_ID} />
            <FormHidden name={AUTHENTICATOR_CLIENT_SECRET} />
            {grantType === 'refresh_token' && (
              <FormHidden name={AUTHENTICATOR_REFRESH_TOKEN} />
            )}
          </Col>
          <Col span={24}>
            <FormInput
              label='Tên thuộc tính token làm mới'
              name={[
                'definitions',
                'base_requester',
                'authenticator',
                'refresh_token_updater',
                'refresh_token_name',
              ]}
            />
          </Col>
          <Col span={24}>
            <Collapse accordion>
              <Panel header='Các trường tùy chọn' key='option_auth'>
                <Row>
                  <Col span={24}>
                    <FormSelect
                      mode={'tags'}
                      label='Scopes'
                      name={[
                        'definitions',
                        'base_requester',
                        'authenticator',
                        'scopes',
                      ]}
                    />
                  </Col>
                  <Col span={24}>
                    <FormInput
                      label='Định dạng ngày hết hạn của token'
                      name={[
                        'definitions',
                        'base_requester',
                        'authenticator',
                        'token_expiry_date_format',
                      ]}
                      placeholder='%Y-%m-%d %H:%M:%S.%f+00:00'
                    />
                  </Col>
                  <Col span={24}>
                    <FormInput
                      label='Tên thuộc tính hết hạn của token'
                      name={[
                        'definitions',
                        'base_requester',
                        'authenticator',
                        'expires_in_name',
                      ]}
                    />
                  </Col>
                  <Col span={24}>
                    <FormInput
                      label='Tên thuộc tính mã thông báo truy cập'
                      name={[
                        'definitions',
                        'base_requester',
                        'authenticator',
                        'access_token_name',
                      ]}
                    />
                  </Col>
                  <Col span={24}>
                    <RefreshRequestBody />
                  </Col>
                </Row>
              </Panel>
            </Collapse>
          </Col>
        </Row>
      </AppCard>
    </div>
  );
}
