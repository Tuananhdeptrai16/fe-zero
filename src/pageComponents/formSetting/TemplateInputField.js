import React, { useEffect, useMemo } from 'react';
import {
  KEY_OTHER,
  TYPE_FORM_SETTING_SYSTEM,
} from 'src/shared/constants/SettingSystem';
import { convertLabel2Name } from 'src/shared/utils/String';
import { Col, Form, Row } from 'antd';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import { INPUT_TYPE } from 'src/shared/constants/InputType';
import FormTextArea from 'src/@crema/core/Form/FormTextArea';
import {
  COMMON_DOCUMENT_FIELD,
  PROHIBIT_POSITION_DOCUMENT_FIELD,
  RELATED_DOCUMENT_FIELD,
  VERDICT_FIELD,
} from 'src/shared/constants/FieldKeyMap';
import { cloneDeep } from 'lodash';
import {
  GROUP_TYPE_PROHIBIT_POSITIONS_DOCUMENT,
  GROUP_TYPE_RELATE_DOCUMENT,
  GROUP_TYPE_VERDICT,
} from 'src/shared/constants/DataFixed';

const TemplateInputField = ({
  groupType,
  nameList,
  name,
  index,
  configTemplate,
  ...restField
}) => {
  const form = Form.useFormInstance();

  const organizationFields = useMemo(() => {
    const keys = [];

    switch (groupType) {
      case GROUP_TYPE_VERDICT:
        keys.push(...cloneDeep([VERDICT_FIELD, COMMON_DOCUMENT_FIELD]));
        break;
      case GROUP_TYPE_RELATE_DOCUMENT:
        keys.push(
          ...cloneDeep([RELATED_DOCUMENT_FIELD, COMMON_DOCUMENT_FIELD]),
        );
        break;
      case GROUP_TYPE_PROHIBIT_POSITIONS_DOCUMENT:
        keys.push(
          ...cloneDeep([
            PROHIBIT_POSITION_DOCUMENT_FIELD,
            COMMON_DOCUMENT_FIELD,
          ]),
        );
        break;
      default:
        keys.push(
          ...cloneDeep([
            VERDICT_FIELD,
            RELATED_DOCUMENT_FIELD,
            PROHIBIT_POSITION_DOCUMENT_FIELD,
            COMMON_DOCUMENT_FIELD,
          ]),
        );
    }

    return keys.flat().map((option) => {
      option.options = option.options.map((optionChild) => {
        return {
          ...optionChild,
          value: `${convertLabel2Name(option.label)}_${optionChild.value}`,
          valueField: optionChild.value,
        };
      });
      return option;
    });
  }, [groupType]);

  const item = configTemplate[index] || {};
  const keySelect = item['key-select']?.valueField;
  const type = item?.type;

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
      <Col md={{ span: 24 }} xs={{ span: 24 }}>
        <FormInput label={'Tên trường'} name={[name, 'label']} required />
      </Col>
      <Col md={{ span: 8 }} xs={{ span: 24 }}>
        <FormSelect
          name={[name, 'key-select']}
          options={organizationFields}
          dropdownMatchSelectWidth={420}
          label={'Ánh xạ dữ liệu'}
          returnObject
        />
      </Col>
      <Col md={{ span: 8 }} xs={{ span: 24 }}>
        <FormSelect
          name={[name, 'type']}
          options={TYPE_FORM_SETTING_SYSTEM}
          required
          label='Chọn kiểu dữ liệu'
        />
      </Col>
      <Col md={{ span: 8 }} xs={{ span: 24 }}>
        {keySelect && keySelect !== KEY_OTHER && (
          <FormInput
            disabled
            name={[name, 'key']}
            label={'Key ánh xạ dữ liệu'}
            required
          />
        )}
        {(!keySelect || keySelect === KEY_OTHER) && (
          <FormInput
            label={'Key ánh xạ dữ liệu'}
            name={[name, 'key']}
            required
          />
        )}
      </Col>
      <Col xs={{ span: 24 }}>
        {type === INPUT_TYPE.SELECT && (
          <FormTextArea
            {...restField}
            label={'Dữ liệu mẫu'}
            placeholder={'[{"value":"value 1","label":"label 1"}]'}
            name={[name, 'data']}
            required
          />
        )}
        {type === INPUT_TYPE.SELECT_ASYNC && (
          <FormInput
            {...restField}
            label={'URL lấy dữ liệu'}
            placeholder={'Ví dụ: "/api/exsample/select"'}
            name={[name, 'data']}
            required
          />
        )}
      </Col>
    </Row>
  );
};

TemplateInputField.propTypes = {};

TemplateInputField.defaultProps = {};

export default TemplateInputField;
