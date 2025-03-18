import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import AntButton from 'src/@crema/component/AntButton/index';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata/index';
import DataTable from 'src/@crema/core/DataTable';
import { ITEM_PERMISSIONS } from 'src/shared/constants/Permission';
import { PlusOutlined } from '@ant-design/icons';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import API from 'src/@crema/services/apis/index';
import FormRowDataTable from 'src/@crema/component/FormRowDataTable/index';
import { FORM_TYPES } from 'src/shared/constants/FormDataTable';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import DialogConfirm from 'src/@crema/component/DialogConfirm/index';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import { MODAL_SIZE } from 'src/shared/constants/Modal';
import { FILTER_TYPE, KEY_ACTION_COLUMN } from 'src/shared/constants/DataTable';
import { AcTrashIcon } from 'src/assets/icon/action';
import Icon from '@ant-design/icons/lib/components/Icon';
import FormModalCardManagement from './FormModalCardManagement';
// import PropTypes from 'prop-types';

ListCardManagement.propTypes = {};

function ListCardManagement() {
  const { messages } = useIntl();
  const [rowData, setRowData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTypeTag, setSearchTypeTag] = useState(null);

  const deleteToServer = () => {
    return instanceCoreApi.delete(API.DELETE_TAG_GOVERNANCE(rowData?.urn));
  };

  const preSaveUpdateData = (data) => {
    return {
      ...data,
      description: data?.description || '',
    };
  };

  const columns = [
    {
      title: <IntlMessages id='sidebar.data_governance_name_card' />,
      dataIndex: 'name',
      width: 200,
      fixed: 'left',
      key: 'name',
      sorter: true,
    },
    {
      title: <IntlMessages id='sidebar.data_governance_description_card' />,
      dataIndex: 'description',
      width: 200,
      key: 'description',
    },
    {
      key: KEY_ACTION_COLUMN,
      actions: [
        {
          label: 'table.action.delete',
          // actionName: ITEM_PERMISSIONS.DELETE,
          icon: (
            <Icon className='color_icon_table_delete' component={AcTrashIcon} />
          ),
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
      <AppPageMetadata
        title={messages['sidebar.data_governance_card_management']}
      />
      <DataTable
        initTable={{
          filters: [],
        }}
        onQuery={({ values }) => {
          setSearchTypeTag(values?.id);
        }}
        toolbars={[
          <AntButton
            key={ITEM_PERMISSIONS.ADD}
            type='primary'
            icon={<PlusOutlined />}
            onClick={() => {
              setRowData(null);
              setIsModalOpen(true);
            }}>
            {messages['sidebar.data_governance_add_new_card']}
          </AntButton>,
        ]}
        filters={[
          {
            type: FILTER_TYPE.SELECT_ASYNC,
            label: 'Loại thẻ',
            name: 'id',
            configFetch: {
              url: API.GET_LIST_CARD_CLASSIFY,
              method: METHOD_FETCH.POST,
              body: {
                pageable: {
                  page_size: 1000,
                },
              },
            },
            fieldNames: {
              label: 'name',
              value: 'id',
            },
            // returnObject: true,
          },
        ]}
        url={
          searchTypeTag
            ? API.GET_LIST_TAG_SEARCH_TYPE(searchTypeTag)
            : API.GET_LIST_TAG_GOVERNANCE
        }
        columns={columns}>
        <FormRowDataTable
          title={
            rowData
              ? 'sidebar.data_governance_update_card'
              : 'sidebar.data_governance_add_new_card'
          }
          buttonText={
            rowData
              ? 'sidebar.data_governance_update_card'
              : 'sidebar.data_governance_add_new_card'
          }
          key={rowData && `setting-card-management-${rowData?.id}`}
          size={MODAL_SIZE.MEDIUM}
          preSaveData={preSaveUpdateData}
          visible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          formType={rowData ? FORM_TYPES.UPDATE : FORM_TYPES.ADD}
          method={rowData?.id ? METHOD_FETCH.PUT : METHOD_FETCH.POST}
          resource={
            rowData?.id ? API.ADD_TAG_GOVERNANCE : API.ADD_TAG_GOVERNANCE
          }
          initialValues={
            rowData
              ? {
                  card_type: 79,
                  card_name: rowData?.name,
                  card_description: rowData?.display_name,
                }
              : {}
          }>
          <FormModalCardManagement />
        </FormRowDataTable>
        <DialogConfirm
          key={rowData?.id}
          visible={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          textTitle={'confirm.deleteCard'}
          textSuccess={'confirm.deleteCardSuccess'}
          onSaveToServer={deleteToServer}>
          <p>
            <IntlMessages id='confirm.deleteCardSure' />
            <span className='warning-text-color'>{rowData?.name}</span>
          </p>
        </DialogConfirm>
      </DataTable>
    </div>
  );
}

export default ListCardManagement;
