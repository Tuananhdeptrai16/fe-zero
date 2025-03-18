import React from 'react';
import FormInput from 'src/@crema/core/Form/FormInput/index';
import { useIntl } from 'react-intl';
// import FormSelect from 'src/@crema/core/Form/FormSelect';
import {
  // FormSelectDepartment,
  FormSelectOrganization,
} from 'src/@crema/component/FormItem';
import { Col, Form, Row } from 'antd';
import useUpdatedEffect from 'antd/lib/typography/hooks/useUpdatedEffect';
import FormSelectAsync from 'src/@crema/core/Form/FormSelectAsync';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import userManageApi from 'src/@crema/services/apis/userManage.api';
import FormHidden from 'src/@crema/core/Form/FormHidden';

const FormUpdateRole = ({ record, roles = [] }) => {
  const { messages } = useIntl();
  const form = Form.useFormInstance();

  const organizationId = (
    Form.useWatch('organization', form) || form.getFieldValue('organization')
  )?.id;

  useUpdatedEffect(() => {
    form.setFieldValue('department', null);
  }, [organizationId]);

  console.log(roles);
  return (
    <div>
      <Row gutter={10}>
        <Col span={24}>
          <FormInput
            name='name'
            label='table.citizenFullName'
            disabled
            required
          />
        </Col>
      </Row>
      <Row gutter={10}>
        <Col span={12}>
          <FormHidden label='table.username' disabled name='username' />
        </Col>
        <Col span={24}>
          <FormInput
            name='phone_number'
            label={'Số điện thoại'}
            rules={{ phone: [] }}
            disabled
          />
        </Col>
      </Row>
      <FormSelectOrganization name={'organization'} returnObject disabled />
      <Row gutter={10}>
        <Col span={24}>
          <FormSelectAsync
            fieldNames={{ label: 'name', value: 'id' }}
            name={'role_ids'}
            label={messages['table.role_group']}
            // options={roles}
            configFetch={{
              url: userManageApi.GET_ROLE_BY_ORGANIZATION(
                record?.organization_id,
              ),
              method: METHOD_FETCH.GET,
            }}
            mode={'multiple'}
            maxTagCount={'responsive'}
            required
          />
        </Col>
      </Row>

      {/* <FormSelectDepartment
        name={'department'}
        returnObject
        organizationId={organizationId}
      /> */}
    </div>
  );
};

export default FormUpdateRole;
