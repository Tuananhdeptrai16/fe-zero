import { Col, Row } from 'antd';
import React from 'react';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormTextArea from 'src/@crema/core/Form/FormTextArea';
// import PropTypes from 'prop-types';

FormModalCardClassify.propTypes = {};

function FormModalCardClassify() {
  return (
    <Row gutter={[12, 12]}>
      <Col span={24}>
        <FormInput name='name' label='Tên phân loại thẻ' required />
        <FormTextArea name='description' label='Mô tả phân loại thẻ' />
      </Col>
    </Row>
  );
}

export default FormModalCardClassify;
