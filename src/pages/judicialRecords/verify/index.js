import React, { useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import AntButton from 'src/@crema/component/AntButton';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import DataTable from 'src/@crema/core/DataTable/index';
import IntlMessages from 'src/@crema/utility/IntlMessages';
// import AppCard from 'src/@crema/core/AppCard/index';
import AppTabs from 'src/@crema/core/AppTabs/AppTabs';
import API from 'src/@crema/services/apis';
import DialogConfirm from 'src/@crema/component/DialogConfirm/index';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import {
  RenderDate,
  RenderStatusTag,
} from 'src/@crema/component/TableRender/index';
import { useLocation, useNavigate } from 'react-router-dom';
import { Space } from 'antd';
import {
  JUDICIAL_STATUS,
  ORGANIZATION_STATUS,
} from 'src/shared/constants/DataTableStatus';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import AntBadge from 'src/@crema/component/AntBadge';
import RenderGender from 'src/@crema/component/TableRender/RenderGender';
import RenderContentHTML from 'src/@crema/component/TableRender/RenderContentHTML';
import { isEmpty } from 'src/shared/utils/Typeof';
import FormTextArea from 'src/@crema/core/Form/FormTextArea';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import {
  KEY,
  MODAL_CONFIRM,
  MODAL_TYPE,
} from 'src/shared/constants/CitizenProfile';
import { getStatusOrganization } from 'src/shared/utils/CitizenProfile';
import Link from 'src/@crema/component/Link';
import { useJWTAuthActions } from 'src/@crema/services/auth/jwt-auth/JWTAuthProvider';
import { ROUTER_NAME } from 'src/pages/routeConfig';
import { ITEM_PERMISSIONS } from 'src/shared/constants/Permission';
import { useAuthUser } from 'src/@crema/utility/AuthHooks';
import { FILTER_OPERATION } from 'src/shared/constants/DataTable';

const JudicialRecordVerifyPage = () => {
  const navigate = useNavigate();
  const { checkPermissionAction } = useJWTAuthActions();
  const { user = {} } = useAuthUser();
  const { search } = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(search), [search]);
  const activeKey = searchParams.get('status') || KEY.ALL;

  const { messages } = useIntl();
  const [rowData, setRowData] = useState(null);
  const [modalType, setModalType] = useState(null);
  const modalConfig = MODAL_CONFIRM[modalType];
  const isDialogOpen = !isEmpty(modalConfig);

  const checkPermission = (permission) => {
    return checkPermissionAction(
      ROUTER_NAME.JUDICIAL_VERIFY_RECORD,
      permission,
    );
  };

  const filterTabListByPermissions = (tabs) => {
    return tabs.filter((tab) =>
      tab.permission ? checkPermission(tab.permission) : true,
    );
  };

  const FILTER_TAB = [
    {
      filters: [],
      keyword: '',
    },
    {
      filters: [
        {
          name: 'status',
          value: [ORGANIZATION_STATUS.PENDING],
          operation: 'in',
        },
        {
          name: 'verified_by',
          value: true,
          operation: 'is_null',
        },
      ],
      keyword: '',
    },
    {
      filters: [
        {
          name: 'status',
          value: [ORGANIZATION_STATUS.PENDING],
          operation: 'in',
        },
        {
          name: 'verified_by',
          value: user?.id,
          operation: FILTER_OPERATION.EQ,
        },
        {
          name: 'reject_reason',
          value: true,
          operation: 'is_null',
        },
      ],
      keyword: '',
    },
    {
      filters: [
        {
          name: 'status',
          value: [ORGANIZATION_STATUS.VERIFIED],
          operation: 'in',
        },
      ],
      keyword: '',
    },
    {
      filters: [
        {
          name: 'status',
          value: [ORGANIZATION_STATUS.PENDING],
          operation: 'in',
        },
        {
          name: 'reject_reason',
          value: false,
          operation: 'is_null',
        },
        {
          name: 'verified_by',
          value: user?.id,
          operation: FILTER_OPERATION.EQ,
        },
      ],
      keyword: '',
    },
  ];

  const { data, fetchData: fetchCount } = useFetch(
    {
      url: API.COUNT_CITIZEN_PROFILE_REQUEST_ORGANIZATION,
      method: METHOD_FETCH.POST,
      body: {
        group_by: FILTER_TAB,
      },
    },
    [modalType],
  );

  const countTab = data?.result?.total || [];

  const columns = [
    {
      title: <IntlMessages id='common.name' />,
      dataIndex: 'full_name',
      width: 200,
      key: 'full_name',
      fixed: 'left',
      render: (valueCell, record) => {
        return (
          <Link
            to={`/judicial/verify-record/${record?.citizen_profile_request_id}`}>
            {valueCell}
          </Link>
        );
      },
    },
    {
      title: <IntlMessages id='judicial.idCard' />,
      dataIndex: 'cccd_number',
      width: 200,
      key: 'cccd_number',
    },
    {
      title: <IntlMessages id='common.gender' />,
      dataIndex: 'gender',
      width: 200,
      key: 'gender',
      render: (value) => <RenderGender value={value} />,
    },
    {
      title: <IntlMessages id='common.birthday' />,
      dataIndex: 'date_of_birth',
      width: 200,
      key: 'date_of_birth',
      render: (date) => <RenderDate value={date} />,
    },
    {
      title: <IntlMessages id='common.requestDate' />,
      dataIndex: 'created_at',
      width: 200,
      key: 'created_at',
      render: (date) => <RenderDate value={date} />,
    },
    {
      title: <IntlMessages id='common.expiredDate' />,
      dataIndex: 'due_date',
      width: 200,
      key: 'due_date',
      render: (date) => <RenderDate value={date} />,
    },
    {
      title: <IntlMessages id='common.status' />,
      key: 'status',
      dataIndex: 'status',
      width: 200,
      render: (_, record) => {
        let statusTag = getStatusOrganization(record);

        if (statusTag) {
          return (
            <RenderStatusTag
              value={statusTag}
              statusType={'VERIFY_JUDICIAL_RECORD'}
            />
          );
        }

        return null;
      },
    },
    {
      title: <IntlMessages id='common.reason' />,
      key: 'reject_reason',
      dataIndex: 'reject_reason',
      width: 200,
      render: (text, record) => {
        if (
          record.status === ORGANIZATION_STATUS.PENDING &&
          !isEmpty(record.verified_by)
        ) {
          return <RenderContentHTML shortNumWord={125} content={text || ''} />;
        }
        return null;
      },
    },
    {
      title: <IntlMessages id='common.action' />,
      dataIndex: 'KEY_ACTION_COLUMN',
      fixed: 'right',
      width: 200,
      render: (_, record) => {
        const verifiedBy = record.verified_by;
        let statusTag = getStatusOrganization(record);
        let listButton;

        switch (statusTag) {
          case JUDICIAL_STATUS.NEW_REQUEST:
            listButton = [
              <AntButton
                key='receive'
                type='primary'
                onClick={() => {
                  setRowData(record);
                  setModalType(MODAL_TYPE.RECEIVE);
                }}>
                {messages['judicial.receiveRecordBtn']}
              </AntButton>,
            ];
            break;
          case JUDICIAL_STATUS.WAITING_CHECK:
            listButton = [
              <AntButton
                key='reject'
                type='danger'
                onClick={() => {
                  setRowData(record);
                  setModalType(MODAL_TYPE.REJECT);
                }}>
                {messages['judicial.rejectRecordBtn']}
              </AntButton>,
              <AntButton
                key='verify'
                type='primary'
                onClick={() =>
                  navigate(
                    `/judicial/verify-record/${record?.citizen_profile_request_id}`,
                  )
                }>
                {messages['judicial.verifyRecordBtn']}
              </AntButton>,
            ];
            break;
          case JUDICIAL_STATUS.RECHECK:
            listButton = [
              <AntButton
                key='verify'
                type='primary'
                onClick={() =>
                  navigate(
                    `/judicial/verify-record/${record?.citizen_profile_request_id}`,
                  )
                }>
                {messages['judicial.verifyRecordBtn']}
              </AntButton>,
            ];
            break;
          case JUDICIAL_STATUS.WAITING_VERIFY:
            listButton = [
              <AntButton
                key='retryVerify'
                type='danger'
                onClick={() => {
                  setRowData(record);
                  setModalType(MODAL_TYPE.RETRY_VERIFY);
                }}>
                {messages['judicial.retryVerifyRecordBtn']}
              </AntButton>,
              <AntButton
                key='approve'
                type='primary'
                onClick={() =>
                  navigate(
                    `/judicial/verify-record/${record?.citizen_profile_request_id}`,
                  )
                }>
                {messages['judicial.approveRecordBtn']}
              </AntButton>,
            ];
            break;
          case JUDICIAL_STATUS.VERIFIED:
            listButton = [
              <AntButton
                key='retryVerify'
                type='danger'
                onClick={() => {
                  setRowData(record);
                  setModalType(MODAL_TYPE.RETRY_VERIFY);
                }}>
                {messages['judicial.retryVerifyRecordBtn']}
              </AntButton>,
            ];
            break;
          case JUDICIAL_STATUS.LOCKED:
            listButton = [];
            break;
        }

        if (!isEmpty(listButton)) {
          listButton = listButton.filter(({ key }) => {
            if (key === 'receive') {
              return checkPermissionAction(
                ROUTER_NAME.JUDICIAL_VERIFY_RECORD,
                ITEM_PERMISSIONS.VERIFY,
              );
            }

            if (key === 'reject' || key === 'verify') {
              return (
                verifiedBy === user?.id &&
                checkPermissionAction(
                  ROUTER_NAME.JUDICIAL_VERIFY_RECORD,
                  ITEM_PERMISSIONS.VERIFY,
                )
              );
            }

            if (key === 'retryVerify' || key === 'approve') {
              return checkPermissionAction(
                ROUTER_NAME.JUDICIAL_VERIFY_RECORD,
                ITEM_PERMISSIONS.APPROVE,
              );
            }

            return true;
          });

          return <Space>{listButton}</Space>;
        }
        return null;
      },
    },
  ];

  const renderTableTab = ({ initTable, columns }) => {
    return (
      <DataTable
        initTable={initTable}
        url={API.SEARCH_CITIZEN_PROFILE_REQUEST_ORGANIZATION}
        columns={columns}>
        <DialogConfirm
          key={`del-${rowData?.id}`}
          visible={isDialogOpen}
          onClose={() => setModalType(null)}
          textTitle={modalConfig?.textTitle || ''}
          textSuccess={modalConfig?.textSuccess}
          onSuccess={fetchCount}
          onSaveToServer={(data) =>
            instanceCoreApi.put(modalConfig?.action(rowData?.id), data)
          }>
          <p>
            <IntlMessages id={modalConfig?.contentId} />
            <span className='warning-text-color ml-1'>
              {rowData?.full_name}
            </span>
            {modalType === MODAL_TYPE.RETRY_VERIFY && (
              <FormTextArea label='reason.reject' name='reason' required />
            )}
          </p>
        </DialogConfirm>
      </DataTable>
    );
  };
  const tabList = [
    {
      key: KEY.ALL,
      label: (
        <AntBadge
          status={activeKey === KEY.ALL ? 'active' : 'default'}
          count={countTab[0]}>
          {messages['common.all']}
        </AntBadge>
      ),
      children: renderTableTab({
        initTable: FILTER_TAB[0],
        columns: columns.filter((item) => item.dataIndex !== 'reason'),
      }),
    },
    {
      key: KEY.RECEIVE,
      label: (
        <AntBadge
          status={activeKey === KEY.RECEIVE ? 'active' : 'default'}
          count={countTab[1]}>
          {messages['judicial.receiveRecord']}
        </AntBadge>
      ),
      children: renderTableTab({
        initTable: FILTER_TAB[1],
        columns: columns.filter(
          (item) => item.dataIndex !== 'state' && item.dataIndex !== 'reason',
        ),
      }),
      permission: ITEM_PERMISSIONS.VERIFY,
    },
    {
      key: KEY.CHECK,
      label: (
        <AntBadge
          status={activeKey === KEY.CHECK ? 'active' : 'default'}
          count={countTab[2]}>
          {messages['judicial.checkRecord']}
        </AntBadge>
      ),
      children: renderTableTab({
        initTable: FILTER_TAB[2],
        columns: columns.filter(
          (item) => item.dataIndex !== 'state' && item.dataIndex !== 'reason',
        ),
      }),
      permission: ITEM_PERMISSIONS.VERIFY,
    },
    {
      key: KEY.WAITING,
      label: (
        <AntBadge
          status={activeKey === KEY.WAITING ? 'active' : 'default'}
          count={countTab[3]}>
          {messages['judicial.wait']}
        </AntBadge>
      ),
      children: renderTableTab({
        initTable: FILTER_TAB[3],
        columns: columns.filter((item) => item.dataIndex !== 'reason'),
      }),
      permission: ITEM_PERMISSIONS.APPROVE,
    },
    {
      key: KEY.RECHECK,
      label: (
        <AntBadge
          status={activeKey === KEY.RECHECK ? 'active' : 'default'}
          count={countTab[4]}>
          {messages['judicial.recheck']}
        </AntBadge>
      ),
      children: renderTableTab({
        initTable: FILTER_TAB[4],
        columns: columns.filter((item) => item.dataIndex !== 'state'),
      }),
      permission: ITEM_PERMISSIONS.VERIFY,
    },
  ];

  return (
    <div>
      <AppPageMetadata title={messages['sidebar.judicial_record.verify']}>
        {/*<AppCard className='ant-tab-table'>*/}
        <AppTabs
          className={'tab-sticky-header'}
          items={filterTabListByPermissions(tabList)}
          destroyInactiveTabPane
          activeKey={activeKey}
          onChange={(key) => navigate({ search: `?status=${key}` })}
        />
        {/*</AppCard>*/}
      </AppPageMetadata>
    </div>
  );
};

export default JudicialRecordVerifyPage;
