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
import { KEY_ACTION_COLUMN } from 'src/shared/constants/DataTable';
import { AcEditIcon, AcTrashIcon } from 'src/assets/icon/action';
import Icon from '@ant-design/icons/lib/components/Icon';
import FormModalCardClassify from './FormModalCardClassify';
// import PropTypes from 'prop-types';

ListCardClassify.propTypes = {};

function ListCardClassify() {
  const { messages } = useIntl();
  const [rowData, setRowData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const deleteToServer = () => {
    return instanceCoreApi.delete(API.DELETE_CARD_CLASSIFY(rowData?.id));
  };

  const columns = [
    {
      title: <IntlMessages id='sidebar.data_governance_name_card_classify' />,
      dataIndex: 'name',
      width: 200,
      fixed: 'left',
      key: 'name',
      sorter: true,
    },
    {
      title: <IntlMessages id='sidebar.data_governance_des_card_classify' />,
      dataIndex: 'description',
      width: 200,
      key: 'description',
    },
    {
      key: KEY_ACTION_COLUMN,
      actions: [
        {
          label: 'table.action.edit',
          // actionName: ITEM_PERMISSIONS.UPDATE,
          icon: <Icon component={AcEditIcon} />,
          onClick: (data) => {
            setRowData(data);
            setIsModalOpen(true);
          },
        },
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
        title={messages['sidebar.data_governance_list_classify_card']}
      />
      <DataTable
        initTable={{
          filters: [],
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
            {messages['sidebar.data_governance_add_new_card_classify']}
          </AntButton>,
        ]}
        url={API.GET_LIST_CARD_CLASSIFY}
        columns={columns}>
        <FormRowDataTable
          title={
            rowData
              ? 'sidebar.data_governance_update_card_classify'
              : 'sidebar.data_governance_add_new_card_classify'
          }
          buttonText={
            rowData
              ? 'sidebar.data_governance_update_card_classify'
              : 'sidebar.data_governance_add_new_card_classify'
          }
          key={rowData && `setting-card-classify-${rowData?.id}`}
          size={MODAL_SIZE.MEDIUM}
          visible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          formType={rowData ? FORM_TYPES.UPDATE : FORM_TYPES.ADD}
          method={rowData?.id ? METHOD_FETCH.PUT : METHOD_FETCH.POST}
          resource={
            rowData?.id
              ? API.UPDATE_CARD_CLASSIFY(rowData?.id)
              : API.ADD_CARD_CLASSIFY
          }
          initialValues={rowData ? rowData : {}}>
          <FormModalCardClassify />
        </FormRowDataTable>

        <DialogConfirm
          key={rowData?.id}
          visible={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          textTitle={'confirm.deleteCardClassify'}
          textSuccess={'confirm.deleteCardClassifySuccess'}
          onSaveToServer={deleteToServer}>
          <p>
            <IntlMessages id='confirm.deleteCardClassifySure' />
            <span className='warning-text-color'>{rowData?.name}</span>
          </p>
        </DialogConfirm>
      </DataTable>
    </div>
  );
}

export default ListCardClassify;
