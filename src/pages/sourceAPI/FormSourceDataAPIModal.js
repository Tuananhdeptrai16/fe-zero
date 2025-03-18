import React, { useEffect, useState } from 'react';
import FormInput from 'src/@crema/core/Form/FormInput/index';
import { CONNECTION_CONFIGURATION } from 'src/shared/constants/DataFixed';
import { Col, Form, Row, Spin } from 'antd';
import FormInputSecret from 'src/@crema/component/FormInputSecret';
import API from 'src/@crema/services/apis';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import { parse, stringify } from 'src/shared/utils/String';
import FormInputNumber from 'src/@crema/core/Form/FormInputNumber';
import { encryptData } from 'src/shared/utils/Object';

export const FormSourceDataAPIModal = ({ isEdit }) => {
  const sourceDefinitionId = Form.useWatch('source_definition_id');
  const [getDefinitionSource, setGetDefinitionSource] = useState();

  const encrypt = async () => {
    const encryptDataGetDefinitionSource = await encryptData({
      api: '/v1/source_definition_specifications/get',
      body: stringify({ sourceDefinitionId }),
    });
    setGetDefinitionSource(encryptDataGetDefinitionSource);
  };

  useEffect(() => {
    encrypt();
  }, [sourceDefinitionId]);

  const { isLoading, data: responseStr } = useFetch(
    {
      url: sourceDefinitionId ? API.API_AIR_BYTE : '',
      method: METHOD_FETCH.POST,
      body: {
        data: getDefinitionSource,
      },
    },
    [sourceDefinitionId, getDefinitionSource],
  );

  const response = parse(responseStr?.result);
  let propertiesResponse = response?.connectionSpecification?.properties || [];
  const required = response?.connectionSpecification?.required || [];
  const properties = Object.keys(propertiesResponse)
    .map((field) => {
      const property = propertiesResponse[field];
      if (!property.airbyte_hidden) {
        return {
          ...property,
          field,
        };
      }
    })
    .filter((f) => !!f)
    .sort((propertyA, propertyB) => propertyA.order - propertyB.order);

  return (
    <div>
      <FormInput
        label='Tên nguồn dữ liệu'
        name={'name'}
        required
        rules={{ maxLength: [{ value: 128 }] }}
      />
      <Row gutter={20}>
        <Col span={24}>
          <FormSelect
            required
            disabled={isEdit}
            name={'source_definition_id'}
            label={'Loại API'}
            fieldNames={{
              label: 'display_name',
              value: 'source_definition_id',
            }}
            configFetch={{
              url: API.GET_LIST_API_BUILDER,
              method: METHOD_FETCH.POST,
              body: {
                pageable: { page_size: 1000 },
                filters: [
                  {
                    name: 'is_draft',
                    value: false,
                    operation: 'eq',
                  },
                ],
              },
            }}
          />
        </Col>
        <Col span={24}>
          <Spin spinning={isLoading}>
            <Row gutter={20}>
              {properties.map((property) => {
                const field = property?.field;
                // const isRequired = !!required[field];
                const isRequired = required?.includes(field);

                const title = property?.title || field;
                const name = [CONNECTION_CONFIGURATION, property?.field];
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
                        <FormInput
                          label={title}
                          required={isRequired}
                          name={name}
                          disabled={isEdit}
                        />
                      </Col>
                    );
                  case 'number':
                    return (
                      <Col span={24} key={`field-${property?.field}`}>
                        <FormInputNumber
                          label={title}
                          required={isRequired}
                          name={name}
                          disabled={isEdit}
                        />
                      </Col>
                    );
                  default:
                    return null;
                }
              })}
            </Row>
          </Spin>
        </Col>
      </Row>
    </div>
  );
};
