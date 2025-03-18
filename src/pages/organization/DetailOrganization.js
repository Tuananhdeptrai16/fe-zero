import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import AntButton from 'src/@crema/component/AntButton';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import DataTable from 'src/@crema/core/DataTable';
import { ITEM_PERMISSIONS } from 'src/shared/constants/Permission';
import { FILTER_OPERATION } from 'src/shared/constants/DataTable';
import Icon, { PlusOutlined } from '@ant-design/icons';
import { AcTrashIcon } from 'src/assets/icon/action';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import API from 'src/@crema/services/apis/index';
import { KEY_ACTION_COLUMN } from 'src/shared/constants/DataTable';
import FormRowDataTable from 'src/@crema/component/FormRowDataTable';
import { FORM_TYPES } from 'src/shared/constants/FormDataTable';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import { FormDetailOrganizationModal } from 'src/pageComponents/detailOrganizationModal';
import DialogConfirm from 'src/@crema/component/DialogConfirm';
import { deleteMembersOrganization } from 'src/@crema/services/detailOrganization.service';

import { useParams } from 'react-router-dom';
import SubHeaderApp from 'src/@crema/component/SubHeaderApp';
import SubHeaderAppTemplate from 'src/@crema/component/SubHeaderApp/SubHeaderAppTemplate';
import RenderNameUser from 'src/@crema/component/TableRender/RenderNameUser';
import { MODAL_SIZE } from 'src/shared/constants/Modal';
import { ROUTER_NAME } from 'src/pages/routeConfig';
import { useJWTAuthActions } from 'src/@crema/services/auth/jwt-auth/JWTAuthProvider';

const DetailOrganization = () => {
  const { messages } = useIntl();
  const { checkPermissionAction } = useJWTAuthActions();
  const [rowData, setRowData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteMultiOpen, setModalDeleteMultiOpen] = useState(false);
  const params = useParams();
  const rowsSelected = [];

  const topicIdDetail = params?.id;

  const columns = [
    {
      title: <IntlMessages id='table.detailOrganizationName' />,
      dataIndex: 'username',
      width: 200,
      key: 'username',
      render: (data, user) => {
        return RenderNameUser({ user });
      },
    },
    {
      title: <IntlMessages id='table.detailOrganizationEmail' />,
      dataIndex: 'email',
      sorter: true,
      key: 'email',
      width: 300,
    },
    {
      title: <IntlMessages id='table.detailOrganization' />,
      dataIndex: 'organization_name',
      sorter: true,
      key: 'organization_name',
      width: 300,
    },
    {
      title: <IntlMessages id='table.detailOrganizationTelephone' />,
      dataIndex: 'phone_number',
      sorter: true,
      key: 'phone_number',
      width: 300,
    },
    {
      key: KEY_ACTION_COLUMN,
      actions: [
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
      <AppPageMetadata
        title={messages['sidebar.details_organization_management']}
      />
      <SubHeaderApp>
        <SubHeaderAppTemplate
          title={
            <IntlMessages id={'sidebar.details_organization_management'} />
          }
          isShowGoBack
        />
      </SubHeaderApp>
      <DataTable
        itemSelected={
          checkPermissionAction(
            ROUTER_NAME.ORGANIZATION,
            ITEM_PERMISSIONS.DELETE,
          )
            ? undefined
            : //  {
              //     action: 'table.deleteMulti',
              //     clickAction: (_, items) => {
              //       setRowsSelected(items);
              //       setModalDeleteMultiOpen(true);
              //     },
              //   }
              undefined
        }
        pageName={ROUTER_NAME.ORGANIZATION}
        toolbars={[
          <AntButton
            key={ITEM_PERMISSIONS.ADD}
            type='primary'
            icon={<PlusOutlined />}
            onClick={() => {
              setRowData(null);
              setIsModalOpen(true);
            }}>
            {messages['table.toolbar.addNewMember']}
          </AntButton>,
        ]}
        initTable={{
          filters: [
            {
              name: 'organization_id',
              operation: FILTER_OPERATION.EQ,
              value: topicIdDetail,
            },
          ],
        }}
        url={API.SEARCH_MEMBER_LIST_ORGANIZATION}
        columns={columns}>
        <FormRowDataTable
          key={`docT-${rowData?.id}`}
          visible={isModalOpen}
          size={MODAL_SIZE.MEDIUM}
          onClose={() => setIsModalOpen(false)}
          formType={rowData ? FORM_TYPES.UPDATE : FORM_TYPES.ADD}
          method={rowData ? METHOD_FETCH.PUT : METHOD_FETCH.PUT}
          preSaveData={(data) => {
            return {
              ...data,
              organization_id: topicIdDetail,
            };
          }}
          resource={
            rowData
              ? API.UPDATE_DOCUMENT_TYPE(rowData?.id)
              : API.CREATE_MEMBER_LIST_ORGANIZATION
          }
          initialValues={rowData ? rowData : {}}>
          <FormDetailOrganizationModal organizationId={topicIdDetail} />
        </FormRowDataTable>
        <DialogConfirm
          key={rowData?.id}
          visible={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          textTitle={'confirm.deleteMemberOrganization'}
          textSuccess={'confirm.deleteMemberOrganizationSuccess'}
          onSaveToServer={() => deleteMembersOrganization(rowData)}>
          <p>
            <IntlMessages id='confirm.deleteMemberOrganizationSure' />
            <span className='warning-text-color'>
              {RenderNameUser({ user: rowData })}
            </span>{' '}
            khỏi tổ chức{' '}
            <span className='warning-text-color'>
              {rowData?.organization?.display_name}
            </span>
          </p>
        </DialogConfirm>
        <DialogConfirm
          key={`delete-${rowsSelected?.map((row) => row?.id)}`}
          visible={isModalDeleteMultiOpen}
          onClose={() => setModalDeleteMultiOpen(false)}
          textTitle={'confirm.deleteMemberOrganization'}
          textSuccess={'confirm.deleteMemberOrganizationSuccess'}
          onSaveToServer={() =>
            deleteMembersOrganization(rowsSelected?.map((row) => row?.id))
          }>
          <p>
            <IntlMessages id='confirm.deleteMemberOrganizationSure' />
            <ul className='ml-6 mt-2'>
              {rowsSelected.map((row, index) => (
                <li key={`item-${index}`}>
                  <span className='warning-text-color'>
                    <RenderNameUser user={row} />
                  </span>
                </li>
              ))}
            </ul>
          </p>
        </DialogConfirm>
      </DataTable>
    </>
  );
};
export default DetailOrganization;
