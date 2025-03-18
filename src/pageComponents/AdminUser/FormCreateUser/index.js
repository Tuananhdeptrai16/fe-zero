import React from 'react';
import FormInput from 'src/@crema/core/Form/FormInput';
import { Col, Form, Row } from 'antd';
import FormInputPassword from 'src/@crema/core/Form/FormInputPassword';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import userManageApi from 'src/@crema/services/apis/userManage.api';
import {
  FormSelectDepartment,
  FormSelectOrganization,
} from 'src/@crema/component/FormItem';
import useUpdatedEffect from 'antd/lib/typography/hooks/useUpdatedEffect';

export const FormCreateUser = () => {
  const form = Form.useFormInstance();
  const organizationId = (
    Form.useWatch('organization', form) || form.getFieldValue('organization')
  )?.id;

  useUpdatedEffect(() => {
    form.setFieldValue('department', null);
  }, [organizationId]);

  return (
    <div>
      <Row gutter={10}>
        <Col span={12}>
          <FormInput name={'first_name'} label={'common.firstName'} required />
        </Col>
        <Col span={12}>
          <FormInput name={'last_name'} label={'common.lastName'} required />
        </Col>
      </Row>
      <Row gutter={10}>
        <Col span={12}>
          <FormInput
            rules={{ email: [] }}
            name={'email'}
            label={'common.email'}
            required
          />
        </Col>
        <Col span={12}>
          <FormInput
            name={'phone_number'}
            label={'common.phone'}
            rules={{ phone: [] }}
          />
        </Col>
      </Row>
      <Row gutter={10}>
        <Col span={12}>
          <FormInput
            name={'username'}
            label={'common.username'}
            required
            autoComplete='new-username'
            rules={{
              uppercase_character: [],
            }}
          />
        </Col>
        <Col span={12}>
          <FormInputPassword
            name={'password'}
            label={'common.password'}
            required
            autoComplete='new-password'
            tooltip={{
              title: 'Mật khẩu có độ dài 6 - 32 ký tự, bao gồm a-z,A-Z,0-9',
            }}
            rules={{ is_password: [] }}
          />
        </Col>
      </Row>
      <FormSelect
        fieldNames={{ label: 'name', value: 'id' }}
        name={'role_ids'}
        label={'table.role_group'}
        configFetch={{
          url: userManageApi.GET_ALL_ROLE,
        }}
        mode={'multiple'}
        required
      />
      <FormSelectOrganization name={'organization'} returnObject />
      <FormSelectDepartment
        name={'department'}
        returnObject
        organizationId={organizationId}
      />
    </div>
  );
};
