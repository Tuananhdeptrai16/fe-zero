import React from 'react';
import { Col, Row, Tooltip } from 'antd';
import AppCard from 'src/@crema/core/AppCard';
import AntButton from 'src/@crema/component/AntButton';
import { QuestionCircleOutlined } from '@ant-design/icons';

export default function BearerAuthenticator() {
  return (
    <AppCard>
      <Row>
        <Col span={24}>
          <div className='d-flex items-center justify-start'>
            <label>Bearer Token</label>
            <Tooltip title='Mã token được đưa vào làm tiêu đề yêu cầu để xác thực với API.'>
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
