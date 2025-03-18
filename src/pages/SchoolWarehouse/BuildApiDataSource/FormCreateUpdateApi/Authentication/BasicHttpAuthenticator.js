import React from 'react';
import { Col, Row, Tooltip } from 'antd';
import AppCard from 'src/@crema/core/AppCard';
import AntButton from 'src/@crema/component/AntButton';
import { QuestionCircleOutlined } from '@ant-design/icons';
import FormHidden from 'src/@crema/core/Form/FormHidden';

export const AUTHENTICATOR_USERNAME = [
  'definitions',
  'base_requester',
  'authenticator',
  'username',
];
export const AUTHENTICATOR_PASSWORD = [
  'definitions',
  'base_requester',
  'authenticator',
  'password',
];

export default function BasicHttpAuthenticator() {
  return (
    <AppCard>
      <Row>
        <Col span={24}>
          <FormHidden
            name={[
              'definitions',
              'base_requester',
              'authenticator',
              'username',
            ]}
          />
          <FormHidden
            name={[
              'definitions',
              'base_requester',
              'authenticator',
              'password',
            ]}
          />
          <div className='d-flex items-center justify-start'>
            <label>Tên tài khoản</label>
            <Tooltip title='Tên tài khoản sẽ được kết hợp với mật khẩu, được mã hóa base64 và được sử dụng để thực hiện yêu cầu. Điền thông tin người dùng vào đầu vào người dùng.'>
              <AntButton
                style={{
                  border: 'none',
                  boxShadow: 'unset',
                  color: 'hsl(240, 13%, 72%)',
                }}
                shape='circle'
                icon={<QuestionCircleOutlined />}
              />
            </Tooltip>
          </div>
        </Col>
        <Col span={24}>
          <div className='d-flex items-center justify-start'>
            <label>Mật khẩu</label>
            <Tooltip title='Mật khẩu sẽ được kết hợp với tên tài khoản, được mã hóa base64 và được sử dụng để thực hiện yêu cầu. Điền thông tin mật khẩu vào đầu vào người dùng.'>
              <AntButton
                style={{
                  border: 'none',
                  boxShadow: 'unset',
                  color: 'hsl(240, 13%, 72%)',
                }}
                shape='circle'
                icon={<QuestionCircleOutlined />}
              />
            </Tooltip>
          </div>
        </Col>
      </Row>
    </AppCard>
  );
}
