import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import AntButton from 'src/@crema/component/AntButton';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import DataTable from 'src/@crema/core/DataTable/index';
import Icon, { PlusOutlined } from '@ant-design/icons';
import { ITEM_PERMISSIONS } from 'src/shared/constants/Permission';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import {
  FILTER_OPERATION,
  FILTER_TYPE,
  GENDER_MAPPING,
  KEY_ACTION_COLUMN,
  KEY_SEARCH_PARAM_DT,
} from 'src/shared/constants/DataTable';
import { AcEditIcon, AcTrashIcon } from 'src/assets/icon/action';
// import AppCard from 'src/@crema/core/AppCard/index';
import AppTabs from 'src/@crema/core/AppTabs/AppTabs';
import API from 'src/@crema/services/apis';
import FormRowDataTable from 'src/@crema/component/FormRowDataTable/index';
import DialogConfirm from 'src/@crema/component/DialogConfirm/index';
import { FORM_TYPES } from 'src/shared/constants/FormDataTable';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import { FormRawDocumentModal } from 'src/pageComponents/rawDocument/FormRawDocumentModal';
import { FormUploadRawDocumentModal } from 'src/pageComponents/rawDocument/FormUploadRawDocumentModal';
import { useNavigate, useSearchParams } from 'react-router-dom';
import config from 'src/config';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import RenderStatusTag from 'src/@crema/component/TableRender/RenderStatusTag';
import RenderNameUser from 'src/@crema/component/TableRender/RenderNameUser';
import {
  KEY_DOCUMENT_NUMBER,
  KEY_FULL_NAME,
  KEY_GENDER,
} from 'src/shared/constants/SettingSystem';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import AntBadge from 'src/@crema/component/AntBadge';
import { RenderListFieldRawContent } from 'src/@crema/component/TableRender/RenderListFieldRawContent';
import { FIELD_MAP } from 'src/shared/constants/FieldKeyMap';
import { RenderFieldRawContent } from 'src/@crema/component/TableRender';
import { parse } from 'src/shared/utils/String';
import RenderDateTime from '../../@crema/component/TableRender/RenderDateTime';
import { useAuthUser } from 'src/@crema/utility/AuthHooks';
import { ROUTER_NAME } from 'src/pages/routeConfig';
import { TABLE_ACTION } from 'src/shared/constants/TableAction';
import { useJWTAuthActions } from 'src/@crema/services/auth/jwt-auth/JWTAuthProvider';
import ConfirmInfo from 'src/pageComponents/AdminUser/ConfirmInfo';
import Link from 'src/@crema/component/Link';

const renderGender = (value) => {
  if (!value) return '';
  return GENDER_MAPPING?.[value];
};

const KEY_TAB = {
  TODO: 'todo',
  DONE: 'done',
};

const renderInitFilter = (key) => {
  if (key === KEY_TAB.TODO) {
    return {
      filters: [
        {
          name: 'state',
          value: ['ocr_processing', 'done_ocr'],
          operation: FILTER_OPERATION.IN,
        },
      ],
    };
  }
  if (key === KEY_TAB.DONE) {
    return {
      filters: [
        {
          name: 'state',
          value: ['verified', 'done'],
          operation: 'in',
        },
      ],
    };
  }
};

const RawDocument = ({
  isListWaitingDigital = false,
  isListDigitizedWaitingConfirm = false,
}) => {
  const { user } = useAuthUser();
  const { checkPermissionAction } = useJWTAuthActions();
  const { messages } = useIntl();
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();

  const [rowData, setRowData] = useState(null);
  const [isDialogUploadOpen, setIsDialogUploadOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionDialog, setActionDialog] = useState('');
  const [rowsSelected, setRowsSelected] = useState([]);
  const [extraColumns, setExtraColumns] = useState([]);
  const activeKey = searchParams.get(KEY_SEARCH_PARAM_DT.TAB) || KEY_TAB.TODO;

  const { data, fetchData: reFetchCount } = useFetch(
    {
      url: API.COUNT_RAW_DOCUMENT,
      method: METHOD_FETCH.POST,
      body: {
        group_by: [
          renderInitFilter(KEY_TAB.TODO),
          renderInitFilter(KEY_TAB.DONE),
        ],
      },
    },
    [],
  );

  const countTab = data?.result?.total || [];

  const deleteToServer = () => {
    return instanceCoreApi.delete(API.DELETE_RAW_DOCUMENT(rowData?.id));
  };

  const actionContent = {
    [TABLE_ACTION.DELETE]: {
      title: 'confirm.deleteRawDocument',
      success: 'confirm.deleteRawDocumentSuccess',
      children: (
        <ConfirmInfo
          message='confirm.deleteRawDocumentSure'
          name={rowData?.document_template?.name}
        />
      ),
      action: deleteToServer,
      onSuccess: reFetchCount,
    },
    [TABLE_ACTION.DELETE_MULTI]: {
      title: 'confirm.massDeleteRawDocument',
      success: 'confirm.deleteRawDocumentSuccess',
      messageValue: {
        num: rowsSelected?.length,
      },
      children: (
        <ConfirmInfo
          message='confirm.massDeleteRawDocumentSure'
          values={{ num: rowsSelected?.length }}
        />
      ),
      action: () =>
        instanceCoreApi.delete(API.MASS_DELETE_RAW_DOCUMENT, {
          data: {
            ids: rowsSelected,
          },
        }),
      onSuccess: reFetchCount,
    },
  };

  const columns = [
    {
      title: <IntlMessages id='table.documentType' />,
      dataIndex: 'document_template',
      width: 250,
      fixed: 'left',
      render: (record, row) => (
        <Link to={config.routes.detailRawDocument(row?.id)}>
          {record?.name}
        </Link>
      ),
    },
    {
      title: <IntlMessages id='table.documentNumber' />,
      dataIndex: 'document_number',
      width: 150,
      render: (_row, data) => {
        const groupType = data?.document_template?.document_type?.group_type;
        if (groupType === 'verdict') {
          return RenderFieldRawContent({
            rawText: data?.raw_text,
            field: KEY_DOCUMENT_NUMBER,
          });
        }
        return (
          RenderFieldRawContent({
            rawText: data?.raw_text,
            field: FIELD_MAP.SO_QUYET_DINH,
          }) ||
          RenderFieldRawContent({
            rawText: data?.raw_text,
            field: FIELD_MAP.SO_GIAY_CHUNG_NHAN,
          })
        );
      },
    },
    {
      title: <IntlMessages id='table.document.publishDate' />,
      dataIndex: 'raw_text',
      width: 150,
      render: (record) => (
        <RenderFieldRawContent
          rawText={record}
          field={FIELD_MAP.NGAY_QUYET_DINH}
        />
      ),
    },
    {
      title: <IntlMessages id={'table.documentGrantingAgency'} />,
      dataIndex: 'organization',
      width: 200,
      render: (record, row) =>
        row?.document_template?.organization?.display_name,
    },
    {
      title: <IntlMessages id='table.citizenFullName' />,
      dataIndex: 'raw_document_objects',
      width: 200,
      render: (row) => (
        <RenderListFieldRawContent
          data={row}
          rawKey={'object'}
          fieldName={KEY_FULL_NAME}
        />
      ),
    },
    {
      title: <IntlMessages id='common.gender' />,
      dataIndex: 'gender',
      width: 150,
      render: (_, row) => (
        <RenderListFieldRawContent
          data={row?.raw_document_objects}
          rawKey={'object'}
          fieldName={KEY_GENDER}
          transformFn={renderGender}
        />
      ),
    },

    {
      title: <IntlMessages id='table.status' />,
      dataIndex: 'state',
      width: 200,
      render: (record) => (
        <RenderStatusTag value={record} statusType={'RAW_DOCUMENT'} />
      ),
    },
    {
      title: 'Người đăng tải',
      dataIndex: 'created_user',
      width: 200,
      render: (record) => <RenderNameUser user={record} />,
    },
    {
      title: <IntlMessages id='table.rawDocumentCreatedAt' />,
      dataIndex: 'created_at',
      width: 200,
      render: (record) => <RenderDateTime value={record} />,
    },
    // {
    //   title: <IntlMessages id='table.approveBy' />,
    //   dataIndex: 'verified_user',
    //   width: 200,
    //   key: 'verified_user',
    //   render: (record) => <RenderNameUser user={record} />,
    // },
    ...extraColumns?.map((item) => ({
      title: item?.label,
      dataIndex: item?.key,
      width: 200,
      render: (_, record) => (
        <RenderFieldRawContent rawText={record?.raw_text} field={item?.key} />
      ),
    })),
    {
      key: KEY_ACTION_COLUMN,
      actions: [
        {
          label: 'table.action.edit',
          actionName: ITEM_PERMISSIONS.UPDATE,
          icon: <Icon component={AcEditIcon} />,
          onClick: (data) => {
            navigate(`${config.routes.rawDocument}/${data?.id}`, {
              state: { data },
            });
          },
          visible: (data) => data?.created_user?.id === user?.id,
        },
        {
          label: 'table.action.delete',
          actionName: ITEM_PERMISSIONS.DELETE,
          icon: <Icon component={AcTrashIcon} />,
          onClick: (data) => {
            setRowData(data);
            setIsDialogOpen(true);
            setActionDialog(TABLE_ACTION.DELETE);
          },
        },
      ],
    },
  ];

  //* Filters
  const filters = [
    {
      type: FILTER_TYPE.SELECT_ASYNC,
      label: messages['table.documentType'],
      name: 'document_template_id',
      configFetch: {
        url: API.SELECT_DOCUMENT_TEMPLATE,
        method: METHOD_FETCH.POST,
      },
      fieldNames: {
        label: 'name',
        value: 'id',
      },
      returnObject: true,
    },
    {
      type: FILTER_TYPE.TEXT,
      label: messages['table.documentNumber'],
      name: 'document_number',
    },
  ];

  const onSubmitFilter = ({ values }) => {
    const { document_template_id } = values || {};
    const { config_template } = document_template_id || '';
    const listConfig = parse(config_template);
    setExtraColumns(listConfig || []);
  };

  const renderTableTab = ({ initTable, status }) => {
    return (
      <DataTable
        scroll={{ x: '100%' }}
        isShowSearch={false}
        initTable={initTable}
        filters={filters.filter((item) => {
          if (status === KEY_TAB.TODO)
            return item.name === 'document_template_id';
          return true;
        })}
        onQuery={onSubmitFilter}
        itemSelected={
          checkPermissionAction(
            ROUTER_NAME.RAW_DOCUMENT,
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
              setIsDialogUploadOpen(true);
              setRowData(null);
            }}>
            {messages['table.toolbar.addNew']}
          </AntButton>,
        ]}
        url={API.SEARCH_RAW_DOCUMENT}
        columns={columns.filter((column) => {
          if (status === 'done') {
            return column.dataIndex !== 'state';
          }
          return true;
        })}>
        <FormRowDataTable
          key={`formRow-${rowData?.id}`}
          visible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          formType={rowData ? FORM_TYPES.UPDATE : FORM_TYPES.ADD}
          method={rowData ? METHOD_FETCH.PUT : METHOD_FETCH.POST}
          resource={
            rowData
              ? API.UPDATE_RAW_DOCUMENT(rowData?.id)
              : API.CREATE_RAW_DOCUMENT
          }
          initialValues={rowData ?? {}}>
          <FormRawDocumentModal />
        </FormRowDataTable>
        <FormRowDataTable
          title={'common.uploadRecord'}
          visible={isDialogUploadOpen}
          onClose={() => setIsDialogUploadOpen(false)}
          formType={FORM_TYPES.ADD}
          method={METHOD_FETCH.POST}
          resource={API.CREATE_RAW_DOCUMENT}
          onSuccess={reFetchCount}
          initialValues={rowData ?? {}}>
          <FormUploadRawDocumentModal />
        </FormRowDataTable>
        <DialogConfirm
          key={`del-${rowData?.id}`}
          visible={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          textTitle={actionContent[actionDialog]?.title || ''}
          messageValue={actionContent[actionDialog]?.messageValue}
          textSuccess={actionContent[actionDialog]?.success || ''}
          preSaveData={actionContent[actionDialog]?.preSaveData}
          onSaveToServer={actionContent[actionDialog]?.action}
          onSuccess={actionContent[actionDialog]?.onSuccess}>
          {actionContent[actionDialog]?.children || <></>}
        </DialogConfirm>
      </DataTable>
    );
  };

  const tabList = [
    {
      key: KEY_TAB.TODO,
      label: (
        <AntBadge
          status={activeKey === KEY_TAB.TODO ? 'active' : 'default'}
          count={countTab[0]}>
          Chưa hoàn thành
        </AntBadge>
      ),
      children: renderTableTab({
        initTable: renderInitFilter(KEY_TAB.TODO),
        status: KEY_TAB.TODO,
      }),
    },
    {
      key: KEY_TAB.DONE,
      label: (
        <AntBadge
          status={activeKey === KEY_TAB.DONE ? 'active' : 'default'}
          count={countTab[1]}>
          Đã hoàn thành
        </AntBadge>
      ),
      children: renderTableTab({
        initTable: renderInitFilter(KEY_TAB.DONE),
        status: KEY_TAB.DONE,
      }),
    },
  ];

  const renderDataTableByIsListDigital = (
    isTableListWaitingDigital = false,
    isTableListDigitizedWaitingConfirm = false,
  ) => {
    if (isTableListWaitingDigital) {
      return renderTableTab({
        initTable: {
          filters: [
            {
              name: 'state',
              operation: FILTER_OPERATION.EQ,
              value: 'ocr_processing',
            },
          ],
        },
        status: KEY_TAB.TODO,
      });
    }
    if (isTableListDigitizedWaitingConfirm) {
      return renderTableTab({
        initTable: {
          filters: [
            {
              name: 'state',
              operation: FILTER_OPERATION.EQ,
              value: 'done_ocr',
            },
          ],
        },
        status: KEY_TAB.DONE,
      });
    }
  };

  return (
    <div>
      <AppPageMetadata title={messages['sidebar.rawDocument']}>
        {isListWaitingDigital || isListDigitizedWaitingConfirm ? (
          renderDataTableByIsListDigital(
            isListWaitingDigital,
            isListDigitizedWaitingConfirm,
          )
        ) : (
          <AppTabs
            className={'tab-sticky-header'}
            activeKey={activeKey}
            onChange={(newActiveKey) => {
              setSearchParams({ [KEY_SEARCH_PARAM_DT.TAB]: newActiveKey });
              reFetchCount();
            }}
            items={tabList}
            destroyInactiveTabPane
          />
        )}
      </AppPageMetadata>
    </div>
  );
};

export default RawDocument;
