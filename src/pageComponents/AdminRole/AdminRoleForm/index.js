import React from 'react';
import FormInput from 'src/@crema/core/Form/FormInput/index';
import FormTextArea from 'src/@crema/core/Form/FormTextArea/index';
import { Tabs } from 'antd';
import FormListKeyValue from 'src/@crema/component/FormListKeyValue';
import TableManageMembers from 'src/pageComponents/AdminRole/AdminRoleForm/TableManageMembers';
import FormHidden from 'src/@crema/core/Form/FormHidden';
import TableManageOrganizations from 'src/pageComponents/AdminRole/AdminRoleForm/TableManageOrganizations';

const AdminRoleForm = () => {
  return (
    <div>
      <FormInput
        label='table.groupCode'
        required
        name='name'
        rules={{ maxLength: [{ value: 32 }] }}
      />
      <FormTextArea
        label='table.description'
        name='description'
        rules={{ maxLength: [{ value: 255 }] }}
      />
      <FormListKeyValue
        label={'Thuộc tính'}
        rootName='attributes'
        renderItem={({ name, restField }) => {
          return (
            <>
              <FormInput
                name={[name, 'name']}
                label={'common.attributeName'}
                {...restField}
              />
              <FormInput
                name={[name, 'value']}
                label={'table.values'}
                {...restField}
              />
            </>
          );
        }}
      />
      <FormHidden name={'user_responses'} />
      <FormHidden name={'organization_responses'} />
      <Tabs type={'card'}>
        <Tabs.TabPane key={'users'} tab='Danh sách thành viên'>
          <TableManageMembers name={'user_responses'} />
        </Tabs.TabPane>
        <Tabs.TabPane key={'organizations'} tab={'Danh sách tổ chức'}>
          <TableManageOrganizations name={'organization_responses'} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default AdminRoleForm;
