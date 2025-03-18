import { useIntl } from 'react-intl';
import React, { useState } from 'react';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata/index';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import DataTable from 'src/@crema/core/DataTable';
import { MODAL_SIZE } from 'src/shared/constants/Modal';
import { KEY_ACTION_COLUMN } from 'src/shared/constants/DataTable';
import { RenderDate } from 'src/@crema/component/TableRender/index';
// import AdminRoleForm from 'src/pageComponents/AdminRole/AdminRoleForm/index';
import FormRowDataTable from 'src/@crema/component/FormRowDataTable/index';
import Icon, {
  PlusOutlined,
  SolutionOutlined,
  // TeamOutlined,
} from '@ant-design/icons';
import AntButton from 'src/@crema/component/AntButton/index';
import { FORM_TYPES } from 'src/shared/constants/FormDataTable';
import API from 'src/@crema/services/apis/index';
import notification from 'src/shared/utils/notification';
import AdminRolePermissionForm from 'src/pageComponents/AdminRole/AdminRolePermissionForm/index';
import DialogConfirm from 'src/@crema/component/DialogConfirm/index';
import { postDeleteAdminRole, updatePermissionRole } from 'src/@crema/services';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import { isEmpty, uniq } from 'lodash';
import { ITEM_PERMISSIONS } from 'src/shared/constants/Permission';
import { AcEditIcon, AcTrashIcon } from 'src/assets/icon/action';
import { FormSubjectApplication } from 'src/pageComponents/AdminRole/FormSubjectApplication';
import { parse } from 'src/shared/utils/String';
// import AdminRoleForm from 'src/pageComponents/AdminRole/AdminRoleForm';
import FormAddOrUpdateRole from './FormAddOrUpdateRole';

const AdminRole = () => {
  const { messages } = useIntl();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalPermissionOpen, setIsModalPermissionOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isModalSubjectApplication, setIsModalSubjectApplication] =
    useState(false);
  const [rowData, setRowData] = useState(null);

  const savePermissionRole = (data) => {
    const dataUpdate = { ...data, role_id: rowData?.id };
    return updatePermissionRole(dataUpdate);
  };

  const deleteToServer = () => {
    return postDeleteAdminRole(rowData?.id);
  };

  return (
    <>
      <AppPageMetadata title={messages['sidebar.admin_role']} />
      <DataTable
        syncURL={false}
        toolbars={[
          <AntButton
            key={ITEM_PERMISSIONS.ADD}
            type='primary'
            icon={<PlusOutlined />}
            onClick={() => {
              setIsModalOpen(true);
              setRowData(null);
            }}>
            {messages['table.toolbar.addRoleNew']}
          </AntButton>,
        ]}
        filters={[]}
        url={API.GET_LIST_ADMIN_ROLE}
        columns={[
          {
            title: <IntlMessages id='Tên nhóm quyền' />,
            dataIndex: 'name',
            width: 200,
            key: 'name',
            sorter: true,
          },
          {
            title: <IntlMessages id='table.description' />,
            dataIndex: 'description',
            key: 'description',
            sorter: true,
            width: 400,
          },
          {
            title: <IntlMessages id='table.createdTime' />,
            dataIndex: 'created_at',
            key: 'created_at',
            render: (data) => <RenderDate value={data} />,
            sorter: true,
            width: 200,
            align: 'center',
          },
          {
            title: <IntlMessages id='table.lastUpdate' />,
            dataIndex: 'updated_at',
            sorter: true,
            key: 'updated_at',
            align: 'center',
            render: (data) => <RenderDate value={data} />,
            width: 200,
          },
          {
            key: KEY_ACTION_COLUMN,
            actions: [
              {
                label: 'table.action.edit',
                actionName: ITEM_PERMISSIONS.UPDATE,
                icon: <Icon component={AcEditIcon} />,
                onClick: (data) => {
                  setRowData({
                    ...data,
                    attributes: parse(data?.attributes) || [],
                  });
                  setIsModalOpen(true);
                  console.log(rowData);
                },
              },
              {
                label: 'table.action.delete',
                actionName: ITEM_PERMISSIONS.DELETE,
                icon: <Icon component={AcTrashIcon} />,
                onClick: (data) => {
                  setRowData(data);
                  if (data.users_count > 0) {
                    notification.error(
                      'Không thể xóa quyền vì có  người dùng thuộc nhóm này',
                    );
                    return;
                  } else {
                    setIsDialogOpen(true);
                  }
                },
              },
              {
                label: 'table.action.setPermissions',
                actionName: ITEM_PERMISSIONS.SETTING,
                icon: <SolutionOutlined />,
                onClick: (data) => {
                  setIsModalPermissionOpen(true);
                  setRowData(data);
                },
              },
              // {
              //   label: 'table.action.subjectOfApplication',
              //   actionName: ITEM_PERMISSIONS.SETTING,
              //   icon: <TeamOutlined />,
              //   onClick: (data) => {
              //     setIsModalSubjectApplication(true);
              //     setRowData(data);
              //   },
              // },
            ],
          },
        ]}>
        {/* <FormRowDataTable
          title={
            isEmpty(rowData)
              ? 'form.formTitleAddPermission'
              : 'form.formTitleUpdatePermission'
          }
          visible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          formType={rowData ? FORM_TYPES.UPDATE : FORM_TYPES.ADD}
          method={rowData ? METHOD_FETCH.PUT : METHOD_FETCH.POST}
          resource={
            rowData
              ? `${API.UPDATE_ADMIN_ROLE}/${rowData?.id}`
              : API.CREATE_ADMIN_ROLE
          }
          preSaveData={(data) => {
            return {
              ...data,
              user_ids: (data?.user_responses || [])
                .filter((member) => member?.checked !== false)
                .map((member) => member?.id),
              organization_ids: (data?.organization_responses || [])
                .filter((organization) => organization?.checked !== false)
                .map((organization) => organization?.id),
              attributes: isArray(data?.attributes)
                ? stringify(data?.attributes)
                : '[]',
              description: data.description ? data.description : '',
            };
          }}
          size={MODAL_SIZE.LARGE}
          initialValues={rowData}>
          <AdminRoleForm />
        </FormRowDataTable> */}
        <FormRowDataTable
          title={
            isEmpty(rowData)
              ? 'form.formTitleAddPermission'
              : 'form.formTitleUpdatePermission'
          }
          visible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          formType={rowData ? FORM_TYPES.UPDATE : FORM_TYPES.ADD}
          method={rowData ? METHOD_FETCH.PUT : METHOD_FETCH.POST}
          resource={
            rowData
              ? `${API.UPDATE_ADMIN_ROLE}/${rowData?.id}`
              : API.CREATE_ADMIN_ROLE
          }
          preSaveData={(data) => {
            console.log(data);
            if (isEmpty(rowData)) {
              return {
                ...data,
                organization_id: data.organization_id,
                department_id: data?.department_id,
                description: data.description ? data.description : '',
              };
            } else {
              if (data.organization_id === 1) {
                return {
                  name: data.name,
                  code: data.code,
                  organization_id: data.organization_id,
                  department_id: data?.department_id,
                  description: data.description ? data.description : '',
                };
              } else {
                return {
                  name: data.name,
                  code: data.code,
                  organization_id: data.organization_id,
                  description: data.description ? data.description : '',
                };
              }
            }
          }}
          size={MODAL_SIZE.MEDIUM}
          initialValues={rowData}>
          <FormAddOrUpdateRole />
        </FormRowDataTable>
        <DialogConfirm
          visible={isModalPermissionOpen}
          textTitle={'form.configPermissionsGroupUser'}
          textSuccess={'form.successUpdatePermissionRole'}
          buttonText={'form.buttonUpdate'}
          onSaveToServer={savePermissionRole}
          size={MODAL_SIZE.XLARGE}
          onClose={() => setIsModalPermissionOpen(false)}
          initialValues={{
            permission_ids: uniq(rowData?.permissions?.map((pre) => pre.id)),
          }}>
          <AdminRolePermissionForm roleName={rowData?.name} />
        </DialogConfirm>

        <DialogConfirm
          key={rowData?.id}
          visible={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          textTitle={'confirm.deleteAdminRole'}
          textSuccess={'confirm.deleteAdminRoleSuccess'}
          onSaveToServer={deleteToServer}>
          <p>
            <IntlMessages id='confirm.deleteAdminRoleTextWarning' />
            <span className='warning-text-color'>{rowData?.name}</span>
          </p>
        </DialogConfirm>

        <DialogConfirm
          key={`subject-${rowData?.id}`}
          visible={isModalSubjectApplication}
          onClose={() => setIsModalSubjectApplication(false)}
          textTitle={'table.action.subjectOfApplication'}
          textButtonCancel={'dialog.button.close'}>
          <FormSubjectApplication roleId={rowData?.id} />
        </DialogConfirm>
      </DataTable>
    </>
  );
};

export default AdminRole;
