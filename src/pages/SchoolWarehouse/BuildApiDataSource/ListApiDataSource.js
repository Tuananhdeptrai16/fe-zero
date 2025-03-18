import {
  IssuesCloseOutlined,
  PlusOutlined,
  SlackOutlined,
} from '@ant-design/icons';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import AntButton from 'src/@crema/component/AntButton';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import DataTable from 'src/@crema/core/DataTable';
import API from 'src/@crema/services/apis';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import { KEY_ACTION_COLUMN } from 'src/shared/constants/DataTable';
import { ITEM_PERMISSIONS } from 'src/shared/constants/Permission';
import Icon from '@ant-design/icons';
import { AcEditIcon, AcTrashIcon } from 'src/assets/icon/action';
import DialogConfirm from 'src/@crema/component/DialogConfirm';
import { MODAL_SIZE } from 'src/shared/constants/Modal';
import { FORM_TYPES } from 'src/shared/constants/FormDataTable';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import FormRowDataTable from 'src/@crema/component/FormRowDataTable';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import { RenderDate } from 'src/@crema/component/TableRender';
import { parse, stringify } from 'src/shared/utils/String';
import { ACTION_DIALOG_BUILDER_API } from 'src/shared/constants/DataFixed';
import useCallApi from 'src/@crema/hook/useCallApi';
import { Spin } from 'antd';
import FormConnectorBuilder from 'src/pages/SchoolWarehouse/BuildApiDataSource/FormCreateUpdateApi/FormConnectorBuilder';
import { STREAMS } from 'src/pages/SchoolWarehouse/BuildApiDataSource/FormCreateUpdateApi/Stream/Streams';
import { get } from 'lodash';
import {
  FIELD_NAME_PROPERTIES,
  FIELD_NAME_REQUIRED,
} from 'src/pages/SchoolWarehouse/BuildApiDataSource/FormCreateUpdateApi/UserInputs/UserInputs';
import { isEmpty } from 'src/shared/utils/Typeof';
import FormDeclaredSchema from 'src/pages/SchoolWarehouse/BuildApiDataSource/FormDeclaredSchema';
import notification from 'src/shared/utils/notification';

ListApiDataSource.propTypes = {};

function ListApiDataSource() {
  const { messages } = useIntl();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [actionDialog, setActionDialog] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [detailBuilderApi, setDetailBuilderApi] = useState({});
  const [testingValues, setTestingValues] = useState({});

  const builderProject = detailBuilderApi?.manifest?.builderProject || {};
  const declarativeManifest =
    detailBuilderApi?.manifest?.declarativeManifest || {};
  const manifest = declarativeManifest?.manifest || {};
  const spec = manifest?.spec || {};
  const currentVersionBuilder = declarativeManifest?.version;

  // get config test api loading: loadingConfigTestApi,
  const { loading: loadingHistoryConfig, send: getHistoryConfigTestApi } =
    useCallApi({
      success: (response) => {
        const result = response?.result || {};
        setTestingValues(parse(result)?.testingValues);
      },
      callApi: (id) => {
        return instanceCoreApi.get(API.GET_HISTORY_CONFIG_TESTING(id));
      },
    });
  // detail api
  const { loading: loadingDetailApi, send: getDetailApi } = useCallApi({
    success: (response) => {
      const result = response?.result || {};
      const manifest = parse(result?.manifest);
      setDetailBuilderApi({
        ...result,
        manifest,
      });
      if (!loadingHistoryConfig) {
        setIsDialogOpen(true);
      }
    },
    callApi: (id) => {
      return instanceCoreApi.post(API.DETAIL_API_BUILDER(id));
    },
  });

  const { loading: loadingDetailApiUpdate, send: getDetailApiUpdate } =
    useCallApi({
      success: (response) => {
        const result = response?.result || {};
        const manifest = parse(result?.manifest);
        setDetailBuilderApi({
          ...result,
          manifest,
        });
        setIsModalOpen(true);
      },
      callApi: (id) => {
        return instanceCoreApi.post(API.DETAIL_API_BUILDER(id));
      },
    });

  // content Dialog
  const CONTENT_DIALOG = {
    [ACTION_DIALOG_BUILDER_API.DELETE_API]: {
      title: 'confirm.deleteSourceDataApi',
      success: 'confirm.deleteSourceDataApiSuccess',
      children: (
        <>
          <p>
            <IntlMessages id='confirm.deleteSourceDataApiTextWarning' />
            <span className='warning-text-color'>{rowData?.builder_name}</span>
          </p>
        </>
      ),
      preSaveData: (data) => {
        return data;
      },
      action: () => {
        return instanceCoreApi.post(
          API.DELETE_API_BUILDER(rowData?.builder_project_id),
        );
      },
    },
    [ACTION_DIALOG_BUILDER_API.CHECK_API]: {
      size: MODAL_SIZE.XLARGE,
      title: 'Cập nhật lược đồ',
      success: 'Cập nhật lược đồ thành công',
      children: (
        <FormDeclaredSchema
          builderProjectId={builderProject?.builderProjectId}
          testingValues={testingValues}
        />
      ),
      textButtonConfirm: 'Cập nhật',
      onSuccess: () => {},
      preSaveData: (data) => {
        const streams = get(data, STREAMS) || {};
        const streamNames = Object.keys(streams);
        const schemaDefault = streamNames.reduce(
          (schemasCurrent, streamName) => {
            schemasCurrent[streamName] = {
              type: 'object',
              $schema: 'http://json-schema.org/draft-07/schema#',
              properties: {},
              additionalProperties: true,
            };
            return schemasCurrent;
          },
          {},
        );
        const schemaUpdate = {
          ...(manifest?.schemas || {}),
          ...(data.schemas || {}),
        };
        const isInvalidSchema =
          isEmpty(data.schemas) ||
          streamNames.some((streamName) => isEmpty(schemaUpdate[streamName]));
        return {
          ...manifest,
          metadata: {
            ...(manifest?.metadata || {}),
            ...(data?.metadata || {}),
          },
          schemas: isInvalidSchema
            ? {
                ...(manifest?.schemas || {}),
                ...schemaDefault,
              }
            : schemaUpdate,
        };
      },
      action: (data) => {
        const updateBuilderApi = {
          builder_project_id: builderProject?.builderProjectId,
          id: rowData?.id,
          builder_project: {
            name: dataEdit?.name,
            draft_manifest: stringify(data),
          },
        };
        return instanceCoreApi.post(API.UPDATE_API_BUILDER, updateBuilderApi);
      },
    },
    [ACTION_DIALOG_BUILDER_API.PUBLIC_API]: {
      title: 'sidebar.public_builder_api',
      success: 'sidebar.public_builder_api_success',
      children: isEmpty(currentVersionBuilder) ? (
        <>
          <p className='mb-0'>
            Bạn có chắn chắn muốn công khai API này không ?
          </p>
          <span style={{ color: 'red' }}>
            (API sau khi công khai không được phép xoá)
          </span>
        </>
      ) : (
        <>
          <p className='mb-0'>
            Bạn có chắn chắn muốn công khai API này{' '}
            <span style={{ color: 'red' }}>
              version {currentVersionBuilder + 1}
            </span>{' '}
            không ?
          </p>
        </>
      ),
      preSaveData: (data) => {
        return data;
      },
      action: () => {
        const streamNames = get(dataEdit, STREAMS) || {};
        const emptySchemaStream = Object.keys(streamNames).some((streamName) =>
          isEmpty(dataEdit.schemas?.[streamName]?.properties),
        );
        if (emptySchemaStream) {
          return new Promise(() => {
            throw new Error(
              'Cần cập nhật lược đồ cho các luồng trước khi công khai',
            );
          });
        }

        const specUpdate = {
          ...spec,
          connectionSpecification: spec?.connection_specification,
        };
        if (isEmpty(currentVersionBuilder)) {
          const declarativeManifestNew = {
            description: 'public builder version from cms',
            manifest: declarativeManifest.manifest,
            spec: specUpdate,
            version: 1,
          };
          return instanceCoreApi.post(API.PUBLIC_API_BUILDER, {
            builder_project_id: builderProject?.builderProjectId,
            initial_declarative_manifest: stringify(declarativeManifestNew),
          });
        } else {
          const declarativeManifestNew = {
            description: 'Update public builder version from cms',
            isDraft: false,
            manifest: declarativeManifest.manifest,
            spec: specUpdate,
            version: currentVersionBuilder + 1,
          };
          return instanceCoreApi.post(API.PUBLIC_API_BUILDER_NEW, {
            source_definition_id: builderProject.sourceDefinitionId,
            builder_project_id: builderProject?.builderProjectId,
            declarative_manifest: stringify(declarativeManifestNew),
            set_as_active_manifest: true,
          });
        }
      },
    },
  };

  const dataEdit = {
    ...(declarativeManifest?.manifest || {}),
    name: builderProject?.name,
  };

  return (
    <Spin spinning={loadingDetailApi || loadingDetailApiUpdate}>
      <AppPageMetadata title={messages['sidebar.building_api_data_sources']} />
      <DataTable
        toolbars={[
          <AntButton
            key={ITEM_PERMISSIONS.ADD}
            type='primary'
            icon={<PlusOutlined />}
            onClick={() => {
              setIsModalOpen(true);
              setRowData(null);
            }}>
            {messages['table.action.add']}
          </AntButton>,
        ]}
        initTable={{
          body: {
            filters: [],
          },
        }}
        syncURL={false}
        url={API.GET_LIST_API_BUILDER}
        rowKey={'builder_project_id'}
        columns={[
          {
            title: <IntlMessages id='table.api_source_name' />,
            dataIndex: 'builder_name',
            width: 200,
            key: 'builder_name',
          },
          {
            title: <IntlMessages id='table.creator' />,
            dataIndex: ['user_response', 'full_name'],
            key: 'user_response',
            width: 200,
          },
          {
            title: <IntlMessages id='table.dataServiceCreatedAt' />,
            dataIndex: 'created_at',
            key: 'created_at',
            align: 'center',
            width: 200,
            render: (_, record) => {
              return <RenderDate value={record?.created_at} />;
            },
          },
          {
            title: <IntlMessages id='common.status' />,
            dataIndex: 'is_draft',
            key: 'is_draft',
            width: 200,
            render: (data) => <span>{data ? `Bản nháp` : `Công khai`}</span>,
          },
          {
            key: KEY_ACTION_COLUMN,
            actions: [
              {
                label: 'table.action.edit',
                actionName: ITEM_PERMISSIONS.UPDATE,
                icon: <Icon component={AcEditIcon} />,
                onClick: (data) => {
                  setRowData(data);
                  getDetailApiUpdate(data?.builder_project_id);
                },
              },
              {
                label: 'table.action.delete',
                actionName: ITEM_PERMISSIONS.DELETE,
                icon: <Icon component={AcTrashIcon} />,
                visible: (data) => data?.is_draft,
                onClick: (data) => {
                  setActionDialog(ACTION_DIALOG_BUILDER_API.DELETE_API);
                  setRowData(data);
                  setIsDialogOpen(true);
                },
              },
              {
                label: 'Kiểm tra giá trị',
                actionName: ITEM_PERMISSIONS.UPDATE,
                icon: <IssuesCloseOutlined />,
                onClick: (data) => {
                  setRowData(data);
                  getHistoryConfigTestApi(data?.builder_project_id);
                  getDetailApi(data?.builder_project_id);
                  setActionDialog(ACTION_DIALOG_BUILDER_API.CHECK_API);
                },
              },
              {
                label: 'Công khai',
                actionName: ITEM_PERMISSIONS.UPDATE,
                icon: <SlackOutlined />,
                onClick: (data) => {
                  setRowData(data);
                  getDetailApi(data?.builder_project_id);
                  setActionDialog(ACTION_DIALOG_BUILDER_API.PUBLIC_API);
                },
              },
            ],
          },
        ]}>
        <FormRowDataTable
          title={
            rowData
              ? 'sidebar.update_builder_api'
              : 'sidebar.create_builder_api'
          }
          visible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          formType={rowData ? FORM_TYPES.UPDATE : FORM_TYPES.ADD}
          method={rowData ? METHOD_FETCH.POST : METHOD_FETCH.POST}
          resource={rowData ? API.UPDATE_API_BUILDER : API.CREATE_API_BUILDER}
          preSaveData={(data) => {
            const streams = get(data, STREAMS) || {};
            const streamNames = Object.keys(streams);
            const schemas = streamNames.reduce((schemasCurrent, streamName) => {
              schemasCurrent[streamName] = {
                type: 'object',
                $schema: 'http://json-schema.org/draft-07/schema#',
                properties: {},
                additionalProperties: true,
              };
              return schemasCurrent;
            }, {});
            const autoImportSchema = streamNames.reduce(
              (schemasCurrent, streamName) => {
                schemasCurrent[streamName] = true;
                return schemasCurrent;
              },
              {},
            );

            if (
              data?.definitions?.base_requester?.authenticator?.type ===
                'not_auth' ||
              isEmpty(data?.definitions?.base_requester?.authenticator)
            ) {
              delete data?.definitions?.base_requester?.authenticator;
            }

            if (isEmpty(streams)) {
              notification.error('Cần có ít nhất một luồng');
              return;
            }

            const draft_manifest = {
              version: '0.89.0',
              type: 'DeclarativeSource',
              check: {
                type: 'CheckStream',
                stream_names: streamNames,
              },
              definitions: data?.definitions || {},
              streams: streamNames.map((streamName) => ({
                $ref: `#/definitions/streams/${streamName}`,
              })),
              schemas: dataEdit?.schemas || schemas,
              spec: {
                type: 'Spec',
                connection_specification: {
                  additionalProperties: true,
                  type: 'object',
                  $schema: 'http://json-schema.org/draft-07/schema#',
                  required: get(data, FIELD_NAME_REQUIRED) || [],
                  properties: get(data, FIELD_NAME_PROPERTIES) || {},
                },
              },
              metadata: dataEdit?.metadata || {
                autoImportSchema: autoImportSchema,
              },
            };
            const createBuilderApi = {
              builder_project: {
                name: data?.name,
                draft_manifest: stringify(draft_manifest),
              },
            };
            const updateBuilderApi = {
              builder_project_id: rowData?.builder_project_id,
              id: rowData?.id,
              builder_project: {
                name: data?.name,
                draft_manifest: stringify(draft_manifest),
              },
            };
            if (rowData) {
              return updateBuilderApi;
            }
            return createBuilderApi;
          }}
          size={MODAL_SIZE.LARGE}
          initialValues={rowData ? dataEdit : {}}>
          <FormConnectorBuilder />
        </FormRowDataTable>

        <DialogConfirm
          key={`${actionDialog}-${rowData?.id}`}
          visible={isDialogOpen}
          onClose={() => {
            setIsDialogOpen(false);
          }}
          onSuccess={CONTENT_DIALOG[actionDialog]?.onSuccess}
          afterClose={() => setRowData(null)}
          initialValues={rowData ? dataEdit : {}}
          textTitle={CONTENT_DIALOG[actionDialog]?.title || ''}
          textSuccess={CONTENT_DIALOG[actionDialog]?.success}
          size={CONTENT_DIALOG[actionDialog]?.size || MODAL_SIZE.MEDIUM}
          textButtonConfirm={CONTENT_DIALOG[actionDialog]?.textButtonConfirm}
          disableBtnOk={CONTENT_DIALOG[actionDialog]?.disableBtnOk}
          preSaveData={CONTENT_DIALOG[actionDialog]?.preSaveData}
          onSaveToServer={CONTENT_DIALOG[actionDialog]?.action}>
          {CONTENT_DIALOG[actionDialog]?.children || <></>}
        </DialogConfirm>
      </DataTable>
    </Spin>
  );
}

export default ListApiDataSource;
