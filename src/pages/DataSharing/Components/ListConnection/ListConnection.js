import React, { useState } from 'react';
import { Col, Row } from 'antd';
import { useIntl } from 'react-intl';
import DataTable from 'src/@crema/core/DataTable';
import API from 'src/@crema/services/apis/index';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import { KEY_ACTION_COLUMN } from 'src/shared/constants/DataTable';
import { AcEditIcon, AcTrashIcon } from 'src/assets/icon/action';
import FormRowDataTable from 'src/@crema/component/FormRowDataTable';
import { MODAL_SIZE } from 'src/shared/constants/Modal';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import { FORM_TYPES } from 'src/shared/constants/FormDataTable';
import DialogConfirm from 'src/@crema/component/DialogConfirm';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import Icon, { PlusOutlined } from '@ant-design/icons';
import AntButton from 'src/@crema/component/AntButton';
import { ITEM_PERMISSIONS } from 'src/shared/constants/Permission';
import FormAddUpdate from './FormAddUpdate/FormAddUpdate';
import ActionConfig from '../ActionConfig/ActionConfig';
import { TYPES_DATA_SHARING } from 'src/shared/constants/DataFixed';

// import PropTypes from 'prop-types';

ListConnection.propTypes = {};

function ListConnection() {
  const { messages } = useIntl();
  const [rowData, setRowData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // delete connect
  const deleteConnectDataWareHouse = () => {
    return instanceCoreApi.delete(API.DELETE_DATA_WAREHOUSE(rowData.id));
  };

  const columns = [
    {
      title: 'Tên kết nối',
      dataIndex: 'name',
      width: 200,
      fixed: 'left',
      key: 'name',
      sorter: true,
    },
    {
      title: 'Loại',
      dataIndex: 'type',
      width: 200,
      key: 'type',
    },
    {
      title: 'Máy chủ',
      dataIndex: 'host',
      width: 200,
      key: 'host',
    },
    {
      title: 'Cổng kết nối',
      dataIndex: 'port',
      width: 200,
      key: 'port',
    },
    {
      title: 'Tên cơ sở dữ liệu',
      dataIndex: 'database',
      width: 200,
      key: 'database',
    },
    {
      title: 'Tài khoản',
      dataIndex: 'username',
      width: 200,
      key: 'username',
    },
    {
      title: 'Lược đồ',
      dataIndex: 'schema',
      width: 200,
      key: 'schema',
    },
    {
      title: 'Mô tả',
      dataIndex: 'comment',
      width: 200,
      key: 'comment',
    },
    {
      key: KEY_ACTION_COLUMN,
      actions: [
        {
          label: 'table.action.edit',
          // actionName: ITEM_PERMISSIONS.UPDATE,
          icon: (
            <Icon
              component={AcEditIcon}
              style={{
                color: '#111827',
              }}
            />
          ),
          onClick: (data) => {
            setRowData(data);
            setIsModalOpen(true);
          },
        },
        {
          label: 'table.action.delete',
          // actionName: ITEM_PERMISSIONS.DELETE,
          icon: (
            <Icon
              component={AcTrashIcon}
              style={{
                color: 'red',
              }}
            />
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
      <AppPageMetadata title={messages['sidebar.list_connect_warehouse']} />
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <Row>
            <Col span={24}>
              <h4 className='mb-1'>
                {messages['sidebar.list_connect_warehouse']}
              </h4>
            </Col>
            <Col span={24}>
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
                url={API.SEARCH_DATA_WAREHOUSE}
                initTable={{
                  filter: [],
                }}
                columns={columns}>
                <FormRowDataTable
                  title={
                    rowData
                      ? 'sidebar.list_connect_edit'
                      : 'sidebar.list_connect_add'
                  }
                  buttonText={rowData ? 'form.buttonUpdate' : 'form.buttonAdd'}
                  key={rowData && `setting-${rowData?.id}`}
                  size={MODAL_SIZE.MEDIUM}
                  visible={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  formType={rowData ? FORM_TYPES.UPDATE : FORM_TYPES.ADD}
                  method={rowData?.id ? METHOD_FETCH.PUT : METHOD_FETCH.POST}
                  resource={
                    rowData?.id
                      ? API.UPDATE_DATA_WAREHOUSE(rowData?.id)
                      : API.CREATE_DATA_WAREHOUSE
                  }
                  initialValues={rowData ? rowData : {}}>
                  <FormAddUpdate />
                </FormRowDataTable>

                <DialogConfirm
                  key={rowData?.id}
                  visible={isDialogOpen}
                  onClose={() => setIsDialogOpen(false)}
                  textTitle={'confirm.deleteConnect'}
                  textSuccess={'confirm.deleteConnectSuccess'}
                  onSaveToServer={deleteConnectDataWareHouse}>
                  <p>
                    <IntlMessages id='confirm.deleteConnectSure' />
                    <span className='warning-text-color'>{rowData?.name}</span>
                  </p>
                </DialogConfirm>
                <ActionConfig type={TYPES_DATA_SHARING.connectionList} />
              </DataTable>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default ListConnection;
