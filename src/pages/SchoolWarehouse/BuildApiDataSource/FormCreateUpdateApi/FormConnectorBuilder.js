import React from 'react';
import { Col, Row } from 'antd';
import FormInput from 'src/@crema/core/Form/FormInput';
import Authentication from './Authentication/Authentication';
import UserInputs from './UserInputs/UserInputs';
import Streams from 'src/pages/SchoolWarehouse/BuildApiDataSource/FormCreateUpdateApi/Stream/Streams';
import FormHidden from 'src/@crema/core/Form/FormHidden';

export default function FormConnectorBuilder() {
  return (
    <Row>
      <Col span={24}>
        <FormInput label='Tên nguồn API' name='name' required />
      </Col>
      <Col span={24}>
        <FormHidden
          name={['definitions', 'base_requester', 'type']}
          defaultValue={'HttpRequester'}
        />
        <FormInput
          label='Đường dẫn API'
          name={['definitions', 'base_requester', 'url_base']}
          required
          rules={{ url: [] }}
        />
      </Col>
      <Col span={24}>
        <Authentication />
      </Col>
      <Col span={24}>
        <UserInputs />
      </Col>
      <Col span={24}>
        <Streams />
      </Col>
    </Row>
  );
}
