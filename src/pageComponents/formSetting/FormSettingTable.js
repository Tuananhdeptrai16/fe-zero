import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import AntButton from 'src/@crema/component/AntButton/index';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata/index';
import DataTable from 'src/@crema/core/DataTable';
import { ITEM_PERMISSIONS } from 'src/shared/constants/Permission';
import Icon, { PlusOutlined } from '@ant-design/icons';
import { AcEditIcon, AcTrashIcon } from 'src/assets/icon/action/index';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import API from 'src/@crema/services/apis/index';
import {
  FILTER_OPERATION,
  KEY_ACTION_COLUMN,
} from 'src/shared/constants/DataTable';
import FormRowDataTable from 'src/@crema/component/FormRowDataTable/index';
import { FORM_TYPES } from 'src/shared/constants/FormDataTable';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import DialogConfirm from 'src/@crema/component/DialogConfirm/index';
import { FormSettingFormModal } from 'src/pageComponents/formSetting/FormSettingFormModal';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import { MODAL_SIZE } from 'src/shared/constants/Modal';
import { FaCopy } from 'react-icons/fa';
import notification from 'src/shared/utils/notification';

export const FormSettingTable = ({ organizationId, groupType }) => {
  const { messages } = useIntl();
  const [rowData, setRowData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isButton, setIsButton] = useState(false);

  const deleteToServer = () => {
    return instanceCoreApi.delete(
      `${API.DELETE_DOCUMENT_TEMPLATE}/${rowData?.id}`,
    );
  };

  const findDuplicates = (array = []) => {
    const uniqueElements = new Set();
    const duplicates = [];
    array.forEach((item) => {
      if (uniqueElements.has(item?.key)) {
        duplicates.push(item);
      } else {
        uniqueElements.add(item?.key);
      }
    });
    return duplicates;
  };

  const preSaveUpdateData = (data) => {
    const { id, name, config_template, object_template } = data;
    const duplicateKeys = findDuplicates([
      ...config_template,
      ...object_template,
    ]);
    const listLabel = duplicateKeys.map((item) => item?.label)?.join(', ');
    if (duplicateKeys && duplicateKeys.length > 0) {
      notification.error(
        `Vui lòng chỉnh sửa hoặc bỏ những ánh xạ dữ liệu trùng nhau: ${listLabel}`,
      );
      return;
    }
    return {
      id,
      name,
      document_type_id: data?.document_type?.id,
      organization_id: data?.organization?.id || organizationId,
      config_template: JSON.stringify(config_template),
      object_template: JSON.stringify(object_template),
    };
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
      render: (record) => record?.name,
    },
    {
      title: <IntlMessages id='table.documentType' />,
      dataIndex: 'document_type',
      width: 300,
      key: 'document_type',
      render: (record) => record?.name,
    },
    {
      key: KEY_ACTION_COLUMN,
      actions: [
        {
          label: 'table.action.copy',
          actionName: ITEM_PERMISSIONS.UPDATE,
          icon: <FaCopy />,
          onClick: (data) => {
            const configTemplate = data.config_template || '[]';
            const objectTemplate = data.object_template || '[]';
            setRowData({
              ...data,
              config_template: JSON.parse(configTemplate),
              object_template: JSON.parse(objectTemplate),
            });
            setIsModalOpen(true);
            setIsEdit(true);
            setIsButton(true);
          },
        },
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
            setIsEdit(false);
            setIsButton(false);
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

  const filters = [];
  let resource = API.GET_LIST_DOCUMENT_TEMPLATE;
  if (organizationId) {
    filters.push({
      name: 'organization_id',
      operation: FILTER_OPERATION.EQ,
      value: organizationId,
    });
  }

  if (groupType) {
    filters.push({
      name: 'group_type',
      operation: FILTER_OPERATION.EQ,
      value: groupType,
    });
    resource = API.GET_LIST_DOCUMENT_TEMPLATE_VIEW;
  }

  return (
    <>
      <AppPageMetadata title={messages['sidebar.documentType']} />
      <DataTable
        initTable={{
          filters: filters,
        }}
        toolbars={[
          <AntButton
            key={ITEM_PERMISSIONS.ADD + '1'}
            type='primary'
            icon={<PlusOutlined />}
            onClick={() => {
              setRowData(null);
              setIsModalOpen(true);
            }}>
            {messages['table.toolbar.addNew']}
          </AntButton>,
        ]}
        url={resource}
        columns={columns}>
        <FormRowDataTable
          title={
            isEdit
              ? 'table.action.copy'
              : rowData?.id
              ? 'table.action.edit'
              : 'table.toolbar.addNew'
          }
          buttonText={
            isButton
              ? 'form.buttonCopy'
              : rowData?.id
              ? 'form.buttonUpdate'
              : 'form.buttonAdd'
          }
          key={rowData && `setting-${rowData?.id}`}
          size={MODAL_SIZE.LARGE}
          preSaveData={preSaveUpdateData}
          visible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          formType={
            rowData
              ? FORM_TYPES.COPY
              : rowData?.id
              ? FORM_TYPES.UPDATE
              : FORM_TYPES.ADD
          }
          method={rowData?.id ? METHOD_FETCH.PUT : METHOD_FETCH.POST}
          resource={
            rowData?.id
              ? `${API.UPDATE_DOCUMENT_TEMPLATE}/${rowData?.id}`
              : API.CREATE_DOCUMENT_TEMPLATE
          }
          initialValues={
            rowData
              ? rowData?.id
              : {
                  config_template: [{}, {}],
                  object_template: [],
                }
          }>
          <FormSettingFormModal
            organizationId={organizationId}
            groupType={groupType}
          />
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
    </>
  );
};
