import React, { useState } from 'react';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import { useIntl } from 'react-intl';
import DataTable from 'src/@crema/core/DataTable';
import API from 'src/@crema/services/apis';
import { KEY_ACTION_COLUMN } from 'src/shared/constants/DataTable';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import RenderContentHTML from 'src/@crema/component/TableRender/RenderContentHTML';
import Icon, { PlusOutlined } from '@ant-design/icons';
import { AcEditIcon, AcTrashIcon } from 'src/assets/icon/action';
import { ITEM_PERMISSIONS } from 'src/shared/constants/Permission';
import FormRowDataTable from 'src/@crema/component/FormRowDataTable';
import { FORM_TYPES } from 'src/shared/constants/FormDataTable';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import DialogConfirm from 'src/@crema/component/DialogConfirm';
import ConfirmInfo from 'src/pageComponents/AdminUser/ConfirmInfo';
import AntButton from 'src/@crema/component/AntButton';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import { FormUsageGuideModal } from 'src/pageComponents/usageGuide/FormUsageGuideModal';
import { DEFAULT_PERMISSION_SELECT } from 'src/shared/constants/DataSelect';
import useFetch from 'src/@crema/hook/fetchData/useFetch';

const UsageGuideManagePage = () => {
  const { messages } = useIntl();
  const [rowData, setRowData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: dataAllPermission } = useFetch({
    url: API.GET_ALL_PERMISSIONS,
    method: METHOD_FETCH.GET,
  });

  const listPagePermission =
    DEFAULT_PERMISSION_SELECT(dataAllPermission?.result?.items) || [];

  const columns = [
    {
      title: <IntlMessages id='table.name' />,
      dataIndex: 'display_name',
      width: 200,
    },
    {
      title: <IntlMessages id='table.contentName' />,
      dataIndex: 'content',
      width: 300,
      render: (value) => (
        <RenderContentHTML
          style={{ width: 350 }}
          content={value}
          shortNumWord={70}
          isShowHTML
        />
      ),
    },
    {
      title: <IntlMessages id={'usage.page'} />,
      dataIndex: 'page_name',
      width: 180,
      render: (value) => {
        const findValue = (listPagePermission || []).find(
          (item) => item?.id === value,
        );

        return findValue?.label || value;
      },
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
      <AppPageMetadata title={messages['sidebar.list_usage']} />
      <DataTable
        url={API.SEARCH_USAGE}
        columns={columns}
        toolbars={[
          <AntButton
            key={ITEM_PERMISSIONS.ADD}
            type='primary'
            icon={<PlusOutlined />}
            onClick={() => {
              setRowData(null);
              setIsModalOpen(true);
            }}>
            {messages['table.toolbar.addNew']}
          </AntButton>,
        ]}>
        <FormRowDataTable
          key={`usage-${rowData?.id}`}
          visible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          formType={rowData ? FORM_TYPES.UPDATE : FORM_TYPES.ADD}
          method={rowData ? METHOD_FETCH.PUT : METHOD_FETCH.POST}
          resource={rowData ? API.UPDATE_USAGE(rowData?.id) : API.CREATE_USAGE}
          initialValues={rowData ? rowData : {}}>
          <FormUsageGuideModal />
        </FormRowDataTable>
        <DialogConfirm
          key={rowData?.id}
          visible={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          textTitle={'usage.formTitleDelete'}
          textSuccess={'usage.delete.success'}
          onSaveToServer={() =>
            instanceCoreApi.delete(API.DELETE_USAGE(rowData?.id))
          }>
          <ConfirmInfo
            message={'usage.formMessageDelete'}
            name={rowData?.display_name}
          />
        </DialogConfirm>
      </DataTable>
    </div>
  );
};

export default UsageGuideManagePage;
