import React, { useState } from 'react';
import DataTable from 'src/@crema/core/DataTable';
import {
  FILTER_OPERATION,
  KEY_ACTION_COLUMN,
} from 'src/shared/constants/DataTable';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import Icon from '@ant-design/icons';
import { PrinterOutlined } from '@ant-design/icons';
import { useIntl } from 'react-intl';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata/index';
import DialogConfirm from 'src/@crema/component/DialogConfirm/index';

import FormRowDataTable from 'src/@crema/component/FormRowDataTable/index';
import { FORM_TYPES } from 'src/shared/constants/FormDataTable';
import API from 'src/@crema/services/apis/index';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import {
  AcEditIcon,
  AcEyeInvisibleIcon,
  AcTrashIcon,
  DownLoadIcon,
} from 'src/assets/icon/action';
import { deleteListConfigParameterDissection } from 'src/@crema/services/configParameterDissection.service.js';
import { useNavigate } from 'react-router-dom';
import FormListConfigDissection from '../ConfigParameterDissection/ListConfigDocumentDissection/FormListConfigDissection';

function GeneralPermisson({ value }) {
  const { messages } = useIntl();
  const navigate = useNavigate();
  const [rowData, setRowData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const deleteToServer = () => {
    return deleteListConfigParameterDissection(rowData?.id);
  };

  return (
    <>
      <AppPageMetadata
        title={messages['sidebar.listconfig_document_dissection']}
      />
      <DataTable
        initTable={{
          filters: [
            {
              name: 'code',
              value: { value },
              operation: FILTER_OPERATION.EQ,
            },
          ],
        }}
        url={API.SEARCH_LIST_CONFIG_PARAMETER_DISSECTION}
        columns={[
          {
            title: 'Loại tài liệu',
            dataIndex: 'name',
            width: 200,
            fixed: 'left',
            key: 'name',
            sorter: true,
          },
          {
            title: 'Họ và tên công dân/tổ chức',
            dataIndex: 'document_type',
            width: 200,
            key: 'display_name',
            render: (documentType) => documentType?.display_name,
          },
          {
            // title: <IntlMessages id='table.description' />,
            title: 'CCCD/Mã số doanh nghiệp',
            dataIndex: 'field_name',
            sorter: true,
            key: 'field_name',
            width: 300,
          },
          {
            // title: <IntlMessages id='table.description' />,
            title: 'Người đăng tải',
            dataIndex: 'field_name',
            sorter: true,
            key: 'field_name',
            width: 300,
          },
          {
            title: 'Thời gian đăng tải',
            dataIndex: 'key',
            sorter: true,
            key: 'key',
            width: 300,
          },
          {
            key: KEY_ACTION_COLUMN,
            actions: [
              {
                label: 'table.action.print',
                actionName: ITEM_PERMISSIONS.UPDATE,
                icon: <PrinterOutlined />,
                onClick: (data) => {
                  setRowData(data);
                  setIsModalOpen(true);
                },
              },
              {
                label: 'table.action.editData',
                actionName: ITEM_PERMISSIONS.UPDATE,
                icon: <Icon component={AcEditIcon} />,
                onClick: (data) => {
                  setRowData(data);
                  setIsModalOpen(true);
                },
              },
              {
                label: 'table.action.deleteData',
                actionName: ITEM_PERMISSIONS.DELETE,
                icon: <Icon component={AcTrashIcon} />,
                onClick: (data) => {
                  setRowData(data);
                  setIsDialogOpen(true);
                },
              },
              {
                label: 'table.action.downFile',
                actionName: ITEM_PERMISSIONS.UPDATE,
                icon: <DownLoadIcon />,
                onClick: (data) => {
                  setRowData(data);
                  setIsModalOpen(true);
                },
              },
              {
                label: 'table.action.detailUpdate',
                actionName: ITEM_PERMISSIONS.UPDATE,
                icon: <Icon component={AcEyeInvisibleIcon} />,
                onClick: () => {
                  navigate(`/document/raw-document`);
                },
              },
            ],
          },
        ]}>
        <FormRowDataTable
          key={rowData && `action-${rowData?.id}`}
          visible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          formType={rowData ? FORM_TYPES.UPDATE : FORM_TYPES.ADD}
          method={rowData ? METHOD_FETCH.PUT : METHOD_FETCH.POST}
          resource={
            rowData
              ? API.UPDATE_LIST_CONFIG_PARAMETER_DISSECTION(rowData?.id)
              : API.CREATE_LIST_CONFIG_PARAMETER_DISSECTION
          }
          initialValues={rowData ? rowData : {}}>
          {/* form add and change */}
          <FormListConfigDissection />
        </FormRowDataTable>

        <DialogConfirm
          key={rowData?.id}
          visible={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          textTitle={'confirm.deleteConfigParameterDissection'}
          textSuccess={'confirm.deleteConfigParameterDissectionSuccess'}
          onSaveToServer={deleteToServer}>
          <p>
            <IntlMessages id='confirm.deleteConfigParameterDissectionSure' />
            <span className='warning-text-color'>{rowData?.name}</span>
          </p>
        </DialogConfirm>
      </DataTable>
    </>
  );
}
export default GeneralPermisson;
