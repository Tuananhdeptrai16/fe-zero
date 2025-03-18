import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import DataTable from 'src/@crema/core/DataTable';
import API from 'src/@crema/services/apis';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import Link from 'src/@crema/component/Link';
import { RenderDateTime } from 'src/@crema/component/TableRender';
import RenderNameUser from 'src/@crema/component/TableRender/RenderNameUser';
import { LogDetail } from 'src/pageComponents/systemLog/LogDetail';
import { Drawer } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { FILTER_OPERATION } from 'src/shared/constants/DataTable';

const AccessLogPage = () => {
  const { messages } = useIntl();

  const [rowData, setRowData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const columns = [
    {
      title: <IntlMessages id='table.time' />,
      dataIndex: 'start_time',
      width: 200,
      align: 'center',
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
      title: <IntlMessages id={'table.viewDetail'} />,
      width: 200,
      key: 'detail',
      fixed: 'right',
      render: (record) => (
        <Link
          onClick={() => {
            setRowData(record);
            setIsDialogOpen(true);
          }}>
          {messages['table.viewDetail']}
        </Link>
      ),
    },
  ];
  const onCloseDrawer = () => {
    setIsDialogOpen(false);
  };
  return (
    <>
      <AppPageMetadata title={messages['sidebar.access_log']} />
      <DataTable
        url={API.SEARCH_ACCESS_LOG}
        initTable={{
          filters: [
            {
              name: 'code',
              value: 'access',
              operation: FILTER_OPERATION.EQ,
            },
          ],
        }}
        columns={columns}
        urlDownload={API.EXPORT_EXCEL_ACCESS_LOG}
      />
      <Drawer
        open={isDialogOpen}
        onClose={onCloseDrawer}
        title={messages['sidebar.access_log']}
        closable={false}
        width={708}
        extra={<CloseOutlined onClick={onCloseDrawer} />}>
        <LogDetail record={rowData} />
      </Drawer>
    </>
  );
};

export default AccessLogPage;
