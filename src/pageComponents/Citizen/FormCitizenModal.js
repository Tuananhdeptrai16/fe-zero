import React from 'react';
import FormInput from 'src/@crema/core/Form/FormInput';
import { Col, Row } from 'antd';
import FormTextArea from 'src/@crema/core/Form/FormTextArea';
import FormDatePicker from 'src/@crema/core/Form/FormDatePicker';

export const FormCitizenModal = () => {
  return (
    <div>
      <Row gutter={[12, 0]}>
        <Col xl={12}>
          <FormInput label='table.citizenFullName' name='name' required />
        </Col>
        <Col xl={12}>
          <FormInput
            label='table.citizenOtherName'
            name='other_name'
            required
          />
        </Col>
      </Row>
      <Row gutter={[12, 0]}>
        <Col xl={12}>
          <FormDatePicker label='table.citizenDateOfBirth' name='ethnicity' />
        </Col>
        <Col xl={12}>
          <FormInput label='table.citizenPlaceOfBirth' name='nationality' />
        </Col>
      </Row>
      <Row gutter={[12, 0]}>
        <Col xl={12}>
          <FormInput label='table.citizenEthnicity' name='ethnicity' />
        </Col>
        <Col xl={12}>
          <FormInput label='table.citizenNationality' name='nationality' />
        </Col>
      </Row>
      <Row>
        <Col xl={24}>
          <FormTextArea
            label='table.citizenPermanentAddress'
            name='permanent_address'
            row={3}
          />
        </Col>
      </Row>
      <Row>
        <Col xl={24}>
          <FormTextArea
            label='table.citizenTemporaryAddress'
            name='temporary_address'
            row={3}
          />
        </Col>
      </Row>
      <Row gutter={[12, 0]}>
        <Col xl={8}>
          <FormInput
            label='table.citizenPassportNumber'
            name='passport_number'
          />
        </Col>
        <Col xl={8}>
          <FormInput label='table.citizenPassportDate' name='passport_date' />
        </Col>
        <Col xl={8}>
          <FormInput label='table.citizenPassportPlace' name='passport_place' />
        </Col>
      </Row>
      <Row gutter={[12, 0]}>
        <Col xl={8}>
          <FormInput label='table.citizenCCCDNumber' name='cccd_number' />
        </Col>
        <Col xl={8}>
          <FormInput label='table.citizenCCCDDate' name='cccd_date' />
        </Col>
        <Col xl={8}>
          <FormInput label='table.citizenCCCDPlace' name='cccd_place' />
        </Col>
      </Row>
      <Row>
        <Col xl={24}>
          <FormTextArea label='table.note' name='note' />
        </Col>
      </Row>
    </div>
  );
};
