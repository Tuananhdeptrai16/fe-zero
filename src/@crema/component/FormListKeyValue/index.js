import React from 'react';
import { Button, Form, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useIntl } from 'react-intl';
import { injectRules } from 'src/validate';

const FormListKeyValue = ({
  editable = true,
  required,
  label,
  rules,
  rootName,
  renderItem,
  textAdd = 'Thêm thuộc tính',
  valueAddInit,
  ...props
}) => {
  const { messages, formatMessage } = useIntl();
  const labelShow = messages[label] || label;
  return (
    <Form.List
      name={rootName}
      label={labelShow}
      rules={injectRules({ required, labelShow, rules, formatMessage })}
      {...props}>
      {(fields, { add, remove }, { errors }) => (
        <>
          {fields.map(({ key, name, ...restField }, index) => (
            <Space key={key} style={{ width: '100%' }}>
              {renderItem({ name, key, restField, index })}
              {editable && (
                <MinusCircleOutlined
                  style={{ marginTop: 10 }}
                  onClick={() => remove(name)}
                />
              )}
            </Space>
          ))}
          <Form.Item>
            {editable && (
              <Button
                type='link'
                className='px-0'
                onClick={() => add(valueAddInit)}>
                <PlusOutlined />
                {textAdd}
              </Button>
            )}

            <Form.ErrorList errors={errors} />
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};

FormListKeyValue.propTypes = {};

FormListKeyValue.defaultProps = {};

export default FormListKeyValue;
