import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import { RenderDateTime } from 'src/@crema/component/TableRender';
import RenderNameUser from 'src/@crema/component/TableRender/RenderNameUser';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import DataTable from 'src/@crema/core/DataTable';
import API from 'src/@crema/services/apis';
import { Drawer } from 'antd';
import { CloseOutlined, FilePdfOutlined } from '@ant-design/icons';
import AppScrollbar from 'src/@crema/core/AppScrollbar';
import { LogDetail } from 'src/pageComponents/systemLog/LogDetail';
import AppIconButton from 'src/@crema/core/AppIconButton';
import useCallApi from 'src/@crema/hook/useCallApi';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import { PdfDocumentTable } from 'src/pageComponents/systemLog/TableActionLog_PDF';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

export const TableActionLog = ({ initTable }) => {
  const { messages } = useIntl();

  const [rowData, setRowData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { send: downloadData, loading: isLoadingDownload } = useCallApi({
    success: async (response) => {
      const blob = await pdf(
        <PdfDocumentTable
          title={'Danh sách log hệ thống'}
          data={response?.result?.items || []}
        />,
      ).toBlob();
      saveAs(blob, `log-${Date.now()}.pdf`);
    },
    callApi: () =>
      instanceCoreApi.post(API.SEARCH_USER_ACTION_LOG, {
        filters: [
          {
            name: 'code',
            operation: 'in',
            value: ['login', 'logout'],
          },
        ],
        pageable: {
          page: 1,
          page_size: 500,
          sort: [
            {
              property: 'id',
              direction: 'desc',
            },
          ],
        },
      }),
  });

  const columns = [
    {
      title: <IntlMessages id='table.time' />,
      dataIndex: 'start_time',
      width: 200,
      render: (time) => <RenderDateTime value={time} />,
    },
    {
      title: <IntlMessages id='table.username' />,
      dataIndex: 'user_info_response',
      width: 200,
      render: (user) => <RenderNameUser user={user} />,
    },
    {
      title: 'IP',
      dataIndex: 'ip_address',
      width: 200,
    },
    {
      title: <IntlMessages id={'table.action'} />,
      dataIndex: 'code',
      width: 200,
    },
    {
      title: <IntlMessages id={'table.action_detail'} />,
      width: 120,
      key: 'detail',
      fixed: 'right',
      align: 'center',
      render: (record) => (
        <a
          onClick={() => {
            setRowData(record);
            setIsDialogOpen(true);
          }}>
          {messages['table.viewDetail']}
        </a>
      ),
    },
  ];
  const onCloseDrawer = () => {
    setIsDialogOpen(false);
  };
  return (
    <>
      <AppPageMetadata title={messages['sidebar.user_action_log']} />
      <DataTable
        toolbarsMini={[
          <AppIconButton
            key={`download-pdf`}
            loading={isLoadingDownload}
            icon={<FilePdfOutlined />}
            title={'Tải file PDF'}
            onClick={() => downloadData()}
          />,
        ]}
        initTable={initTable}
        url={API.SEARCH_USER_ACTION_LOG}
        columns={columns}
        urlDownload={API.EXPORT_EXCEL_USER_ACTION_LOG}></DataTable>
      <Drawer
        open={isDialogOpen}
        title={messages['sidebar.user_action_log']}
        closable={false}
        width={708}
        extra={<CloseOutlined onClick={onCloseDrawer} />}
        onClose={onCloseDrawer}>
        <AppScrollbar>
          <LogDetail record={rowData} />
        </AppScrollbar>
      </Drawer>
    </>
  );
};
