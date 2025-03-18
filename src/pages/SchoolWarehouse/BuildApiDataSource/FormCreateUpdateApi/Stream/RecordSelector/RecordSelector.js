import { Col, Form, Row } from 'antd';
import React from 'react';
import AppCard from 'src/@crema/core/AppCard';
import AntCheckbox from 'src/@crema/component/AntCheckbox';
import FormRecordSelector, {
  FIELD_PATH,
  RECORD_FILTER_CONDITION,
  SCHEMA_NORMALIZATION,
} from './FormRecordSelector';
import FormHidden from 'src/@crema/core/Form/FormHidden';
import { isEmpty } from 'src/shared/utils/Typeof';

export default function RecordSelector() {
  const form = Form.useFormInstance();
  const initIsRecordSelector =
    !isEmpty(form.getFieldValue(SCHEMA_NORMALIZATION)) ||
    !isEmpty(form.getFieldValue(FIELD_PATH)) ||
    !isEmpty(form.getFieldValue(RECORD_FILTER_CONDITION));

  const [isRecordSelector, setIsRecordSelector] =
    React.useState(initIsRecordSelector);

  return (
    <AppCard className={'mt-4'}>
      <Row>
        <Col span={24}>
          <AntCheckbox
            checked={isRecordSelector}
            onChange={(e) => setIsRecordSelector(e.target.checked)}>
            Bộ chọn bản ghi
          </AntCheckbox>
        </Col>
        {isRecordSelector && (
          <Col span={24} className={'mt-4'}>
            <FormRecordSelector />
          </Col>
        )}
        {!isRecordSelector && (
          <FormHidden
            name={['retriever', 'record_selector']}
            defaultValue={{
              type: 'RecordSelector',
              extractor: {
                type: 'DpathExtractor',
                field_path: [],
              },
            }}
          />
        )}
      </Row>
    </AppCard>
  );
}
