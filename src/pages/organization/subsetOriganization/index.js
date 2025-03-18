import React, { useMemo, useState } from 'react';
import DataTable from 'src/@crema/core/DataTable';
import {
  FILTER_OPERATION,
  KEY_ACTION_COLUMN,
} from 'src/shared/constants/DataTable';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import Icon, { PlusOutlined } from '@ant-design/icons';

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
import { FormSubsetOrganizationModal } from 'src/pageComponents/subsetOrganization';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import { useParams } from 'react-router-dom';
import { isEmpty, isNumber } from 'src/shared/utils/Typeof';
import { MODAL_SIZE } from 'src/shared/constants/Modal';
import { uniq } from 'lodash';
import AdminRoleTemplateForm from '../RolesDocumentTemplate/AdminRoleTemplateForm';
import { updateRolesTemplateDepartment } from 'src/@crema/services';
import SubHeaderApp from 'src/@crema/component/SubHeaderApp';
import SubHeaderAppTemplate from 'src/@crema/component/SubHeaderApp/SubHeaderAppTemplate';
import { ROUTER_NAME } from 'src/pages/routeConfig';

const subsetOriganization = () => {
  const { messages } = useIntl();
  const { id: organizationId } = useParams();
  const [rowData, setRowData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalPermissionOpen, setIsModalPermissionOpen] = useState(false);

  const deleteToServer = () => {
    return instanceCoreApi.delete(API.DELETE_DEPARTMENT(rowData?.id));
  };

  const preSaveData = (data) => {
    const { department_name, organization, phone_number, roles = {} } = data;
    const roleIds = Object.keys(roles)
      .filter((key) => roles[key])
      .map((key) => parseInt(key.split('__')?.[1]))
      .filter((roleId) => isNumber(roleId));
    console.log('roleIds', roleIds, roles);
    return {
      department_name: department_name,
      organization_id: organization?.id || organizationId,
      role_ids: roleIds,
      phone_number,
    };
  };

  const savePermissionRole = (data) => {
    const dataUpdateRolesDepartment = { ...data };
    return updateRolesTemplateDepartment(
      rowData?.id,
      dataUpdateRolesDepartment,
    );
  };

  const filters =
    useMemo(() => {
      if (!isEmpty(organizationId)) {
        return [
          {
            name: 'organization_id',
            operation: FILTER_OPERATION.EQ,
            value: organizationId,
          },
        ];
      }
      return [];
    }, [organizationId]) || [];

  return (
    <>
      <AppPageMetadata
        title={messages['sidebar.subset_organization_department']}
      />
      {organizationId && (
        <SubHeaderApp>
          <SubHeaderAppTemplate isShowGoBack title={'Thông tin tổ chức con'} />
        </SubHeaderApp>
      )}

      <DataTable
        pageName={organizationId ? ROUTER_NAME.ORGANIZATION : undefined}
        initTable={{
          filters: filters,
        }}
        key={filters}
        toolbars={[
          <AntButton
            key={ITEM_PERMISSIONS.ADD + 1}
            type='primary'
            icon={<PlusOutlined />}
            onClick={() => {
              setRowData(null);
              setIsModalOpen(true);
            }}>
            {messages['table.toolbar.createSubsetOrganization']}
          </AntButton>,
        ]}
        url={API.SEARCH_DEPARTMENT}
        columns={[
          {
            title: <IntlMessages id='table.subsetOrganizationName' />,
            dataIndex: 'department_name',
            width: 200,
            fixed: 'left',
            key: 'subsetOrganizationName',
            sorter: true,
          },
          {
            title: <IntlMessages id='table.parentOrganizationName' />,
            dataIndex: 'organization',
            width: 200,
            key: 'display_name',
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
                  const roleMap = {};
                  (data?.role_responses || []).forEach(
                    (role) => (roleMap[`${role?.name}__${role?.id}`] = true),
                  );

                  setRowData({
                    ...data,
                    roles: roleMap,
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
        ]}>
        <FormRowDataTable
          key={rowData && `action-${rowData?.id}`}
          buttonText={'form.buttonSave'}
          preSaveData={preSaveData}
          visible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          formType={rowData ? FORM_TYPES.UPDATE : FORM_TYPES.ADD_ORGANIZATION}
          method={rowData ? METHOD_FETCH.PUT : METHOD_FETCH.POST}
          resource={
            rowData ? API.UPDATE_DEPARTMENT(rowData?.id) : API.CREATE_DEPARTMENT
          }
          initialValues={rowData ? rowData : {}}>
          <FormSubsetOrganizationModal organizationId={organizationId} />
        </FormRowDataTable>
        <DialogConfirm
          key={rowData?.id}
          visible={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          textTitle={'confirm.subsetDeleteOrganization'}
          textSuccess={'confirm.subsetDeleteOrganizationSuccess'}
          onSaveToServer={deleteToServer}>
          <p>
            <IntlMessages id='confirm.subsetDeleteOrganizationSure' />
            <span className='warning-text-color'>
              {rowData?.name || rowData?.department_name}
            </span>
          </p>
        </DialogConfirm>

        {/* document type template */}
        <DialogConfirm
          visible={isModalPermissionOpen}
          textTitle={'form.configTemplateSubsetOrganizationManagement'}
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
            roleName={rowData?.name || rowData?.department_name}
            idOrganization={rowData?.id}
            isSearchTemplateDepartment={true}
            idOrganizationSearchByDepartment={rowData?.organization_id}
          />
        </DialogConfirm>
      </DataTable>
    </>
  );
};
export default subsetOriganization;
