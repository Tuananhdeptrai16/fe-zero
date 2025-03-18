import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import AntButton from 'src/@crema/component/AntButton/index';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata/index';
import DataTable from 'src/@crema/core/DataTable';
import { ITEM_PERMISSIONS } from 'src/shared/constants/Permission';
import Icon, { PlusOutlined } from '@ant-design/icons';
import {
  AcEditIcon,
  AcInfoCirleIcon,
  AcTrashIcon,
} from 'src/assets/icon/action/index';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import API from 'src/@crema/services/apis/index';
import { KEY_ACTION_COLUMN } from 'src/shared/constants/DataTable';
import FormRowDataTable from 'src/@crema/component/FormRowDataTable/index';
import { FORM_TYPES } from 'src/shared/constants/FormDataTable';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import DialogConfirm from 'src/@crema/component/DialogConfirm/index';
import RenderDate from 'src/@crema/component/TableRender/RenderDate';
import RenderGender from 'src/@crema/component/TableRender/RenderGender';
import RenderContentHTML from 'src/@crema/component/TableRender/RenderContentHTML';
import { CitizenRelationInformation } from 'src/pageComponents/Citizen/CitizenRelationInformation';
import { FormCitizenModal } from 'src/pageComponents/Citizen/FormCitizenModal';
import { MODAL_SIZE } from 'src/shared/constants/Modal';
import { FormCitizenRelationModal } from 'src/pageComponents/Citizen/FormCitizenRelationModal';

export const CitizenListPage = () => {
  const { messages } = useIntl();
  const [rowData, setRowData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogRelationOpen, setIsDialogRelationOpen] = useState(false);
  const [isDialogEditRelationOpen, setIsDialogEditRelationOpen] =
    useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const deleteToServer = () => {
    //TODO delete
  };

  const preSaveData = (data) => {
    console.log('data', data);
    const { description, name, display_name } = data;
    return { description, name, display_name };
  };

  const preSaveUpdateData = (data) => {
    console.log('data', data);
    // const preData = preSaveData(data);
    // return {};
  };

  const columns = [
    {
      title: <IntlMessages id='table.citizenFullName' />,
      dataIndex: 'full_name',
      width: 300,
      fixed: 'left',
      key: 'full_name',
      sorter: true,
    },
    {
      title: <IntlMessages id='table.citizenOtherName' />,
      dataIndex: 'other_name',
      width: 300,
      fixed: 'left',
      key: 'other_name',
      sorter: true,
    },
    {
      title: <IntlMessages id='table.citizenGender' />,
      dataIndex: 'gender',
      width: 300,
      fixed: 'left',
      key: 'gender',
      sorter: true,
      render: (value) => <RenderGender value={value} />,
    },
    {
      title: <IntlMessages id='table.citizenDateOfBirth' />,
      dataIndex: 'date_of_birth',
      width: 300,
      fixed: 'left',
      key: 'date_of_birth',
      sorter: true,
      render: (value) => <RenderDate value={value} />,
    },
    {
      title: <IntlMessages id='table.citizenPlaceOfBirth' />,
      dataIndex: 'place_of_birth',
      width: 300,
      fixed: 'left',
      key: 'place_of_birth',
      sorter: true,
      render: (text) => <RenderContentHTML shortNumWord={125} content={text} />,
    },
    {
      title: <IntlMessages id='table.citizenEthnicity' />,
      dataIndex: 'ethnicity',
      width: 300,
      fixed: 'left',
      key: 'ethnicity',
      sorter: true,
    },
    {
      title: <IntlMessages id='table.citizenNationality' />,
      dataIndex: 'nationality',
      width: 300,
      fixed: 'left',
      key: 'nationality',
      sorter: true,
    },
    {
      title: <IntlMessages id='table.citizenPermanentAddress' />,
      dataIndex: 'permanent_address',
      width: 300,
      fixed: 'left',
      key: 'permanent_address',
      sorter: false,
      render: (text) => <RenderContentHTML shortNumWord={125} content={text} />,
    },
    {
      title: <IntlMessages id='table.citizenRelation' />,
      dataIndex: 'relation',
      width: 300,
      fixed: 'left',
      key: 'relation',
      sorter: false,
      render: (_, row) => {
        if (row?.status === 'approve') return null;
        return (
          <AntButton
            className={'text-left close-btn'}
            type={'link'}
            block
            onClick={() => setIsDialogRelationOpen(true)}>
            Xem chi tiết
          </AntButton>
        );
      },
    },
    {
      key: KEY_ACTION_COLUMN,
      actions: [
        {
          label: 'table.action.citizen_relation',
          actionName: ITEM_PERMISSIONS.UPDATE,
          icon: <Icon component={AcInfoCirleIcon} />,
          onClick: (data) => {
            setRowData(data);
            setIsDialogEditRelationOpen(true);
          },
        },
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
        url={API.GET_LIST_ADMIN_PERMISSIONS}
        columns={columns}>
        <FormRowDataTable
          key={rowData && rowData?.id}
          size={MODAL_SIZE.LARGE}
          preSaveData={rowData ? preSaveUpdateData : preSaveData}
          visible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          formType={rowData ? FORM_TYPES.UPDATE : FORM_TYPES.ADD}
          method={rowData ? METHOD_FETCH.PUT : METHOD_FETCH.POST}
          resource={
            rowData
              ? `${API.UPDATE_ADMIN_PERMISSION}/${rowData?.id}`
              : API.CREATE_ADMIN_PERMISSION
          }
          initialValues={rowData}>
          <FormCitizenModal />
        </FormRowDataTable>
        <FormRowDataTable
          key={rowData && rowData?.id}
          title='Cập nhật thông tin thân nhân'
          buttonText='Cập nhật'
          size={MODAL_SIZE.MEDIUM}
          preSaveData={rowData ? preSaveUpdateData : preSaveData}
          visible={isDialogEditRelationOpen}
          onClose={() => setIsDialogEditRelationOpen(false)}
          formType={rowData ? FORM_TYPES.UPDATE : FORM_TYPES.ADD}
          method={rowData ? METHOD_FETCH.PUT : METHOD_FETCH.POST}
          resource={
            rowData
              ? `${API.UPDATE_ADMIN_PERMISSION}/${rowData?.id}`
              : API.CREATE_ADMIN_PERMISSION
          }
          initialValues={{
            ...rowData,
            relations: [{}, {}],
          }}>
          <FormCitizenRelationModal />
        </FormRowDataTable>
        <DialogConfirm
          visible={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          textTitle={'confirm.deleteCitizen'}
          textSuccess={'confirm.deleteCitizenSuccess'}
          onSaveToServer={deleteToServer}>
          <p>
            <IntlMessages id='confirm.deleteCitizenSure' />
            <span className='warning-text-color'>{rowData?.name}</span>
          </p>
        </DialogConfirm>
        <DialogConfirm
          visible={isDialogRelationOpen}
          onClose={() => setIsDialogRelationOpen(false)}
          textTitle={'confirm.informationCitizenRelation'}>
          <CitizenRelationInformation data={rowData} />
        </DialogConfirm>
      </DataTable>
    </>
  );
};
