import {
  EyeOutlined,
  FileSearchOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import Icon from '@ant-design/icons/lib/components/Icon';
import { Button } from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import DialogConfirm from 'src/@crema/component/DialogConfirm';
import { RenderDate } from 'src/@crema/component/TableRender';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import DataTable from 'src/@crema/core/DataTable';
import API from 'src/@crema/services/apis';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import { AcEditIcon, AcTrashIcon } from 'src/assets/icon/action';
import config from 'src/config';
import { TYPE_DATA_MARK_SCHOOL_WAREHOUSE } from 'src/shared/constants/DataFixed';
import { KEY_ACTION_COLUMN } from 'src/shared/constants/DataTable';
import { ITEM_PERMISSIONS } from 'src/shared/constants/Permission';
import { KEY_PARAM_DATA_MARK } from 'src/shared/constants/SearchParams';
import ResultFormula from './ResultFormula';
import { MODAL_SIZE } from 'src/shared/constants/Modal';

const FormulaManagement = () => {
  const { messages } = useIntl();
  const [rowData, setRowData] = useState(null);
  const [isDialogOpen, setIsOpenDialog] = useState(false);
  const [isResultFormula, setIsResultFormula] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <AppPageMetadata title={messages['sidebar.formula_management']} />
      <DataTable
        toolbars={[
          <Button
            key={ITEM_PERMISSIONS.ADD}
            type='primary'
            icon={<PlusOutlined />}
            onClick={() => {
              setRowData(null);
              navigate(
                `${config?.routes?.formulaManageAdd}?${KEY_PARAM_DATA_MARK}=${TYPE_DATA_MARK_SCHOOL_WAREHOUSE.FML}`,
              );
            }}>
            {messages['table.formula_add']}
          </Button>,
        ]}
        url={API.GET_LIST_FORMULA_CALCULATION}
        columns={[
          {
            title: <IntlMessages id='table.formula' />,
            dataIndex: 'formula_name',
            width: 200,
            key: 'formula_name',
          },
          {
            title: <IntlMessages id='common.email' />,
            dataIndex: ['user_info_response', 'email'],
            width: 200,
            key: 'user_info_response',
          },
          {
            title: <IntlMessages id='table.organization' />,
            dataIndex: ['organization_response', 'display_name'],
            width: 200,
            key: 'organization_response',
          },
          {
            title: <IntlMessages id='table.formula_time_add_date' />,
            dataIndex: 'created_at',
            width: 200,
            key: 'created_at',
            align: 'center',
            render: (data) => <RenderDate value={data} />,
          },
          {
            key: KEY_ACTION_COLUMN,
            actions: [
              {
                label: 'table.action.detail',
                actionName: ITEM_PERMISSIONS.VIEW,
                icon: <EyeOutlined />,
                onClick: (data) => {
                  navigate(
                    `${config?.routes?.formulaManageDetail(
                      data?.id,
                    )}?detail=true`,
                  );
                },
              },
              {
                label: 'table.formula_result',
                actionName: ITEM_PERMISSIONS.VIEW,
                icon: <FileSearchOutlined />,
                onClick: (data) => {
                  setIsResultFormula(true);
                  setRowData(data);
                  setIsOpenDialog(true);
                },
              },
              {
                label: 'table.action.edit',
                actionName: ITEM_PERMISSIONS.UPDATE,
                icon: <Icon component={AcEditIcon} />,
                onClick: (data) => {
                  navigate(
                    `${config?.routes?.formulaManageDetail(
                      data?.id,
                    )}?update=true`,
                  );
                },
              },
              {
                label: 'table.action.delete',
                actionName: ITEM_PERMISSIONS.DELETE,
                icon: <Icon component={AcTrashIcon} />,
                onClick: (data) => {
                  setIsResultFormula(false);
                  setRowData(data);
                  setIsOpenDialog(true);
                },
              },
            ],
          },
        ]}>
        <DialogConfirm
          key={isResultFormula ? 'result-formula' : 'delete-formula'}
          visible={isDialogOpen}
          onClose={() => setIsOpenDialog(false)}
          maxLength={99}
          textTitle={
            isResultFormula
              ? `Công thức: ${rowData?.formula_name}`
              : 'confirm.deleteFormula'
          }
          size={isResultFormula ? MODAL_SIZE.LARGE : MODAL_SIZE.MEDIUM}
          textButtonConfirm={isResultFormula ? '' : 'dialog.button.confirm'}
          textSuccess={'confirm.deleteFormulaSuccess'}
          onSaveToServer={() =>
            instanceCoreApi.delete(API.DELETE_FORMULA(rowData?.id))
          }>
          {isResultFormula ? (
            <ResultFormula rowData={rowData} />
          ) : (
            <p>
              <IntlMessages id={'confirm.deleteFormulaSure'} />
              <span className='warning-text-color'>
                {rowData?.formula_name}
              </span>
            </p>
          )}
        </DialogConfirm>
      </DataTable>
    </>
  );
};

export default FormulaManagement;
