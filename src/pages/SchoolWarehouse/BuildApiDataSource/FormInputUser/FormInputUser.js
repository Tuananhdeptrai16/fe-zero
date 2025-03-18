import { Col, Form, Row } from 'antd';
import React from 'react';
import FormSwitch from 'src/@crema/component/FormSwitch';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import style from '../ListApiDataSource.module.scss';
import clsx from 'clsx';
// import PropTypes from 'prop-types';

FormInputUser.propTypes = {};

function FormInputUser({ initUpdateInputUser }) {
  const form = Form.useFormInstance();
  const watchEnableDefaultInputUser =
    Form.useWatch('enable_default_value_input_user', form) || '';

  const isHiddenFormItem =
    initUpdateInputUser?.id === 'api_key' ||
    initUpdateInputUser?.id === 'username' ||
    initUpdateInputUser?.id === 'password' ||
    initUpdateInputUser?.id === 'client_id' ||
    initUpdateInputUser?.id === 'client_secret' ||
    initUpdateInputUser?.id === 'client_refresh_token';

  return (
    <Row className={clsx(style.formInputUser)}>
      <Col span={24}>
        <FormInput label='Tên đầu vào' required name='title_input_user' />
      </Col>
      <Col span={24}>
        <FormInput
          rules={{
            trim_space: [],
          }}
          label='ID'
          required
          name='id_input_user'
        />
      </Col>
      <Col span={24}>
        <FormInput label='Gợi ý' required name='hint_input_user' />
      </Col>
      {!isHiddenFormItem && (
        <>
          <Col span={24}>
            <FormSelect
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
              name='type_input_user'
            />
          </Col>
          <Col span={24} className={clsx(style.formInputUserSwitch)}>
            <FormSwitch
              label='Trường thông tin bí mật'
              name='secret_field_input_user'
            />
          </Col>
          <Col span={24} className={clsx(style.formInputUserSwitch)}>
            <FormSwitch
              label='Trường thông tin bắt buộc'
              name='required_field_input_user'
            />
          </Col>
          <Col span={24} className={clsx(style.formInputUserSwitch)}>
            <FormSwitch
              label='Cho cài giá trị mặc định'
              name='enable_default_value_input_user'
            />
          </Col>
          {watchEnableDefaultInputUser && (
            <Col span={24}>
              <FormInput
                label='Giá trị mặc định'
                required
                name='default_value_input_user'
              />
            </Col>
          )}
        </>
      )}
    </Row>
  );
}

export default FormInputUser;
