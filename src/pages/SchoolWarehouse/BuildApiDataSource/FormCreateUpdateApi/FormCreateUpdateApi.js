import { Col, Row } from 'antd';
import React from 'react';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormMethod from './FormMethod';
// import PropTypes from 'prop-types';

FormCreateUpdateApi.propTypes = {};

function FormCreateUpdateApi({ rowData, initBuilderApi }) {
  return (
    <Row>
      <Col span={24}>
        <FormInput label='Tên nguồn API' name='name' required />
      </Col>
      <Col span={24}>
        <FormInput label='Đường dẫn API' name={'url_base'} required />
      </Col>
      <Col span={24}>
        <FormMethod rowData={rowData} initBuilderApi={initBuilderApi} />
      </Col>
    </Row>
  );
}

export default FormCreateUpdateApi;
