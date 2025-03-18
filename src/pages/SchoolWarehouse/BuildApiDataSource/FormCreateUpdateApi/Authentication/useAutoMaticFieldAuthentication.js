import { useEffect } from 'react';
import { Form } from 'antd';
import {
  FIELD_NAME_PROPERTIES,
  FIELD_NAME_REQUIRED,
} from 'src/pages/SchoolWarehouse/BuildApiDataSource/FormCreateUpdateApi/UserInputs/UserInputs';
import { stringify } from 'src/shared/utils/String';
import { cloneDeep, get, isEmpty, isEqual } from 'lodash';

export default function useAutoMaticFieldAuthentication({
  active,
  propertiesFrom,
}) {
  const form = Form.useFormInstance();

  useEffect(() => {
    const formValue = form.getFieldsValue();
    const properties = get(formValue, FIELD_NAME_PROPERTIES);
    const fieldRequired = get(formValue, FIELD_NAME_REQUIRED);
    const sources = propertiesFrom
      .filter((f) => !!f)
      .map(({ source, ...attrs }) => ({
        value: get(formValue, source),
        source,
        ...attrs,
      }));
    const propertiesFromStr = stringify(sources.map(({ value }) => value));

    if (active && !isEmpty(sources)) {
      const propertiesUpdate = cloneDeep(properties) || {};
      const fieldRequiredUpdate = cloneDeep(fieldRequired) || [];
      sources.forEach(({ source, name, value, text, propertyInit }, index) => {
        if (!value) {
          if (text) {
            form.setFieldValue(source, text);
          } else {
            form.setFieldValue(source, `{{ config["${name}"] }}`);
          }
        }

        if (!propertiesUpdate?.[name]) {
          if (propertyInit) {
            propertiesUpdate[name] = propertyInit;
          } else {
            propertiesUpdate[name] = {
              type: 'string',
              order: index,
              title: name,
              airbyte_secret: true,
            };
          }
        }

        if (!(fieldRequiredUpdate || []).includes(name)) {
          fieldRequiredUpdate.push(name);
        }
      });

      if (!isEqual(propertiesUpdate, properties)) {
        form.setFieldValue(FIELD_NAME_PROPERTIES, propertiesUpdate);
      }

      if (!isEqual(fieldRequiredUpdate, fieldRequired)) {
        form.setFieldValue(FIELD_NAME_REQUIRED, fieldRequiredUpdate);
      }
    }

    if (!active && propertiesFromStr) {
      const nameProperties = Array.from(
        propertiesFromStr.matchAll(
          new RegExp(`config\\[\\\\"([a-zA-Z0-9_]+)\\\\"]`, 'gm'),
        ),
        (m) => m[1],
      );

      if (!isEmpty(nameProperties)) {
        form.setFieldValue(
          FIELD_NAME_REQUIRED,
          (fieldRequired || []).filter(
            (item) => !nameProperties.includes(item),
          ),
        );
        nameProperties.forEach((nameProperty) => {
          delete (properties || {})[nameProperty];
        });
        form.setFieldValue(FIELD_NAME_PROPERTIES, {
          ...(properties || {}),
        });
      }
    }

    return () => {
      const formValue = form.getFieldsValue();
      const properties = get(formValue, FIELD_NAME_PROPERTIES);
      const fieldRequired = get(formValue, FIELD_NAME_REQUIRED);
      const sources = propertiesFrom
        .filter((f) => !!f)
        .map(({ source, ...attrs }) => ({
          value: get(formValue, source),
          source,
          ...attrs,
        }));

      propertiesFrom
        .filter((f) => !!f)
        .forEach(({ source }) => {
          form.setFieldValue(source, undefined);
        });

      const propertiesFromStr = stringify(sources.map(({ value }) => value));

      const nameProperties = Array.from(
        propertiesFromStr.matchAll(
          new RegExp(`config\\[\\\\"([a-zA-Z0-9_]+)\\\\"]`, 'gm'),
        ),
        (m) => m[1],
      );

      if (!isEmpty(nameProperties)) {
        form.setFieldValue(
          FIELD_NAME_REQUIRED,
          (fieldRequired || []).filter(
            (item) => !nameProperties.includes(item),
          ),
        );
        nameProperties.forEach((nameProperty) => {
          delete (properties || {})[nameProperty];
        });
        form.setFieldValue(FIELD_NAME_PROPERTIES, {
          ...(properties || {}),
        });
      }
    };
  }, [active, propertiesFrom]);
}
