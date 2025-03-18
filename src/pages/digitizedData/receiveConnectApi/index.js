import React, { useState } from 'react';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import { useIntl } from 'react-intl';
import DataTable from 'src/@crema/core/DataTable';
import API from 'src/@crema/services/apis';
import AntButton from 'src/@crema/component/AntButton';
import { ITEM_PERMISSIONS } from 'src/shared/constants/Permission';
import Icon, { PlusOutlined } from '@ant-design/icons';
import FormRowDataTable from 'src/@crema/component/FormRowDataTable';
import { FORM_TYPES } from 'src/shared/constants/FormDataTable';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import DialogConfirm from 'src/@crema/component/DialogConfirm';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import { KEY_ACTION_COLUMN } from 'src/shared/constants/DataTable';
import { AcEditIcon, AcTrashIcon } from 'src/assets/icon/action';
import { deleteReceiveConnectApi } from 'src/@crema/services/digitizedData.service';
import { FormConnectApiModal } from 'src/pageComponents/digitizedData/FormConnectApiModal';
import Link from 'src/@crema/component/Link';
import config from 'src/config';

const ReceiveConnectApiPage = () => {
  const { messages } = useIntl();
  const [rowData, setRowData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    {
      title: <IntlMessages id='table.displayName' />,
      dataIndex: 'name',
      width: 200,
      fixed: 'left',
      render: (name, record) => {
        return (
          <Link to={config.routes.receiveConnectApiDetail(record?.id)}>
            {name}
          </Link>
        );
      },
    },
    {
      title: <IntlMessages id='table.clientSecret' />,
      dataIndex: 'client_secret',
      width: 200,
    },
    {
      title: (
        <IntlMessages id='sidebar.receive_data_to_digitization_platform' />
      ),
      dataIndex: 'receive_data_to_digitization_platform',
      width: 260,
      render: (_, record) => {
        return (
          <Link to={config.routes.receiveConnectApiDetail(record?.id)}>
            {messages['table.viewDetail']}
          </Link>
        );
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
    <>
      <AppPageMetadata title={messages['sidebar.push_connect_api']} />
      <DataTable
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
        ]}
        url={API.SEARCH_API_RECEIVE}
        columns={columns}>
        <FormRowDataTable
          key={`docT-${rowData?.id}`}
          visible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          formType={rowData ? FORM_TYPES.UPDATE : FORM_TYPES.ADD}
          method={rowData ? METHOD_FETCH.PUT : METHOD_FETCH.POST}
          resource={
            rowData
              ? API.UPDATE_API_RECEIVE(rowData?.id)
              : API.CREATE_API_RECEIVE
          }
          initialValues={rowData ? rowData : {}}>
          <FormConnectApiModal />
        </FormRowDataTable>
        <DialogConfirm
          key={rowData?.id}
          visible={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          textTitle={'confirm.deleteDocumentType'}
          textSuccess={'confirm.deleteDocumentTypeSuccess'}
          onSaveToServer={() => deleteReceiveConnectApi(rowData?.id)}>
          <p>
            <IntlMessages id='confirm.deleteDocumentTypeSure' />
            <span className='warning-text-color'>{rowData?.name}</span>
          </p>
        </DialogConfirm>
      </DataTable>
    </>
  );
};

export default ReceiveConnectApiPage;
