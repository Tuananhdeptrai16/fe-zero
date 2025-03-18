import React, { useState } from 'react';

import DataTable from 'src/@crema/core/DataTable';
import { KEY_ACTION_COLUMN } from 'src/shared/constants/DataTable';
import { GET_LIST_ADMIN_USER } from 'src/shared/constants/Resource';
import IntlMessages from 'src/@crema/utility/IntlMessages';
// import AntTag from 'src/@crema/component/AntTag/index';
import { useIntl } from 'react-intl';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata/index';
import DialogConfirm from 'src/@crema/component/DialogConfirm/index';
import {
  postAddUser,
  postDeleteAccount,
  postResendVerified,
  postSetAccessData,
  postTimeConfig,
  postUpdatePassword,
} from 'src/@crema/services';
import UserInfo from 'src/pageComponents/AdminUser/UserInfo/index';
import ConfirmInfo from 'src/pageComponents/AdminUser/ConfirmInfo/index';
import {
  ACCOUNT_ACTIONS,
  ACCOUNT_STATUS,
} from 'src/shared/constants/AccountStatus';
import FormSelectData from 'src/pageComponents/AdminUser/FormSelectDate/index';
import { getFormattedTime } from 'src/@crema/utility/helper/DateHelper';
import { END_TIME, START_TIME } from 'src/shared/constants/Format';
import FormUpdatePassword from 'src/pageComponents/AdminUser/FormUpdatePassword/index';
import FormConfigDataAccess from 'src/pageComponents/AdminUser/FormConfigDataAccess/index';
import { ITEM_PERMISSIONS } from 'src/shared/constants/Permission';
import { postChangeStatusUser } from 'src/@crema/services/user.service';
import userManageApi from 'src/@crema/services/apis/userManage.api';
import FormUpdateRole from 'src/pageComponents/AdminUser/FormUpdateRole/FormUpdateRole';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import Icon from '@ant-design/icons';
import { AcEditIcon } from 'src/assets/icon/action';
import FormRowDataTable from 'src/@crema/component/FormRowDataTable';
import { FORM_TYPES } from 'src/shared/constants/FormDataTable';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import RenderNameUser from 'src/@crema/component/TableRender/RenderNameUser';
import API from 'src/@crema/services/apis';
import { TABLE_ACTION } from 'src/shared/constants/TableAction';
import { FormCreateUser } from 'src/pageComponents/AdminUser/FormCreateUser';
// import { Space } from 'antd';
import AntSwitch from 'src/@crema/component/AntSwitch';
import { useJWTAuthActions } from 'src/@crema/services/auth/jwt-auth/JWTAuthProvider';
import { ROUTER_NAME } from 'src/pages/routeConfig';
import { Tag } from 'antd';

const AdminUser = () => {
  const { messages } = useIntl();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dataConfirm, setDataConfirm] = useState(null);
  const [rowData, setRowData] = useState(null);
  const [actionDialog, setActionDialog] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalApproveAddUser, setIsModalApproveAddUser] = useState(false);
  //* Get list role
  const { data: dataRoleRes } = useFetch(
    {
      url: userManageApi.GET_ALL_ROLE,
      useCache: true,
    },
    [],
  );
  const roles = dataRoleRes?.result;

  const { checkPermissionAction } = useJWTAuthActions();

  const isPermissionUpdate = checkPermissionAction(
    ROUTER_NAME.USERS,
    ITEM_PERMISSIONS.UPDATE,
  );

  const preSaveSetDates = (data) => {
    const { time_range } = data;
    let start_time = null;
    let end_time = null;
    if (time_range) {
      start_time = getFormattedTime(time_range[0], START_TIME);
      end_time = getFormattedTime(time_range[1], END_TIME);
    }
    return {
      id: rowData?.id,
      start_time: start_time,
      end_time: end_time,
    };
  };

  const preSaveUpdatePassword = (data) => {
    const { password } = data;
    return {
      id: rowData?.id,
      password: password,
    };
  };

  const preSaveSetAccessData = (data) => {
    const { brandname_ids, cat_ids } = data || {};
    return {
      brandname_ids: brandname_ids,
      cat_ids: cat_ids,
      id: rowData?.id,
    };
  };

  const onSaveReVerified = () => {
    return postResendVerified(rowData?.id);
  };

  const onSaveDelete = () => {
    return postDeleteAccount(rowData?.id);
  };

  const onSaveLock = () => {
    return postChangeStatusUser(rowData?.id, 'inactive');
  };

  const onSaveUnlock = () => {
    return postChangeStatusUser(rowData?.id, 'active');
  };

  const actionContent = {
    [ACCOUNT_ACTIONS.RESEND]: {
      title: 'confirm.resendVerified',
      confirm: '',
      success: 'confirm.resendVerifiedSuccess',
      action: onSaveReVerified,
      children: <UserInfo data={rowData} />,
    },
    [ACCOUNT_ACTIONS.DELETE]: {
      title: 'confirm.deleteAccount',
      success: 'confirm.deleteAccountSuccess',
      action: onSaveDelete,
      children: (
        <ConfirmInfo
          name={rowData?.username}
          message={'confirm.deleteAccountSure'}
        />
      ),
    },
    [ACCOUNT_ACTIONS.LOCK]: {
      title: 'confirm.lockAccount',
      confirm: 'confirm.lockAccountSure',
      success: 'confirm.lockAccountSuccess',
      action: onSaveLock,
      children: (
        <ConfirmInfo
          name={rowData?.username}
          message={'confirm.deleteAccountSure'}
        />
      ),
    },
    [ACCOUNT_ACTIONS.UNLOCK]: {
      title: 'confirm.unlockAccount',
      confirm: 'confirm.unlockAccountSure',
      success: 'confirm.unlockAccountSuccess',
      action: onSaveUnlock,
      children: (
        <ConfirmInfo
          name={rowData?.username}
          message={'confirm.deleteAccountSure'}
        />
      ),
    },
    [ACCOUNT_ACTIONS.SET_TIME]: {
      title: 'confirm.accessData',
      confirm: 'confirm.accessDataSure',
      success: 'confirm.accessDataSuccess',
      action: postTimeConfig,
      children: <FormSelectData id={rowData?.id} />,
    },
    [ACCOUNT_ACTIONS.UPDATE_PASSWORD]: {
      title: 'confirm.changePassword',
      confirm: 'confirm.changePasswordSure',
      success: 'confirm.changePasswordSuccess',
      action: postUpdatePassword,
      children: <FormUpdatePassword />,
    },
    [ACCOUNT_ACTIONS.CONFIG_ACCESS_DATA]: {
      title: 'confirm.configAccessData',
      confirm: 'confirm.configAccessDataSure',
      success: 'confirm.configAccessDataSuccess',
      action: postSetAccessData,
      children: <FormConfigDataAccess id={rowData?.id} />,
    },
    [TABLE_ACTION.CREATE]: {
      title: 'form.buttonAdd',
      onSave: (data) => {
        setDataConfirm({
          ...data,
          organization_id: data?.organization?.id,
          department_id: data?.department?.id,
        });
        setIsModalApproveAddUser(true);
      },
      textBtnSubmit: 'table.toolbar.addNewUser',
      children: <FormCreateUser />,
    },
  };

  const preSaveUserInfo = (data) => ({
    ...(data || {}),
    user_id: data?.id,
    organization_id: data?.organization?.id,
    department_id: data?.department?.id,
  });

  const preSaveData = {
    [ACCOUNT_ACTIONS.SET_TIME]: preSaveSetDates,
    [ACCOUNT_ACTIONS.UPDATE_PASSWORD]: preSaveUpdatePassword,
    [ACCOUNT_ACTIONS.CONFIG_ACCESS_DATA]: preSaveSetAccessData,
    [TABLE_ACTION.CREATE]: preSaveUserInfo,
  };
  return (
    <>
      <AppPageMetadata title={messages['sidebar.user_management']} />
      <DataTable
        toolbars={[]}
        url={GET_LIST_ADMIN_USER}
        columns={[
          {
            title: <IntlMessages id='table.lock_user' />,
            fixed: 'left',
            width: 220,
            actionName: ITEM_PERMISSIONS.UPDATE,
            dataIndex: 'status',
            render: (status, record) => {
              const isActive = status === ACCOUNT_STATUS.ACTIVE;
              return (
                <AntSwitch
                  value={isActive}
                  disabled={!isPermissionUpdate}
                  checkedChildren='Mở Khóa'
                  unCheckedChildren='Khóa'
                  onClick={
                    () => {
                      setActionDialog(
                        status === ACCOUNT_STATUS.ACTIVE
                          ? ACCOUNT_ACTIONS.LOCK
                          : ACCOUNT_ACTIONS.UNLOCK,
                      );
                      setRowData(record);
                      setDataConfirm(record);
                      setIsDialogOpen(true);
                    }
                    // onChangeOrganizationSwitch(checked, row)
                  }
                />
              );
            },
          },
          // {
          //   title: <IntlMessages id='sidebar.lock_unlock_users' />,
          //   dataIndex: 'status',
          //   width: 200,
          //   fixed: 'left',
          //   key: 'status',
          //   render: (_, record) => {
          //     const status = record?.status;
          //     const lookUp = status?.trim() === 'inactive';
          //     const unLook = status?.trim() === 'active';
          //     return (
          //       <div className='d-flex justify-start items-center gap-3'>
          //         <AntSwitch
          //           checked={lookUp}
          //           onChange={(checked) => {
          //             if (checked) {
          //               setActionDialog(ACCOUNT_ACTIONS.LOCK);
          //             } else {
          //               setActionDialog(ACCOUNT_ACTIONS.UNLOCK);
          //             }
          //             setRowData(record);
          //             setDataConfirm(record);
          //             setIsDialogOpen(true);
          //           }}
          //         />
          //         {lookUp && <span>Khóa</span>}
          //         {unLook && <span>Mở khóa</span>}
          //       </div>
          //     );
          //   },
          // },
          {
            title: <IntlMessages id='table.userName' />,
            dataIndex: 'name',
            width: 200,
            render: (name) =>
              // <RenderLink to={`/user/${data?.id}`}>{data?.username}</RenderLink>
              name,
            key: 'name',
          },
          {
            title: <IntlMessages id='table.email' />,
            dataIndex: 'email',
            width: 200,
            key: 'email',
          },
          {
            title: <IntlMessages id='table.phoneNumber' />,
            dataIndex: 'phone_number',
            key: 'phone_number',
            render: (phone_number) =>
              phone_number ?? <Tag color='#416ef0'></Tag>,
            width: 200,
          },
          {
            title: <IntlMessages id='table.organization' />,
            dataIndex: 'organization',
            key: 'organization_name',
            width: 200,
            render: (organization) => organization?.display_name,
          },
          // {
          //   title: <IntlMessages id='table.role' />,
          //   key: 'roles',
          //   dataIndex: 'roles',
          //   width: 150,
          //   render: (roles = []) => (
          //     <Space size={[0, 4]} wrap>
          //       {roles.map((role, index) => (
          //         <AntTag
          //           style={{ fontWeight: 600 }}
          //           color={role === 'ADMIN' ? '#007bec' : ''}
          //           key={index}>
          //           {role}
          //         </AntTag>
          //       ))}
          //     </Space>
          //   ),
          // },
          {
            key: KEY_ACTION_COLUMN,
            render: (value) => console.log(value),
            actions: [
              {
                label: 'table.action.edit',
                actionName: ITEM_PERMISSIONS.UPDATE,
                icon: <Icon component={AcEditIcon} />,
                onClick: (data) => {
                  setRowData({
                    ...data,
                    role_ids: data?.role_res?.map((item) => item?.id),
                  });
                  setIsModalOpen(true);
                },
              },
            ],
          },
        ]}>
        <FormRowDataTable
          preSaveData={preSaveUserInfo}
          visible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          formType={rowData ? FORM_TYPES.UPDATE : FORM_TYPES.ADD}
          resource={API.USER_UPDATE_ROLE}
          method={rowData ? METHOD_FETCH.PUT : METHOD_FETCH.POST}
          initialValues={rowData ?? {}}>
          <FormUpdateRole record={rowData} roles={roles} />
        </FormRowDataTable>
        <DialogConfirm
          preSaveData={preSaveData[actionDialog]}
          fieldMapper={
            actionDialog === ACCOUNT_ACTIONS.SET_TIME
              ? {
                  time_range: ['start_time', 'end_time'],
                }
              : {}
          }
          key={`${actionDialog}-${rowData?.id}`}
          visible={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          textTitle={actionContent[actionDialog]?.title || ''}
          textButtonConfirm={actionContent[actionDialog]?.textBtnSubmit}
          textSuccess={actionContent[actionDialog]?.success}
          onSave={actionContent[actionDialog]?.onSave}
          onSaveToServer={actionContent[actionDialog]?.action}>
          {actionContent?.[actionDialog]?.children || (
            <ConfirmInfo
              name={<RenderNameUser user={dataConfirm} />}
              message={actionContent?.[actionDialog]?.confirm}
            />
          )}
        </DialogConfirm>
        <DialogConfirm
          visible={isModalApproveAddUser}
          textTitle={'confirm.addUserApproveTitle'}
          onClose={() => {
            setIsModalApproveAddUser(false);
          }}
          onSuccess={() => {
            setIsDialogOpen(false);
          }}
          textButtonConfirm={'table.action.approve'}
          onSaveToServer={postAddUser}
          textSuccess={'form.addSuccessMessage'}
          preSaveData={() => dataConfirm}>
          <ConfirmInfo
            name={<RenderNameUser user={dataConfirm} />}
            message={'confirm.addUserSure'}
          />
        </DialogConfirm>
      </DataTable>
    </>
  );
};

export default AdminUser;
