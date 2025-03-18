import React from 'react';
import { FormSelectOrganization } from 'src/@crema/component/FormItem';
import FormInput from 'src/@crema/core/Form/FormInput';
import { Form } from 'antd';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import API from 'src/@crema/services/apis';
import FormCheckbox from 'src/@crema/core/Form/FormCheckbox';
import { isEmpty } from 'src/shared/utils/Typeof';

export const FormSubsetOrganizationModal = ({ organizationId }) => {
  const organization = Form.useWatch('organization');
  const { data } = useFetch(
    {
      url: organization?.id
        ? API.GET_ROLES_ORGANIZATION(organization?.id)
        : null,
    },
    [organization],
  );
  const roles = data?.result || [];

  return (
    <div>
      <FormInput
        label='table.subsetOrganizationName'
        name='department_name'
        required
      />
      {!organizationId && (
        <FormSelectOrganization
          label={'table.parentOrganizationName'}
          name='organization'
          organization_id={'id'}
          returnObject
          required
        />
      )}
      {!isEmpty(roles) && (
        <>
          Danh sách quyền
          <div>
            {roles.map((role, index) => (
              <div key={`role-${index}`}>
                <FormCheckbox
                  name={['roles', `${role?.name}__${role?.id}`]}
                  layout={{
                    className: 'ant-form-item-horizontal-reverse',
                    wrapperCol: { span: 2 },
                    labelCol: { span: 22 },
                    style: {
                      display: 'inline-block',
                      width: 300,
                      margin: 0,
                    },
                  }}
                  label={role?.name}
                />
              </div>
            ))}
          </div>
        </>
      )}

      {/*<FormInput*/}
      {/*  label='table.subsetOrganizationTelephone'*/}
      {/*  name='phone_number'*/}
      {/*  fieldNames={{ label: 'organization', value: 'id' }}*/}
      {/*  required*/}
      {/*/>*/}
    </div>
  );
};
