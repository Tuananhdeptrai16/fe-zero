import React, { useMemo, useRef, useState } from 'react';
import { Collapse, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AntButton from 'src/@crema/component/AntButton';
import AntModal from 'src/@crema/component/AntModal';
import { isArray, isEmpty, isObject, isString } from 'src/shared/utils/Typeof';
import FormContent from 'src/@crema/component/FormContent';
import FormInputUser from './FormInputUser';
import { Panel } from 'src/@crema/component/AntCollapse';
import UserInput from 'src/pages/SchoolWarehouse/BuildApiDataSource/FormCreateUpdateApi/UserInputs/UserInput';
import FormHidden from 'src/@crema/core/Form/FormHidden';
import { get } from 'lodash';
import notification from 'src/shared/utils/notification';

export const FIELD_NAME_PROPERTIES = [
  'spec',
  'connection_specification',
  'properties',
];
export const FIELD_NAME_REQUIRED = [
  'spec',
  'connection_specification',
  'required',
];

const FIELD_NAME_REQUIRE = [['definitions', 'base_requester', 'authenticator']];

const getFieldRequires = (data) => {
  if (isObject(data)) {
    const keys = Object.keys(data);
    return keys
      .map((key) => {
        return getFieldRequires(data[key]);
      })
      .flat()
      .filter((f) => !!f);
  }

  if (isArray(data)) {
    return data
      .map((item) => getFieldRequires(item))
      .flat()
      .filter((f) => !!f);
  }

  if (isString(data)) {
    return Array.from(
      data.matchAll(new RegExp(`config\\["([a-zA-Z0-9_]+)"]`, 'gm')),
      (m) => m[1],
    );
  }

  return [];
};

const updateFieldOldToNew = (data, fieldOld, fieldNew) => {
  if (isObject(data)) {
    const dataUpdate = {};
    const keys = Object.keys(data);
    keys.forEach((key) => {
      dataUpdate[key] = updateFieldOldToNew(data[key], fieldOld, fieldNew);
    });
    return dataUpdate;
  }

  if (isArray(data)) {
    return data.map((item) => updateFieldOldToNew(item, fieldOld, fieldNew));
  }

  if (isString(data)) {
    return data.replace(
      new RegExp(`(config\\[")(${fieldOld})("])`, 'gm'),
      `$1${fieldNew}$3`,
    );
  }

  return data;
};

export default function UserInputs() {
  const refFormInputUser = useRef();
  const [isOpenDialogInputUser, setOpenDialogInputUser] = useState(null);
  const [inputEdit, setInputEdit] = useState(null);
  const form = Form.useFormInstance();
  const properties = Form.useWatch(FIELD_NAME_PROPERTIES);
  const fieldRequired = Form.useWatch(FIELD_NAME_REQUIRED);
  const formValue = form.getFieldsValue();

  const fieldsSystem = useMemo(() => {
    const valueCheck = FIELD_NAME_REQUIRE.map((key) =>
      get(formValue, key),
    ).filter((f) => !!f);
    return getFieldRequires(valueCheck)
      .flat()
      .filter((f) => !!f);
  }, [formValue]);

  const fields = useMemo(() => {
    return Object.keys(properties || {}).sort(
      (propertyNameA, propertyNameB) => {
        return (
          (properties?.[propertyNameA]?.order || 0) -
          (properties?.[propertyNameB]?.order || 0)
        );
      },
    );
  }, [properties]);

  return (
    <Collapse accordion expandIconPosition='end'>
      <Panel header='Nhập Liệu Của Người Dùng' key='user_inputs'>
        <FormHidden name={FIELD_NAME_PROPERTIES} />
        <FormHidden name={FIELD_NAME_REQUIRED} />
        {fields.map((fieldName, index) => {
          const input = properties?.[fieldName] || {};
          const inputName = input?.title || fieldName;
          const isHiddenBtnDelete = (fieldsSystem || []).includes(fieldName);

          const openChangeInput = () => {
            setInputEdit({
              ...input,
              required: (fieldRequired || []).includes(fieldName),
              field: fieldName,
              index,
            });
            setOpenDialogInputUser(true);
          };

          return (
            <UserInput
              key={`user-inputs-${fieldName}-${index}`}
              inputName={inputName}
              index={index}
              name={[...FIELD_NAME_PROPERTIES, fieldName]}
              isHiddenBtnDelete={isHiddenBtnDelete}
              remove={() => {
                delete (properties || {})[fieldName];
                form.setFieldValue(FIELD_NAME_PROPERTIES, {
                  ...(properties || {}),
                });
                form.setFieldValue(
                  FIELD_NAME_REQUIRED,
                  (fieldRequired || []).filter(
                    (fieldN) => fieldN !== fieldName,
                  ),
                );
              }}
              openChangeInput={openChangeInput}
            />
          );
        })}
        <div className='d-flex items-center justify-center mt-4'>
          <AntButton
            onClick={() => {
              if (!isEmpty(refFormInputUser?.current)) {
                refFormInputUser?.current.resetFields();
              }
              setInputEdit(null);
              setOpenDialogInputUser(true);
            }}
            icon={<PlusOutlined />}>
            Thêm mới
          </AntButton>
        </div>
        <AntModal
          key={`form_input_user_${inputEdit?.field || 'new'}`}
          bodyStyle={{ maxHeight: '75vh', overflow: 'auto' }}
          centered
          title={
            !isEmpty(inputEdit)
              ? 'Chỉnh sửa đầu vào người dùng'
              : 'Đầu vào người dùng mới'
          }
          open={isOpenDialogInputUser}
          onOk={() => {
            if (!isEmpty(refFormInputUser?.current)) {
              refFormInputUser?.current.submit();
            }
          }}
          okText={!isEmpty(inputEdit) ? 'Chỉnh sửa' : 'Thêm mới'}
          onCancel={() => {
            setOpenDialogInputUser(false);
          }}>
          <FormContent
            initialValues={inputEdit || {}}
            layout='vertical'
            onFinish={(data) => {
              const fieldOld = inputEdit?.field;
              const fieldNew = data?.field;

              if (
                isEmpty(inputEdit?.index) &&
                !isEmpty(properties?.[fieldNew])
              ) {
                notification.error(
                  'Trường ID đầu vào người dùng đã tồn tại, vui lòng kiểm tra lại !',
                );
                return;
              }

              if (isEmpty(inputEdit?.index)) {
                form.setFieldValue(FIELD_NAME_PROPERTIES, {
                  ...(properties || {}),
                  [fieldNew]: {
                    type: data?.type,
                    order: fields.length,
                    title: data?.title,
                    airbyte_secret: data?.airbyte_secret,
                  },
                });
                if (data?.required) {
                  form.setFieldValue(FIELD_NAME_REQUIRED, [
                    ...(fieldRequired || []),
                    fieldNew,
                  ]);
                }
              } else {
                if (fieldOld !== fieldNew) {
                  const formData = form.getFieldsValue();
                  form.setFieldsValue(
                    updateFieldOldToNew(formData, fieldOld, fieldNew),
                  );
                }

                delete (properties || {})[fieldOld];
                const newFieldRequired = (fieldRequired || []).filter(
                  (fieldN) => fieldN !== fieldNew,
                );

                if (data?.required) {
                  newFieldRequired.push(fieldNew);
                }

                form.setFieldValue(FIELD_NAME_PROPERTIES, {
                  ...(properties || {}),
                  [fieldNew]: {
                    type: data?.type,
                    order: inputEdit.order,
                    title: data?.title,
                    airbyte_secret: data?.airbyte_secret,
                  },
                });

                form.setFieldValue(FIELD_NAME_REQUIRED, [...newFieldRequired]);
              }
              setOpenDialogInputUser(false);
            }}
            ref={refFormInputUser}>
            <FormInputUser
              isHiddenFormItem={(fieldsSystem || []).includes(inputEdit?.field)}
            />
          </FormContent>
        </AntModal>
      </Panel>
    </Collapse>
  );
}
