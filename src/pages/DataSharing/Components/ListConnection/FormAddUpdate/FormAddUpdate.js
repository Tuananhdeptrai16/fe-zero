import React from 'react';
import FormInput from 'src/@crema/core/Form/FormInput';
import { Row, Col } from 'antd';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import FormInputPassword from 'src/@crema/core/Form/FormInputPassword';
import FormTextArea from 'src/@crema/core/Form/FormTextArea';
import FormInputNumber from 'src/@crema/core/Form/FormInputNumber';

// import PropTypes from 'prop-types';

FormAddUpdate.propTypes = {};

function FormAddUpdate() {
  return (
    <Row gutter={[16, 0]}>
      <Col span={12}>
        <FormInput required name='name' label='Tên kết nối' />
      </Col>
      <Col span={12}>
        <FormSelect
          required
          name='type'
          label='Loại cơ sở dữ liệu'
          options={[
            {
              label: 'Postgres',
              value: 'Postgres',
            },
            {
              label: 'ClickHouse',
              value: 'ClickHouse',
            },
          ]}
        />
      </Col>
      <Col span={12}>
        <FormInput required name='host' label='Máy chủ' />
      </Col>
      <Col span={12}>
        <FormInputNumber required name='port' label='Cổng kết nối' />
      </Col>
      <Col span={12}>
        <FormInput required name='database' label='Tên cơ sở dữ liệu' />
      </Col>
      <Col span={12}>
        <FormInput required name='username' label='Tài khoản' />
      </Col>
      <Col span={12}>
        <FormInputPassword required name='password' label='Mật khẩu' />
      </Col>
      <Col span={12}>
        <FormInput required name='schema' label='Lược đồ' />
      </Col>
      <Col span={24}>
        <FormTextArea name='comment' label='Chú thích' />
      </Col>
    </Row>
  );
}

export default FormAddUpdate;
