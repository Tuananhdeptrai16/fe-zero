import React, { useState } from 'react';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import { useIntl } from 'react-intl';
import DataTable from 'src/@crema/core/DataTable';
import API from 'src/@crema/services/apis';
import { KEY_ACTION_COLUMN } from 'src/shared/constants/DataTable';
import { MAPPING_CATEGORY_TOPIC } from 'src/shared/constants/help.constant';
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
import { deleteQA } from 'src/@crema/services/help.service';
import { FormQAModal } from 'src/pageComponents/help/qa/FormQAModal';
import AntButton from 'src/@crema/component/AntButton';

const QAPage = () => {
  const { messages } = useIntl();
  const [rowData, setRowData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    {
      title: <IntlMessages id='qa.questionTitle' />,
      dataIndex: 'name',
      width: 200,
    },
    {
      title: <IntlMessages id='qa.answerContent' />,
      dataIndex: 'content',
      width: 300,
      render: (value) => (
        <RenderContentHTML content={value} shortNumWord={70} />
      ),
    },
    {
      title: <IntlMessages id={'qa.topicTitle'} />,
      dataIndex: 'category_code',
      width: 150,
      render: (value) => MAPPING_CATEGORY_TOPIC[value] || value,
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
      <AppPageMetadata title={messages['help.qaList']} />
      <DataTable
        url={API.SEARCH_QA}
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
          key={`qa-${rowData?.id}`}
          visible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          formType={rowData ? FORM_TYPES.UPDATE : FORM_TYPES.ADD}
          method={rowData ? METHOD_FETCH.PUT : METHOD_FETCH.POST}
          resource={rowData ? API.UPDATE_QA(rowData?.id) : API.CREATE_QA}
          initialValues={rowData ? rowData : {}}>
          <FormQAModal />
        </FormRowDataTable>
        <DialogConfirm
          key={rowData?.id}
          visible={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          textTitle={'qa.formTitleDelete'}
          textSuccess={'qa.category.delete.success'}
          onSaveToServer={() => deleteQA(rowData?.id)}>
          <ConfirmInfo message={'qa.formMessageDelete'} name={rowData?.name} />
        </DialogConfirm>
      </DataTable>
    </div>
  );
};

export default QAPage;
