import { Col, Form, Row } from 'antd';
import React from 'react';
import AppCard from 'src/@crema/core/AppCard';
import AntCheckbox from 'src/@crema/component/AntCheckbox';
import FormSettingParameterizedRequests from './FormSettingParameterizedRequests';
import { isEmpty } from 'src/shared/utils/Typeof';

export default function ParameterizedRequests() {
  const form = Form.useFormInstance();
  const [isParameterizedRequests, setIsParameterizedRequests] = React.useState(
    !isEmpty(form.getFieldValue(['retriever', 'parameterized_requests'])),
  );
  return (
    <AppCard className={'mt-4'}>
      <Row>
        <Col span={24}>
          <AntCheckbox
            checked={isParameterizedRequests}
            onChange={(e) => setIsParameterizedRequests(e.target.checked)}>
            Tham số yêu cầu
          </AntCheckbox>
        </Col>
        {isParameterizedRequests && (
          <Col span={24} className={'mt-4'}>
            <FormSettingParameterizedRequests />
          </Col>
        )}
      </Row>
    </AppCard>
  );
}
