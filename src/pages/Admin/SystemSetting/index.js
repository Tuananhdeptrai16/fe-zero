import { useIntl } from 'react-intl';
import React, { useState } from 'react';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata/index';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import DataTable from 'src/@crema/core/DataTable';
import { KEY_ACTION_COLUMN } from 'src/shared/constants/DataTable';
import FormRowDataTable from 'src/@crema/component/FormRowDataTable/index';
import { FORM_TYPES } from 'src/shared/constants/FormDataTable';
import API from 'src/@crema/services/apis/index';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import SystemSettingForm from 'src/pageComponents/SystemSetting/SystemSettingForm';
import AntButton from 'src/@crema/component/AntButton';
import Icon, { PlusOutlined } from '@ant-design/icons';
import DialogConfirm from 'src/@crema/component/DialogConfirm';
import { postDeleteSystemSetting } from 'src/@crema/services';
import { ITEM_PERMISSIONS } from 'src/shared/constants/Permission';
import { AcEditIcon, AcTrashIcon } from 'src/assets/icon/action';
import { convertToObject, convertToString } from 'src/shared/utils/filter';
import { INPUT_TYPE_LABEL } from 'src/shared/constants/InputType';
const SystemSetting = () => {
  const { messages } = useIntl();
  const [isModalConfirmOpen, setModalConfirmOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowData, setRowData] = useState(null);

  //* Column
  const columns = [
    {
      title: <IntlMessages id='table.name' />,
      dataIndex: 'description',
      key: 'description',
      width: 400,
      fixed: 'left',
    },
    {
      title: <IntlMessages id='table.systemSettingType' />,
      dataIndex: 'type',
      key: 'type',
      width: 150,
      render: (type) => INPUT_TYPE_LABEL[type],
    },
    {
      title: <IntlMessages id='table.systemSettingName' />,
      dataIndex: 'name',
      width: 250,
      key: 'name',
    },
    {
      title: <IntlMessages id='table.systemSettingValue' />,
      dataIndex: 'value',
      width: 350,
      key: 'value',
    },
    {
      key: KEY_ACTION_COLUMN,
      actions: [
        {
          label: 'table.action.edit',
          actionName: ITEM_PERMISSIONS.UPDATE,
          icon: <Icon component={AcEditIcon} />,
          onClick: (data) => {
            setRowData({ ...data, value: convertToObject(data?.value) });
            setIsModalOpen(true);
          },
        },
        {
          label: 'table.action.delete',
          actionName: ITEM_PERMISSIONS.DELETE,
          icon: <Icon component={AcTrashIcon} />,
          onClick: (data) => {
            setRowData(data);
            setModalConfirmOpen(true);
          },
        },
      ],
    },
  ];

  const preSaveData = (data) => {
    return { ...data, value: convertToString(data?.value) };
  };

  const deleteToServer = () => {
    return postDeleteSystemSetting(rowData?.id);
  };

  return (
    <>
      <AppPageMetadata title={messages['sidebar.accountGroupList']} />
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
            {messages['table.toolbar.addNew']}
          </AntButton>,
        ]}
        isShowSearch={false}
        filters={[]}
        url={API.GET_LIST_SYSTEM_SETTING}
        columns={columns}>
        <FormRowDataTable
          visible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          formType={rowData?.id ? FORM_TYPES.UPDATE : FORM_TYPES.ADD}
          method={rowData?.id ? METHOD_FETCH.PUT : METHOD_FETCH.POST}
          preSaveData={preSaveData}
          resource={
            rowData?.id
              ? `${API.UPDATE_SYSTEM_SETTING}/${rowData?.id}`
              : API.CREATE_SYSTEM_SETTING
          }
          initialValues={rowData}>
          <SystemSettingForm isEdit={!!rowData?.id} />
        </FormRowDataTable>
        <DialogConfirm
          key={rowData?.id}
          visible={isModalConfirmOpen}
          onClose={() => setModalConfirmOpen(false)}
          textTitle={'confirm.deleteSettingSystem'}
          textSuccess={'confirm.deleteSettingSystemSuccess'}
          onSaveToServer={deleteToServer}>
          <p>
            <IntlMessages id='confirm.deleteSettingSystemSure' />
            <span className='warning-text-color'>{rowData?.name}</span>
          </p>
        </DialogConfirm>
      </DataTable>
    </>
  );
};

export default SystemSetting;
