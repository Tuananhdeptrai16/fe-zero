import { PlusOutlined } from '@ant-design/icons';
import Icon from '@ant-design/icons/lib/components/Icon';
import { Button } from 'antd';
import React, { useState } from 'react';
import useIntl from 'react-intl/lib/src/components/useIntl';
import DialogConfirm from 'src/@crema/component/DialogConfirm';
import FormRowDataTable from 'src/@crema/component/FormRowDataTable';
import { RenderDate } from 'src/@crema/component/TableRender';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import DataTable from 'src/@crema/core/DataTable';
import API from 'src/@crema/services/apis';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import { AcEditIcon, AcTrashIcon } from 'src/assets/icon/action';
import { KEY_ACTION_COLUMN } from 'src/shared/constants/DataTable';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import { FORM_TYPES } from 'src/shared/constants/FormDataTable';
import { MODAL_SIZE } from 'src/shared/constants/Modal';
import { ITEM_PERMISSIONS } from 'src/shared/constants/Permission';
import FormCriterionDetail from './Components/FormCriterionDetail';

const CriterionList = () => {
  const { messages } = useIntl();
  const [rowData, setRowData] = useState(null);
  const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalNewOpen, setIsModalNewOpen] = useState(false);
  const getTitleModal = () => {
    if (isModalEditOpen) return 'table.action.editCriterion';
    return 'table.action.addCriterion';
  };
  return (
    <>
      <AppPageMetadata title={messages['sidebar.list_criterion']} />
      <DataTable
        toolbars={[
          <Button
            key={ITEM_PERMISSIONS.ADD}
            type='primary'
            icon={<PlusOutlined />}
            onClick={() => {
              setIsModalNewOpen(true);
              setRowData(null);
            }}>
            {messages['table.toolbar.addNew']}
          </Button>,
        ]}
        url={API.GET_LIST_CRITERION}
        columns={[
          {
            title: <IntlMessages id='table.criterionName' />,
            dataIndex: 'criterion_name',
            width: 200,
            sorter: true,
            key: 'criterion_name',
          },
          {
            title: <IntlMessages id='table.criterionClassify' />,
            dataIndex: 'criterion_types_response',
            width: 200,
            sorter: true,
            key: 'criterion_types_response',
            render: (data) => {
              return data?.criterion_types_name;
            },
          },
          {
            title: <IntlMessages id='table.criterionUnit' />,
            dataIndex: 'unit',
            width: 200,
            key: 'unit',
          },
          {
            title: <IntlMessages id='table.creator' />,
            dataIndex: 'user_info_response',
            width: 200,
            key: 'user_info_response',
            render: (userInfo) =>
              `${userInfo.first_name} ${userInfo.last_name}`,
          },
          {
            title: <IntlMessages id='table.criterionUpdateAt' />,
            dataIndex: 'update_at',
            width: 200,
            key: 'update_at',
            align: 'center',
            render: (_, data) => (
              <RenderDate value={data?.update_at || data?.create_at} />
            ),
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
                  setIsModalEditOpen(true);
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
        <DialogConfirm
          key={`delete-${rowData?.destination_id}`}
          visible={isDialogDeleteOpen}
          onClose={() => setIsDialogDeleteOpen(false)}
          textTitle={'confirm.deleteCriterion'}
          textSuccess={'confirm.deleteCriterionSuccess'}
          onSaveToServer={() =>
            instanceCoreApi.delete(API.DELETE_CRITERION(rowData?.id))
          }>
          <p>
            <IntlMessages id='confirm.deleteCriterionSure' />
            <span className='warning-text-color'>
              {rowData?.criterion_name}
            </span>
          </p>
        </DialogConfirm>{' '}
        <FormRowDataTable
          key={rowData && `action-${rowData?.id}`}
          size={MODAL_SIZE.LARGE}
          visible={isModalNewOpen || isModalEditOpen}
          onClose={() => {
            setIsModalNewOpen(false);
            setIsModalEditOpen(false);
          }}
          formType={rowData ? FORM_TYPES.UPDATE : FORM_TYPES.ADD}
          method={rowData ? METHOD_FETCH.PUT : METHOD_FETCH.POST}
          resource={
            rowData ? API.UPDATE_CRITERION(rowData.id) : API.CREATE_CRITERION
          }
          title={getTitleModal()}
          initialValues={rowData ? rowData : {}}
          preSaveData={(data) => {
            return {
              ...data,
              description: data.description ? data.description : '',
            };
          }}>
          <FormCriterionDetail />
        </FormRowDataTable>
      </DataTable>
    </>
  );
};

export default CriterionList;
