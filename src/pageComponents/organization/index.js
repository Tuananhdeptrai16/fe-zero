import React from 'react';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormTextArea from 'src/@crema/core/Form/FormTextArea/index';
import { Col, Form, Row } from 'antd';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import { TELE_CODE_NATIONAL } from 'src/shared/constants/DataSelect';
import FormListKeyValue from 'src/@crema/component/FormListKeyValue';
import FormHidden from 'src/@crema/core/Form/FormHidden';

export const FormOrganizationModal = () => {
  const nationCode = Form.useWatch('country_code');
  const attributes = Form.useWatch('attributes');
  return (
    <div>
      <Row gutter={[20, 0]}>
        <Col md={{ span: 10 }} xs={{ span: 24 }}>
          <FormInput label='table.organizationCode' name='name' required />
        </Col>
        <Col md={{ span: 14 }} xs={{ span: 24 }}>
          <FormInput
            label='table.organizationName'
            name='display_name'
            required
          />
        </Col>
      </Row>
      <FormTextArea label='table.description' name='description' />
      <Row gutter={[20, 0]}>
        <Col md={{ span: 10 }} xs={{ span: 24 }}>
          <FormSelect
            options={TELE_CODE_NATIONAL}
            label='table.nationCode'
            name='country_code'
            required
          />
        </Col>
        <Col md={{ span: 14 }} xs={{ span: 24 }}>
          <FormInput
            addonBefore={nationCode}
            label='table.organizationTelephone'
            name='phone_number'
            required
          />
        </Col>
        <FormListKeyValue
          label={'Thuộc tính'}
          rootName='attributes'
          editable={false}
          renderItem={({ name, restField, index }) => {
            return (
              <>
                <FormHidden name={[name, 'name']} />
                <FormInput
                  name={[name, 'value']}
                  label={attributes?.[index]?.name}
                  style={{ width: 400 }}
                  {...restField}
                />
              </>
            );
          }}
        />
      </Row>
    </div>
  );
};
