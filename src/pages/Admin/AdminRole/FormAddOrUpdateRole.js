import { Col, Form, Row } from 'antd';
import React from 'react';
import FormInput from 'src/@crema/core/Form/FormInput';
// import FormSelect from 'src/@crema/core/Form/FormSelect';
import FormSelectAsync from 'src/@crema/core/Form/FormSelectAsync';
import FormTextArea from 'src/@crema/core/Form/FormTextArea';
import API from 'src/@crema/services/apis';
import { FILTER_OPERATION } from 'src/shared/constants/DataTable';
// import { SOURCE_SERVICES } from 'src/shared/constants/DataSelect';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import { REACT_APP_ORGANIZATION_ID } from 'src/shared/constants/serverConfig';

const FormAddOrUpdateRole = () => {
  const form = Form.useFormInstance();
  // const objectTypeWatch = Form.useWatch('type', form) || '';
  const objectTypeWatch = Form.useWatch('organization_id', form) || '';
  return (
    <div>
      <Row gutter={[12, 12]}>
        <Col span={24}>
          {/* <FormSelect
            label='Đơn vị'
            name='type'
            options={SOURCE_UNITS}
            required
          /> */}
          <FormSelectAsync
            label='Đơn vị'
            name='organization_id'
            fieldNames={{ label: 'display_name', value: 'id' }}
            configFetch={{
              url: API.SELECT_ORGANIZATION,
              method: METHOD_FETCH.POST,
              body: {
                keyword: null,
                page: 1,
              },
            }}
            required
          />
        </Col>
        {objectTypeWatch === +REACT_APP_ORGANIZATION_ID && (
          <Col span={24}>
            <FormSelectAsync
              label='Vụ'
              name='department_id'
              fieldNames={{ label: 'department_name', value: 'id' }}
              configFetch={{
                url: API.SEARCH_DEPARTMENT,
                method: METHOD_FETCH.POST,
                body: {
                  filters: objectTypeWatch
                    ? [
                        {
                          name: 'organization_id',
                          value: objectTypeWatch,
                          operation: FILTER_OPERATION.EQ,
                        },
                      ]
                    : [],
                },
              }}
            />
          </Col>
        )}
        <Col span={24}>
          <FormInput
            label='Mã nhóm quyền'
            name='code'
            required
            rules={{ maxLength: [{ value: 10 }] }}
          />
        </Col>
        <Col span={24}>
          <FormInput
            label='Tên nhóm quyền'
            name='name'
            required
            rules={{ maxLength: [{ value: 128 }] }}
          />
        </Col>
        <Col span={24}>
          <FormTextArea
            label='Mô tả'
            name='description'
            rules={{ maxLength: [{ value: 512 }] }}
            maxLength={513}
          />
        </Col>
      </Row>
    </div>
  );
};

export default FormAddOrUpdateRole;
