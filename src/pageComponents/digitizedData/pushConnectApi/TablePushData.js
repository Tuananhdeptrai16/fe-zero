import React, { useState } from 'react';
import DataTable from 'src/@crema/core/DataTable';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import AntButton from 'src/@crema/component/AntButton';
import { ITEM_PERMISSIONS } from 'src/shared/constants/Permission';
import Icon, { ApiOutlined, PlusOutlined } from '@ant-design/icons';
import {
  FILTER_OPERATION,
  KEY_ACTION_COLUMN,
} from 'src/shared/constants/DataTable';
import {
  AcDeactivateIcon,
  AcEditIcon,
  AcTrashIcon,
} from 'src/assets/icon/action';
import { Typography } from 'antd';
import { useIntl } from 'react-intl';
import FormRowDataTable from 'src/@crema/component/FormRowDataTable';
import { FORM_TYPES } from 'src/shared/constants/FormDataTable';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import API from 'src/@crema/services/apis';
import DialogConfirm from 'src/@crema/component/DialogConfirm';
import { deletePushData } from 'src/@crema/services/digitizedData.service';
import { FormConnectApiModal } from 'src/pageComponents/digitizedData/FormConnectApiModal';

const STATUS_MAPPING = {
  active: <IntlMessages id='digitizedData.status.active' />,
  deactive: <IntlMessages id='digitizedData.status.inactive' />,
};
export const TablePushData = ({ id }) => {
  const { messages } = useIntl();

  const [rowData, setRowData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    {
      title: <IntlMessages id='table.name' />,
      dataIndex: 'name',
      width: 200,
      fixed: 'left',
    },
    {
      title: <IntlMessages id='common.type' />,
      dataIndex: 'type',
      width: 200,
    },
    {
      title: <IntlMessages id='table.status' />,
      dataIndex: 'status',
      width: 200,
      render: (value) => STATUS_MAPPING[value],
    },
    {
      key: KEY_ACTION_COLUMN,
      actions: [
        {
          label: 'digitizedData.deactivate',
          icon: <Icon component={AcDeactivateIcon} />,
          visible: (data) => data?.status === 'active',
          onClick: (data) => {
            setRowData(data);
            setIsDialogOpen(true);
          },
        },
        {
          label: 'digitizedData.activate',
          icon: <ApiOutlined style={{ color: '#000000' }} />,
          visible: (data) => data?.status === 'deactive',
          onClick: (data) => {
            setRowData(data);
            setIsDialogOpen(true);
          },
        },
        {
          label: 'table.action.edit',
          actionName: ITEM_PERMISSIONS.UPDATE,
          icon: <Icon component={AcEditIcon} />,
          onClick: (data) => {
            setRowData(data);
            setIsModalOpen(true);
          },
        },
        {
          label: 'table.action.delete',
          actionName: ITEM_PERMISSIONS.DELETE,
          icon: <Icon component={AcTrashIcon} />,
          onClick: (data) => {
            setRowData(data);
            setIsDialogOpen(true);
          },
        },
      ],
    },
  ];

  return (
    <div>
      <Typography.Title level={3}>
        {messages['digitizedData.pushDataListTitle']}
      </Typography.Title>
      <DataTable
        toolbars={[
          <AntButton
            key={ITEM_PERMISSIONS.ADD + 2}
            type='primary'
            icon={<PlusOutlined />}
            onClick={() => {
              setRowData(null);
              setIsModalOpen(true);
            }}>
            {messages['table.toolbar.addNew']}
          </AntButton>,
        ]}
        initTable={{
          filters: [
            {
              name: 'push_connection_id',
              operation: FILTER_OPERATION.EQ,
              value: id,
            },
          ],
        }}
        url={API.SEARCH_PUSH_DATA}
        columns={columns}>
        <FormRowDataTable
          key={`pushData-${rowData?.id}`}
          visible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          formType={rowData ? FORM_TYPES.UPDATE : FORM_TYPES.ADD}
          method={rowData ? METHOD_FETCH.PUT : METHOD_FETCH.POST}
          resource={
            rowData ? API.UPDATE_PUSH_DATA(rowData?.id) : API.CREATE_PUSH_DATA
          }
          initialValues={rowData ?? {}}>
          <FormConnectApiModal />
        </FormRowDataTable>
        <DialogConfirm
          key={rowData?.id}
          visible={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          textTitle={'confirm.deleteDocumentType'}
          textSuccess={'confirm.deleteDocumentTypeSuccess'}
          onSaveToServer={() => deletePushData(rowData?.id)}>
          <p>
            <IntlMessages id='confirm.deleteDocumentTypeSure' />
            <span className='warning-text-color'>{rowData?.display_name}</span>
          </p>
        </DialogConfirm>
      </DataTable>
    </div>
  );
};
