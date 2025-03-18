import React, { useState } from 'react';
import DataTable from 'src/@crema/core/DataTable';

import IntlMessages from 'src/@crema/utility/IntlMessages';
import Icon, { SearchOutlined } from '@ant-design/icons';
import FormRowDataTable from 'src/@crema/component/FormRowDataTable/index';
import { FORM_TYPES } from 'src/shared/constants/FormDataTable';
import API from 'src/@crema/services/apis/index';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import { FormInfoDataModal } from 'src/pages/streamConnection/FormInfoDataModal';
import { RenderDateTime, RenderLink } from 'src/@crema/component/TableRender';
import config from 'src/config';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import { KEY_ACTION_COLUMN } from 'src/shared/constants/DataTable';
import { AcEyeIcon } from 'src/assets/icon/action';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  convertDataConnectionUpdate,
  convertObjectKeyToSnakeCase,
  encryptData,
} from 'src/shared/utils/Object';
import { parse, stringify } from 'src/shared/utils/String';
import { isEmpty } from 'src/shared/utils/Typeof';
import { MODAL_SIZE } from 'src/shared/constants/Modal';
import { FormSearch } from './FormSearch';
import AntModal from 'src/@crema/component/AntModal';

const sourceDefinition = ({ category }) => {
  const navigate = useNavigate();
  const [rowData, setRowData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isConfigScheduling, setIsConfigScheduling] = useState(false);
  const { search } = useLocation();

  const preSaveData = (data, resBeforeCheck) => {
    const responseAirByte = parse(resBeforeCheck?.result) || {};
    const newInfoConnection = convertObjectKeyToSnakeCase(responseAirByte);

    newInfoConnection?.catalog?.streams?.forEach((item) => {
      const name = item?.stream?.name;
      const findColumnOld = responseAirByte?.catalog?.streams?.find((item) => {
        return item?.stream?.name?.toUpperCase() === name?.toUpperCase();
      });
      if (!isEmpty(findColumnOld)) {
        item.stream.json_schema.properties =
          findColumnOld?.stream?.jsonSchema?.properties;
      }
    });
    const streams = newInfoConnection?.catalog?.streams || [];
    streams?.forEach((item) => {
      item.config.selected = true;
    });

    const dataCreateConnection = convertDataConnectionUpdate(
      data,
      rowData?.connection_id,
    );
    if (!isEmpty(category)) {
      dataCreateConnection.category = category;
    }
    if (!isEmpty(streams)) {
      dataCreateConnection.sync_catalog.streams = streams;
    }
    return dataCreateConnection;
  };
  return (
    <>
      <DataTable
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
        rowKey={'connection_id'}
        url={API.GET_CONNECTION_AIR_BYTE}
        columns={[
          {
            title: <IntlMessages id='common.process_name' />,
            dataIndex: 'display_name',
            width: 200,
            key: 'display_name',
            sorter: true,
            render: (value, data) => {
              return (
                <RenderLink
                  to={config.routes.detailInfoData(data?.connection_id)}>
                  {value}
                </RenderLink>
              );
            },
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
          {
            title: <IntlMessages id='table.last_sync' />,
            dataIndex: 'latest_sync_job_created_at',
            width: 200,
            key: 'last_sync',
            align: 'center',
            render: (date) => (
              <RenderDateTime value={date ? date * 1000 : null} />
            ),
          },
          {
            key: KEY_ACTION_COLUMN,
            actions: [
              {
                label: 'table.action.detail',
                icon: <Icon component={AcEyeIcon} />,
                onClick: (data) => {
                  navigate(
                    `${config.routes.detailInfoData(
                      data?.connection_id,
                    )}${search}`,
                  );
                },
              },
              {
                label: 'table.view_history_list',
                icon: <SearchOutlined />,
                onClick: (data) => {
                  setRowData(data);
                  setIsDialogOpen(true);
                },

                // onClick: (data) => {
                //   navigate(
                //     `${config.routes.detailHistoryData(
                //       data?.connection_id,
                //     )}${search}`,
                //   );
                // },
              },
            ],
          },
        ]}>
        <FormRowDataTable
          key={rowData && `action-${rowData?.connection_id}`}
          visible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          formType={rowData ? FORM_TYPES.UPDATE : FORM_TYPES.ADD}
          method={rowData ? METHOD_FETCH.PUT : METHOD_FETCH.POST}
          preSaveData={preSaveData}
          beforeSave={async (data) => {
            const encryptDataDiscoverySchema = await encryptData({
              api: '/v1/sources/discover_schema',
              body: stringify({
                sourceId: data?.source_id,
                disable_cache: true,
              }),
            });
            return instanceCoreApi.post(API.API_AIR_BYTE, {
              data: encryptDataDiscoverySchema,
            });
          }}
          resource={API.CREATE_CONNECTION_AIR_BYTE}
          initialValues={rowData ? rowData : {}}>
          <FormInfoDataModal category={category} />
        </FormRowDataTable>
        {/* <FormRowDataTable
          okButtonProps={{ hidden: true }}
          size={MODAL_SIZE.XLARGE}
          key={rowData && `action-${rowData?.connection_id}`}
          visible={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          formType={FORM_TYPES.SEARCH}
          method={rowData ? METHOD_FETCH.PUT : METHOD_FETCH.POST}
          preSaveData={preSaveData}
          resource={API.CREATE_CONNECTION_AIR_BYTE}
          initialValues={rowData ? rowData : {}}>
          <FormSearch destination={rowData?.destination_id} />
        </FormRowDataTable> */}
        <AntModal
          okButtonProps={{ hidden: true }}
          size={MODAL_SIZE.XLARGE}
          centered
          // footer={null}
          title='Tra cứu kết quả thu thập'
          open={isDialogOpen}
          onCancel={() => setIsDialogOpen(false)}>
          <FormSearch destination_id={rowData?.destination_id} />
        </AntModal>
      </DataTable>
    </>
  );
};
export default sourceDefinition;
