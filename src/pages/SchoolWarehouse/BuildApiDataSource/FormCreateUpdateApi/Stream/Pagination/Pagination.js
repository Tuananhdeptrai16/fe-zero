import { Col, Form, Row } from 'antd';
import React from 'react';
import AppCard from 'src/@crema/core/AppCard';
import AntCheckbox from 'src/@crema/component/AntCheckbox';
import FormSettingPagination from './FormSettingPagination';
import { isEmpty } from 'src/shared/utils/Typeof';

export default function Pagination() {
  const form = Form.useFormInstance();
  const [isPagination, setIsPagination] = React.useState(
    !isEmpty(form.getFieldValue(['retriever', 'paginator'])),
  );
  return (
    <AppCard className={'mt-4'}>
      <Row>
        <Col span={24}>
          <AntCheckbox
            checked={isPagination}
            onChange={(e) => setIsPagination(e.target.checked)}>
            Phân trang
          </AntCheckbox>
        </Col>
        {isPagination && (
          <Col span={24} className={'mt-4'}>
            <FormSettingPagination />
          </Col>
        )}
      </Row>
    </AppCard>
  );
}
