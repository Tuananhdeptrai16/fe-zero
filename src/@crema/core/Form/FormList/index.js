import { Button, Form, Space } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { injectRules } from 'src/validate';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import CodeBox from 'src/@crema/core/DataDisplay/CodeBox';

import './style.scss';

const FormList = (props) => {
  const { required, name, label, rules, renderFormItemTitle, renderFormItem } =
    props;

  const data = Form.useWatch(name) || [];
  const { messages, formatMessage } = useIntl();
  const labelShow = messages[label] || label;

  return (
    <Form.List
      name={name}
      label={labelShow}
      rules={injectRules({ required, labelShow, rules, formatMessage })}>
      {(fields, operation, meta) => {
        const { errors } = meta;
        const { add, remove } = operation;

        return (
          <>
            <Form.Item
              className='form-item-title'
              required={required}
              label={labelShow}></Form.Item>
            <CodeBox>
              {fields?.map((field, index) => {
                const isDisable = data[index]?.disable;
                return (
                  <CodeBox.CodeBoxMeta key={`field-item-${index}`}>
                    <CodeBox.CodeBoxTitle>
                      <Space>
                        {renderFormItemTitle({
                          ...field,
                          index,
                          remove: () => {
                            remove(field?.name);
                          },
                        })}
                        {!isDisable && (
                          <MinusCircleOutlined
                            className='table-action-delete-color'
                            title={'Xóa'}
                            onClick={() => remove(field?.name)}
                          />
                        )}
                      </Space>
                    </CodeBox.CodeBoxTitle>
                    <CodeBox.CodeBoxDescription>
                      {renderFormItem({
                        ...field,
                        index,
                        remove: () => {
                          remove(field?.name);
                        },
                      })}
                    </CodeBox.CodeBoxDescription>
                  </CodeBox.CodeBoxMeta>
                );
              })}
              <Form.Item className='form-item-add'>
                <Button
                  type={'dashed'}
                  onClick={() => add()}
                  icon={<PlusOutlined />}>
                  Tạo mới
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </CodeBox>
          </>
        );
      }}
    </Form.List>
  );
};

FormList.propTypes = {
  required: PropTypes.bool,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  rules: PropTypes.object,
};

export default FormList;
