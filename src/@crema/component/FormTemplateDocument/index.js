import React from 'react';
import { INPUT_TYPE } from 'src/shared/constants/InputType';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormTextArea from 'src/@crema/core/Form/FormTextArea';
import { convertLabel2Name } from 'src/shared/utils/String';
import FormDateRangeText from 'src/@crema/component/FormDateRangeText';
import FormDateText from 'src/@crema/component/FormDateText';
import { Button, Col, Form, Row } from 'antd';
import { CloseCircleOutlined, PlusOutlined } from '@ant-design/icons';

const FormTemplateDocument = ({ field, configTemplate }) => {
  return (
    <div>
      {configTemplate?.map((config, index) => {
        let attrs = {
          label: config.label,
          name: [
            field?.name,
            config.key ||
              config?.['key-select']?.valueField ||
              convertLabel2Name(config.label),
          ],
          required: config.required,
        };
        let ComponentInput;
        switch (config.type) {
          // case INPUT_TYPE.SELECT:
          //   ComponentInput = FormSelect;
          //   attrs.options = getDataObjectFormTemplate(config.data) || [];
          //   break;
          // case INPUT_TYPE.SELECT_ASYNC:
          //   ComponentInput = FormSelectAsync;
          //   attrs = {
          //     ...attrs,
          //     fieldNames: { label: 'name', value: 'id' },
          //     configFetch: {
          //       method: METHOD_FETCH.POST,
          //       url: config.data,
          //       body: {},
          //     },
          //   };
          //   break;
          case INPUT_TYPE.DATE:
            attrs.rules = { date_text: [] };
            ComponentInput = FormDateText;
            break;
          case INPUT_TYPE.DATE_RANGE:
            attrs.rules = { date_range_text: [] };
            ComponentInput = FormDateRangeText;
            break;
          case INPUT_TYPE.TEXT_AREA:
            ComponentInput = FormTextArea;
            break;
          case INPUT_TYPE.TEXT:
          default:
            ComponentInput = FormInput;
        }

        return <ComponentInput key={`field-${index}`} {...attrs} />;
      })}
      <Form.List name={[field?.name, 'custom']}>
        {(fields, operation) => {
          const { add, remove } = operation;
          return (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Row key={key}>
                  <Col span={6}>
                    <FormInput
                      {...restField}
                      name={[name, 'field']}
                      layout={{
                        className: 'pr-2',
                      }}
                      placeholder='Nhập tên trường'
                    />
                  </Col>
                  <Col span={17}>
                    <FormInput
                      {...restField}
                      name={[name, 'value']}
                      placeholder='Nhập giá trị nội dung'
                    />
                  </Col>
                  <Col
                    span={1}
                    className='d-flex items-center justify-center'
                    style={{ height: 32 }}>
                    <CloseCircleOutlined onClick={() => remove(name)} />
                  </Col>
                </Row>
              ))}
              <Form.Item>
                <Button type='link' className='px-0' onClick={add}>
                  <PlusOutlined />
                  Thêm trường dữ liệu khác
                </Button>
              </Form.Item>
            </>
          );
        }}
      </Form.List>
    </div>
  );
};

FormTemplateDocument.propTypes = {};

FormTemplateDocument.defaultProps = {};

export default FormTemplateDocument;
