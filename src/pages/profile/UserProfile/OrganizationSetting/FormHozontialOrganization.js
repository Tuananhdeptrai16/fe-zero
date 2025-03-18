import React from 'react';
import { Col, Form, Row } from 'antd';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormTextArea from 'src/@crema/core/Form/FormTextArea';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import { TELE_CODE_NATIONAL } from 'src/shared/constants/DataSelect';

const layout1 = {
  labelCol: {
    span: 4,
  },
};

const layout2 = {
  labelCol: {
    span: 5,
  },
};

export const FormHorizontalOrganization = () => {
  const nationCode = Form.useWatch('country_code');

  return (
    <div>
      <Row gutter={32}>
        <Col xl={{ span: 10 }} xs={{ span: 24 }}>
          <FormInput label='table.organizationCode' name='name' required />
        </Col>
        <Col xl={{ span: 14 }} xs={{ span: 24 }}>
          <FormInput
            label='table.organizationName'
            name='display_name'
            layout={layout2}
            required
          />
        </Col>
        <Col span={24}>
          <FormTextArea
            layout={layout1}
            label='table.description'
            name='description'
          />
        </Col>
        <Col xl={{ span: 10 }} xs={{ span: 24 }}>
          <FormSelect
            options={TELE_CODE_NATIONAL}
            label='table.nationCode'
            name='country_code'
            required
          />
        </Col>
        <Col xl={{ span: 14 }} xs={{ span: 24 }}>
          <FormInput
            layout={layout2}
            addonBefore={nationCode}
            label='table.organizationTelephone'
            name='phone_number'
            required
          />
        </Col>
        <Col xl={{ span: 10 }} xs={{ span: 24 }}>
          <FormInput label='table.attributeOrganization' name='name' required />
        </Col>
        <Col xl={{ span: 14 }} xs={{ span: 24 }}>
          <FormInput
            layout={layout2}
            label='table.valueOrganization'
            name='display_name'
            required
          />
        </Col>
      </Row>
    </div>
  );
};
