import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import DataTable from 'src/@crema/core/DataTable';
import { Button } from 'antd';
import Icon, { PlusOutlined } from '@ant-design/icons';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import { KEY_ACTION_COLUMN } from 'src/shared/constants/DataTable';
import { AcEditIcon, AcEyeIcon, AcTrashIcon } from 'src/assets/icon/action';
import { ITEM_PERMISSIONS } from 'src/shared/constants/Permission';
import API from 'src/@crema/services/apis';
import FormRowDataTable from 'src/@crema/component/FormRowDataTable';
import { isEmpty } from 'lodash';
import { MODAL_SIZE } from 'src/shared/constants/Modal';
import { FORM_TYPES } from 'src/shared/constants/FormDataTable';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import DialogConfirm from 'src/@crema/component/DialogConfirm';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import FormAddOrEdit from './Components/FormAddOrEdit';
import FormDetailKPI from './Components/FormDetailKPI';

const SummaryKPI = ({ id }) => {
  const { messages } = useIntl();
  const [rowData, setRowData] = useState(null);
  const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState(false);
  const [isOpenFormExploitationData, setIsOpenFormExploitationData] =
    useState(false);
  const [isOpenFormDetail, setIsOpenFormDetail] = useState(false);

  return (
    <div>
      <DataTable
        syncURL={false}
        initTable={{
          body: {
            filters: [
              {
                name: 'criterion_types_id',
                value: id,
                operation: 'eq',
              },
            ],
          },
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
            {messages['table.action.add']}
          </Button>,
        ]}
        url={API.GET_LIST_KPI}
        columns={[
          {
            title: <IntlMessages id='table.criterionListName' />,
            dataIndex: 'criterion_group_name',
            width: 300,
            key: 'criterion_group_name',
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
                  setIsOpenFormExploitationData(true);
                },
              },
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
        {/* Add or Update */}
        <FormRowDataTable
          title={isEmpty(rowData) ? 'Thêm mới bộ KPI' : 'Chỉnh sửa bộ KPI'}
          buttonText={isEmpty(rowData) ? 'Tạo mới' : 'Cập nhật'}
          key={'summary_kpi'}
          size={MODAL_SIZE.MEDIUM}
          preSaveData={(data) => {
            return {
              ...data,
              criterion_types_id: id,
            };
          }}
          visible={isOpenFormExploitationData}
          onClose={() => setIsOpenFormExploitationData(false)}
          formType={isEmpty(rowData) ? FORM_TYPES.ADD : FORM_TYPES.UPDATE}
          method={isEmpty(rowData) ? METHOD_FETCH.POST : METHOD_FETCH.PUT}
          resource={
            isEmpty(rowData) ? API.CREATE_KPI : API.UPDATE_KPI(rowData.id)
          }
          isOpenFormExploitationData
          initialValues={isEmpty(rowData) ? {} : rowData}>
          <FormAddOrEdit rowData={rowData} id={id} />
        </FormRowDataTable>
        {/* Show detail */}
        <FormRowDataTable
          title={'Danh sách các chỉ tiêu'}
          key={'detail_data_criterion'}
          size={MODAL_SIZE.LARGE}
          preSaveData={(data) => {
            return data;
          }}
          visible={isOpenFormDetail}
          onClose={() => setIsOpenFormDetail(false)}
          formType={FORM_TYPES.INFO}
          isOpenFormDetail
          initialValues={isEmpty(rowData) ? {} : rowData}>
          <FormDetailKPI rowDataId={rowData?.id} />
        </FormRowDataTable>
        {/* Delete */}
        <DialogConfirm
          key={`delete-${rowData?.id}`}
          visible={isDialogDeleteOpen}
          onClose={() => setIsDialogDeleteOpen(false)}
          textTitle={'confirm.deleteSummaryKPI'}
          textSuccess={'confirm.deleteSummaryKPISuccess'}
          onSaveToServer={() =>
            instanceCoreApi.delete(API.DELETE_KPI(rowData?.id))
          }>
          <p>
            <IntlMessages id='confirm.deleteSummaryKPISure' />
            <span className='warning-text-color'>
              {rowData?.criterion_group_name}
            </span>
          </p>
        </DialogConfirm>
      </DataTable>
    </div>
  );
};

export default SummaryKPI;
