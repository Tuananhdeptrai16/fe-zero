import { Col, Row } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import FormDatePicker from 'src/@crema/core/Form/FormDatePicker';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import FormTextArea from 'src/@crema/core/Form/FormTextArea';
import { GENDER_LIST } from 'src/shared/constants/DataTable';
import { TYPE_IDENTIFICATION } from 'src/shared/constants/DataSelect';

const COL_SPAN = 8;
const WIDTH_LABEL_COL_1 = 6;
const WIDTH_LABEL_COL_2 = 6;
const WIDTH_LABEL_COL_3 = 6;

const renderLayoutWidthLabel = (width) => {
  return {
    labelCol: { span: width },
  };
};

const INPUT_FORM = [
  {
    type: 'input',
    name: 'full_name',
    label: 'common.name',
    colSpan: COL_SPAN,
    layout: renderLayoutWidthLabel(WIDTH_LABEL_COL_1),
    required: true,
  },
  {
    type: 'input',
    name: 'other_name',
    label: 'common.anotherName',
    colSpan: COL_SPAN,
    layout: renderLayoutWidthLabel(WIDTH_LABEL_COL_2),
  },
  {
    type: 'select',
    name: 'gender',
    label: 'common.gender',
    colSpan: COL_SPAN,
    options: GENDER_LIST,
    layout: renderLayoutWidthLabel(WIDTH_LABEL_COL_3),
    required: true,
  },
  {
    type: 'input',
    name: 'date_of_birth',
    label: 'common.birthday',
    colSpan: COL_SPAN,
    layout: renderLayoutWidthLabel(WIDTH_LABEL_COL_1),
  },
  {
    type: 'input',
    name: 'place_of_birth',
    label: 'table.citizenPlaceOfBirth',
    colSpan: COL_SPAN,
    layout: renderLayoutWidthLabel(WIDTH_LABEL_COL_2),
  },
  {
    type: 'input',
    name: 'nationality',
    label: 'table.citizenNationality',
    colSpan: COL_SPAN,
    layout: renderLayoutWidthLabel(WIDTH_LABEL_COL_3),
  },
  {
    type: 'input',
    name: 'permanent_address',
    label: 'judicial.resident',
    colSpan: COL_SPAN * 2,
    layout: renderLayoutWidthLabel(WIDTH_LABEL_COL_1 / 2),
  },
  {
    colSpan: COL_SPAN,
  },
  {
    type: 'input',
    name: 'temporary_address',
    label: 'judicial.staying',
    colSpan: COL_SPAN * 2,
    layout: renderLayoutWidthLabel(WIDTH_LABEL_COL_1 / 2),
  },
  {
    colSpan: COL_SPAN,
  },
  {
    type: 'select',
    name: 'type_identification',
    label: 'judicial.idCardType',
    colSpan: COL_SPAN,
    options: TYPE_IDENTIFICATION,
    layout: renderLayoutWidthLabel(WIDTH_LABEL_COL_1),
  },
  {
    type: 'input',
    name: 'cccd_number',
    label: 'judicial.idCard',
    colSpan: COL_SPAN,
    layout: renderLayoutWidthLabel(WIDTH_LABEL_COL_2),
  },
  {
    type: 'input',
    name: 'cccd_date',
    label: 'judicial.issuanceDate',
    colSpan: COL_SPAN,
    layout: renderLayoutWidthLabel(WIDTH_LABEL_COL_3),
  },
  {
    type: 'input',
    name: 'father_name',
    label: 'common.fatherName',
    colSpan: COL_SPAN,
    layout: renderLayoutWidthLabel(WIDTH_LABEL_COL_1),
  },
  {
    type: 'input',
    name: 'father_yob',
    label: 'common.fatherBirthday',
    colSpan: COL_SPAN,
    layout: renderLayoutWidthLabel(WIDTH_LABEL_COL_2),
  },
  {
    colSpan: COL_SPAN,
  },
  {
    type: 'input',
    name: 'mother_name',
    label: 'common.motherName',
    colSpan: COL_SPAN,
    layout: renderLayoutWidthLabel(WIDTH_LABEL_COL_1),
  },
  {
    type: 'input',
    name: 'mother_yob',
    label: 'common.motherBirthday',
    colSpan: COL_SPAN,
    layout: renderLayoutWidthLabel(WIDTH_LABEL_COL_2),
  },
  {
    colSpan: COL_SPAN,
  },
  {
    type: 'textarea',
    name: 'note',
    label: 'judicial.noteChange',
    colSpan: COL_SPAN * 2,
    layout: renderLayoutWidthLabel(WIDTH_LABEL_COL_1 / 2),
  },
];

export const FormPersonalInfo = ({ name }) => {
  const { messages } = useIntl();
  return (
    <Row gutter={10}>
      {INPUT_FORM.map((item, index) => (
        <Col xl={item.colSpan} key={`${item.name}-${index}`}>
          {item.type === 'input' && (
            <FormInput
              label={item.label}
              name={[name, item.name]}
              layout={item.layout}
              required={item.required}
            />
          )}
          {item.type === 'select' && (
            <FormSelect
              label={item.label}
              name={[name, item.name]}
              layout={item.layout}
              options={item.options}
              required={item.required}
            />
          )}
          {item.type === 'date' && (
            <FormDatePicker
              label={item.label}
              name={[name, item.name]}
              layout={item.layout}
            />
          )}
          {item.type === 'textarea' && (
            <FormTextArea
              label={
                <span
                  style={{
                    whiteSpace: 'break-spaces',
                  }}>
                  {messages[item.label]}
                </span>
              }
              name={[name, item.name]}
              layout={item.layout}
            />
          )}
        </Col>
      ))}
    </Row>
  );
};
