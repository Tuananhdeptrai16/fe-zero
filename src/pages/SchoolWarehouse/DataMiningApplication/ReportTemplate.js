import React, { createContext, useState } from 'react';
import { useIntl } from 'react-intl';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import DataTable from 'src/@crema/core/DataTable';
import { Button, Col, Row, Table } from 'antd';
import Icon, {
  DownloadOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import { KEY_ACTION_COLUMN } from 'src/shared/constants/DataTable';
import { AcEyeIcon, AcTrashIcon } from 'src/assets/icon/action';
import { ITEM_PERMISSIONS } from 'src/shared/constants/Permission';
import API from 'src/@crema/services/apis';
import { MODAL_SIZE } from 'src/shared/constants/Modal';
import { FORM_TYPES } from 'src/shared/constants/FormDataTable';
import { isEmpty } from 'lodash';
import FormRowDataTable from 'src/@crema/component/FormRowDataTable';
import DialogConfirm from 'src/@crema/component/DialogConfirm';
import notification from 'src/shared/utils/notification';
import FormUploadTemplate from './Components/FormUploadTemplate';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import { LIST_INFO_CONFIG_INSTRUCTIONS } from 'src/shared/constants/DataSample';

export const ConTextReport = createContext();

const ReportTemplate = () => {
  const { messages } = useIntl();
  const [rowData, setRowData] = useState(null);
  const [subRowData, setSubRowData] = useState(null);
  // const [dataSource, setDataSource] = useState(LIST_CONFIG);
  // const [value, setValue] = useState('');
  const [isOpenFormAdd, setIsOpenFormAdd] = useState(false);
  const [isOpenFormSuggest, setIsOpenFormSuggest] = useState(false);
  const [isOpenFormDetail, setIsOpenFormDetail] = useState(false);
  const [isOpenSubFormDetail, setIsOpenSubFormDetail] = useState(false);
  const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState(false);
  const [reportId, setReportId] = useState(null);

  // useEffect(() => {
  //   if (isEmpty(value)) setDataSource(LIST_CONFIG);
  // }, [value]);

  return (
    <>
      <ConTextReport.Provider
        value={{
          setReportId,
        }}>
        <AppPageMetadata title={messages['report_template']} />
        <DataTable
          syncURL={false}
          initTable={{
            body: {
              filters: [],
            },
          }}
          rowKey={'id'}
          toolbars={[
            <Button
              key={ITEM_PERMISSIONS.ADD}
              type='primary'
              icon={<PlusOutlined />}
              onClick={() => {
                setRowData(null);
                setIsOpenFormAdd(true);
              }}>
              {messages['table.action.add']}
            </Button>,
          ]}
          url={API.GET_LIST_TYPE_REPORT}
          columns={[
            {
              title: <IntlMessages id='table.report_type' />,
              dataIndex: 'type_report_name',
              width: 500,
              key: 'type_report_name',
            },
            {
              key: KEY_ACTION_COLUMN,
              actions: [
                {
                  label: 'table.action.detail',
                  actionName: ITEM_PERMISSIONS.VIEW,
                  icon: <Icon component={AcEyeIcon} />,
                  onClick: (data) => {
                    setRowData(data);
                    setIsOpenFormDetail(true);
                  },
                },
                {
                  label: 'table.action.guide',
                  actionName: ITEM_PERMISSIONS.VIEW,
                  icon: <Icon component={QuestionCircleOutlined} />,
                  onClick: (data) => {
                    setRowData(data);
                    setIsOpenFormSuggest(true);
                  },
                },
              ],
            },
          ]}>
          {/* Add or Update */}
          <DialogConfirm
            textTitle='Thêm mới mẫu báo cáo tĩnh'
            textSuccess={'Thêm mới thành công'}
            textButtonConfirm='Tạo mới'
            onSaveToServer={(data) => {
              const bodyFormData = new FormData();
              bodyFormData.append('file', data.file);
              return instanceCoreApi.post(
                API.UPLOAD_TEMPLATE_REPORT(reportId),
                bodyFormData,
                {
                  headers: { 'Content-Type': 'multipart/form-data' },
                },
              );
            }}
            visible={isOpenFormAdd}
            onClose={() => setIsOpenFormAdd(false)}>
            <FormUploadTemplate />
          </DialogConfirm>
          {/* Show detail */}
          <FormRowDataTable
            title={
              rowData?.type_report_name
                ? rowData?.type_report_name
                : `Báo cáo ${rowData?.id}`
            }
            key={'detail_data_api_share'}
            size={MODAL_SIZE.XLARGE}
            preSaveData={(data) => {
              return data;
            }}
            visible={isOpenFormDetail}
            onClose={() => setIsOpenFormDetail(false)}
            formType={FORM_TYPES.INFO}
            isOpenFormDetail
            initialValues={isEmpty(rowData) ? {} : rowData}>
            <DataTable
              syncURL={false}
              isShowHeaderTable={false}
              initTable={{
                body: {
                  filters: [
                    {
                      name: 'type_report_id',
                      value: rowData?.id,
                      operation: 'eq',
                    },
                  ],
                },
              }}
              rowKey={'id'}
              url={API.GET_LIST_LINK_BY_TYPE_REPORT}
              columns={[
                {
                  title: <IntlMessages id='table.report_type.name_report' />,
                  dataIndex: 'report_name',
                  width: 500,
                  key: 'report_name',
                  // render: (_, data) => {
                  //   return data.type_report.type_report_name;
                  // },
                },
                {
                  title: <IntlMessages id='table.report_type.poster' />,
                  dataIndex: 'type_report_name',
                  width: 500,
                  key: 'type_report_name',
                  render: (_, data) => {
                    return data?.user_infor?.full_name || '';
                  },
                },
                {
                  key: KEY_ACTION_COLUMN,
                  actions: [
                    {
                      label: 'table.toolbar.download',
                      actionName: ITEM_PERMISSIONS.VIEW,
                      icon: <Icon component={DownloadOutlined} />,
                      onClick: (data) => {
                        fetch(data?.link, {
                          method: 'GET',
                        })
                          .then((response) => response.blob())
                          .then((blob) => {
                            // Create blob link to download
                            const url = window.URL.createObjectURL(
                              new Blob([blob]),
                            );
                            const link = document.createElement('a');
                            link.href = url;
                            link.setAttribute(
                              'download',
                              `${data?.report_name}`,
                            );

                            // Append to html link element page
                            document.body.appendChild(link);

                            // Start download
                            link.click();

                            // Clean up and remove the link
                            link.parentNode.removeChild(link);

                            notification.success('Tải mẫu báo cáo thành công!');
                          });
                      },
                    },
                    {
                      label: 'table.action.delete',
                      actionName: ITEM_PERMISSIONS.DELETE,
                      icon: <Icon component={AcTrashIcon} />,
                      onClick: (data) => {
                        console.log(data);
                        // setRowData(data);
                        setSubRowData(data);
                        setIsDialogDeleteOpen(true);
                      },
                    },
                  ],
                },
              ]}>
              <FormRowDataTable
                title={'Thông tin truy cập'}
                key={'detail_data_api_share'}
                size={MODAL_SIZE.MEDIUM}
                preSaveData={(data) => {
                  return data;
                }}
                visible={isOpenSubFormDetail}
                onClose={() => setIsOpenSubFormDetail(false)}
                formType={FORM_TYPES.INFO}
                isOpenSubFormDetail
                initialValues={
                  isEmpty(rowData) ? {} : rowData
                }></FormRowDataTable>
              {/* Delete */}
              <DialogConfirm
                key={`delete-${subRowData?.client_id}`}
                visible={isDialogDeleteOpen}
                onClose={() => setIsDialogDeleteOpen(false)}
                textTitle={'confirm.deleteReportTemplate'}
                textSuccess={'confirm.deleteReportTemplateSuccess'}
                onSaveToServer={() =>
                  instanceCoreApi.delete(API.DELETE_REPORT(subRowData?.id))
                }>
                <p>
                  <IntlMessages id='confirm.deleteReportTemplateSure' />
                  <span className='warning-text-color'>
                    {subRowData?.report_name}
                  </span>
                </p>
              </DialogConfirm>
            </DataTable>
          </FormRowDataTable>
          {/* Show suggest */}
          <FormRowDataTable
            title={'table.action.guide_config'}
            key={'detail_data_suggest_config'}
            size={MODAL_SIZE.XLARGE}
            preSaveData={(data) => {
              return data;
            }}
            visible={isOpenFormSuggest}
            onClose={() => setIsOpenFormSuggest(false)}
            formType={FORM_TYPES.INFO}
            isOpenFormSuggest
            initialValues={isEmpty(rowData) ? {} : rowData}>
            {/* <Row gutter={[12, 12]}>
              <Space
                align='center'
                style={{
                  width: '100%',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  marginBottom: '16px',
                }}>
                <Col span={12}>
                  <Search
                    style={{ width: 230, height: 32 }}
                    placeholder='Nhập nội dung tìm kiếm'
                    value={value}
                    onChange={(e) => {
                      const currValue = e.target.value;
                      setValue(currValue);
                      const filteredData = LIST_CONFIG.filter((entry) =>
                        entry?.name.includes(currValue),
                      );
                      console.log(filteredData);
                      setDataSource(filteredData);
                    }}
                  />
                </Col>
              </Space>
            </Row> */}

            <Row gutter={[12, 12]}>
              <Col span={24}>
                <Table
                  dataSource={LIST_INFO_CONFIG_INSTRUCTIONS}
                  rowKey={'id'}
                  bordered
                  pagination={false}
                  columns={[
                    {
                      dataIndex: 'serial',
                      key: 'serial',
                      width: 50,
                      render: (value, row, index) => ({
                        children: value,
                        props: {
                          rowSpan: [1, 6, 11, 17].includes(index)
                            ? 5
                            : index === 0 || index === 16
                            ? undefined
                            : 0,
                        },
                      }),
                    },
                    {
                      dataIndex: 'colH',
                      key: 'colH',
                      width: 150,
                    },
                    {
                      dataIndex: 'colC1',
                      key: 'colC1',
                      width: 150,
                    },
                    {
                      dataIndex: 'colC2',
                      key: 'colC2',
                      width: 150,
                    },
                    {
                      dataIndex: 'colC3',
                      key: 'colC3',
                      width: 150,
                    },
                    {
                      dataIndex: 'colCDots',
                      key: 'colCDots',
                      width: 150,
                    },
                    {
                      dataIndex: 'colCn',
                      key: 'colCn',
                      width: 150,
                    },
                  ]}></Table>
              </Col>
            </Row>
          </FormRowDataTable>
        </DataTable>
      </ConTextReport.Provider>
    </>
  );
};

export default ReportTemplate;
