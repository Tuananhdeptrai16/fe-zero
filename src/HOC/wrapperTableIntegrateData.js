import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import DataTable from 'src/@crema/core/DataTable';

import { Button } from 'antd';
import Icon, { PlusOutlined } from '@ant-design/icons';
import API from 'src/@crema/services/apis';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import { KEY_ACTION_COLUMN } from 'src/shared/constants/DataTable';
import { AcEditIcon, AcEyeIcon, AcTrashIcon } from 'src/assets/icon/action';
import DialogConfirm from 'src/@crema/component/DialogConfirm';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import { ITEM_PERMISSIONS } from 'src/shared/constants/Permission';

const wrapperTableIntegrateData = (Component, message = {}) => {
  return (props) => {
    const { messages } = useIntl();
    const [rowData, setRowData] = useState(null);
    const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState(false);
    const [isModalNewOpen, setIsModalNewOpen] = useState(false);
    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const { category } = props;
    const confirmMsgs = {
      title: message.title || 'confirm.deleteDestinationData',
      success: message.success || 'confirm.deleteDestinationDataSuccess',
      confirm: message.confirm || 'confirm.deleteDestinationDataSure',
      itemName: message.itemName,
    };
    return (
      <>
        <AppPageMetadata title={messages['data_integration']} />
        <DataTable
          syncURL={false}
          initTable={{
            body: {
              filters: [
                {
                  name: 'category',
                  value: category,
                  operation: 'eq',
                },
              ],
            },
          }}
          rowKey={'destination_id'}
          toolbars={[
            <Button
              key={ITEM_PERMISSIONS.ADD}
              type='primary'
              icon={<PlusOutlined />}
              onClick={() => {
                setRowData(null);
                setIsModalNewOpen(true);
              }}>
              {messages['table.toolbar.addNew']}
            </Button>,
          ]}
          url={API.GET_LIST_DESTINATION_AIR_BYTE}
          columns={[
            {
              title: <IntlMessages id='table.name' />,
              dataIndex: 'display_name',
              width: 270,
              key: 'display_name',
            },
            {
              title: <IntlMessages id='common.host' />,
              dataIndex: 'destination_type',
              width: 150,
              key: 'host',
              render: (_, row) => {
                return row?.host;
              },
            },
            {
              title: <IntlMessages id='sidebar.port' />,
              dataIndex: 'destination_type',
              width: 150,
              key: 'port',
              render: (_, row) => {
                return row?.port;
              },
            },
            {
              title: <IntlMessages id='sidebar.database_name' />,
              dataIndex: 'destination_type',
              width: 150,
              key: 'database_name',
              render: (_, row) => {
                return row?.database;
              },
            },
            {
              key: KEY_ACTION_COLUMN,
              actions: [
                {
                  label: 'table.action.detail',
                  actionName: ITEM_PERMISSIONS.VIEW,
                  icon: <Icon component={AcEyeIcon} />,
                  onClick: (data) => {
                    const convertedData = {
                      ...data,
                      name: data?.display_name,
                      destination_id: data?.id,
                    };
                    setRowData(convertedData);
                    setIsModalDetailOpen(true);
                  },
                },
                {
                  label: 'table.action.edit',
                  actionName: ITEM_PERMISSIONS.UPDATE,
                  icon: <Icon component={AcEditIcon} />,
                  onClick: (data) => {
                    const convertedData = {
                      ...data,
                      name: data?.display_name,
                      destination_id: data?.id,
                    };
                    setRowData(convertedData);
                    setIsModalEditOpen(true);
                  },
                },
                {
                  label: 'table.action.delete',
                  actionName: ITEM_PERMISSIONS.DELETE,
                  icon: <Icon component={AcTrashIcon} />,
                  onClick: (data) => {
                    const removeData = {
                      ...data,
                      destination_id: data?.id,
                    };
                    setRowData(removeData);
                    setIsDialogDeleteOpen(true);
                  },
                },
              ],
            },
          ]}>
          <Component
            rowData={rowData}
            isDialogDeleteOpen={isDialogDeleteOpen}
            setIsDialogDeleteOpen={setIsDialogDeleteOpen}
            isModalNewOpen={isModalNewOpen}
            setIsModalNewOpen={setIsModalNewOpen}
            isModalDetailOpen={isModalDetailOpen}
            setIsModalDetailOpen={setIsModalDetailOpen}
            isModalEditOpen={isModalEditOpen}
            setIsModalEditOpen={setIsModalEditOpen}
            {...props}
          />
          <DialogConfirm
            key={`delete-${rowData?.destination_id}`}
            visible={isDialogDeleteOpen}
            onClose={() => setIsDialogDeleteOpen(false)}
            textTitle={confirmMsgs.title}
            textSuccess={confirmMsgs.success}
            onSaveToServer={() =>
              instanceCoreApi.post(API.DELETE_DESTINATION_AIR_BYTE, {
                ...rowData,
                category: category,
              })
            }>
            <p>
              <IntlMessages id={confirmMsgs.confirm} />
              <span className='warning-text-color'>
                {rowData?.[message.itemName] || rowData?.name}
              </span>
            </p>
          </DialogConfirm>
        </DataTable>
      </>
    );
  };
};

wrapperTableIntegrateData.propTypes = {};

wrapperTableIntegrateData.defaultProps = {};

export default wrapperTableIntegrateData;
