import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import AntButton from 'src/@crema/component/AntButton';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import DataTable from 'src/@crema/core/DataTable';
import { ITEM_PERMISSIONS } from 'src/shared/constants/Permission';
import Icon, { PlusOutlined } from '@ant-design/icons';
import { AcEditIcon, AcTrashIcon } from 'src/assets/icon/action';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import API from 'src/@crema/services/apis/index';
import { KEY_ACTION_COLUMN } from 'src/shared/constants/DataTable';
import FormRowDataTable from 'src/@crema/component/FormRowDataTable';
import { FORM_TYPES } from 'src/shared/constants/FormDataTable';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import { FormDocumentTypeModal } from 'src/pageComponents/documentType';
import DialogConfirm from 'src/@crema/component/DialogConfirm';
import { deleteDocumentType } from 'src/@crema/services/documentType.service';
import RenderGroupType from 'src/@crema/component/TableRender/RenderGroupType';

const DocumentTypeManagement = () => {
  const { messages } = useIntl();
  const [rowData, setRowData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    {
      title: <IntlMessages id='table.documentTypeCode' />,
      dataIndex: 'name',
      width: 200,
      fixed: 'left',
    },
    {
      title: <IntlMessages id='table.documentTypeName' />,
      dataIndex: 'display_name',
      width: 200,
    },
    {
      title: <IntlMessages id='table.documentType' />,
      dataIndex: 'group_type',
      width: 200,
      render: (value) => <RenderGroupType value={value} />,
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
      <AppPageMetadata title={messages['sidebar.documentType']} />
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
        url={API.SEARCH_DOCUMENT_TYPE}
        columns={columns}>
        <FormRowDataTable
          key={`docT-${rowData?.id}`}
          visible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          formType={rowData ? FORM_TYPES.UPDATE : FORM_TYPES.ADD}
          method={rowData ? METHOD_FETCH.PUT : METHOD_FETCH.POST}
          resource={
            rowData
              ? API.UPDATE_DOCUMENT_TYPE(rowData?.id)
              : API.CREATE_DOCUMENT_TYPE
          }
          initialValues={rowData ? rowData : {}}>
          <FormDocumentTypeModal />
        </FormRowDataTable>
        <DialogConfirm
          key={rowData?.id}
          visible={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          textTitle={'confirm.deleteDocumentType'}
          textSuccess={'confirm.deleteDocumentTypeSuccess'}
          onSaveToServer={() => deleteDocumentType(rowData?.id)}>
          <p>
            <IntlMessages id='confirm.deleteDocumentTypeSure' />
            <span className='warning-text-color'>{rowData?.name}</span>
          </p>
        </DialogConfirm>
      </DataTable>
    </>
  );
};
export default DocumentTypeManagement;
