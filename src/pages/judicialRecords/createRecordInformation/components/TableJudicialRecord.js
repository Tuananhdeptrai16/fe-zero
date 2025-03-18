import React, { Fragment, useState } from 'react';
import DataTable from 'src/@crema/core/DataTable';
import API from 'src/@crema/services/apis';
import DialogConfirm from 'src/@crema/component/DialogConfirm';
import AntButton from 'src/@crema/component/AntButton';
import { ITEM_PERMISSIONS } from 'src/shared/constants/Permission';
import clsx from 'clsx';
import style from './TableJudicial.module.scss';
import Icon, {
  PlusOutlined,
  UploadOutlined,
  UnlockOutlined,
  PrinterOutlined,
} from '@ant-design/icons';
import config from 'src/config';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import RenderGender from 'src/@crema/component/TableRender/RenderGender';
import { RenderDate } from 'src/@crema/component/TableRender';
import { FILTER_TYPE, KEY_ACTION_COLUMN } from 'src/shared/constants/DataTable';
import {
  AcCheckIcon,
  AcDeleteColorRed,
  AcEditIcon,
  AcLockJudicial,
  AcSyncjudicial,
  ViewStatus,
} from 'src/assets/icon/action';
import { TABLE_ACTION } from 'src/shared/constants/TableAction';
import {
  autoSyncMinistry,
  deleteJudicialRecord,
  lockJudicialRecord,
  massDeleteJudicialRecord,
  putUploadToMinistry,
  // syncMinistry,
  unlockJudicialRecord,
} from 'src/@crema/services/judicialRecord.service';
import ConfirmInfo from 'src/pageComponents/AdminUser/ConfirmInfo';
import { Badge, Tooltip } from 'antd';
import Link from 'src/@crema/component/Link';
import {
  KEY_STATUS_CREATE_JUDICIAL_RECORD as KEY,
  renderSample,
} from '../utils';
import { useAuthUser } from 'src/@crema/utility/AuthHooks';
import { FormUploadToMinistry } from 'src/pages/judicialRecords/createRecordInformation/components/FormUploadToMinistry';
import { isEmpty } from 'src/shared/utils/Typeof';
import RenderStatusTag from '../../../../@crema/component/TableRender/RenderStatusTag';
import { ROUTER_NAME } from 'src/pages/routeConfig';
import { useJWTAuthActions } from 'src/@crema/services/auth/jwt-auth/JWTAuthProvider';
import { Progress } from 'antd';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import notification from 'src/shared/utils/notification';
import { TYPE_LLTP } from 'src/shared/constants/DataSelect';
import { FormPrintJudicialRecord } from 'src/pageComponents/judicialRecords/FormPrintJudicialRecord';

// import { METHOD_FETCH } from 'src/shared/constants/FetchData';
// import { parse } from 'src/shared/utils/String';

const TableJudicialRecord = ({ initTable, activeKey, refetchCount }) => {
  const { user = {} } = useAuthUser();
  const { checkPermissionAction } = useJWTAuthActions();
  const navigate = useNavigate();

  const [rowData, setRowData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [actionDialog, setActionDialog] = useState('');
  const [rowsSelected, setRowsSelected] = useState([]);
  const { messages } = useIntl();
  const [listPdf, setListPdf] = useState([]);

  const renderStatusSync = (status) => {
    // dang dong bo
    if (status.toLowerCase().trim() === 'pending') {
      return (
        <Tooltip
          placement='topRight'
          title='Đang đồng bộ thông tin lên Bộ tư pháp'>
          <Progress
            percent={60}
            status='active'
            showInfo={false}
            style={{ width: 110 }}
          />
        </Tooltip>
      );
    }
    // loi dong bo
    else if (status.toLowerCase().trim() === 'failed') {
      return (
        <Tooltip title='Đã có lỗi xảy ra'>
          <Progress
            percent={100}
            status='exception'
            showInfo={false}
            style={{ width: 110 }}
          />
        </Tooltip>
      );
    }
    // da dong bo
    else if (status.toLowerCase().trim() === 'done') {
      return (
        <div className={clsx(style.sync_success)}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='14'
            height='14'
            viewBox='0 0 14 14'
            className={clsx(style.personalInformation_icon)}
            fill='none'>
            <path
              d='M7 0C3.13438 0 0 3.13438 0 7C0 10.8656 3.13438 14 7 14C10.8656 14 14 10.8656 14 7C14 3.13438 10.8656 0 7 0ZM10.0234 4.71406L6.73281 9.27656C6.68682 9.34076 6.62619 9.39306 6.55595 9.42914C6.48571 9.46523 6.40787 9.48405 6.32891 9.48405C6.24994 9.48405 6.17211 9.46523 6.10186 9.42914C6.03162 9.39306 5.97099 9.34076 5.925 9.27656L3.97656 6.57656C3.91719 6.49375 3.97656 6.37813 4.07812 6.37813H4.81094C4.97031 6.37813 5.12187 6.45469 5.21562 6.58594L6.32812 8.12969L8.78438 4.72344C8.87813 4.59375 9.02812 4.51562 9.18906 4.51562H9.92188C10.0234 4.51562 10.0828 4.63125 10.0234 4.71406Z'
              fill='#48CA08'
            />
          </svg>
          <span className={clsx(style.personalInformation_text)}>
            Đã đồng bộ
          </span>
        </div>
      );
    }
    // cho dong bo
    else if (status.toLowerCase().trim() === 'notyet') {
      return (
        <div className={clsx(style.areSynchronizing)}>
          <Progress percent={0} status='active' showInfo={false} />
          <span className={clsx(style.text)}>Chờ đồng bộ</span>
        </div>
      );
    } else {
      <></>;
    }
  };

  //  call api sync
  const handleSyncMinistry = (data) => {
    return instanceCoreApi
      .post(API.LOGIN_BOT_SYNC_JUDICIAL(data.client), {})
      .then(() => {
        instanceCoreApi
          .post(API.SYNC_DATA_JUDICIAL_RECORD(data.id, data.client), {})
          .then((resSync) => {
            notification.success(
              resSync?.data?.result ||
                resSync?.data?.message ||
                'Đồng bộ thành công',
            );
            setIsDialogOpen(false);
          })
          .catch(() => {
            notification.error('Đồng bộ thất bại !');
          });
      })
      .catch(() => {
        notification.error('Đăng nhập bot thất bại !:');
      });
  };

  const deleteToServer = () => {
    return deleteJudicialRecord(rowData?.id);
  };

  const onUnlockRecord = () => {
    return unlockJudicialRecord(rowData?.id);
  };
  const onLockRecord = () => {
    return lockJudicialRecord(rowData?.id);
  };
  const actionContent = {
    [TABLE_ACTION.AUTO_SYNC]: {
      title: 'confirm.autoSyncTitle',
      success: 'confirm.autoSyncSuccess',
      children: <ConfirmInfo message='confirm.syncTitleConfirm' />,
      action: autoSyncMinistry,
      onSuccess: refetchCount,
    },
    // dong bo len bo tu phap
    [TABLE_ACTION.SYNC]: {
      title: 'confirm.syncTitle',
      success: 'confirm.syncTitleSuccess',
      children: (
        // <ConfirmInfo
        //   message='confirm.syncTitleConfirm'
        //   name={rowData?.full_name}
        // />
        <p
          style={{
            margin: 0,
          }}>
          <span>Bạn có chắc chắn muốn đồng bộ thông tin công dân </span>
          <span
            style={{
              color: '#007bec',
              fontWeight: 500,
            }}>
            {rowData?.full_name}
          </span>
          <span> lên Bộ tư pháp ?</span>
        </p>
      ),

      // action: () => syncMinistry(rowData?.id, clientID?.client_id),
      action: () =>
        handleSyncMinistry({
          id: rowData?.id,
          client: 'stp.mhdigital.vn',
        }),
      onSuccess: refetchCount,
    },
    [TABLE_ACTION.HAND_SYNC]: {
      title: 'confirm.uploadToMinistry',
      success: 'confirm.uploadToMinistrySuccess',
      action: putUploadToMinistry,
      preSaveData: (data) => {
        return {
          id: rowData?.id,
          data,
        };
      },
      onSuccess: refetchCount,
      children: <FormUploadToMinistry />,
    },
    [TABLE_ACTION.UNLOCK]: {
      title: 'confirm.unlockRecordTitle',
      success: 'confirm.unlockRecordSuccess',
      children: <ConfirmInfo message='confirm.unlockRecordConfirm' />,
      action: onUnlockRecord,
    },
    [TABLE_ACTION.LOCK]: {
      title: 'confirm.lockRecordTitle',
      success: 'confirm.lockRecordSuccess',
      children: <ConfirmInfo message='confirm.lockRecordConfirm' />,
      action: onLockRecord,
    },
    [TABLE_ACTION.APPROVE]: {
      title: 'confirm.deleteRecord',
      success: 'confirm.verifyAndUpdateInfoSuccess',
      children: (
        <ConfirmInfo
          message='confirm.verifyAndUpdateInfoSure'
          name={rowData?.full_name}
        />
      ),
      action: onLockRecord,
      onSuccess: refetchCount,
    },
    [TABLE_ACTION.DELETE]: {
      title: 'confirm.deleteRecord',
      success: 'confirm.deleteRecordSuccess',
      children: (
        <ConfirmInfo
          message='confirm.deleteRecordSure'
          name={rowData?.full_name}
        />
      ),
      action: deleteToServer,
      onSuccess: refetchCount,
    },
    [TABLE_ACTION.DELETE_MULTI]: {
      title: 'confirm.deleteMultiRecord',
      success: 'confirm.deleteMultiRecordSuccess',
      messageValue: {
        num: rowsSelected?.length,
      },
      children: (
        <ConfirmInfo
          message='confirm.deleteMultiRecordSure'
          values={{ num: rowsSelected?.length }}
        />
      ),
      action: () => massDeleteJudicialRecord(rowsSelected),
      onSuccess: refetchCount,
    },
    [TABLE_ACTION.PRINT]: {
      title: 'judicial.print',
      size: 'large',
      children: (
        <FormPrintJudicialRecord
          listPdf={listPdf?.filter((item) => item?.value)}
        />
      ),
    },
  };

  const renderStatus = (requests) => {
    if (isEmpty(requests))
      return <Badge color={'orange'} text={`Không yêu cầu xác thực`} />;
    const numberPending = (requests || []).filter(
      (request) => request?.status === KEY.APPROVED,
    ).length;
    return (
      <Badge
        color={'orange'}
        text={`Đã xác thực(${numberPending}/${requests?.length})`}
      />
    );
  };
  const columns = [
    {
      title: <IntlMessages id='common.name' />,
      dataIndex: 'full_name',
      fixed: 'left',
      width: 200,
      render: (record, row) => {
        if (activeKey === KEY.IM_COMPLETED) return record;
        return (
          <Link to={config.routes.detailJudicialRecord(activeKey, row?.id)}>
            {record}
          </Link>
        );
      },
    },
    {
      title: <IntlMessages id='judicial.idCard' />,
      dataIndex: 'cccd_number',
      width: 200,
    },
    {
      title: <IntlMessages id='common.gender' />,
      dataIndex: 'gender',
      width: 200,
      render: (gender) => {
        return <RenderGender value={gender} />;
      },
    },
    {
      title: <IntlMessages id='common.birthday' />,
      dataIndex: 'date_of_birth',
      width: 200,
      sorter: true,
      render: (date) => <RenderDate value={date} />,
    },
    {
      title: <IntlMessages id='table.citizenNationality' />,
      dataIndex: 'nationality',
      width: 200,
    },
    {
      title: <IntlMessages id='judicial.sampleForm' />,
      dataIndex: 'profile_type',
      width: 200,
      render: renderSample,
    },
    // ngay xac thuc ho so
    !(activeKey === KEY.VERIFIED)
      ? null
      : {
          title: <IntlMessages id='judicial.DocumentAuthenticationDate' />,
          dataIndex: 'updated_at',
          width: 200,
          render: (date) => <RenderDate value={date} />,
        },
    {
      title: <IntlMessages id='common.status' />,
      dataIndex: 'citizen_profile_request_organization_response',
      width: 200,
      render: (requests) => renderStatus(requests),
    },
    {
      title: <IntlMessages id='common.status' />,
      dataIndex: 'status',
      width: 200,
      render: (value) => (
        <RenderStatusTag value={value} statusType={'MINISTRY'} />
      ),
    },
    {
      title: <IntlMessages id='common.requestDate' />,
      dataIndex: 'created_at',
      width: 200,
      render: (date) => <RenderDate value={date} />,
    },
    {
      title: <IntlMessages id='common.expiredDate' />,
      dataIndex: 'due_date',
      width: 200,
      render: (date) => <RenderDate value={date} />,
    },
    {
      title: <IntlMessages id='table.timeUpdated' />,
      dataIndex: 'updated_at',
      width: 200,
      render: (date) => <RenderDate value={date} />,
    },
    {
      key: KEY_ACTION_COLUMN,
      width: 200,
      actions: [
        {
          label: 'table.action.edit',
          actionName: ITEM_PERMISSIONS.UPDATE,
          icon: <Icon component={AcEditIcon} />,
          visible: (data) => {
            return data.status === 'drafting';
          },
          onClick: (data) => {
            navigate(config.routes.judicialRecordEdit(data?.id));
          },
        },
        {
          label: 'table.action.ministrySyncHandler',
          actionName: ITEM_PERMISSIONS.SYNC,
          icon: <UploadOutlined style={{ color: '#000000' }} />,
          visible: (data) => {
            return (
              data.status === 'approved' &&
              data.locked &&
              data?.status_synchronize !== 'done' &&
              data?.status_synchronize !== 'pending'
            );
          },
          onClick: (data) => {
            setRowData(data);
            setIsDialogOpen(true);
            setActionDialog(TABLE_ACTION.HAND_SYNC);
          },
        },

        // Đồng bộ thông tin lên Bộ tư pháp
        {
          label: 'table.SynInformationWithMinistryJustice',
          actionName: ITEM_PERMISSIONS.SYNC,
          icon: <Icon component={AcSyncjudicial} />,
          visible: (data) => {
            if (data.status === 'approved' && data.locked) {
              return (
                !data?.status_synchronize ||
                data?.status_synchronize.toLowerCase().trim() === 'notyet'
              );
            }
            return false;
          },
          onClick: (data) => {
            setRowData(data);
            setIsDialogOpen(true);
            setActionDialog(TABLE_ACTION.SYNC);
          },
        },
        // Khóa hồ sơ
        {
          label: 'table.action.lockRecord',
          actionName: ITEM_PERMISSIONS.LOCK,
          icon: <Icon component={AcLockJudicial} />,
          visible: (data) => {
            return (
              data.status === 'approved' &&
              data?.locked === false &&
              (!data?.status_synchronize ||
                data?.status_synchronize.toLowerCase().trim() === 'notyet')
            );
          },
          onClick: (data) => {
            setRowData(data);
            setIsDialogOpen(true);
            setActionDialog(TABLE_ACTION.LOCK);
          },
        },
        // mo khoa ho so
        {
          label: 'table.action.unlockRecord',
          actionName: ITEM_PERMISSIONS.LOCK,
          icon: (
            <UnlockOutlined
              style={{
                color: '#111827',
              }}
            />
          ),
          visible: (data) => {
            return (
              data.status === 'approved' &&
              data?.locked &&
              (!data?.status_synchronize ||
                data?.status_synchronize.toLowerCase().trim() === 'notyet')
            );
          },
          onClick: (row) => {
            setRowData(row);
            setIsDialogOpen(true);
            setActionDialog(TABLE_ACTION.UNLOCK);
          },
        },
        {
          label: 'button.verifyAndUpdateInfo',
          actionName: ITEM_PERMISSIONS.APPROVE,
          icon: <Icon component={AcCheckIcon} />,
          visible: (data) => {
            const { citizen_profile_request_organization_response } = data;
            const isDisabled = (
              citizen_profile_request_organization_response || []
            ).some((request) => request?.status !== KEY.APPROVED);
            return !isDisabled && activeKey === KEY.WAITING;
          },
          onClick: (data) => {
            setRowData(data);
            setIsDialogOpen(true);
            setActionDialog(TABLE_ACTION.APPROVE);
          },
        },
        // xoa
        {
          label: 'table.action.delete',
          actionName: ITEM_PERMISSIONS.DELETE,
          icon: <Icon component={AcDeleteColorRed} />,
          visible: (data) => {
            // return data.created_by === user?.id && activeKey !== KEY.MINISTRY;
            if (
              data.status !== 'approved' &&
              data.created_by === user?.id &&
              (!data?.status_synchronize ||
                data?.status_synchronize.toLowerCase().trim() === 'notyet')
            ) {
              return true;
            }
          },
          onClick: (data) => {
            setRowData(data);
            setIsDialogOpen(true);
            setActionDialog(TABLE_ACTION.DELETE);
          },
        },
        //  Tiến trình hoàn thành
        {
          visible: (data) => {
            return (
              data.status === 'approved' &&
              data?.status_synchronize &&
              data?.status_synchronize.toLowerCase().trim() !== 'notyet'
            );
          },
          render: (data) => {
            return (
              data?.status_synchronize && (
                <div
                  style={{
                    position: 'relative',
                    top: '-1px',
                    minWidth: '68px',
                  }}
                  key={data?.id}>
                  {renderStatusSync(data?.status_synchronize)}
                </div>
              )
            );
          },
        },
        // Xem trạng thái
        {
          label: 'table.action.viewStatus',
          actionName: ITEM_PERMISSIONS.VIEW,
          icon: <Icon component={ViewStatus} />,
          visible: (data) => {
            return data.status === 'approved' && data?.status_synchronize;
          },
          onClick: (data) => {
            setRowData(data);
            navigate(config.routes.judicialViewSyncStatus(data?.id));
            // setIsDialogOpen(true);
            // setActionDialog(TABLE_ACTION.DELETE);
          },
          // render: (data) => {
          //   return <a>Invite</a>;
          // },
        },

        {
          label: 'table.action.print',
          icon: <PrinterOutlined style={{ color: '#000000' }} />,
          onClick: (data) => {
            setRowData(data);
            setListPdf([
              { value: data?.link_lltp, label: 'Hồ sơ LLTP' },
              { value: data?.link_sample1, label: 'Mẫu phiếu LLTP số 1' },
              { value: data?.link_sample2, label: 'Mẫu phiếu LLTP số 2' },
            ]);
            setIsDialogOpen(true);
            setActionDialog(TABLE_ACTION.PRINT);
          },
        },
        // {
        //   actionName: ITEM_PERMISSIONS.APPROVE,
        //   visible: (data) => {
        //     return activeKey === KEY.MINISTRY && data?.status === KEY.ERROR;
        //   },
        //   component: <Link>{messages['common.additionalRequirement']}</Link>,
        // },
        // {
        //   actionName: ITEM_PERMISSIONS.APPROVE,
        //   visible: (data) => {
        //     return activeKey === KEY.MINISTRY && data?.status === KEY.DONE;
        //   },
        //   component: <Link>{messages['table.toolbar.download']}</Link>,
        // },
      ],
    },
  ]?.filter(Boolean);

  const renderColumns = () => {
    const exclusionsMap = {
      [KEY.VERIFIED]: [
        'created_at',
        'expired_date',
        'status',
        'citizen_profile_request_organization_response',
        'due_date',
      ],
      [KEY.WAITING]: ['updated_at', 'status'],
      [KEY.MINISTRY]: [
        'created_at',
        'expired_date',
        'citizen_profile_request_organization_response',
      ],
      default: [
        'created_at',
        'expired_date',
        'status',
        'citizen_profile_request_organization_response',
      ],
    };

    const exclusions = exclusionsMap[activeKey] || exclusionsMap.default;
    // console.log({ exclusionsMap });
    // console.log({ exclusions });
    // console.log({ columns });
    return columns.filter((column) => !exclusions.includes(column.dataIndex));
  };

  //* Filters
  const filters = [
    {
      type: FILTER_TYPE.TEXT,
      label: messages['common.name'],
      name: 'full_name',
      placeholder: 'Tìm kiếm theo ',
    },
    {
      type: FILTER_TYPE.TEXT,
      label: messages['judicial.idCard'],
      name: 'cccd_number',
      placeholder: 'Tìm kiếm theo ',
    },
    {
      type: FILTER_TYPE.SELECT,
      label: messages['judicial.sampleForm'],
      name: 'profile_type',
      placeholder: 'Tìm kiếm theo ',
      options: TYPE_LLTP,
    },
  ];

  return (
    <>
      <DataTable
        url={API.SEARCH_JUDICIAL_RECORD}
        // filters={activeKey === KEY.VERIFIED ? filters : null}
        filters={filters}
        columns={renderColumns()}
        initTable={initTable}
        toolbars={[
          <AntButton
            key={ITEM_PERMISSIONS.ADD}
            type='primary'
            icon={<PlusOutlined />}
            onClick={() => {
              navigate(config.routes.judicialCreateRecordAdd);
            }}>
            {messages['sidebar.judicial_record.create']}
          </AntButton>,
        ]}
        itemSelected={
          activeKey === KEY.VERIFIED
            ? null
            : checkPermissionAction(
                ROUTER_NAME.JUDICIAL_CREATE_RECORDS,
                ITEM_PERMISSIONS.DELETE,
              )
            ? {
                action: 'table.deleteMulti',
                clickAction: (_, items) => {
                  setRowsSelected(items);
                  setIsDialogOpen(true);
                  setActionDialog(TABLE_ACTION.DELETE_MULTI);
                },
                preItemSelect: (items) => {
                  return (items || [])
                    .filter((item) => item?.created_by === user?.id)
                    .map((item) => item?.id);
                },
              }
            : undefined
        }>
        <DialogConfirm
          key={`action-${rowData?.id}`}
          visible={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          textTitle={actionContent[actionDialog]?.title || ''}
          messageValue={actionContent[actionDialog]?.messageValue}
          textSuccess={actionContent[actionDialog]?.success || ''}
          preSaveData={actionContent[actionDialog]?.preSaveData}
          size={actionContent[actionDialog]?.size}
          onSaveToServer={actionContent[actionDialog]?.action}
          onSuccess={actionContent[actionDialog]?.onSuccess}>
          {actionContent[actionDialog]?.children || <></>}
        </DialogConfirm>
      </DataTable>
    </>
  );
};
export default TableJudicialRecord;
