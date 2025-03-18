import { Col, Form, Row } from 'antd';
import React, { useEffect } from 'react';
import FormInput from 'src/@crema/core/Form/FormInput/index';
import FormSelect from 'src/@crema/core/Form/FormSelect/index';
import FormTextArea from 'src/@crema/core/Form/FormTextArea/index';
import { DEFAULT_PERMISSION_SELECT } from 'src/shared/constants/DataSelect';
import './form-admin-permission.styles.less';
const FormAdminPermissionModal = () => {
  const form = Form.useFormInstance();
  const pageSelected = Form.useWatch('page', form) || '';
  const action = Form.useWatch('action', form) || '';

  useEffect(() => {
    form.setFieldValue('name', `${pageSelected}.${action}`);
  }, [pageSelected, action, form]);

  return (
    <>
      <Row className='form-admin-permission_row'>
        <Col span={16} className='form-admin-permission_select'>
          <FormSelect
            label='table.page'
            name='page'
            options={DEFAULT_PERMISSION_SELECT()}
            required
          />
        </Col>
        <Col span={8} className='form-admin-permission_input'>
          <FormInput label='table.action' name='action' required />
        </Col>
      </Row>
      <FormInput label='table.permissionCode' name='name' required disabled />
      <FormInput label='table.displayName' name='display_name' required />
      <FormTextArea label='table.description' name='description' />
    </>
  );
};

export default FormAdminPermissionModal;
