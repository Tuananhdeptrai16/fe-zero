import { Col, Row } from 'antd';
import React from 'react';
import FormDatePicker from 'src/@crema/core/Form/FormDatePicker';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import FormTextArea from 'src/@crema/core/Form/FormTextArea';
import { isArray } from 'src/shared/utils/Typeof';
import { INPUT_FORM_VERDICT } from 'src/shared/constants/judicialRecord.constant';

const GUTTER_X = 10;

export const FormInputVerdict = ({ rootName }) => {
  return (
    <Row gutter={GUTTER_X}>
      {INPUT_FORM_VERDICT.map((item, index) => {
        let nameItem;

        if (!rootName) {
          nameItem = item.name;
        } else {
          nameItem = isArray(rootName)
            ? [...rootName, item.name]
            : [rootName, item.name];
        }
        return (
          <Col xl={item.colSpan} key={`${item.name}-${index}`}>
            {item.type === 'input' && (
              <FormInput
                label={item.label}
                name={nameItem}
                layout={item.layout}
                required={item.required}
                disabled
              />
            )}
            {item.type === 'select' && (
              <FormSelect
                label={item.label}
                name={nameItem}
                layout={item.layout}
                options={item.options}
                required={item.required}
                disabled
              />
            )}
            {item.type === 'date' && (
              <FormDatePicker
                label={item.label}
                name={nameItem}
                layout={item.layout}
                disabled
              />
            )}
            {item.type === 'textarea' && (
              <FormTextArea
                label={item.label}
                name={nameItem}
                layout={item.layout}
                disabled
              />
            )}
          </Col>
        );
      })}
    </Row>
  );
};
