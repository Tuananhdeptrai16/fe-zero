import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import API from 'src/@crema/services/apis';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import {
  KEY_DOCUMENT_NUMBER,
  KEY_FULL_NAME,
  KEY_GENDER,
} from 'src/shared/constants/SettingSystem';
import RenderDateTime from '../../@crema/component/TableRender/RenderDateTime';
import RenderStatusTag from '../../@crema/component/TableRender/RenderStatusTag';
import RenderNameUser from 'src/@crema/component/TableRender/RenderNameUser';
import {
  FILTER_OPERATION,
  FILTER_TYPE,
  GENDER_MAPPING,
  KEY_ACTION_COLUMN,
} from 'src/shared/constants/DataTable';
import Icon, { PlusOutlined } from '@ant-design/icons';
import { AcEditIcon, AcTrashIcon } from 'src/assets/icon/action';
import config from 'src/config';
import DataTable from 'src/@crema/core/DataTable';
import AntButton from 'src/@crema/component/AntButton';
import { ITEM_PERMISSIONS } from 'src/shared/constants/Permission';
import FormRowDataTable from 'src/@crema/component/FormRowDataTable';
import { FORM_TYPES } from 'src/shared/constants/FormDataTable';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import { FormRawDocumentModal } from 'src/pageComponents/rawDocument/FormRawDocumentModal';
import { FormUploadRawDocumentModal } from 'src/pageComponents/rawDocument/FormUploadRawDocumentModal';
import DialogConfirm from 'src/@crema/component/DialogConfirm';
import { parse } from 'src/shared/utils/String';
import { RenderFieldRawContent } from 'src/@crema/component/TableRender';
import { FIELD_MAP } from 'src/shared/constants/FieldKeyMap';
import { RenderListFieldRawContent } from 'src/@crema/component/TableRender/RenderListFieldRawContent';
import { useJWTAuthActions } from 'src/@crema/services/auth/jwt-auth/JWTAuthProvider';
import { TABLE_ACTION } from 'src/shared/constants/TableAction';
import ConfirmInfo from 'src/pageComponents/AdminUser/ConfirmInfo';
import Link from 'src/@crema/component/Link';

const renderGender = (value) => {
  if (!value) return '';
  return GENDER_MAPPING?.[value];
};

export const TableRecord = ({
  initTable,
  apiUrl = API.SEARCH_RAW_DOCUMENT,
  routerName,
  organization_id,
}) => {
  const { messages } = useIntl();
  const navigate = useNavigate();
  const { checkPermissionAction } = useJWTAuthActions();

  const [rowData, setRowData] = useState(null);
  const [isDialogUploadOpen, setIsDialogUploadOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [extraColumns, setExtraColumns] = useState([]);
  const [actionDialog, setActionDialog] = useState('');
  const [rowsSelected, setRowsSelected] = useState([]);

  const onDeleteRecord = () => {
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
      action: onDeleteRecord,
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
    },
  };

  const columns = [
    {
      title: <IntlMessages id='table.documentType' />,
      dataIndex: 'document_template',
      width: 300,
      key: 'documentType',
      fixed: 'left',
      render: (record, row) => (
        <Link to={config.routes.detailRawDocument(row?.id)}>
          {record?.name}
        </Link>
      ),
    },
    {
      title: <IntlMessages id='table.documentNumber' />,
      dataIndex: 'raw_text',
      key: 'documentNumber',
      width: 150,
      render: (row) => {
        return (
          RenderFieldRawContent({
            rawText: row,
            field: KEY_DOCUMENT_NUMBER,
          }) ||
          RenderFieldRawContent({
            rawText: row,
            field: FIELD_MAP.SO_QUYET_DINH,
          }) ||
          RenderFieldRawContent({
            rawText: row,
            field: FIELD_MAP.SO_GIAY_CHUNG_NHAN,
          })
        );
      },
    },
    {
      title: <IntlMessages id='table.document.publishDate' />,
      dataIndex: 'raw_text',
      width: 150,
      key: 'publish_date',
      render: (record) => (
        <RenderFieldRawContent
          rawText={record}
          field={FIELD_MAP.NGAY_QUYET_DINH}
        />
      ),
    },
    {
      title: <IntlMessages id={'table.documentGrantingAgency'} />,
      dataIndex: 'document_template',
      width: 200,
      key: 'documentGrantingAgency',
      render: (record) => record?.organization?.display_name,
    },
    {
      title: <IntlMessages id='table.citizenFullName' />,
      dataIndex: 'raw_document_objects',
      width: 200,
      key: 'citizenFullName',
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
      dataIndex: 'raw_document_objects',
      width: 150,
      key: 'gender',
      render: (row) => (
        <RenderListFieldRawContent
          data={row}
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
      key: 'state',
      render: (record) => (
        <RenderStatusTag value={record} statusType={'RAW_DOCUMENT'} />
      ),
    },
    {
      title: 'Người đăng tải',
      dataIndex: 'created_user',
      width: 200,
      key: 'created_user',
      render: (record) => <RenderNameUser user={record} />,
    },
    {
      title: <IntlMessages id='table.rawDocumentCreatedAt' />,
      dataIndex: 'created_at',
      width: 200,
      key: 'created_at',
      align: 'center',
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
      key: item?.key,
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
        body: {
          filters: organization_id
            ? [
                {
                  name: 'organization_id',
                  value: organization_id,
                  operation: FILTER_OPERATION.EQ,
                },
              ]
            : [],
        },
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

  return (
    <>
      <DataTable
        scroll={{ x: '100%' }}
        initTable={initTable}
        filters={filters}
        onQuery={onSubmitFilter}
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
              setIsDialogUploadOpen(true);
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
    </>
  );
};
