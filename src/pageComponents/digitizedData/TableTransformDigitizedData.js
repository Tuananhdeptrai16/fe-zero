import React, { useState } from 'react';
import DataTable from 'src/@crema/core/DataTable';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import AntButton from 'src/@crema/component/AntButton';
import { ITEM_PERMISSIONS } from 'src/shared/constants/Permission';
import Icon, { ApiOutlined, PlusOutlined } from '@ant-design/icons';
import { KEY_ACTION_COLUMN } from 'src/shared/constants/DataTable';
import {
  AcDeactivateIcon,
  AcEditIcon,
  AcTrashIcon,
} from 'src/assets/icon/action';
import { Typography } from 'antd';
import { useIntl } from 'react-intl';
import DialogConfirm from 'src/@crema/component/DialogConfirm';
import { TABLE_ACTION } from 'src/shared/constants/TableAction';

const STATUS_MAPPING = {
  active: <IntlMessages id='digitizedData.status.active' />,
  deactive: <IntlMessages id='digitizedData.status.inactive' />,
};
export const TableTransformDigitizedData = ({
  initTable,
  titleTable,
  actionContent,
  rowData,
  setRowData,
  apiUrl,
}) => {
  const { messages } = useIntl();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [actionDialog, setActionDialog] = useState('');
  const columns = [
    {
      title: <IntlMessages id='table.name' />,
      dataIndex: 'name',
      width: 200,
      fixed: 'left',
    },
    {
      title: <IntlMessages id='table.url' />,
      dataIndex: 'url',
      width: 400,
    },
    {
      title: <IntlMessages id='table.method' />,
      dataIndex: 'method',
      width: 120,
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
          icon: <ApiOutlined style={{ color: '#000000' }} />,
          visible: (data) => data?.status === 'active',
          onClick: (data) => {
            setRowData(data);
            setIsDialogOpen(true);
            setActionDialog(TABLE_ACTION.DEACTIVATE);
          },
        },
        {
          label: 'digitizedData.activate',
          icon: <Icon component={AcDeactivateIcon} />,
          visible: (data) => data?.status === 'deactive',
          onClick: (data) => {
            setRowData(data);
            setIsDialogOpen(true);
            setActionDialog(TABLE_ACTION.ACTIVATE);
          },
        },
        {
          label: 'table.action.edit',
          actionName: ITEM_PERMISSIONS.UPDATE,
          icon: <Icon component={AcEditIcon} />,
          onClick: (data) => {
            setRowData(data);
            setIsDialogOpen(true);
            setActionDialog(TABLE_ACTION.UPDATE);
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

  return (
    <div>
      <Typography.Title level={3}>{titleTable}</Typography.Title>
      <DataTable
        toolbars={[
          <AntButton
            key={ITEM_PERMISSIONS.ADD + 2}
            type='primary'
            icon={<PlusOutlined />}
            onClick={() => {
              setRowData(null);
              setIsDialogOpen(true);
              setActionDialog(TABLE_ACTION.CREATE);
            }}>
            {messages['table.toolbar.addNew']}
          </AntButton>,
        ]}
        initTable={initTable}
        url={apiUrl}
        columns={columns}>
        <DialogConfirm
          key={`${actionDialog}-${rowData?.id}`}
          visible={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          afterClose={() => setRowData(null)}
          initialValues={actionContent[actionDialog]?.initialValues}
          textTitle={actionContent[actionDialog]?.title || ''}
          textSuccess={actionContent[actionDialog]?.success}
          textButtonConfirm={actionContent[actionDialog]?.textButtonConfirm}
          preSaveData={actionContent[actionDialog]?.preSaveData}
          onSaveToServer={actionContent[actionDialog]?.action}>
          {actionContent[actionDialog]?.children || <></>}
        </DialogConfirm>
      </DataTable>
    </div>
  );
};
