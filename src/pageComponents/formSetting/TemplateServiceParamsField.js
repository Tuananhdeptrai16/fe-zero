import React, { useEffect } from 'react';
import { KEY_OTHER } from 'src/shared/constants/SettingSystem';
import { convertLabel2Name } from 'src/shared/utils/String';
import { Col, Form, Row } from 'antd';
import FormInput from 'src/@crema/core/Form/FormInput';

const TemplateServiceParamsField = ({
  nameList,
  name,
  index,
  configTemplate,
}) => {
  const form = Form.useFormInstance();

  const item = configTemplate[index] || {};
  const keySelect = item['key-select']?.valueField;

  useEffect(() => {
    if (keySelect === KEY_OTHER) {
      form.setFieldValue(
        [nameList, name, 'key'],
        convertLabel2Name(item.label),
      );
    } else {
      form.setFieldValue([nameList, name, 'key'], keySelect);
    }
  }, [form, item.label, keySelect, name, nameList]);

  return (
    <Row gutter={[20, 20]}>
      <Col md={{ span: 12 }} xs={{ span: 24 }}>
        <FormInput
          label={'Tên trường'}
          name={[name, 'label']}
          required
          disabled
        />
      </Col>
      <Col md={{ span: 12 }} xs={{ span: 24 }}>
        <FormInput
          name={[name, 'selector']}
          dropdownMatchSelectWidth={420}
          label={'Selector'}
        />
      </Col>
    </Row>
  );
};

TemplateServiceParamsField.propTypes = {};

TemplateServiceParamsField.defaultProps = {};

export default TemplateServiceParamsField;
