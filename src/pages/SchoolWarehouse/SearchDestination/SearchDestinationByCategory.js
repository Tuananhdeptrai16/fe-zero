import React, { useState } from 'react';
import DataTable from 'src/@crema/core/DataTable';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import { SearchOutlined } from '@ant-design/icons';
import API from 'src/@crema/services/apis/index';
// import { RenderDateTime } from 'src/@crema/component/TableRender';
// import config from 'src/config';
import { KEY_ACTION_COLUMN } from 'src/shared/constants/DataTable';
import { MODAL_SIZE } from 'src/shared/constants/Modal';
import { FormSearch } from './FormSearch';
import AntModal from 'src/@crema/component/AntModal';
import AntButton from 'src/@crema/component/AntButton';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import { useIntl } from 'react-intl';
// import { RenderLink } from 'src/@crema/component/TableRender';

const SearchDestinationByCategory = ({ category }) => {
  const [rowData, setRowData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { messages } = useIntl();

  const handleCancelModal = () => {
    setIsDialogOpen(false);
  };

  const columns = [
    {
      title: <IntlMessages id='common.process_name' />,
      dataIndex: 'display_name',
      width: 200,
      key: 'display_name',
      sorter: true,
      // render: (value, data) => {
      //   return (
      //     <RenderLink
      //       to={config.routes.detailInfoData(data?.connection_id)}>
      //       {value}
      //     </RenderLink>
      //   );
      // },
    },
    {
      title: <IntlMessages id='table.source_name' />,
      dataIndex: 'source',
      width: 200,
      key: 'source',
      render: (_, data) => data?.source?.display_name,
    },
    {
      title: <IntlMessages id='common.destination' />,
      dataIndex: 'items',
      width: 200,
      key: 'name_destination',
      render: (_, data) => data?.destination?.display_name,
    },
    // {
    //   title: <IntlMessages id='table.last_sync' />,
    //   dataIndex: 'latest_sync_job_created_at',
    //   width: 200,
    //   key: 'last_sync',
    //   render: (date) => <RenderDateTime value={date ? date * 1000 : null} />,
    // },
    {
      key: KEY_ACTION_COLUMN,
      actions: [
        {
          label: 'Tra cứu kết quả',
          icon: <SearchOutlined />,
          onClick: (data) => {
            setRowData(data);
            setIsDialogOpen(true);
          },
        },
      ],
    },
  ];
  return (
    <>
      <AppPageMetadata title={messages['look_up_collected_results']} />
      <DataTable
        key={`search-destination-${category}`}
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
        url={API.GET_CONNECTION_AIR_BYTE}
        columns={columns}>
        <AntModal
          okButtonProps={{ hidden: true }}
          size={MODAL_SIZE.XLARGE}
          centered
          footer={[
            <AntButton key='close' onClick={handleCancelModal}>
              <IntlMessages id='dialog.button.close' />
            </AntButton>,
          ]}
          title='Tra cứu kết quả thu thập'
          open={isDialogOpen}
          onCancel={() => {
            setIsDialogOpen(false);
            setRowData(null);
          }}>
          {rowData && (
            <FormSearch key={`formSearch-${rowData?.id}`} data={rowData} />
          )}
        </AntModal>
      </DataTable>
    </>
  );
};
export default SearchDestinationByCategory;
