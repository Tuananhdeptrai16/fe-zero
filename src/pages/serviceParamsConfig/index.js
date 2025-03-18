import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import DataTable from 'src/@crema/core/DataTable';
import API from 'src/@crema/services/apis';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import { AcEditIcon, AcTrashIcon } from 'src/assets/icon/action';
import { KEY_ACTION_COLUMN } from 'src/shared/constants/DataTable';
import { ITEM_PERMISSIONS } from 'src/shared/constants/Permission';
import Icon from '@ant-design/icons';
import FormRowDataTable from 'src/@crema/component/FormRowDataTable';
import { MODAL_SIZE } from 'src/shared/constants/Modal';
import { FORM_TYPES } from 'src/shared/constants/FormDataTable';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import DialogConfirm from 'src/@crema/component/DialogConfirm';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import { FormSettingServiceParams } from 'src/pageComponents/formSetting/FormSettingServiceParams';

const ServiceParamsConfigPage = () => {
  const { messages } = useIntl();
  const [rowData, setRowData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const deleteToServer = () => {
    return instanceCoreApi.delete(
      `${API.DELETE_DOCUMENT_TEMPLATE}/${rowData?.id}`,
    );
  };

  const columns = [
    {
      title: <IntlMessages id='table.formTemplateName' />,
      dataIndex: 'name',
      width: 300,
      fixed: 'left',
      key: 'name',
      sorter: true,
    },
    {
      title: <IntlMessages id='table.organization' />,
      dataIndex: 'organization',
      width: 300,
      key: 'organization',
      render: (record) => record?.display_name,
    },
    {
      title: <IntlMessages id='table.documentType' />,
      dataIndex: 'document_type',
      width: 300,
      key: 'document_type',
      render: (record) => record?.display_name,
    },
    {
      key: KEY_ACTION_COLUMN,
      actions: [
        {
          label: 'table.action.edit',
          actionName: ITEM_PERMISSIONS.UPDATE,
          icon: <Icon component={AcEditIcon} />,
          onClick: (data) => {
            const configTemplate = data.config_template || '[]';
            const objectTemplate = data.object_template || '[]';
            setRowData({
              ...data,
              config_template: JSON.parse(configTemplate),
              object_template: JSON.parse(objectTemplate),
            });
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

  const preSaveSetting = (data) => {
    const { id, name, config_template, object_template } = data;
    console.log(config_template);
    return {
      id,
      name,
      document_type_id: data?.document_type?.id,
      organization_id: data?.organization?.id,
      config_template: JSON.stringify(config_template),
      object_template: JSON.stringify(object_template),
    };
  };

  return (
    <div>
      <AppPageMetadata title={messages['sidebar.service_params_config']} />
      <DataTable url={API.GET_LIST_DOCUMENT_TEMPLATE} columns={columns}>
        <FormRowDataTable
          key={rowData && `setting-${rowData?.id}`}
          size={MODAL_SIZE.LARGE}
          visible={isModalOpen}
          preSaveData={preSaveSetting}
          onClose={() => setIsModalOpen(false)}
          formType={rowData ? FORM_TYPES.UPDATE : FORM_TYPES.ADD}
          method={rowData ? METHOD_FETCH.PUT : METHOD_FETCH.POST}
          resource={
            rowData
              ? `${API.UPDATE_DOCUMENT_TEMPLATE}/${rowData?.id}`
              : API.CREATE_DOCUMENT_TEMPLATE
          }
          initialValues={
            rowData
              ? rowData
              : {
                  config_template: [{}, {}],
                  object_template: [],
                }
          }>
          <FormSettingServiceParams />
        </FormRowDataTable>
        <DialogConfirm
          key={rowData?.id}
          visible={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          textTitle={'confirm.deleteFormSetting'}
          textSuccess={'confirm.deleteFormSettingSuccess'}
          onSaveToServer={deleteToServer}>
          <p>
            <IntlMessages id='confirm.deleteFormSettingSure' />
            <span className='warning-text-color'>{rowData?.name}</span>
          </p>
        </DialogConfirm>
      </DataTable>
    </div>
  );
};

export default ServiceParamsConfigPage;
