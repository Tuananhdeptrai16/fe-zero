import React, { useRef, useState } from 'react';
import { Col, Row, Typography } from 'antd';
import { useIntl } from 'react-intl';
import IntlMessages from 'src/@crema/utility/IntlMessages';

import DataTable from 'src/@crema/core/DataTable';
import API from 'src/@crema/services/apis/index';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import ActionConfig from '../ActionConfig/ActionConfig';
import { TYPES_DATA_SHARING } from 'src/shared/constants/DataFixed';
import useGetDataConfig from '../../Hook/useGetDataConfig';
import { KEY_ACTION_COLUMN } from 'src/shared/constants/DataTable';
import { CopyOutlined, ExperimentOutlined } from '@ant-design/icons';
import AntModal from 'src/@crema/component/AntModal';
import { MODAL_SIZE } from 'src/shared/constants/Modal';
import AntButton from 'src/@crema/component/AntButton';
import notification from 'src/shared/utils/notification';
import { getToken } from 'src/@crema/services/Application/AuthenStorage';
import ListApiShare from '../ListApiShare/ListApiShare';
import FormRowDataTable from 'src/@crema/component/FormRowDataTable';
import { FORM_TYPES } from 'src/shared/constants/FormDataTable';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import FormInputNumber from 'src/@crema/core/Form/FormInputNumber';
const { Paragraph } = Typography;

ListApiRetry.propTypes = {};

function ListApiRetry() {
  const { dataStep, isConfigPermission } = useGetDataConfig();
  const { messages } = useIntl();
  const { table, sourceCSDL } = dataStep;
  const [rowData, setRowData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCopyCurl, setIsCopyCurl] = useState(null);
  const token = getToken();
  const refCopy = useRef();
  const [dataRenderRetry, setDataRenderRetry] = useState([]);
  const [isOpenFormExploitationData, setIsOpenFormExploitationData] =
    useState(false);
  const [pageSizeTable, setPageSizeTable] = useState(null);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(refCopy.current.innerText)
      .then(() => {
        notification.success('Sao chép thành công');
        setIsModalOpen(false);
      })
      .catch(() => {
        notification.warning('Sao chép thất bại');
      });
  };

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
          title: <IntlMessages id='table.api_share' />,
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

    !isConfigPermission
      ? {
          key: KEY_ACTION_COLUMN,
          actions: [
            {
              label: 'Chạy thử',
              // actionName: ITEM_PERMISSIONS.UPDATE,
              icon: <ExperimentOutlined />,
              onClick: (data) => {
                setIsCopyCurl(false);
                setRowData(data);
                setIsOpenFormExploitationData(true);
              },
            },
            {
              label: 'Copy cấu hình truy xuất API',
              // actionName: ITEM_PERMISSIONS.DELETE,
              icon: <CopyOutlined />,
              onClick: (data) => {
                setIsCopyCurl(true);
                setRowData(data);
                setIsModalOpen(true);
                setIsOpenFormExploitationData(false);
              },
            },
          ],
        }
      : null,
  ].filter(Boolean);

  return (
    <div>
      <AppPageMetadata
        title={
          isConfigPermission
            ? messages['sidebar.select_table_by_source']
            : messages['sidebar.list_api_share']
        }
      />
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <Row>
            <Col span={24}>
              <h4 className='mb-1'>
                {isConfigPermission
                  ? messages['sidebar.select_table_by_source']
                  : messages['sidebar.list_api_share']}
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
                            name: 'table_id',
                            operation: 'eq',
                            value: table[0],
                          },
                        ],
                      }
                }
                url={
                  isConfigPermission
                    ? API.GET_TABLE_BY_SOURCE_ID
                    : API.GET_TABLE_RETRY_DATA_API
                }
                itemSelected={
                  isConfigPermission
                    ? {
                        type: 'radio',
                        action: 'table.continue',
                        clickAction: () => {},
                        preItemSelect: (items) => {
                          return items;
                        },
                        prevData: table ? table : null,
                      }
                    : null
                }
                columns={columnsTable}>
                <ActionConfig
                  type={
                    isConfigPermission
                      ? TYPES_DATA_SHARING.select_table
                      : TYPES_DATA_SHARING.list_api_share
                  }
                />
                <FormRowDataTable
                  title={'Nhập thông tin khai thác dữ liệu'}
                  buttonText={'Thực hiện'}
                  key={'exploitation_data_api_share'}
                  size={MODAL_SIZE.MEDIUM}
                  preSaveData={(data) => {
                    const dataSendServer = {
                      warehouse_table_department_id: rowData?.id,
                      pageable: {
                        page: data?.page || 1,
                        page_size: data?.page_size || 10,
                      },
                    };
                    setPageSizeTable({
                      page: data?.page || 1,
                      page_size: data?.page_size || 10,
                    });
                    return dataSendServer;
                  }}
                  visible={isOpenFormExploitationData}
                  onClose={() => setIsOpenFormExploitationData(false)}
                  formType={FORM_TYPES.RETRIEVE_API}
                  method={METHOD_FETCH.POST}
                  resource={API.GET_LIST_API_SHARE}
                  onSuccess={(response) => {
                    setDataRenderRetry(response?.result?.items || []);
                    setIsOpenFormExploitationData(false);
                    setIsModalOpen(true);
                  }}
                  initialValues={{}}>
                  <Row gutter={[12, 12]}>
                    <Col span={12}>
                      <FormInputNumber
                        required
                        label='Trang muốn xem'
                        name='page'
                        rules={{ numeric_positive: [] }}
                      />
                    </Col>
                    <Col span={12}>
                      <FormInputNumber
                        required
                        label='Tổng số bản ghi trên 1 trang'
                        name='page_size'
                        rules={{ numeric_positive: [], betweenLength: [2, 3] }}
                      />
                    </Col>
                  </Row>
                </FormRowDataTable>
              </DataTable>
            </Col>
          </Row>
        </Col>
      </Row>
      <AntModal
        title={isCopyCurl ? 'Copy cấu hình truy xuất API' : 'Thử nghiệm'}
        bodyStyle={{ maxHeight: '75vh', overflow: 'auto' }}
        onCancel={() => {
          setIsModalOpen(false);
          setRowData(null);
        }}
        onOk={() => {
          setIsModalOpen(false);
        }}
        centered
        open={isModalOpen}
        footer={
          <>
            <AntButton
              onClick={() => {
                setIsModalOpen(false);
              }}>
              Hủy
            </AntButton>
            {isCopyCurl && (
              <AntButton type='primary' onClick={handleCopy}>
                Copy
              </AntButton>
            )}
          </>
        }
        size={isCopyCurl ? MODAL_SIZE.MEDIUM : MODAL_SIZE.LARGE}>
        {isCopyCurl ? (
          <Paragraph
            ref={
              refCopy
            }>{`curl 'https://pdp-api.mhdigital.vn/api/v1/admin/warehouse-table-department/retrieve-data-api' \
  -H 'accept: application/json' \
  -H 'accept-language: vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5' \
  -H 'authorization: Bearer ${token}' \
  -H 'cache-control: no-cache' \
  -H 'client_id: 10755d6d-ab5b-4e8b-b602-438555804116' \
  -H 'content-type: application/json' \
  -H 'pragma: no-cache' \
  -H 'priority: u=1, i' \
  -H 'sec-ch-ua: "Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "Windows"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: cross-site' \
  -H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36' \
  --data-raw '{"filters":[],"pageable":{"page":1,"page_size":10,"sort":[{"property":"id","direction":"desc"}]},"warehouse_table_department_id":${rowData?.id}}'`}</Paragraph>
        ) : (
          <ListApiShare
            dataRenderRetry={dataRenderRetry}
            pageSizeTable={pageSizeTable}
          />
        )}
      </AntModal>
    </div>
  );
}

export default ListApiRetry;
