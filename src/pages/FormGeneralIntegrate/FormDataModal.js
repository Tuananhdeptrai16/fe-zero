import React from 'react';
import FormInput from 'src/@crema/core/Form/FormInput';

import { Col, Row } from 'antd';

export const FormDataModal = ({ isEdit }) => {
  return (
    <div>
      <Row gutter={20}>
        <Col span={12}>
          <FormInput
            disabled={!isEdit ? true : false}
            label='Tên dữ liệu đích'
            name='name'
            required
          />
        </Col>

        <Col span={12}>
          <FormInput
            disabled={!isEdit ? true : false}
            label='Kết nối'
            name='destination_name'
            required
          />
        </Col>
      </Row>
    </div>
  );
};
