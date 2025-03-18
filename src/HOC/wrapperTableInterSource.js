import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import DataTable from 'src/@crema/core/DataTable';
import { Button } from 'antd';
import Icon, { PlusOutlined } from '@ant-design/icons';
import API from 'src/@crema/services/apis';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import { KEY_ACTION_COLUMN } from 'src/shared/constants/DataTable';
import { AcEditIcon, AcTrashIcon } from 'src/assets/icon/action';
import DialogConfirm from 'src/@crema/component/DialogConfirm';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import { ITEM_PERMISSIONS } from 'src/shared/constants/Permission';
import { isEmpty } from 'src/shared/utils/Typeof';
import {
  SOURCE_DEFINITION_API_ID,
  SOURCE_DEFINITION_FILE_ID,
  SOURCE_DEFINITION_MSSQL_ID,
  SOURCE_DEFINITION_MYSQL_ID,
  SOURCE_DEFINITION_ORACLE_ID,
  SOURCE_DEFINITION_POSTGRES_ID,
} from 'src/shared/constants/DataFixed';

const wrapperTableInterSource = (Component) => {
  return (props) => {
    const { messages } = useIntl();
    const [rowData, setRowData] = useState(null);
    const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState(false);
    const [isModalNewOpen, setIsModalNewOpen] = useState(false);
    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [typeName, setTypeName] = useState(null);
    const { category } = props;
    const getSourceDefinitionName = (source_definition_id) => {
      const sourceDefinitionNameList = {
        [SOURCE_DEFINITION_MSSQL_ID]: 'Microsoft SQL Server (MSSQL)',
        [SOURCE_DEFINITION_POSTGRES_ID]: 'PostgreSQL',
        [SOURCE_DEFINITION_MYSQL_ID]: 'MySQL',
        [SOURCE_DEFINITION_ORACLE_ID]: 'Oracle',
        [SOURCE_DEFINITION_FILE_ID]: 'File',
        [SOURCE_DEFINITION_API_ID]: 'API',
      };
      return sourceDefinitionNameList[source_definition_id] || 'API';
    };
    return (
      <>
        <AppPageMetadata title={messages['list_data_source']} />
        {category && (
          <DataTable
            syncURL={false}
            initTable={{
              body: {
                types: !isEmpty(typeName) ? [typeName] : [],
                filters: [
                  {
                    name: 'category',
                    value: category,
                    operation: 'eq',
                  },
                ],
              },
            }}
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
            url={API.SEARCH_SOURCE_AIR_BYTE}
            onQuery={({ values }) => {
              setTypeName(values?.type_id?.label);
            }}
            event={{ onReset: () => {} }}
            columns={[
              {
                title: <IntlMessages id='common.sourceName' />,
                dataIndex: 'display_name',
                width: 200,
                key: 'display_name',
              },
              {
                title: <IntlMessages id='sidebar.data_type' />,
                dataIndex: 'source_definition_id',
                width: 200,
                key: 'source_definition_id',
                render: (source_definition_id) =>
                  getSourceDefinitionName(source_definition_id),
              },
              {
                title: <IntlMessages id='sidebar.host' />,
                dataIndex: ['properties', 'host'],
                width: 150,
                key: 'properties_host',
                render: (_, record) => {
                  return <span>{record?.properties?.host || '-'}</span>;
                },
              },
              {
                title: <IntlMessages id='sidebar.port' />,
                dataIndex: ['properties', 'port'],
                width: 150,
                key: 'properties_port',
                render: (_, record) => {
                  return <span>{record?.properties?.port || '-'}</span>;
                },
              },
              {
                title: <IntlMessages id='sidebar.database_name' />,
                dataIndex: ['properties', 'database'],
                width: 170,
                key: 'properties_database',
                render: (_, record) => {
                  return <span>{record?.properties?.database || '-'}</span>;
                },
              },
              {
                key: KEY_ACTION_COLUMN,
                actions: [
                  {
                    label: 'table.action.edit',
                    actionName: ITEM_PERMISSIONS.UPDATE,
                    icon: <Icon component={AcEditIcon} />,
                    onClick: (data) => {
                      const convertedData = {
                        ...data,
                        connection_configuration: data?.properties,
                        source_id: data?.airbyte_source_id,
                        name: data?.display_name,
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
                      setRowData(data);
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
              textTitle={'confirm.deleteSourceData'}
              textSuccess={'confirm.deleteSourceDataSuccess'}
              onSaveToServer={() =>
                instanceCoreApi.post(API.DELETE_SOURCE_AIR_BYTE, {
                  source_id: rowData?.airbyte_source_id,
                  category: category,
                })
              }>
              <p>
                <IntlMessages id='confirm.deleteSourceDataSure' />
                <span className='warning-text-color'>
                  {rowData?.display_name || rowData?.name}
                </span>
              </p>
            </DialogConfirm>
          </DataTable>
        )}
      </>
    );
  };
};

wrapperTableInterSource.propTypes = {};

wrapperTableInterSource.defaultProps = {};

export default wrapperTableInterSource;
