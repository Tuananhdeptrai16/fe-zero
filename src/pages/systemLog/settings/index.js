import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import DataTable from 'src/@crema/core/DataTable';
import API from 'src/@crema/services/apis';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import { PoweroffOutlined } from '@ant-design/icons';
import { KEY_ACTION_COLUMN } from 'src/shared/constants/DataTable';
import { MdOutlineHideSource } from 'react-icons/md';
import DialogConfirm from 'src/@crema/component/DialogConfirm';
import { TABLE_ACTION } from 'src/shared/constants/TableAction';
import ConfirmInfo from 'src/pageComponents/AdminUser/ConfirmInfo';
import { updateStatusLog } from 'src/@crema/services/logs.service';

const SettingLogPage = () => {
  const { messages } = useIntl();
  const [rowData, setRowData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [actionDialog, setActionDialog] = useState('');

  const actionContent = {
    [TABLE_ACTION.ACTIVATE]: {
      title: 'confirm.turnOnLogSetting',
      success: 'confirm.turnOnLogSettingSuccess',
      children: (
        <ConfirmInfo
          message='confirm.turnOnLogSettingSure'
          name={rowData?.name}
        />
      ),
      preSaveData: () => {
        return {
          id: rowData?.id,
          active: true,
        };
      },
      action: updateStatusLog,
    },
    [TABLE_ACTION.DEACTIVATE]: {
      title: 'confirm.turnOffLogSetting',
      success: 'confirm.turnOffLogSettingSuccess',
      children: (
        <ConfirmInfo
          message='confirm.turnOffLogSettingSure'
          name={rowData?.name}
        />
      ),
      preSaveData: () => {
        return {
          id: rowData?.id,
          active: false,
        };
      },
      action: updateStatusLog,
    },
  };

  const columns = [
    {
      title: 'Code',
      dataIndex: 'code',
      width: 200,
    },
    {
      title: <IntlMessages id='table.logName' />,
      dataIndex: 'name',
      width: 200,
    },

    {
      title: <IntlMessages id={'table.status'} />,
      dataIndex: 'active',
      width: 200,
      render: (isActive) => (isActive ? 'Mở' : 'Tắt'),
    },
    {
      key: KEY_ACTION_COLUMN,
      actions: [
        {
          label: 'common.turnOff',
          icon: <PoweroffOutlined />,
          visible: (data) => data?.active,
          onClick: (data) => {
            setRowData(data);
            setIsDialogOpen(true);
            setActionDialog(TABLE_ACTION.DEACTIVATE);
          },
        },
        {
          label: 'common.turnOn',
          icon: <MdOutlineHideSource />,
          visible: (data) => !data?.active,
          onClick: (data) => {
            setRowData(data);
            setIsDialogOpen(true);
            setActionDialog(TABLE_ACTION.ACTIVATE);
          },
        },
      ],
    },
  ];

  return (
    <>
      <AppPageMetadata title={messages['sidebar.setting_log']} />
      <DataTable url={API.SEARCH_SETTING_LOG} columns={columns}>
        <DialogConfirm
          key={`action-${rowData?.id}`}
          visible={isDialogOpen}
          textTitle={actionContent[actionDialog]?.title || ''}
          onClose={() => setIsDialogOpen(false)}
          textSuccess={actionContent[actionDialog]?.success || ''}
          preSaveData={actionContent[actionDialog]?.preSaveData}
          onSaveToServer={actionContent[actionDialog]?.action}>
          {actionContent[actionDialog]?.children || <div>hello</div>}
        </DialogConfirm>
      </DataTable>
    </>
  );
};

export default SettingLogPage;
