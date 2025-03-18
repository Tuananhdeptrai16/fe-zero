import React, { useEffect, useRef, useState } from 'react';
import DataTable from 'src/@crema/core/DataTable';
import DialogConfirm from 'src/@crema/component/DialogConfirm/index';
import API from 'src/@crema/services/apis/index';
import { RenderDateTime } from 'src/@crema/component/TableRender';
import { FILTER_TYPE, KEY_ACTION_COLUMN } from 'src/shared/constants/DataTable';
import Icon from '@ant-design/icons';
import { AcEyeIcon } from 'src/assets/icon/action';
import { MODAL_SIZE } from 'src/shared/constants/Modal';
import FormModalLog from 'src/pages/streamConnection/infoData/detailInfoData/history/FormModalLog';
import AntButton from 'src/@crema/component/AntButton';
import useCallApi from 'src/@crema/hook/useCallApi';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import notification from 'src/shared/utils/notification';
import { SQL_ISO_DATE } from 'src/shared/constants/Format';
import { ITEM_PERMISSIONS } from 'src/shared/constants/Permission';
import { useJWTAuthActions } from 'src/@crema/services/auth/jwt-auth/JWTAuthProvider';

const History = ({ configId, pageName, disabledBtnToggleProgress }) => {
  const tableRef = useRef();
  const [rowData, setRowData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoadingAction, setLoadingAction] = useState(false);
  const { checkPermissionAction } = useJWTAuthActions();

  const isPermissionUpdate = checkPermissionAction(
    pageName,
    ITEM_PERMISSIONS.UPDATE,
  );

  const reloadPage = () => {
    if (tableRef.current?.reloadPage) {
      tableRef.current.reloadPage();
    }
  };

  // status sync connection
  const { data: dataStatus, fetchData: fetchDataStatusSync } = useFetch(
    {
      method: METHOD_FETCH.POST,
      url: API.STATUS_SYNC_CONNECTION_AIR_BYTE,
      body: {
        connection_ids: [configId],
      },
    },
    [configId],
  );
  const { loading: loadingSync, send: sync } = useCallApi({
    success: () => {
      notification.success('Kích hoạt tiến trình đồng bộ thành công');
      fetchDataStatusSync();
      reloadPage();
      setLoadingAction(true);
    },
    callApi: (data) =>
      instanceCoreApi.post(API.SYNC_JOB_CONNECTION_AIR_BYTE, data),
  });

  const { loading: loadingCancelSync, send: cancelSync } = useCallApi({
    success: () => {
      notification.success('Dừng tiến trình đồng bộ thành công');
      fetchDataStatusSync();
      setLoadingAction(true);
      reloadPage();
    },
    callApi: (data) =>
      instanceCoreApi.post(API.CANCEL_SYNC_JOB_CONNECTION_AIR_BYTE, data),
  });

  const loadingSyncJob = loadingSync || loadingCancelSync;

  const dataStatusSync = dataStatus?.result[0].is_running;
  useEffect(() => {
    const idInterval = setInterval(() => {
      fetchDataStatusSync();
    }, 5000);

    return () => {
      clearInterval(idInterval);
    };
  }, []);

  const filters = [
    {
      type: FILTER_TYPE.DATE,
      label: 'Thời gian',
      name: 'date',
      formatStr: SQL_ISO_DATE,
    },
  ];

  useEffect(() => {
    reloadPage();
    setLoadingAction(false);
  }, [dataStatusSync]);

  return (
    <>
      <DataTable
        ref={tableRef}
        pageName={pageName}
        isShowSearch={false}
        toolbars={
          disabledBtnToggleProgress === 'active'
            ? [
                !dataStatusSync ? (
                  <AntButton
                    disabled={!isPermissionUpdate}
                    // key={ITEM_PERMISSIONS.UPDATE}
                    loading={loadingSyncJob || isLoadingAction}
                    type='primary'
                    onClick={() => {
                      sync({
                        connection_id: configId,
                      });
                    }}>
                    Kích hoạt
                  </AntButton>
                ) : (
                  <AntButton
                    disabled={!isPermissionUpdate}
                    // key={ITEM_PERMISSIONS.UPDATE}
                    loading={loadingSyncJob || isLoadingAction}
                    type='danger'
                    onClick={() => {
                      cancelSync({
                        connection_id: configId,
                      });
                    }}>
                    Dừng tiến trình
                  </AntButton>
                ),
              ]
            : []
        }
        buildBodyQuery={(bodyQuery, { filter }) => {
          if (filter?.date?.length > 1) {
            bodyQuery.updated_at_start = filter?.date[0];
            bodyQuery.updated_at_end = filter?.date[1];
          }
          return bodyQuery;
        }}
        initTable={{
          body: {
            config_id: configId,
            config_types: ['sync', 'reset_connection'],
          },
        }}
        rowKey={(record) => {
          return record?.job?.id;
        }}
        filters={filters}
        url={API.HISTORY_JOB_CONNECTION_AIR_BYTE}
        columns={[
          {
            title: 'Trạng thái',
            dataIndex: 'items_status',
            width: 100,
            render: (_, data) => {
              if (data?.job?.status === 'succeeded') {
                return <span>Thành công</span>;
              } else if (data?.job?.status === 'failed') {
                return <span>Thất bại</span>;
              } else if (data?.job?.status === 'cancelled') {
                return <span>Đã hủy</span>;
              } else if (data?.job?.status === 'running') {
                return <span>Đang chạy</span>;
              } else if (data?.job?.status === 'incomplete') {
                return <span>Chưa hoàn thiện</span>;
              } else {
                return <span>{data?.job?.status}</span>;
              }
            },
          },
          {
            title: 'Mã kết nối',
            dataIndex: 'items_config',
            width: 100,
            render: (_, data) => data?.job?.config_id,
          },
          {
            title: 'Thời gian',
            dataIndex: 'items_time',
            width: 100,
            align: 'center',
            render: (_, date) => {
              const time = date?.job?.created_at;
              return <RenderDateTime value={time ? time * 1000 : null} />;
            },
          },
          {
            key: KEY_ACTION_COLUMN,
            actions: [
              {
                label: 'table.action.viewLog',
                icon: <Icon component={AcEyeIcon} />,
                onClick: (data) => {
                  setRowData(data);
                  setIsDialogOpen(true);
                },
              },
            ],
          },
        ]}>
        <DialogConfirm
          key={rowData?.job?.id}
          size={MODAL_SIZE.LARGE}
          visible={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          textTitle={'Chi tiết logs'}
          textButtonCancel={'dialog.button.close'}>
          <FormModalLog data={rowData} />
        </DialogConfirm>
      </DataTable>
    </>
  );
};
export default History;
