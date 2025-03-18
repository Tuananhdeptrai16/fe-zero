import { useIntl } from 'react-intl';
import React, { useState } from 'react';
import Icon, { PlusOutlined } from '@ant-design/icons';
import DataTable from 'src/@crema/core/DataTable';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import { KEY_ACTION_COLUMN } from 'src/shared/constants/DataTable';
import { AcEditIcon, AcTrashIcon } from 'src/assets/icon/action/index';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata/index';
import AntButton from 'src/@crema/component/AntButton/index';
import { ITEM_PERMISSIONS } from 'src/shared/constants/Permission';
import API from 'src/@crema/services/apis/index';
import FormRowDataTable from 'src/@crema/component/FormRowDataTable/index';
import { FORM_TYPES } from 'src/shared/constants/FormDataTable';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import DialogConfirm from 'src/@crema/component/DialogConfirm/index';
import { RenderDate } from 'src/@crema/component/TableRender/index';
import Link from 'src/@crema/component/Link/index';
import { FormDocumentJudgmentModal } from 'src/pageComponents/documentJudgment/FormDocumentJudgmentModal';

const DocumentRelatedJudgment = () => {
  const { messages } = useIntl();
  const [rowData, setRowData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const deleteToServer = () => {
    //TODO delete
  };

  const preSaveData = (data) => {
    console.log(data);
    const { description, name, display_name } = data;
    return { description, name, display_name };
  };

  const preSaveUpdateData = (data) => {
    const preData = preSaveData(data);
    return { ...preData, id: rowData?.id };
  };

  const columns = [
    {
      title: <IntlMessages id='table.documentType' />,
      dataIndex: 'document_type',
      width: 200,
      fixed: 'left',
      key: 'document_type',
      render: (record) => record?.name,
    },
    {
      title: <IntlMessages id='table.documentNumber' />,
      dataIndex: 'verdict_number',
      width: 200,
      key: 'verdict_number',
    },
    {
      title: <IntlMessages id='table.document.publishDate' />,
      dataIndex: 'created_at',
      width: 200,
      key: 'created_at',
      render: (date) => <RenderDate value={date} />,
    },
    {
      title: <IntlMessages id='table.judgment' />,
      dataIndex: 'judgment',
      width: 200,
      key: 'judgment',
      render: (record) => <Link to={'/'}>{record?.name}</Link>,
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
      <AppPageMetadata title={messages['sidebar.documentJudgment']} />
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
        url={API.SEARCH_RELATE_DOCUMENT}
        columns={columns}>
        <FormRowDataTable
          key={rowData && `relate-document-${rowData?.id}`}
          preSaveData={rowData ? preSaveUpdateData : preSaveData}
          visible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          formType={rowData ? FORM_TYPES.UPDATE : FORM_TYPES.ADD}
          method={rowData ? METHOD_FETCH.PUT : METHOD_FETCH.POST}
          resource={
            rowData
              ? API.UPDATE_RELATE_DOCUMENT(rowData?.id)
              : API.CREATE_RELATE_DOCUMENT
          }
          initialValues={rowData ? rowData : {}}>
          <FormDocumentJudgmentModal />
        </FormRowDataTable>
        <DialogConfirm
          key={rowData?.id}
          visible={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          textTitle={'confirm.deleteDocumentType'}
          textSuccess={'confirm.deleteDocumentTypeSuccess'}
          onSaveToServer={deleteToServer}>
          <p>
            <IntlMessages id='confirm.deleteDocumentTypeSure' />
            <span className='warning-text-color'>{rowData?.name}</span>
          </p>
        </DialogConfirm>
      </DataTable>
    </>
  );
};

export default DocumentRelatedJudgment;
