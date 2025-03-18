import React from 'react';
import { Col, Row, Typography } from 'antd';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import FormDatePicker from 'src/@crema/core/Form/FormDatePicker';
import { GENDER_LIST } from 'src/shared/constants/DataTable';
import { JUDICIAL_SEARCH_NAME } from 'src/pages/judicialRecords/createRecordInformation/utils';
import FormDateText from 'src/@crema/component/FormDateText';

const LAYOUT = {
  labelCol: {
    xxl: { span: 6 },
    xl: { span: 10 },
  },
};

const INPUT_SEARCH = [
  {
    type: 'input',
    label: 'common.name',
    name: 'full_name',
  },
  {
    type: 'input',
    label: 'common.anotherName',
    name: 'other_name',
  },
  {
    type: 'input',
    label: 'judicial.idCard',
    name: 'cccd_number',
  },
  {
    type: 'select',
    label: 'common.gender',
    name: 'gender',
    options: GENDER_LIST,
  },
  {
    type: 'input_date',
    label: 'common.birthday',
    name: 'date_of_birth',
  },
  {
    type: 'input',
    label: 'judicial.dkhktt',
    name: 'permanent_address',
  },
  {
    type: 'input',
    label: 'common.fatherName',
    name: 'father_name',
  },
  {
    type: 'input_date',
    label: 'common.yobFather',
    name: 'father_yob',
  },
  {},
  {
    type: 'input',
    label: 'common.motherName',
    name: 'mother_name',
  },
  {
    type: 'input_date',
    label: 'common.yobMother',
    name: 'mother_yob',
  },
];

const FormSearchCitizen = () => {
  return (
    <>
      <Typography.Title level={3} className='mb-6'>
        Tìm kiếm công dân cần tạo văn bản LLTP
      </Typography.Title>
      <Row gutter={32}>
        {INPUT_SEARCH.map((item, index) => {
          return (
            <Col span={8} key={`item-${index}`}>
              {item.type === 'input' && (
                <FormInput
                  layout={LAYOUT}
                  label={item.label}
                  name={[JUDICIAL_SEARCH_NAME, item.name]}
                  required={item.required}
                />
              )}
              {item.type === 'select' && (
                <FormSelect
                  layout={LAYOUT}
                  label={item.label}
                  name={[JUDICIAL_SEARCH_NAME, item.name]}
                  options={item.options}
                  {...(item.data || {})}
                />
              )}
              {item.type === 'date' && (
                <FormDatePicker
                  layout={LAYOUT}
                  label={item.label}
                  name={[JUDICIAL_SEARCH_NAME, item.name]}
                  {...(item.data || {})}
                />
              )}
              {item.type === 'input_date' && (
                <FormDateText
                  layout={LAYOUT}
                  label={item.label}
                  name={[JUDICIAL_SEARCH_NAME, item.name]}
                  required={item.required}
                  rules={
                    item.name === 'date_of_birth'
                      ? { date_birth_text: [] }
                      : { date_text: [] }
                  }
                />
              )}
            </Col>
          );
        })}
      </Row>
    </>
  );
};

FormSearchCitizen.propTypes = {};

FormSearchCitizen.defaultProps = {};

export default FormSearchCitizen;
