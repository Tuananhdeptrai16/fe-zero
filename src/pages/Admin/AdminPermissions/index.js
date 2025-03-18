import React, { useState } from 'react';
import DataTable from 'src/@crema/core/DataTable';
import { KEY_ACTION_COLUMN } from 'src/shared/constants/DataTable';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import Icon, { PlusOutlined } from '@ant-design/icons';

import { useIntl } from 'react-intl';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata/index';
import DialogConfirm from 'src/@crema/component/DialogConfirm/index';
import {
  changeStatusPermission,
  postDeletePermission,
} from 'src/@crema/services';
import AntButton from 'src/@crema/component/AntButton/index';
import FormRowDataTable from 'src/@crema/component/FormRowDataTable/index';
import FormAdminPermissionModal from 'src/pageComponents/AdminPermission/FormAdminPermissionModal/index';
import { FORM_TYPES } from 'src/shared/constants/FormDataTable';
import API from 'src/@crema/services/apis/index';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import { ITEM_PERMISSIONS } from 'src/shared/constants/Permission';
import {
  AcEditIcon,
  AcEyeIcon,
  AcEyeInvisibleIcon,
  AcTrashIcon,
} from 'src/assets/icon/action';
import { TABLE_ACTION } from 'src/shared/constants/TableAction';
import ConfirmInfo from 'src/pageComponents/AdminUser/ConfirmInfo';
import { RenderStatusTag } from 'src/@crema/component/TableRender';
import { MODAL_SIZE } from 'src/shared/constants/Modal';

const AdminPermissions = () => {
  const { messages } = useIntl();

  const [rowData, setRowData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionDialog, setActionDialog] = useState('');

  const deleteToServer = () => {
    return postDeletePermission(rowData?.id);
  };

  const preSaveData = (data) => {
    const { description, name, display_name } = data;
    return { description, name, display_name };
  };

  const preSaveUpdateData = (data) => {
    const preData = preSaveData(data);
    return { ...preData, id: rowData?.id };
  };

  const getInitialValues = (data) => {
    const { name, display_name, description } = data;
    const pageAction = name?.split('.');
    return {
      name,
      display_name,
      description,
      page: pageAction[0],
      action: pageAction[1],
    };
  };

  const preSaveChangeStatus = (active) => {
    return {
      id: rowData?.id,
      active,
    };
  };

  const actionContent = {
    [TABLE_ACTION.HIDE]: {
      title: 'confirm.banPermissionTitle',
      success: 'confirm.banPermissionSuccess',
      children: <ConfirmInfo message='confirm.banPermissionSure' />,
      action: changeStatusPermission,
      preSaveData: () => preSaveChangeStatus(false),
    },
    [TABLE_ACTION.SHOW]: {
      title: 'confirm.allowPermissionTitle',
      success: 'confirm.allowPermissionSuccess',
      children: <ConfirmInfo message='confirm.allowPermissionSure' />,
      action: changeStatusPermission,
      preSaveData: () => preSaveChangeStatus(true),
    },
    [TABLE_ACTION.DELETE]: {
      title: 'confirm.deletePermission',
      success: 'confirm.deletePermissionSuccess',
      children: (
        <ConfirmInfo
          message='confirm.deletePermissionSure'
          name={rowData?.name}
        />
      ),
      action: deleteToServer,
    },
  };

  return (
    <>
      <AppPageMetadata title={messages['sidebar.permissionManagement']} />
      <DataTable
        toolbars={[
          <AntButton
            key={ITEM_PERMISSIONS.ADD}
            type='primary'
            icon={<PlusOutlined />}
            onClick={() => {
              setRowData(null);
              setIsModalOpen(true);
            }}>
            {messages['table.toolbar.addNew']}
          </AntButton>,
        ]}
        url={API.GET_LIST_ADMIN_PERMISSIONS}
        columns={[
          {
            title: <IntlMessages id='table.permissionCode' />,
            dataIndex: 'name',
            width: 200,
            fixed: 'left',
            key: 'name',
            sorter: true,
          },
          {
            title: <IntlMessages id='table.displayName' />,
            dataIndex: 'display_name',
            width: 300,
            key: 'display_name',
          },
          {
            title: <IntlMessages id='table.description' />,
            dataIndex: 'description',
            sorter: true,
            key: 'description',
            width: 400,
          },
          {
            title: <IntlMessages id={'table.status'} />,
            dataIndex: 'active',
            width: 150,
            render: (isActive) => (
              <RenderStatusTag value={isActive} statusType={'PERMISSION'} />
            ),
          },
          {
            key: KEY_ACTION_COLUMN,
            actions: [
              {
                label: 'table.action.ban',
                actionName: ITEM_PERMISSIONS.BLOCK,
                icon: <Icon component={AcEyeIcon} />,
                visible: (data) => data?.active,
                onClick: (data) => {
                  setActionDialog(TABLE_ACTION.HIDE);
                  setRowData(data);
                  setIsDialogOpen(true);
                },
              },
              {
                label: 'table.action.allow',
                actionName: ITEM_PERMISSIONS.BLOCK,
                icon: <Icon component={AcEyeInvisibleIcon} />,
                visible: (data) => data?.active === false,
                onClick: (data) => {
                  setActionDialog(TABLE_ACTION.SHOW);
                  setRowData(data);
                  setIsDialogOpen(true);
                },
              },
              {
                label: 'table.action.edit',
                actionName: ITEM_PERMISSIONS.UPDATE,
                icon: <Icon component={AcEditIcon} />,
                onClick: (data) => {
                  setRowData(data);
                  setIsModalOpen(true);
                },
              },
              {
                label: 'table.action.delete',
                actionName: ITEM_PERMISSIONS.DELETE,
                icon: <Icon component={AcTrashIcon} />,
                onClick: (data) => {
                  setActionDialog(TABLE_ACTION.DELETE);
                  setRowData(data);
                  setIsDialogOpen(true);
                },
              },
            ],
          },
        ]}>
        <FormRowDataTable
          key={rowData && `update-${rowData?.id}`}
          preSaveData={rowData ? preSaveUpdateData : preSaveData}
          visible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          formType={rowData ? FORM_TYPES.UPDATE : FORM_TYPES.PERMISSION}
          method={rowData ? METHOD_FETCH.PUT : METHOD_FETCH.POST}
          resource={
            rowData
              ? `${API.UPDATE_ADMIN_PERMISSION}/${rowData?.id}`
              : API.CREATE_ADMIN_PERMISSION
          }
          size={MODAL_SIZE.MEDIUM}
          initialValues={rowData ? getInitialValues(rowData) : {}}>
          <FormAdminPermissionModal />
        </FormRowDataTable>
        <DialogConfirm
          key={`action-${actionDialog}-${rowData?.id}`}
          visible={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          textTitle={actionContent[actionDialog]?.title || ''}
          textSuccess={actionContent[actionDialog]?.success || ''}
          preSaveData={actionContent[actionDialog]?.preSaveData}
          onSaveToServer={actionContent[actionDialog]?.action}
          onSuccess={actionContent[actionDialog]?.onSuccess}>
          {actionContent[actionDialog]?.children || <></>}
        </DialogConfirm>
      </DataTable>
    </>
  );
};

export default AdminPermissions;
