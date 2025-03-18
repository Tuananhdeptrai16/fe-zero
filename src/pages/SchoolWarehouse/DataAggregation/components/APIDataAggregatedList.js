import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata/index';
import DataTable from 'src/@crema/core/DataTable';
import Icon, { ExceptionOutlined, PlusOutlined } from '@ant-design/icons';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import API from 'src/@crema/services/apis/index';
import {
  FILTER_OPERATION,
  KEY_ACTION_COLUMN,
} from 'src/shared/constants/DataTable';
import DialogConfirm from 'src/@crema/component/DialogConfirm/index';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import { RenderDate } from 'src/@crema/component/TableRender';
import { Spin, Switch } from 'antd';
import useCallApi from 'src/@crema/hook/useCallApi';
import notification from 'src/shared/utils/notification';
import { MODAL_SIZE } from 'src/shared/constants/Modal';
import AntButton from 'src/@crema/component/AntButton';
import RenderNameUser from 'src/@crema/component/TableRender/RenderNameUser';
import { handleRedundantData } from 'src/shared/utils/Object';
import { AcEditIcon, AcEyeIcon, AcTrashIcon } from 'src/assets/icon/action';
import { ACTION_DIALOG_API_DATA_AGGREGATE } from 'src/shared/constants/DataFixed';
import { ITEM_PERMISSIONS } from 'src/shared/constants/Permission';
import ModalAccessInfomation from './ModalAccessInfomation';
import { isEmpty } from 'lodash';
import FormManageAccessInformation from './FormManageAccessInformation';
import FormActionShareAPI from './FormActionShareAPI';
import { useJWTAuthActions } from 'src/@crema/services/auth/jwt-auth/JWTAuthProvider';

const APIDataAggregatedList = ({ category, title, pageName }) => {
  const { messages } = useIntl();
  const [rowData, setRowData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [actionDialog, setActionDialog] = useState('');

  // Toggle disable
  const { checkPermissionAction } = useJWTAuthActions();
  const isPermissionUpdate = checkPermissionAction(
    pageName,
    ITEM_PERMISSIONS.UPDATE,
  );
  const { loading: loadingToggleDisable, send: sendToggleDisable } = useCallApi(
    {
      success: ({ result }) => {
        notification.success(
          `${result?.is_active ? 'Tắt' : 'Bật'} vô hiệu hóa thành công`,
        );
      },
      callApi: (data) => {
        return instanceCoreApi.post(API.TOGGLE_DISABLE(data));
      },
    },
  );

  const columns = [
    {
      title: <IntlMessages id='table.action.disable' />,
      dataIndex: 'active',
      width: 120,
      fixed: 'left',
      key: 'active',
      render: (_, record) => {
        const id = record?.id;
        const isActive = record?.is_active;

        return (
          <Switch
            disabled={!isPermissionUpdate}
            defaultChecked={!isActive}
            onChange={(checked) => {
              sendToggleDisable({
                id,
                is_active: !checked,
              });
            }}
          />
        );
      },
    },
    {
      title: <IntlMessages id='table.api_share' />,
      dataIndex: 'api_name',
      width: 220,
      fixed: 'left',
      key: 'api_name',
      sorter: true,
    },
    {
      title: <IntlMessages id='table.data_table' />,
      dataIndex: 'table_name',
      width: 180,
      key: 'table_name',
    },
    {
      title: <IntlMessages id='table.creator' />,
      dataIndex: 'user_info_response',
      width: 160,
      key: 'user_info_response',
      render: (data) => {
        return <RenderNameUser user={data} />;
      },
    },
    {
      title: <IntlMessages id='table.dataServiceCreatedAt' />,
      dataIndex: 'created_at',
      width: 160,
      key: 'created_at',
      align: 'center',
      render: (data) => {
        return <RenderDate value={data} />;
      },
    },
    {
      key: KEY_ACTION_COLUMN,
      actions: [
        {
          label: 'sidebar.manage_access_information',
          actionName: ITEM_PERMISSIONS.VIEW,
          icon: <Icon component={ExceptionOutlined} />,
          onClick: (data) => {
            setRowData(data);
            setActionDialog(
              ACTION_DIALOG_API_DATA_AGGREGATE.MANAGE_ACCESS_INFORMATION,
            );
            setIsDialogOpen(true);
          },
        },
        {
          label: 'sidebar.access_information',
          actionName: ITEM_PERMISSIONS.VIEW,
          icon: <Icon component={AcEyeIcon} />,
          onClick: (data) => {
            setRowData(data);
            setActionDialog(ACTION_DIALOG_API_DATA_AGGREGATE.SEE_DETAILS);
            setIsDialogOpen(true);
          },
        },
        {
          label: 'table.action.edit',
          actionName: ITEM_PERMISSIONS.UPDATE,
          icon: <Icon component={AcEditIcon} />,
          onClick: (data) => {
            setRowData(data);
            setActionDialog(
              ACTION_DIALOG_API_DATA_AGGREGATE.EDIT_API_DATA_AGGREGATE,
            );
            setIsDialogOpen(true);
          },
        },
        {
          label: 'table.action.delete',
          actionName: ITEM_PERMISSIONS.DELETE,
          icon: <Icon component={AcTrashIcon} />,
          onClick: (data) => {
            setRowData(data);
            setActionDialog(
              ACTION_DIALOG_API_DATA_AGGREGATE.DELETE_API_DATA_AGGREGATE,
            );
            setIsDialogOpen(true);
          },
        },
      ],
    },
  ].filter(Boolean);

  // Content Dialog
  const CONTENT_DIALOG = {
    [ACTION_DIALOG_API_DATA_AGGREGATE.MANAGE_ACCESS_INFORMATION]: {
      title: 'sidebar.manage_access_information',
      children: <FormManageAccessInformation rowData={rowData} />,
      size: 'MODAL_SIZE.XLARGE',
      textButtonCancel: 'dialog.button.close',
      initialValues: isEmpty(rowData) ? {} : rowData,
    },
    [ACTION_DIALOG_API_DATA_AGGREGATE.SEE_DETAILS]: {
      title: 'sidebar.access_information',
      textButtonCancel: 'dialog.button.close',
      children: <ModalAccessInfomation rowData={rowData} />,
      initialValues: isEmpty(rowData) ? {} : rowData,
    },
    [ACTION_DIALOG_API_DATA_AGGREGATE.ADD_API_DATA_AGGREGATE]: {
      title: 'sidebar.add_api_data_sharing',
      success: 'form.addSuccessMessage',
      children: <FormActionShareAPI />,
      textButtonConfirm: 'table.action.add',
      preSaveData: (data) => {
        const columnsSelected = data?.column_name.map((col) => col.column_name);
        return {
          ...data,
          columns_selected: columnsSelected,
          column_name: undefined,
        };
      },
      action: (data) => {
        const createData = handleRedundantData({
          ...data,
          category,
        });
        return instanceCoreApi.post(API.ADD_API_DATA_AGGREGATE, createData);
      },
    },
    [ACTION_DIALOG_API_DATA_AGGREGATE.EDIT_API_DATA_AGGREGATE]: {
      title: 'sidebar.edit_api_data_sharing',
      success: 'form.updateSuccessMessage',
      children: (
        <FormActionShareAPI
          columns_selected={rowData?.columns_selected || []}
          tableNameReset={rowData?.table_name || ''}
          isUpdate={true}
        />
      ),
      textButtonConfirm: 'common.update_schedule',
      initialValues: rowData
        ? {
            api_name: rowData?.api_name,
            table_name: rowData?.table_name,
            columns_selected: rowData?.columns_selected,
            category: rowData?.category,
          }
        : {},
      preSaveData: (data) => {
        const columnsSelected = data?.column_name.map((col) => col.column_name);
        return {
          ...data,
          columns_selected: columnsSelected,
          column_name: undefined,
        };
      },

      action: (data) => {
        const dataUpdate = handleRedundantData({
          ...data,
          id: rowData?.id,
          category: rowData?.category,
        });
        return instanceCoreApi.post(API.UPDATE_API_DATA_AGGREGATE, dataUpdate);
      },
    },
    [ACTION_DIALOG_API_DATA_AGGREGATE.DELETE_API_DATA_AGGREGATE]: {
      title: 'confirm.deleteSharedApi',
      success: 'confirm.deleteSharedApiSuccess',
      children: (
        <p>
          <IntlMessages id='confirm.deleteSharedApiSure' />
          <span className='warning-text-color'>{rowData?.api_name}</span>
        </p>
      ),
      textButtonConfirm: 'dialog.button.confirm',
      initialValues: {},
      preSaveData: (data) => {
        return data;
      },
      action: () => {
        return instanceCoreApi.post(API.DELETE_API_DATA_AGGREGATE(rowData?.id));
      },
    },
  };

  return (
    <div>
      <AppPageMetadata title={title} />
      <Spin spinning={loadingToggleDisable}>
        <DataTable
          key={`API-data-key`}
          syncURL={false}
          initTable={{
            body: {
              filters: [
                {
                  name: 'category',
                  value: category,
                  operation: FILTER_OPERATION.EQ,
                },
              ],
            },
          }}
          toolbars={[
            <AntButton
              onClick={() => {
                setActionDialog(
                  ACTION_DIALOG_API_DATA_AGGREGATE.ADD_API_DATA_AGGREGATE,
                );
                setIsDialogOpen(true);
              }}
              type='primary'
              icon={<PlusOutlined />}
              key={ITEM_PERMISSIONS.ADD}>
              {messages['table.toolbar.addNew']}
            </AntButton>,
          ]}
          url={API.GET_API_DATA_AGGREGATE}
          columns={columns}>
          <DialogConfirm
            key={`${actionDialog}-${rowData?.id}`}
            visible={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            afterClose={() => setRowData(null)}
            initialValues={CONTENT_DIALOG[actionDialog]?.initialValues}
            textTitle={CONTENT_DIALOG[actionDialog]?.title || ''}
            textSuccess={CONTENT_DIALOG[actionDialog]?.success}
            size={CONTENT_DIALOG[actionDialog]?.size || MODAL_SIZE.MEDIUM}
            textButtonConfirm={CONTENT_DIALOG[actionDialog]?.textButtonConfirm}
            textButtonCancel={CONTENT_DIALOG[actionDialog]?.textButtonCancel}
            preSaveData={CONTENT_DIALOG[actionDialog]?.preSaveData}
            onSaveToServer={CONTENT_DIALOG[actionDialog]?.action}>
            {CONTENT_DIALOG[actionDialog]?.children || <></>}
          </DialogConfirm>
        </DataTable>
      </Spin>
    </div>
  );
};

APIDataAggregatedList.propTypes = {};

APIDataAggregatedList.defaultProps = {};

export default APIDataAggregatedList;
