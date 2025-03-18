import { Col, Row } from 'antd';
import React from 'react';
import FormSwitch from 'src/@crema/component/FormSwitch';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import style from './formInputUser.module.scss';
import clsx from 'clsx';

FormInputUser.propTypes = {};

function FormInputUser({ isHiddenFormItem }) {
  return (
    <Row className={clsx(style.formInputUser)}>
      <Col span={24}>
        <FormInput label='Tên đầu vào' required name='title' />
      </Col>
      <Col span={24}>
        <FormInput
          disabled={isHiddenFormItem}
          label='ID'
          required
          name='field'
        />
      </Col>
      <Col span={24}>
        <FormSelect
          disabled={isHiddenFormItem}
          options={[
            {
              label: 'string',
              value: 'string',
            },
            {
              label: 'number',
              value: 'number',
            },
            {
              label: 'integer',
              value: 'integer',
            },
            {
              label: 'array',
              value: 'array',
            },
            {
              label: 'boolean',
              value: 'boolean',
            },
            {
              label: 'boolean',
              value: 'boolean',
            },
          ]}
          label='Loại'
          required
          name='type'
        />
      </Col>
      <Col span={24} className={clsx(style.formInputUserSwitch)}>
        <FormSwitch
          disabled={isHiddenFormItem}
          label='Trường thông tin bí mật'
          name='airbyte_secret'
        />
      </Col>
      <Col span={24} className={clsx(style.formInputUserSwitch)}>
        <FormSwitch
          disabled={isHiddenFormItem}
          label='Trường thông tin bắt buộc'
          name='required'
        />
      </Col>
    </Row>
  );
}

export default FormInputUser;
