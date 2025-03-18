import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import DataTable from 'src/@crema/core/DataTable';
import { Button } from 'antd';
import Icon, { PlusOutlined, HistoryOutlined } from '@ant-design/icons';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import { KEY_ACTION_COLUMN } from 'src/shared/constants/DataTable';
import { AcEditIcon, AcEyeIcon, AcTrashIcon } from 'src/assets/icon/action';
import DialogConfirm from 'src/@crema/component/DialogConfirm';
import { ITEM_PERMISSIONS } from 'src/shared/constants/Permission';
import FormRowDataTable from 'src/@crema/component/FormRowDataTable';
import { MODAL_SIZE } from 'src/shared/constants/Modal';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import { FORM_TYPES } from 'src/shared/constants/FormDataTable';
import { isEmpty } from 'src/shared/utils/Typeof';
import { formatDateJs } from 'src/shared/utils/DateTime';
import { truncate } from 'lodash';
import {
  deleteDataServiceApi,
  updateStatusDataServiceApi,
} from 'src/@crema/services/dataService.service';
import FormAddOrUpdate from './FormAddOrUpdate';
import { DATA_SERVICE_API } from 'src/@crema/services/apis';
import AntSwitch from 'src/@crema/component/AntSwitch';
import { SQL_DATE } from 'src/shared/constants/Format';
import FormShowHistory from './FormShowHistory';
import FormShowDetail from './FormShowDetail';
import { useJWTAuthActions } from 'src/@crema/services/auth/jwt-auth/JWTAuthProvider';

const DataService = ({ category, pageName }) => {
  const { messages } = useIntl();
  const [data, setData] = useState(null);
  const [rowData, setRowData] = useState(null);
  const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState(false);
  const [isDialogDisableOpen, setIsDialogDisableOpen] = useState(false);
  const [isDialogActiveOpen, setIsDialogActiveOpen] = useState(false);
  const [isOpenFormExploitationData, setIsOpenFormExploitationData] =
    useState(false);
  const [isOpenFormHistory, setIsOpenFormHistory] = useState(false);
  const [isOpenFormDetail, setIsOpenFormDetail] = useState(false);
  const { checkPermissionAction } = useJWTAuthActions();

  const isPermissionUpdate = checkPermissionAction(
    pageName,
    ITEM_PERMISSIONS.UPDATE,
  );

  const onChangeSwitchUser = async (checked) => {
    if (checked) {
      setIsDialogActiveOpen(true);
    } else {
      setIsDialogDisableOpen(true);
    }
  };

  return (
    <>
      <DataTable
        isShowSearch={false}
        syncURL={false}
        initTable={{
          body: {},
          filter: !isEmpty(category)
            ? [
                {
                  name: 'category',
                  value: category,
                  operation: 'eq',
                },
              ]
            : [],
        }}
        rowKey={'id'}
        toolbars={[
          <Button
            key={ITEM_PERMISSIONS.ADD}
            type='primary'
            icon={<PlusOutlined />}
            onClick={() => {
              setRowData(null);
              setIsOpenFormExploitationData(true);
            }}>
            {messages['table.toolbar.addPermissionAccess']}
          </Button>,
        ]}
        url={DATA_SERVICE_API.GET_DATA_SERVICE}
        columns={[
          {
            title: <IntlMessages id={'table.dataServiceDisable'} />,
            dataIndex: 'active',
            width: 140,
            key: 'active',
            actionName: ITEM_PERMISSIONS.UPDATE,
            render: (active, data) => {
              return (
                <AntSwitch
                  disabled={!isPermissionUpdate}
                  value={active}
                  checkedChildren='Cho phép'
                  unCheckedChildren='Vô hiệu hóa'
                  onChange={(checked) => {
                    onChangeSwitchUser(checked);
                    setData(data);
                  }}
                />
              );
            },
          },
          {
            title: <IntlMessages id='table.dataServiceName' />,
            dataIndex: 'name',
            width: 140,
            key: 'name',
          },
          {
            title: <IntlMessages id='table.dataServiceDes' />,
            dataIndex: 'description',
            width: 140,
            key: 'description',
          },
          {
            title: <IntlMessages id='table.dataServiceClientId' />,
            dataIndex: 'client_id',
            width: 140,
            key: 'client_id',
          },
          {
            title: <IntlMessages id='table.dataServiceCode' />,
            dataIndex: 'token',
            width: 140,
            key: 'token',
            render: (record) =>
              truncate(record, { length: 30, omission: '...' }),
          },
          {
            title: <IntlMessages id='table.dataServiceCreatedAt' />,
            dataIndex: 'created_at',
            width: 150,
            key: 'created_at',
            align: 'center',
            render: (record) => formatDateJs(record),
          },
          {
            title: <IntlMessages id='table.dataServiceExpireAt' />,
            dataIndex: 'expired_time',
            width: 140,
            key: 'expired_time',
            align: 'center',
            render: (record, data) =>
              data?.type === 'public' ? record : 'Không có',
          },
          {
            key: KEY_ACTION_COLUMN,
            actions: [
              {
                label: 'table.action.detail',
                actionName: ITEM_PERMISSIONS.VIEW,
                icon: <Icon component={AcEyeIcon} />,
                onClick: (data) => {
                  setRowData(data);
                  setIsOpenFormDetail(true);
                },
              },
              {
                label: 'table.action.history',
                actionName: ITEM_PERMISSIONS.VIEW,
                icon: <Icon component={HistoryOutlined} />,
                onClick: (data) => {
                  setRowData(data);
                  setIsOpenFormHistory(true);
                },
              },
              {
                label: 'table.action.edit',
                actionName: ITEM_PERMISSIONS.UPDATE,
                icon: <Icon component={AcEditIcon} />,
                onClick: (data) => {
                  setRowData(data);
                  setIsOpenFormExploitationData(true);
                },
              },
              {
                label: 'table.action.delete',
                actionName: ITEM_PERMISSIONS.DELETE,
                icon: <Icon component={AcTrashIcon} />,
                onClick: (data) => {
                  setRowData(data);
                  setIsDialogDeleteOpen(true);
                },
              },
            ],
          },
        ]}>
        {/* Active */}
        <DialogConfirm
          key={`active-${data?.client_id}`}
          visible={isDialogActiveOpen}
          onClose={() => setIsDialogActiveOpen(false)}
          textTitle={'confirm.activeKeyApi'}
          textSuccess={'confirm.activeKeyApiSuccess'}
          onSaveToServer={() =>
            updateStatusDataServiceApi(data?.id, { active: true })
          }>
          <p>
            <IntlMessages id='confirm.activeKeyApiSure' />
            <span className='warning-text-color'>{data?.name}</span>
          </p>
        </DialogConfirm>
        {/* Disable */}
        <DialogConfirm
          key={`disable-${data?.client_id}`}
          visible={isDialogDisableOpen}
          onClose={() => setIsDialogDisableOpen(false)}
          textTitle={'confirm.disableKeyApi'}
          textSuccess={'confirm.disableKeyApiSuccess'}
          onSaveToServer={() =>
            updateStatusDataServiceApi(data?.id, { active: false })
          }>
          <p>
            <IntlMessages id='confirm.disableKeyApiSure' />
            <span className='warning-text-color'>{data?.name}</span>
          </p>
        </DialogConfirm>
        {/* Add or Update */}
        <FormRowDataTable
          title={
            isEmpty(rowData)
              ? 'Thêm quyền truy cập'
              : 'Chỉnh sửa cấu hình quyền truy cập'
          }
          buttonText={isEmpty(rowData) ? 'Tạo mới' : 'Cập nhật'}
          key={'exploitation_data_api_share'}
          size={MODAL_SIZE.MEDIUM}
          preSaveData={(data) => {
            if (isEmpty(rowData)) {
              const newData = {
                ...data,
                expired_time: formatDateJs(data.expired_time, SQL_DATE),
                category: category,
              };
              return newData;
            } else {
              if (data.type === 'public') {
                const updateDataPublic = {
                  name: data.name,
                  client_id: data.client_id,
                  type: data.type,
                  expired_time: formatDateJs(data.expired_time, SQL_DATE),
                  description: data.description ? data.description : '',
                  category: category,
                };
                return updateDataPublic;
              } else {
                const updateDataPrivate = {
                  name: data.name,
                  client_id: data.client_id,
                  type: data.type,
                  description: data.description ? data.description : '',
                  category: category,
                };
                return updateDataPrivate;
              }
            }
          }}
          visible={isOpenFormExploitationData}
          onClose={() => setIsOpenFormExploitationData(false)}
          formType={isEmpty(rowData) ? FORM_TYPES.ADD : FORM_TYPES.UPDATE}
          method={isEmpty(rowData) ? METHOD_FETCH.POST : METHOD_FETCH.PUT}
          resource={
            isEmpty(rowData)
              ? DATA_SERVICE_API.CREATE_DATA_SERVICE
              : DATA_SERVICE_API.UPDATE_DATA_SERVICE(rowData.id)
          }
          isOpenFormExploitationData
          initialValues={isEmpty(rowData) ? {} : rowData}>
          <FormAddOrUpdate rowData={rowData} />
        </FormRowDataTable>
        {/* Show detail */}
        <FormRowDataTable
          title={'Thông tin truy cập'}
          key={'detail_data_api_share'}
          size={MODAL_SIZE.MEDIUM}
          preSaveData={(data) => {
            return data;
          }}
          visible={isOpenFormDetail}
          onClose={() => setIsOpenFormDetail(false)}
          formType={FORM_TYPES.INFO}
          isOpenFormDetail
          initialValues={isEmpty(rowData) ? {} : rowData}>
          <FormShowDetail rowData={rowData} />
        </FormRowDataTable>
        {/* Show history */}
        <FormRowDataTable
          title={'Lịch sử'}
          key={rowData && `history_data_service_${rowData?.id}`}
          size={MODAL_SIZE.XLARGE}
          preSaveData={(data) => {
            return data;
          }}
          visible={isOpenFormHistory}
          onClose={() => setIsOpenFormHistory(false)}
          formType={FORM_TYPES.RETRIEVE_API}
          method={METHOD_FETCH.POST}
          resource={DATA_SERVICE_API.GET_HISTORY_DATA_SERVICE}
          isOpenFormHistory
          initialValues={isEmpty(rowData) ? {} : rowData}>
          <FormShowHistory rowData={rowData} category={category} />
        </FormRowDataTable>
        {/* Delete */}
        <DialogConfirm
          key={`delete-${rowData?.client_id}`}
          visible={isDialogDeleteOpen}
          onClose={() => setIsDialogDeleteOpen(false)}
          textTitle={'confirm.deleteDataService'}
          textSuccess={'confirm.deleteDataServiceSuccess'}
          onSaveToServer={() => deleteDataServiceApi(rowData?.id)}>
          <p>
            <IntlMessages id='confirm.deleteDataServiceSure' />
            <span className='warning-text-color'>{rowData?.name}</span>
          </p>
        </DialogConfirm>
      </DataTable>
    </>
  );
};

export default DataService;
