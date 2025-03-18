import { Col, Row } from 'antd';
import React from 'react';
import FormSwitch from 'src/@crema/component/FormSwitch';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import FormHidden from 'src/@crema/core/Form/FormHidden';

FormPageToken.propTypes = {};

function FormPageToken() {
  return (
    <Row>
      <FormHidden
        name={['retriever', 'paginator', 'page_token_option', 'type']}
        defaultValue={'RequestOption'}
      />
      <Col span={24}>
        <FormSelect
          getPopupContainer={(trigger) => trigger.parentNode}
          name={['retriever', 'paginator', 'page_token_option', 'inject_into']}
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
          name={['retriever', 'paginator', 'page_token_option', 'field_name']}
        />
      </Col>
      <Col span={24}>
        <FormSwitch
          label='Thêm vào yêu cầu đầu tiên'
          name={[
            'retriever',
            'paginator',
            'pagination_strategy',
            'inject_on_first_request',
          ]}
        />
      </Col>
    </Row>
  );
}

export default FormPageToken;
