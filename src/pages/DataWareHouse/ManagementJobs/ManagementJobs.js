import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata/index';
import DataTable from 'src/@crema/core/DataTable';
// import { ITEM_PERMISSIONS } from 'src/shared/constants/Permission';
import Icon, {
  HistoryOutlined,
  PlayCircleFilled,
  ScheduleOutlined,
} from '@ant-design/icons';
import { AcTrashIcon } from 'src/assets/icon/action/index';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import API from 'src/@crema/services/apis/index';
import { KEY_ACTION_COLUMN } from 'src/shared/constants/DataTable';
import DialogConfirm from 'src/@crema/component/DialogConfirm/index';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import { RenderDateTime } from 'src/@crema/component/TableRender';
import { Spin, Switch, Tag, Tooltip } from 'antd';
import useCallApi from 'src/@crema/hook/useCallApi';
import notification from 'src/shared/utils/notification';
import AntModal from 'src/@crema/component/AntModal';

import JobRunHistory from '../JobRunHistory';
import { MODAL_SIZE } from 'src/shared/constants/Modal';

function ManagementJobs() {
  const { messages } = useIntl();
  const [rowData, setRowData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isModalHistory, setIsModalHistory] = useState(false);
  const [dataListHistoryJob, setDataListHistoryJob] = useState([]);
  const [isHistoryRunJob, setIsHistoryRunJob] = useState(false);

  // useCallAPI toggle dag
  const { loading: loadingToggleDag, send: sendToggleDag } = useCallApi({
    success: () => {
      notification.success('Bật tắt dag thành công');
    },
    callApi: (data) => {
      return instanceCoreApi.put(API.TOGGLE_DAG(data));
    },
  });

  // useCallAPI toggle dag not messages
  const { send: sendToggleDagNotMessages } = useCallApi({
    success: () => {},
    callApi: (data) => {
      return instanceCoreApi.put(API.TOGGLE_DAG(data));
    },
  });
  // useCallAPI start dag
  const { loading: loadingStartDag, send: sendStartDag } = useCallApi({
    success: (res) => {
      notification.success('Kích hoạt tiến trình thành công');
      const id_dag = res?.result?.dag_id;
      sendToggleDagNotMessages({
        dag_id: id_dag,
        is_pause_dag: true,
      });
    },
    callApi: (data) => {
      return instanceCoreApi.post(API.START_DAG(data));
    },
  });

  // deleteToServerDag
  const deleteToServerDag = () => {
    return instanceCoreApi.delete(API.DELETE_DAG(rowData?.dag_id));
  };
  // get scheduling list
  const { loading: loadingScheduling, send: getScheduling } = useCallApi({
    success: (res) => {
      setDataListHistoryJob(res?.result || []);
      setIsModalHistory(true);
    },
    callApi: (data) => {
      return instanceCoreApi.get(API.GET_SCHEDULING_JOB(data));
    },
  });

  // get history dag
  const { loading: loadingHistoryJob, send: getHistoryJob } = useCallApi({
    success: (res) => {
      setDataListHistoryJob(res?.result?.task_instances || []);
      setIsModalHistory(true);
    },
    callApi: (data) => {
      return instanceCoreApi.post(API.GET_HISTORY_RUN_JOB, data);
    },
  });
  const columns = [
    {
      title: <IntlMessages id='sidebar.toggleJob' />,
      dataIndex: 'is_subdag',
      width: 100,
      fixed: 'left',
      key: 'toggle_dags',
      render: (_, record) => {
        const dag_id = record?.dag_id;
        return (
          <Switch
            defaultChecked={!record?.is_paused}
            onChange={(checked) => {
              sendToggleDag({
                dag_id,
                is_pause_dag: !checked,
              });
            }}
          />
        );
      },
    },
    {
      title: <IntlMessages id='sidebar.nameJob' />,
      dataIndex: 'dag_id',
      width: 220,
      fixed: 'left',
      key: 'dag_id',
      sorter: true,
    },
    {
      title: <IntlMessages id='common.status' />,
      dataIndex: 'dag_id',
      width: 180,
      key: 'status',
      render: (_, data) => {
        if (data.dag_state === 'failed') {
          return <Tag color='#416ef0'>{'Thất bại'}</Tag>;
        } else if (data.dag_state === 'success') {
          return <Tag color='#389e0d'>{'Thành công'}</Tag>;
        } else if (data.dag_state === 'running') {
          return <Tag color='#13c2c2'>{'Đang chạy'}</Tag>;
        } else if (data.dag_state === 'queued') {
          return <Tag color='#1677ff'>{'Chờ chạy'}</Tag>;
        } else {
          return <Tag>{data.dag_state}</Tag>;
        }
      },
    },
    {
      title: <IntlMessages id='input.Owner' />,
      dataIndex: 'owners',
      width: 160,
      key: 'owners',
      render: (data) => {
        return <span>{data?.[0]}</span>;
      },
    },
    {
      title: <IntlMessages id='sidebar.schedule' />,
      dataIndex: 'schedule_interval',
      width: 160,
      key: 'schedule_interval',
      render: (data, record) => {
        return (
          <Tooltip title={`Lịch trình:${record?.timetable_description}`}>
            <Tag>{data?.value}</Tag>
          </Tooltip>
        );
      },
    },
    {
      title: <IntlMessages id='table.lastRun' />,
      dataIndex: 'last_parsed_time',
      width: 160,
      key: 'table.lastRun',
      align: 'center',
      render: (data) => {
        return <RenderDateTime value={data} />;
      },
    },
    {
      title: <IntlMessages id='table.lastNextRun' />,
      dataIndex: 'next_dagrun_create_after',
      width: 160,
      key: 'next_dagrun',
      align: 'center',
      render: (data) => {
        return <RenderDateTime value={data} />;
      },
    },

    {
      key: KEY_ACTION_COLUMN,
      actions: [
        {
          label: 'sidebar.start_process',
          // actionName: ITEM_PERMISSIONS.UPDATE,
          icon: (
            <Icon
              style={{
                color: '#1677ff',
              }}
              component={PlayCircleFilled}
            />
          ),
          onClick: (data) => {
            const id_dag = data?.dag_id;
            sendStartDag(id_dag);
          },
        },
        {
          label: 'sidebar.delete_process',
          // actionName: ITEM_PERMISSIONS.DELETE,
          icon: (
            <Icon
              style={{
                color: '#416ef0',
              }}
              component={AcTrashIcon}
            />
          ),
          onClick: (data) => {
            setRowData(data);
            setIsDialogOpen(true);
          },
        },
        {
          label: 'sidebar.view_schedule_airflow',
          icon: (
            <Icon
              style={{
                color: '#595959',
              }}
              component={ScheduleOutlined}
            />
          ),
          onClick: (data) => {
            setIsHistoryRunJob(false);
            getScheduling(data?.dag_id);
          },
        },
        {
          label: 'sidebar.view_history_process',
          // actionName: ITEM_PERMISSIONS.DELETE,
          icon: (
            <Icon
              style={{
                color: '#595959',
              }}
              component={HistoryOutlined}
            />
          ),
          onClick: (data) => {
            setIsHistoryRunJob(true);
            getHistoryJob({
              dag_id: data?.dag_id,
              pageable: {
                page: 1,
                page_size: 1000,
              },
            });
          },
        },
      ],
    },
  ];

  return (
    <div>
      <AppPageMetadata
        title={messages['sidebar.list_data_sources_by_industry']}
      />
      <Spin
        spinning={
          loadingToggleDag ||
          loadingStartDag ||
          loadingScheduling ||
          loadingHistoryJob
        }>
        <DataTable
          initTable={{
            filters: [],
            body: {
              paused: false,
            },
          }}
          url={API.GET_DAG_LIST_AIRFLOW}
          columns={columns}>
          <DialogConfirm
            key={rowData?.id}
            visible={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            textTitle={'confirm.deleteDagAirflow'}
            textSuccess={'confirm.deleteDagAirflowSuccess'}
            onSaveToServer={deleteToServerDag}>
            <p>
              <IntlMessages id='confirm.deleteDagAirflowSure' />
              <span className='warning-text-color'>{rowData?.dag_id}</span>
            </p>
          </DialogConfirm>
          <AntModal
            okButtonProps={{ hidden: true }}
            size={MODAL_SIZE.XLARGE}
            centered
            title={
              isHistoryRunJob ? 'Lịch sử chạy Job' : 'Danh sách lập lịch Job'
            }
            open={isModalHistory}
            onCancel={() => setIsModalHistory(false)}>
            <JobRunHistory
              isHistoryRunJob={isHistoryRunJob}
              dataListHistoryJob={dataListHistoryJob}
            />
          </AntModal>
        </DataTable>
      </Spin>
    </div>
  );
}

export default ManagementJobs;
