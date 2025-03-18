import React from 'react';
import { Col, Row } from 'antd';
import FormInputSecret from 'src/@crema/component/FormInputSecret';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormInputNumber from 'src/@crema/core/Form/FormInputNumber';

FormInputStream.propTypes = {};

function FormInputStream({
  properties: propertiesResponse = {},
  required = [],
}) {
  const properties = Object.keys(propertiesResponse)
    .map((field) => {
      const property = propertiesResponse[field];
      if (!property.airbyte_hidden) {
        return {
          ...property,
          field,
          required: required.includes(field),
        };
      }
    })
    .filter((f) => !!f)
    .sort((propertyA, propertyB) => propertyA.order - propertyB.order);

  return (
    <Row gutter={20}>
      {properties.map((property) => {
        const field = property?.field;
        const isRequired = property.required;
        const title = property?.title || field;
        const name = [field];
        switch (property.type) {
          case 'string':
            if (property.airbyte_secret) {
              return (
                <Col span={24} key={`field-${field}`}>
                  <FormInputSecret
                    label={title}
                    required={isRequired}
                    name={name}
                  />
                </Col>
              );
            }
            return (
              <Col span={24} key={`field-${property?.field}`}>
                <FormInput label={title} required={isRequired} name={name} />
              </Col>
            );
          case 'number':
            return (
              <Col span={24} key={`field-${property?.field}`}>
                <FormInputNumber
                  label={title}
                  required={isRequired}
                  name={name}
                />
              </Col>
            );
          default:
            return null;
        }
      })}
    </Row>
  );
}

export default FormInputStream;
