import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import DataTable from 'src/@crema/core/DataTable';
// import { Button } from 'antd';
// import { PlusOutlined } from '@ant-design/icons';
import IntlMessages from 'src/@crema/utility/IntlMessages';
// import { ITEM_PERMISSIONS } from 'src/shared/constants/Permission';
import API from 'src/@crema/services/apis';
import { formatDateJs } from 'src/shared/utils/DateTime';
import { TIMESTAMP } from 'src/shared/constants/Format';
import './index.style.less';
import FormRowDataTable from 'src/@crema/component/FormRowDataTable';
import { MODAL_SIZE } from 'src/shared/constants/Modal';
import { FORM_TYPES } from 'src/shared/constants/FormDataTable';
import notification from 'src/shared/utils/notification';

const ExportHistory = () => {
  const { messages } = useIntl();
  const [rowData, setRowData] = useState(null);
  const [isOpenType, setIsOpenType] = useState(false);
  const [isOpenTemplate, setIsOpenTemplate] = useState(false);
  return (
    <div>
      <AppPageMetadata title={messages['export_history']} />
      <DataTable
        syncURL={false}
        initTable={{
          body: {},
        }}
        rowKey={'id'}
        url={API.GET_LIST_HISTORY}
        columns={[
          {
            title: <IntlMessages id='table.report_type' />,
            dataIndex: 'type_report',
            width: 140,
            key: 'type_report',
            render: (_, data) => {
              return (
                <div
                  className='title'
                  onClick={() => {
                    setRowData(data);
                    setIsOpenType(true);
                  }}>
                  {data?.type_report?.type_report_name}
                </div>
              );
            },
          },
          {
            title: <IntlMessages id='table.report_type.report' />,
            dataIndex: 'report_template_name',
            width: 140,
            key: 'report_template_name',
            render: (_, data) => {
              return (
                <div
                  className='title'
                  onClick={() => {
                    setRowData(data);
                    fetch(data?.link_result_template, {
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
                          `${data?.report_template_name}`,
                        );

                        // Append to html link element page
                        document.body.appendChild(link);

                        // Start download
                        link.click();

                        // Clean up and remove the link
                        link.parentNode.removeChild(link);

                        notification.success('Xuất mẫu báo cáo thành công!');
                      });
                  }}>
                  {_}
                </div>
              );
            },
          },
          {
            title: <IntlMessages id='table.report_type.reporter' />,
            dataIndex: 'client_id',
            width: 140,
            key: 'client_id',
          },
          {
            title: <IntlMessages id='table.report_type.time' />,
            dataIndex: 'created_at',
            width: 150,
            key: 'created_at',
            align: 'center',
            render: (record) => formatDateJs(record, TIMESTAMP),
          },
          // {
          //   key: KEY_ACTION_COLUMN,
          //   actions: [
          //     {
          //       label: 'table.action.detail',
          //       actionName: ITEM_PERMISSIONS.VIEW,
          //       icon: <Icon component={AcEyeIcon} />,
          //       // onClick: (data) => {
          //       //   setRowData(data);
          //       //   setIsOpenFormDetail(true);
          //       // },
          //     },
          //     {
          //       label: 'table.action.suggest',
          //       actionName: ITEM_PERMISSIONS.VIEW,
          //       icon: <Icon component={QuestionCircleOutlined} />,
          //       // onClick: (data) => {
          //       //   setRowData(data);
          //       //   setIsOpenFormHistory(true);
          //       // },
          //     },
          //   ],
          // },
        ]}>
        {/* Show detail type */}
        <FormRowDataTable
          title={rowData?.type_report?.type_report_name}
          key={'detail_data_api_share'}
          size={MODAL_SIZE.XLARGE}
          preSaveData={(data) => {
            return data;
          }}
          visible={isOpenType}
          onClose={() => setIsOpenType(false)}
          formType={FORM_TYPES.INFO}
          isExport
          isOpenType
          rowData={rowData}>
          <img src={rowData?.link_result_snapshot} />
        </FormRowDataTable>
        {/* Show detail template*/}
        <FormRowDataTable
          // title={rowData?.type_report?.type_report_name}
          key={'detail_template'}
          size={MODAL_SIZE.MEDIUM}
          preSaveData={(data) => {
            return data;
          }}
          visible={isOpenTemplate}
          onClose={() => setIsOpenTemplate(false)}
          formType={FORM_TYPES.INFO}
          isOpenTemplate></FormRowDataTable>
      </DataTable>
    </div>
  );
};

export default ExportHistory;
