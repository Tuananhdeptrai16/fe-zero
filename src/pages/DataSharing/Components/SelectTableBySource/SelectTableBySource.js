import React from 'react';
import { Col, Row } from 'antd';
import { useIntl } from 'react-intl';
import IntlMessages from 'src/@crema/utility/IntlMessages';

import DataTable from 'src/@crema/core/DataTable';
import API from 'src/@crema/services/apis/index';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import ActionConfig from '../ActionConfig/ActionConfig';
import { TYPES_DATA_SHARING } from 'src/shared/constants/DataFixed';
import useGetDataConfig from '../../Hook/useGetDataConfig';

SelectTableBySource.propTypes = {};

function SelectTableBySource() {
  const { dataStep, isConfigPermission } = useGetDataConfig();
  const { messages } = useIntl();
  const { table, sourceCSDL } = dataStep;

  const columnsTable = [
    isConfigPermission
      ? {
          title: <IntlMessages id='table.name_table' />,
          dataIndex: 'name',
          width: 200,
          fixed: 'left',
          key: 'name',
        }
      : {
          title: <IntlMessages id='table.name_table' />,
          dataIndex: 'table',
          width: 200,
          fixed: 'left',
          key: 'table',
          render: (_, record) => {
            return record?.table?.name;
          },
        },
    !isConfigPermission
      ? {
          title: 'Tên tổ chức con',
          dataIndex: 'department',
          width: 200,
          key: 'department',
          render: (_, record) => {
            return record?.department?.department_name;
          },
        }
      : null,
    !isConfigPermission
      ? {
          title: 'Tên tổ chức mẹ',
          dataIndex: 'department',
          width: 200,
          key: 'department',
          render: (_, record) => {
            return record?.department?.organization?.display_name;
          },
        }
      : null,
    !isConfigPermission
      ? {
          title: 'Tên nguồn dữ liệu',
          dataIndex: 'data_warehouse_info',
          width: 200,
          key: 'data_warehouse_info',
          render: (_, record) => {
            return record?.data_warehouse_info?.name;
          },
        }
      : null,
  ].filter(Boolean);

  return (
    <div>
      <AppPageMetadata
        title={
          isConfigPermission
            ? messages['sidebar.select_table_by_source']
            : messages['sidebar.share_table_list']
        }
      />
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <Row>
            <Col span={24}>
              <h4 className='mb-1'>
                {isConfigPermission
                  ? messages['sidebar.select_table_by_source']
                  : messages['sidebar.share_table_list']}
              </h4>
            </Col>
            <Col span={24}>
              <DataTable
                initTable={
                  isConfigPermission
                    ? {
                        body: {
                          data_warehouse_info_id: sourceCSDL,
                        },
                      }
                    : {
                        filter: [
                          {
                            name: 'data_warehouse_info_id',
                            operation: 'eq',
                            value: sourceCSDL,
                          },
                        ],
                      }
                }
                url={
                  isConfigPermission
                    ? API.GET_TABLE_BY_SOURCE_ID
                    : API.GET_TABLE_RETRY_DATA_API
                }
                itemSelected={{
                  type: 'radio',
                  action: 'table.continue',
                  clickAction: () => {},
                  preItemSelect: (items) => {
                    return items;
                  },
                  prevData: isConfigPermission ? (table ? table : null) : null,
                }}
                columns={columnsTable}>
                <ActionConfig type={TYPES_DATA_SHARING.select_table} />
              </DataTable>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default SelectTableBySource;
