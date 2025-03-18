import { Col, Form } from 'antd';
import React, { useEffect } from 'react';
import FormSwitch from 'src/@crema/component/FormSwitch';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import FormHidden from 'src/@crema/core/Form/FormHidden';

FormRecordSelector.propTypes = {};
export const SCHEMA_NORMALIZATION = [
  'retriever',
  'record_selector',
  'schema_normalization',
];
export const FIELD_PATH = [
  'retriever',
  'record_selector',
  'extractor',
  'field_path',
];
export const RECORD_FILTER_CONDITION = [
  'retriever',
  'record_selector',
  'record_filter',
  'condition',
];
const SCHEMA_NORMALIZATION_TEMP = 'schema_normalization_temp';

function FormRecordSelector() {
  const form = Form.useFormInstance();
  const schemaNormalization = Form.useWatch(SCHEMA_NORMALIZATION);
  const schemaNormalizationTemp = Form.useWatch(SCHEMA_NORMALIZATION_TEMP);

  useEffect(() => {
    if (schemaNormalization === 'Default' && !schemaNormalizationTemp) {
      form.setFieldValue(SCHEMA_NORMALIZATION_TEMP, true);
    }

    if (schemaNormalization !== 'Default' && schemaNormalizationTemp) {
      form.setFieldValue(SCHEMA_NORMALIZATION_TEMP, false);
    }
  }, [schemaNormalization]);

  useEffect(() => {
    if (schemaNormalization === 'Default' && !schemaNormalizationTemp) {
      form.setFieldValue(SCHEMA_NORMALIZATION, undefined);
    }

    if (schemaNormalization !== 'Default' && schemaNormalizationTemp) {
      form.setFieldValue(SCHEMA_NORMALIZATION, 'Default');
    }
  }, [schemaNormalizationTemp]);

  return (
    <>
      <FormHidden
        name={['retriever', 'record_selector', 'type']}
        defaultValue={'RecordSelector'}
      />
      <FormHidden
        name={['retriever', 'record_selector', 'extractor', 'type']}
        defaultValue={'DpathExtractor'}
      />
      <FormHidden
        name={['retriever', 'record_selector', 'record_filter', 'type']}
        defaultValue={'RecordFilter'}
      />
      <FormHidden name={SCHEMA_NORMALIZATION} />
      <Col span={24}>
        <FormSelect
          getPopupContainer={(trigger) => trigger.parentNode}
          mode='tags'
          label='Đường dẫn'
          name={FIELD_PATH}
        />
      </Col>
      <Col span={24}>
        <FormInput
          label='Bộ lọc bản ghi'
          name={['retriever', 'record_selector', 'record_filter', 'condition']}
        />
      </Col>
      <Col span={24}>
        <FormSwitch
          label='Chuyển đổi trường bản ghi sang kiểu dữ liệu theo sơ đồ'
          name={SCHEMA_NORMALIZATION_TEMP}
        />
      </Col>
    </>
  );
}

export default FormRecordSelector;
