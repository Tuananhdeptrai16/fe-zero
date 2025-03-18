import React, { useState } from 'react';
import DataTable from 'src/@crema/core/DataTable';
import { KEY_ACTION_COLUMN } from 'src/shared/constants/DataTable';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import Icon, {
  // DeploymentUnitOutlined,
  PlusOutlined,
  TeamOutlined,
} from '@ant-design/icons';

import { useIntl } from 'react-intl';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata/index';
import DialogConfirm from 'src/@crema/component/DialogConfirm/index';
import AntButton from 'src/@crema/component/AntButton/index';
import FormRowDataTable from 'src/@crema/component/FormRowDataTable/index';
import { FORM_TYPES } from 'src/shared/constants/FormDataTable';
import API from 'src/@crema/services/apis/index';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import { ITEM_PERMISSIONS } from 'src/shared/constants/Permission';
import { AcEditIcon, AcTrashIcon } from 'src/assets/icon/action';
import { FormOrganizationModal } from 'src/pageComponents/organization';
import { deleteOrganization } from 'src/@crema/services/organization.service';
import { useNavigate } from 'react-router-dom';
import RenderLink from '../../@crema/component/TableRender/RenderLink';
import { MODAL_SIZE } from 'src/shared/constants/Modal';
import { updateRolesTemplateOrganization } from 'src/@crema/services';
import { uniq } from 'lodash';
import AdminRoleTemplateForm from './RolesDocumentTemplate/AdminRoleTemplateForm';
import config from 'src/config';
import FormAttributeOrganization from 'src/pageComponents/organization/FormAttributeOrganization';
import { parse, stringify } from 'src/shared/utils/String';
import { isArray } from 'src/shared/utils/Typeof';

const OrganizationManagement = () => {
  const { messages } = useIntl();
  const navigate = useNavigate();
  const [rowData, setRowData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalAttributeOpen, setIsModalAttributeOpen] = useState(false);
  const [isModalPermissionOpen, setIsModalPermissionOpen] = useState(false);

  const savePermissionRole = (data) => {
    const dataUpdateRolesOrganization = { ...data };
    return updateRolesTemplateOrganization(
      rowData?.id,
      dataUpdateRolesOrganization,
    );
  };

  const deleteToServer = () => {
    return deleteOrganization(rowData?.id);
  };

  return (
    <>
      <AppPageMetadata title={messages['sidebar.organization']} />
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
        url={API.SEARCH_ORGANIZATION}
        columns={[
          {
            title: <IntlMessages id='table.organizationCode' />,
            dataIndex: 'name',
            width: 200,
            fixed: 'left',
            key: 'name',
            sorter: true,
          },
          {
            title: <IntlMessages id='table.organizationName' />,
            dataIndex: 'display_name',
            width: 200,
            key: 'display_name',
            render: (value, row) => {
              return (
                <RenderLink
                  to={`${config.routes.subsetOrganization}/${row?.id}`}>
                  {value}
                </RenderLink>
              );
            },
          },
          {
            title: <IntlMessages id='table.description' />,
            dataIndex: 'description',
            sorter: true,
            key: 'description',
            width: 250,
          },
          {
            title: <IntlMessages id='table.nationCode' />,
            dataIndex: 'country_code',
            sorter: true,
            key: 'country_code',
            width: 150,
          },
          {
            title: <IntlMessages id='table.organizationTelephone' />,
            dataIndex: 'phone_number',
            sorter: true,
            key: 'phone_number',
            width: 200,
          },
          {
            key: KEY_ACTION_COLUMN,
            actions: [
              {
                label: 'table.action.viewMembers',
                icon: <Icon component={TeamOutlined} />,
                onClick: (data) => {
                  navigate(`/organization/detail-organization/${data?.id}`);
                },
                actionName: ITEM_PERMISSIONS.VIEW,
              },
              {
                label: 'table.action.edit',
                icon: <Icon component={AcEditIcon} />,
                onClick: (data) => {
                  setRowData({
                    ...data,
                    attributes: parse(data?.attributes) || [],
                  });
                  setIsModalOpen(true);
                },
                actionName: ITEM_PERMISSIONS?.UPDATE,
              },
              {
                label: 'table.action.delete',
                icon: <Icon component={AcTrashIcon} />,
                onClick: (data) => {
                  setRowData(data);
                  setIsDialogOpen(true);
                },
                actionName: ITEM_PERMISSIONS?.DELETE,
              },
            ],
          },
        ]}>
        {/* add and update */}
        <FormRowDataTable
          key={`action-${rowData?.id}`}
          visible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          formType={rowData ? FORM_TYPES.UPDATE : FORM_TYPES.ADD_ORGANIZATION}
          method={rowData ? METHOD_FETCH.PUT : METHOD_FETCH.POST}
          resource={
            rowData
              ? API.UPDATE_ORGANIZATION(rowData?.id)
              : API.CREATE_ORGANIZATION
          }
          preSaveData={(data) => ({
            ...data,
            description: data.description ? data.description : '',
            attributes: isArray(data?.attributes)
              ? stringify(data?.attributes)
              : '[]',
          })}
          size={MODAL_SIZE.MEDIUM}
          initialValues={rowData ? rowData : {}}>
          <FormOrganizationModal />
        </FormRowDataTable>
        {/* add and update */}
        <FormRowDataTable
          key={`add-attribute-${rowData?.id}`}
          title={'Cập nhật thuộc tính'}
          visible={isModalAttributeOpen}
          onClose={() => setIsModalAttributeOpen(false)}
          preSaveData={(data) => ({
            ...data,
            attributes: isArray(data?.attributes)
              ? stringify(data?.attributes)
              : '[]',
          })}
          formType={FORM_TYPES.UPDATE}
          method={METHOD_FETCH.PUT}
          resource={API.UPDATE_ORGANIZATION(rowData?.id)}
          initialValues={rowData}>
          <FormAttributeOrganization />
        </FormRowDataTable>

        {/* delete */}
        <DialogConfirm
          key={rowData?.id}
          visible={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          textTitle={'confirm.deleteOrganization'}
          textSuccess={'confirm.deleteOrganizationSuccess'}
          onSaveToServer={deleteToServer}>
          <p>
            <IntlMessages id='confirm.deleteOrganizationSure' />
            <span className='warning-text-color'>{rowData?.display_name}</span>
          </p>
        </DialogConfirm>

        {/* document type template */}
        <DialogConfirm
          visible={isModalPermissionOpen}
          textTitle={'form.configTemplateOrganizationManagement'}
          textSuccess={'form.successUpdateTemplateOrganization'}
          buttonText={'form.buttonUpdate'}
          onSaveToServer={savePermissionRole}
          size={MODAL_SIZE.MEDIUM}
          onClose={() => setIsModalPermissionOpen(false)}
          initialValues={{
            document_template_ids: uniq(
              rowData?.permissions?.map((pre) => pre.id),
            ),
          }}>
          <AdminRoleTemplateForm
            roleName={rowData?.name}
            idOrganization={rowData?.id}
          />
        </DialogConfirm>
      </DataTable>
    </>
  );
};

export default OrganizationManagement;
