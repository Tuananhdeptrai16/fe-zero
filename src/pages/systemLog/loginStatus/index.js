import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import { RenderDateTime } from 'src/@crema/component/TableRender';
import RenderNameUser from 'src/@crema/component/TableRender/RenderNameUser';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import DataTable from 'src/@crema/core/DataTable';
import API from 'src/@crema/services/apis';
import { KEY_ACTION_COLUMN } from 'src/shared/constants/DataTable';
import { Drawer } from 'antd';
import Icon, { CloseOutlined } from '@ant-design/icons';
import { LogDetail } from 'src/pageComponents/systemLog/LogDetail';
import DialogConfirm from 'src/@crema/component/DialogConfirm';
import ConfirmInfo from 'src/pageComponents/AdminUser/ConfirmInfo';
import { DrawLogFooter } from 'src/pageComponents/systemLog/loginStatus/DrawLogFooter';
import {
  putForceLockUnlockUser,
  putForceLogoutUser,
} from 'src/@crema/services/user.service';
import { AcEyeIcon } from 'src/assets/icon/action';
import RenderStatusTag from 'src/@crema/component/TableRender/RenderStatusTag';

const TYPE_ACTION = {
  LOGOUT: 'logout',
  BLOCK: 'locked',
  DETAIL: 'detail',
  UN_BLOCK: 'active',
};

const LoginStatusPage = () => {
  const { messages } = useIntl();
  const [rowData, setRowData] = useState();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [actionDialog, setActionDialog] = useState('');

  const preSaveLockUnLockUser = (status) => {
    return {
      userId: rowData?.user_info_response?.id,
      status,
    };
  };

  const onLogout = () => {
    setIsDialogOpen(true);
    setActionDialog(TYPE_ACTION.LOGOUT);
    setIsDrawerOpen(false);
  };

  const onHandleLogin = () => {
    const action =
      rowData?.user_info_response?.status === TYPE_ACTION.UN_BLOCK
        ? TYPE_ACTION.BLOCK
        : TYPE_ACTION.UN_BLOCK;
    setIsDialogOpen(true);
    setActionDialog(action);
    setIsDrawerOpen(false);
  };

  const actionContent = {
    [TYPE_ACTION.BLOCK]: {
      title: 'confirm.blockLoginUserTitle',
      success: 'confirm.blockLoginUserSuccess',
      children: (
        <ConfirmInfo
          message='confirm.blockLoginUserSure'
          name={RenderNameUser({ user: rowData?.user_info_response })}
        />
      ),
      action: putForceLockUnlockUser,
      preSaveData: () => preSaveLockUnLockUser('locked'),
    },
    [TYPE_ACTION.UN_BLOCK]: {
      title: 'confirm.unblockLoginUserTitle',
      success: 'confirm.unblockLoginUserSuccess',
      children: (
        <ConfirmInfo
          message='confirm.unblockLoginUserSure'
          name={RenderNameUser({ user: rowData?.user_info_response })}
        />
      ),
      action: putForceLockUnlockUser,
      preSaveData: () => preSaveLockUnLockUser('active'),
    },
    [TYPE_ACTION.LOGOUT]: {
      title: 'confirm.logoutUserTitle',
      success: 'confirm.logoutUserSuccess',
      children: (
        <ConfirmInfo
          message='confirm.logoutUserSure'
          name={RenderNameUser({ user: rowData?.user_info_response })}
        />
      ),
      action: () => putForceLogoutUser(rowData?.user_info_response?.id),
    },
  };

  const columns = [
    {
      title: <IntlMessages id='table.time' />,
      dataIndex: 'start_time',
      width: 200,
      align: 'center',
      render: (time) => <RenderDateTime value={time} />,
    },
    {
      title: <IntlMessages id='table.username' />,
      dataIndex: 'user_info_response',
      width: 200,
      render: (user) => <RenderNameUser user={user} />,
    },
    {
      title: 'IP',
      dataIndex: 'ip_address',
      width: 200,
    },
    {
      title: <IntlMessages id='table.web_username' />,
      dataIndex: 'item',
      width: 200,
      render: (_, record) => {
        return (
          <>{Object.values(record?.raw_data?.clients)?.map((item) => item)}</>
        );
      },
    },
    {
      title: <IntlMessages id={'table.action'} />,
      dataIndex: 'code',
      width: 200,
      render: (status) => (
        <RenderStatusTag value={status} statusType={'USER_ACTION_LOG'} />
      ),
    },
    {
      key: KEY_ACTION_COLUMN,
      actions: [
        {
          label: 'table.action.detail',
          icon: <Icon component={AcEyeIcon} />,
          onClick: (data) => {
            setRowData(data);
            setIsDrawerOpen(true);
          },
        },
      ],
    },
  ];

  const onCloseDrawer = () => {
    setIsDrawerOpen(false);
  };
  return (
    <>
      <AppPageMetadata title={messages['sidebar.login_status_log']} />
      <DataTable url={API.SEARCH_LOGIN_STATUS} columns={columns}>
        <DialogConfirm
          key={`action-${actionDialog}-${rowData?.id}}`}
          visible={isDialogOpen}
          textTitle={actionContent[actionDialog]?.title || ''}
          onClose={() => setIsDialogOpen(false)}
          textSuccess={actionContent[actionDialog]?.success || ''}
          preSaveData={actionContent[actionDialog]?.preSaveData}
          size={actionContent[actionDialog]?.size}
          onSaveToServer={actionContent[actionDialog]?.action}>
          {actionContent[actionDialog]?.children || <></>}
        </DialogConfirm>
      </DataTable>
      <Drawer
        open={isDrawerOpen}
        onClose={onCloseDrawer}
        title={messages['sidebar.access_log']}
        closable={false}
        width={750}
        extra={<CloseOutlined onClick={onCloseDrawer} />}
        footer={
          <DrawLogFooter
            onCloseDrawer={onCloseDrawer}
            onLogout={onLogout}
            onHandleLogin={onHandleLogin}
            rowData={rowData}
          />
        }>
        <LogDetail record={rowData} hideResponseRequest />
      </Drawer>
    </>
  );
};
export default LoginStatusPage;
