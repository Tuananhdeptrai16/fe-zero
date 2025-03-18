import { Col, Row } from 'antd';
import React from 'react';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import FormHidden from 'src/@crema/core/Form/FormHidden';

FormPageSize.propTypes = {};

function FormPageSize() {
  return (
    <Row>
      <FormHidden
        name={['retriever', 'paginator', 'page_size_option', 'type']}
        defaultValue={'RequestOption'}
      />
      <Col span={24}>
        <FormSelect
          getPopupContainer={(trigger) => trigger.parentNode}
          name={['retriever', 'paginator', 'page_size_option', 'inject_into']}
          required
          label='Thêm vào'
          options={[
            {
              label: 'Tham số yêu cầu',
              value: 'request_parameter',
            },
            {
              label: 'Tiêu đề',
              value: 'header',
            },
            {
              label: 'Dữ liệu nội dung (dạng mã hóa url)',
              value: 'body_data',
            },
            {
              label: 'Nội dung json',
              value: 'body_json',
            },
          ]}
        />
      </Col>
      <Col span={24}>
        <FormInput
          label='Tên khóa'
          required
          name={['retriever', 'paginator', 'page_size_option', 'field_name']}
        />
      </Col>
    </Row>
  );
}

export default FormPageSize;
