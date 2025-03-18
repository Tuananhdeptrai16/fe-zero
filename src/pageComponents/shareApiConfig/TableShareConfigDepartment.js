import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import API from 'src/@crema/services/apis';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import { KEY_ACTION_COLUMN } from 'src/shared/constants/DataTable';

import Icon, { ApiOutlined, PlusOutlined } from '@ant-design/icons';
import {
  AcDeactivateIcon,
  AcEditIcon,
  AcTrashIcon,
} from 'src/assets/icon/action';
import DataTable from 'src/@crema/core/DataTable';
import AntButton from 'src/@crema/component/AntButton';
import { ITEM_PERMISSIONS } from 'src/shared/constants/Permission';
import FormRowDataTable from 'src/@crema/component/FormRowDataTable';
import { FORM_TYPES } from 'src/shared/constants/FormDataTable';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import DialogConfirm from 'src/@crema/component/DialogConfirm';
import { FormShareApiConfigModal } from 'src/pageComponents/shareApiConfig/FormShareApiConfigModal';
import { TABLE_ACTION } from 'src/shared/constants/TableAction';
import ConfirmInfo from 'src/pageComponents/AdminUser/ConfirmInfo';
import { useJWTAuthActions } from 'src/@crema/services/auth/jwt-auth/JWTAuthProvider';
import { RenderStatusTag } from 'src/@crema/component/TableRender';

export const TableShareConfigDepartment = ({
  initTable,
  apiUrl = API.SEARCH_SHARE_API_CONGIG,
  platform,
  routerName,
}) => {
  const { messages } = useIntl();
  const { checkPermissionAction } = useJWTAuthActions();

  const [rowData, setRowData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionDialog, setActionDialog] = useState('');
  const [rowsSelected, setRowsSelected] = useState([]);

  const onDeleteRecord = () => {
    return instanceCoreApi.delete(API.DELETE_SHARE_API_CONFIG(rowData?.id));
  };

  const actionContent = {
    [TABLE_ACTION.ACTIVATE]: {
      title: 'confirm.activateApiShareConfigTitleDepartment',
      success: 'confirm.activateApiShareConfigSuccessDepartment',
      children: (
        <ConfirmInfo
          message='confirm.activateApiShareConfigSureDepartment'
          name={rowData?.name}
        />
      ),
      action: () =>
        instanceCoreApi.put(API.ACTIVATE_SHARE_API_CONFIG(rowData?.id)),
    },
    [TABLE_ACTION.DEACTIVATE]: {
      title: 'confirm.deactivateApiShareConfigTitleDepartment',
      success: 'confirm.deactivateApiShareConfigSuccessDepartment',
      children: (
        <ConfirmInfo
          message='confirm.deactivateApiShareConfigSureDepartment'
          name={rowData?.name}
        />
      ),
      action: () =>
        instanceCoreApi.put(API.DEACTIVATE_SHARE_API_CONFIG(rowData?.id)),
    },
    [TABLE_ACTION.DELETE]: {
      title: 'confirm.deleteApiShareConfigTitleDepartment',
      success: 'confirm.deleteApiShareConfigSuccessDepartment',
      children: (
        <ConfirmInfo
          message='confirm.deleteApiShareConfigSureDepartment'
          name={rowData?.name}
        />
      ),
      action: onDeleteRecord,
    },
    [TABLE_ACTION.DELETE_MULTI]: {
      title: 'confirm.massDeleteApiShareConfigTitleDepartment',
      success: 'confirm.deleteApiShareConfigSuccessDepartment',
      messageValue: {
        num: rowsSelected?.length,
      },
      children: (
        <ConfirmInfo
          message='confirm.massDeleteApiShareConfigSureDepartment'
          values={{ num: rowsSelected?.length }}
        />
      ),
      action: () =>
        instanceCoreApi.delete(API.MASS_DELETE_SHARE_API_CONFIG, {
          data: {
            ids: rowsSelected,
          },
        }),
    },
  };

  const columns = [
    {
      title: <IntlMessages id='table.name' />,
      dataIndex: 'name',
      width: 200,
    },
    {
      title: <IntlMessages id='table.description' />,
      dataIndex: 'desc',
      width: 200,
    },
    {
      title: 'Path',
      dataIndex: 'path',
      width: 200,
    },
    {
      title: <IntlMessages id='table.method' />,
      dataIndex: 'method',
      width: 200,
    },
    {
      title: <IntlMessages id='table.status' />,
      dataIndex: 'is_active',
      width: 200,
      render: (value) => (
        <RenderStatusTag value={value} statusType={'SHARE_API_CONFIG'} />
      ),
    },
    {
      key: KEY_ACTION_COLUMN,
      actions: [
        {
          label: 'digitizedData.deactivate',
          icon: <ApiOutlined style={{ color: '#000000' }} />,
          visible: (data) => data?.is_active,
          onClick: (data) => {
            setRowData(data);
            setIsDialogOpen(true);
            setActionDialog(TABLE_ACTION.DEACTIVATE);
          },
        },
        {
          label: 'digitizedData.activate',
          icon: <Icon component={AcDeactivateIcon} />,
          visible: (data) => !data?.is_active,
          onClick: (data) => {
            setRowData(data);
            setIsDialogOpen(true);
            setActionDialog(TABLE_ACTION.ACTIVATE);
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
            setRowData(data);
            setActionDialog(TABLE_ACTION.DELETE);
            setIsDialogOpen(true);
          },
        },
      ],
    },
  ];
  return (
    <>
      <DataTable
        initTable={initTable}
        itemSelected={
          checkPermissionAction(routerName, ITEM_PERMISSIONS.DELETE)
            ? {
                action: 'table.deleteMulti',
                clickAction: (_, items) => {
                  setRowsSelected(items);
                  setIsDialogOpen(true);
                  setActionDialog(TABLE_ACTION.DELETE_MULTI);
                },
                preItemSelect: (items) => {
                  return (items || []).map((item) => item?.id);
                },
              }
            : undefined
        }
        toolbars={[
          <AntButton
            key={ITEM_PERMISSIONS.ADD}
            type='primary'
            icon={<PlusOutlined />}
            onClick={() => {
              setIsModalOpen(true);
              setRowData(null);
            }}>
            {messages['table.toolbar.addNew']}
          </AntButton>,
        ]}
        url={apiUrl}
        columns={columns}>
        <FormRowDataTable
          key={`formRow-${rowData?.id}`}
          visible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          formType={rowData ? FORM_TYPES.UPDATE : FORM_TYPES.ADD}
          method={rowData ? METHOD_FETCH.PUT : METHOD_FETCH.POST}
          resource={
            rowData
              ? API.UPDATE_SHARE_API_CONFIG(rowData?.id)
              : API.ADD_SHARE_API_CONFIG
          }
          initialValues={rowData ?? {}}>
          <FormShareApiConfigModal platform={platform} />
        </FormRowDataTable>
        <DialogConfirm
          key={`${actionDialog}-${rowData?.id}`}
          visible={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          afterClose={() => setRowData(null)}
          messageValue={actionContent[actionDialog]?.messageValue}
          textTitle={actionContent[actionDialog]?.title || ''}
          textSuccess={actionContent[actionDialog]?.success}
          textButtonConfirm={actionContent[actionDialog]?.textButtonConfirm}
          preSaveData={actionContent[actionDialog]?.preSaveData}
          onSaveToServer={actionContent[actionDialog]?.action}>
          {actionContent[actionDialog]?.children || <></>}
        </DialogConfirm>
      </DataTable>
    </>
  );
};
