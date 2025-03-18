import React from 'react';
import { INPUT_TYPE } from 'src/shared/constants/InputType';
import { Button, Form } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import Media from 'src/@crema/component/Media';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormAntUploadMedia from 'src/@crema/core/Form/FormAntUploadMedia';

const ListInputByType = ({ name, type, label, fields, operation, meta }) => {
  const { errors } = meta;
  const { add, remove } = operation;
  const value = Form.useWatch(name);
  const renderContent = ({ field }) => {
    const { name, ...restField } = field;
    switch (type) {
      case INPUT_TYPE.LIST_IMAGE_LINK:
        return (
          <Form.Item validateTrigger={['onChange', 'onBlur']}>
            <div style={{ marginBottom: '8px' }}>
              <FormInput
                {...restField}
                placeholder={'Nhập url'}
                name={[name, 'url']}
                layout={{
                  noStyle: true,
                  validateTrigger: ['onChange', 'onBlur'],
                }}
                style={{ width: 'calc(100% - 40px)' }}
              />
              <MinusCircleOutlined
                width={24}
                height={24}
                className='dynamic-delete-button'
                onClick={() => {
                  remove(name);
                }}
              />
            </div>
            <FormAntUploadMedia
              maxCount={1}
              multiple={false}
              name={[name, 'image']}
              {...restField}
            />
          </Form.Item>
        );
      case INPUT_TYPE.LIST_VIDEO:
        return (
          <div>
            <div style={{ marginBottom: '8px' }}>
              <FormInput
                layout={{
                  ...field,
                  noStyle: true,
                  validateTrigger: ['onChange', 'onBlur'],
                }}
                style={{ width: 'calc(100% - 40px)' }}
              />
              <MinusCircleOutlined
                width={24}
                height={24}
                className='dynamic-delete-button'
                onClick={() => {
                  remove(name);
                }}
              />
            </div>
            <Media width={300} height={200} src={value?.[name]} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {fields?.map((field, index) => {
        return (
          <Form.Item label={index === 0 ? label : ''} key={field?.key}>
            {renderContent({ field, index })}
          </Form.Item>
        );
      })}
      <Form.Item>
        <Button type={'dashed'} onClick={() => add()} icon={<PlusOutlined />}>
          Tạo mới
        </Button>
        <Form.ErrorList errors={errors} />
      </Form.Item>
    </>
  );
};

ListInputByType.propTypes = {};

ListInputByType.defaultProps = {};

export default ListInputByType;
