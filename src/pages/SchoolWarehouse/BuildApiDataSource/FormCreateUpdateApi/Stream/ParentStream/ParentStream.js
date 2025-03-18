import { Col, Form, Row } from 'antd';
import React from 'react';
import AppCard from 'src/@crema/core/AppCard';
import AntCheckbox from 'src/@crema/component/AntCheckbox';
import FormParentStream from './FormParentStream';

export default function ParentStream() {
  const form = Form.useFormInstance();
  const [isParentStream, setIsParentStream] = React.useState(
    form.getFieldValue(['retriever', 'parent_stream', 'type']) ===
      'SubstreamPartitionRouter',
  );
  return (
    <AppCard className={'mt-4'}>
      <Row>
        <Col span={24}>
          <AntCheckbox
            checked={isParentStream}
            onChange={(e) => setIsParentStream(e.target.checked)}>
            Luồng cha
          </AntCheckbox>
        </Col>
        {isParentStream && (
          <Col span={24} className={'mt-4'}>
            <FormParentStream />
          </Col>
        )}
      </Row>
    </AppCard>
  );
}
