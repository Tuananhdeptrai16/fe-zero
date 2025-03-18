import { Col, Divider, Row, Typography } from 'antd';
import React from 'react';
import FormDatePicker from 'src/@crema/core/Form/FormDatePicker';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import FormTextArea from 'src/@crema/core/Form/FormTextArea';
import { GENDER_LIST } from 'src/shared/constants/DataTable';

const INPUT_FORM = [
  {
    name: 'full_name',
    label: 'common.name',
    type: 'input',
  },
  {
    type: 'input',
    name: 'other_name',
    label: 'common.anotherName',
  },
  {
    type: 'select',
    name: 'gender',
    label: 'common.gender',
    options: GENDER_LIST,
  },
  {
    type: 'input',
    name: 'date_of_birth',
    label: 'common.birthday',
  },
  {
    type: 'input',
    name: 'permanent_address',
    label: 'judicial.dkhktt',
  },
  // {
  //   type: 'input',
  //   name: 'temporary_address',
  //   label: 'judicial.staying',
  // },
  // {
  //   type: 'select',
  //   name: 'document_type',
  //   label: 'judicial.idCardType',
  // },
  // {
  //   type: 'input',
  //   name: 'cccd_number',
  //   label: 'judicial.idCard',
  // },
  // {
  //   type: 'input',
  //   name: 'cccd_date',
  //   label: 'judicial.issuanceDate',
  // },
  {
    type: 'input',
    name: 'father_name',
    label: 'common.fatherName',
  },
  {
    type: 'input',
    name: 'father_yob',
    label: 'common.yobFather',
  },
  {
    type: 'input',
    name: 'mother_name',
    label: 'common.motherName',
  },
  {
    type: 'input',
    name: 'mother_yob',
    label: 'common.yobMother',
  },
  // {
  //   type: 'input',
  //   name: 'significant_other_name',
  //   label: 'common.husbandWifeFullName',
  // },
  // {
  //   type: 'input',
  //   name: 'significant_other_yob',
  //   label: 'common.husbandWifeBirthday',
  // },
];

const LAYOUT = {
  labelCol: { span: 8 },
};
export const FormCompareCitizenInfo = ({ title }) => {
  return (
    <>
      <Typography.Title level={5}>{title}</Typography.Title>
      <Divider />
      <Row>
        {INPUT_FORM.map((item, index) => (
          <Col xl={24} key={`${item.name}-${index}`}>
            {item.type === 'input' && (
              <FormInput label={item.label} name={item.name} layout={LAYOUT} />
            )}
            {item.type === 'select' && (
              <FormSelect
                label={item.label}
                name={item.name}
                layout={LAYOUT}
                options={item.options}
              />
            )}
            {item.type === 'date' && (
              <FormDatePicker
                label={item.label}
                name={item.name}
                layout={LAYOUT}
              />
            )}
            {item.type === 'textarea' && (
              <FormTextArea
                label={item.label}
                name={item.name}
                layout={LAYOUT}
              />
            )}
          </Col>
        ))}
      </Row>
    </>
  );
};
