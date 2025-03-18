import React, { useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata/index';
import DataTable from 'src/@crema/core/DataTable';
import Icon, {
  ApartmentOutlined,
  AuditOutlined,
  // ClockCircleOutlined,
  FileSearchOutlined,
  HistoryOutlined,
  MoreOutlined,
  PlayCircleFilled,
  PlusOutlined,
  ScheduleOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import API from 'src/@crema/services/apis/index';
import {
  FILTER_OPERATION,
  KEY_ACTION_COLUMN,
} from 'src/shared/constants/DataTable';
import DialogConfirm from 'src/@crema/component/DialogConfirm/index';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
// import { RenderDateTime } from 'src/@crema/component/TableRender';
import { Dropdown, Spin, Switch, Tag } from 'antd';
import useCallApi from 'src/@crema/hook/useCallApi';
import notification from 'src/shared/utils/notification';
import AntModal from 'src/@crema/component/AntModal';

import { MODAL_SIZE } from 'src/shared/constants/Modal';
import AntButton from 'src/@crema/component/AntButton';
import JobRunHistory from 'src/pages/SchoolWarehouse/NuclearRegion/Components/DataAggregationMechanism/JobRunHistory';
import RenderNameUser from 'src/@crema/component/TableRender/RenderNameUser';
import {
  encryptData,
  handleRedundantData,
  renderModeSchedule,
} from 'src/shared/utils/Object';
import { AcEyeIcon, AcTrashIcon } from 'src/assets/icon/action';
import { useNavigate } from 'react-router-dom';
import {
  KEY_PARAM_DATA_MARK,
  KEY_SEARCH_PARAM_NUCLEAR,
} from 'src/shared/constants/SearchParams';
import {
  generateRouteAddDataMark,
  generateRouteAddJob,
  generateRouteDetailJob,
} from 'src/shared/utils/urlPathName';
import {
  ACTION_DIALOG_NUCLEAR_REGION,
  LIST_KEY_SEE_MORE_TABLE_NUCLEAR,
  TYPE_DATA_MARK_SCHOOL_WAREHOUSE,
} from 'src/shared/constants/DataFixed';
import style from './style.module.scss';
import clsx from 'clsx';
import FormNameJob from 'src/pages/SchoolWarehouse/NuclearRegion/Components/DataAggregationMechanism/AddJob/Components/NameJob/FormNameJob';
import FormRules from 'src/pages/SchoolWarehouse/NuclearRegion/Components/DataAggregationMechanism/AddJob/Components/Normalization/FormRules';
import { handlePrevRulesAddJob, renderRulesJob } from 'src/shared/utils/Array';
import { FormSearch } from 'src/pages/SchoolWarehouse/NuclearRegion/Components/LookCollectedResults/FormSearch';
import { ITEM_PERMISSIONS } from 'src/shared/constants/Permission';
import { useJWTAuthActions } from 'src/@crema/services/auth/jwt-auth/JWTAuthProvider';
import isEqual from 'lodash/isEqual';
import { isEmpty } from 'src/shared/utils/Typeof';
import moment from 'moment';
import { DATE_TIME } from 'src/shared/constants/Format';

const wrapperTableNuclearRegion = (Component, options = {}) => {
  const { synthesis_mechanism } = options;

  return (props) => {
    const { messages } = useIntl();
    const [rowData, setRowData] = useState(null);
    const [isModalHistory, setIsModalHistory] = useState(false);
    const [dataListHistoryJob, setDataListHistoryJob] = useState([]);
    const [isHistoryRunJob, setIsHistoryRunJob] = useState(false);
    const [isCollectedResult, setIsisCollectedResult] = useState(false);
    const {
      category,
      type = TYPE_DATA_MARK_SCHOOL_WAREHOUSE.ATM,
      pageName,
      titleAppMeta = '',
    } = props;
    const navigate = useNavigate();
    const refDropDownSeeMore = useRef(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [actionDialog, setActionDialog] = useState('');
    const [dataDetailJob, setDataDetailJob] = useState({});
    const [dataSearchHistory, setDataSearchHistory] = useState({
      status: 'all',
    });
    const { checkPermissionAction } = useJWTAuthActions();

    const isPermissionUpdate = checkPermissionAction(
      pageName,
      ITEM_PERMISSIONS.UPDATE,
    );

    const isPermissionView = checkPermissionAction(
      pageName,
      ITEM_PERMISSIONS.VIEW,
    );
    const [reloadTableKey, setReloadTableKey] = useState(0);

    // useCallAPI toggle dag
    const { loading: loadingToggleDag, send: sendToggleDag } = useCallApi({
      success: (response) => {
        setReloadTableKey((prev) => prev + 1);
        notification.success(response?.result || 'Bật tắt job thành công');
      },
      callApi: (data) => {
        return instanceCoreApi.put(API.TOGGLE_DAG(data));
      },
    });

    // useCallAPI start dag
    const { loading: loadingStartDag, send: sendStartDag } = useCallApi({
      success: () => {
        notification.success('Kích hoạt tiến trình thành công');
      },
      callApi: (data) => {
        return instanceCoreApi.put(API.START_DAG(data));
      },
    });

    // get detail job
    const { loading: loadingDetailJob, send: sendDetailJob } = useCallApi({
      success: (res) => {
        setDataDetailJob(res?.result || {});
        setActionDialog(ACTION_DIALOG_NUCLEAR_REGION.NORMALIZATION);
        setIsDialogOpen(true);
      },
      callApi: (data) => {
        return instanceCoreApi.get(API.GET_DETAIL_JOB(data?.id));
      },
    });

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

    // get detail job form search
    const { loading: loadingCollectionResult, send: sendCollectionResult } =
      useCallApi({
        success: (res) => {
          setDataDetailJob(res?.result || {});
          setActionDialog(ACTION_DIALOG_NUCLEAR_REGION.RESULTS_COLLECTION);
          setIsDialogOpen(true);
        },
        callApi: (data) => {
          return instanceCoreApi.get(API.GET_DETAIL_JOB(data?.id));
        },
      });
    // drop down
    const itemsMenuDropdownSeeMore = [
      isPermissionUpdate && {
        label: 'Chỉnh sửa tham số',
        actionName: ITEM_PERMISSIONS.UPDATE,
        key: LIST_KEY_SEE_MORE_TABLE_NUCLEAR.change_param,
        icon: <AuditOutlined />,
      },
      isPermissionUpdate && {
        label: 'Chuẩn hóa dữ liệu',
        actionName: ITEM_PERMISSIONS.UPDATE,
        key: LIST_KEY_SEE_MORE_TABLE_NUCLEAR.normalization,
        icon: <ApartmentOutlined />,
      },
      // isPermissionUpdate && {
      //   label: 'Đặt lịch tổng hợp',
      //   actionName: ITEM_PERMISSIONS.UPDATE,
      //   key: LIST_KEY_SEE_MORE_TABLE_NUCLEAR.schedule_synthetic,
      //   icon: <ClockCircleOutlined />,
      // },
      isPermissionView && {
        label: 'Danh sách lập lịch job',
        actionName: ITEM_PERMISSIONS.VIEW,
        key: LIST_KEY_SEE_MORE_TABLE_NUCLEAR.scheduling_list,
        icon: <ScheduleOutlined />,
      },
      isPermissionView && {
        label: 'Lịch sử chạy job',
        actionName: ITEM_PERMISSIONS.VIEW,
        key: LIST_KEY_SEE_MORE_TABLE_NUCLEAR.history_job,
        icon: <HistoryOutlined />,
      },
      isPermissionView &&
        type === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DTM && {
          label: 'Tra cứu kết quả thu thập',
          key: LIST_KEY_SEE_MORE_TABLE_NUCLEAR.results_collection,
          icon: <SearchOutlined />,
        },
    ];
    const menuPropsSeeMoreActionTable = {
      items: itemsMenuDropdownSeeMore,
      onClick: (data) => {
        const keyOpen = data?.key;
        switch (keyOpen) {
          case LIST_KEY_SEE_MORE_TABLE_NUCLEAR.change_param:
            setActionDialog(ACTION_DIALOG_NUCLEAR_REGION.UPDATE_PARAMS);
            setIsDialogOpen(true);
            break;
          case LIST_KEY_SEE_MORE_TABLE_NUCLEAR.normalization:
            sendDetailJob(rowData);
            break;

          case LIST_KEY_SEE_MORE_TABLE_NUCLEAR.schedule_synthetic:
            setActionDialog(ACTION_DIALOG_NUCLEAR_REGION.SCHEDULE_SYNTHETIC);
            setIsDialogOpen(true);
            break;

          case LIST_KEY_SEE_MORE_TABLE_NUCLEAR.scheduling_list:
            setIsHistoryRunJob(false);
            getScheduling(rowData?.dag_id);
            break;

          case LIST_KEY_SEE_MORE_TABLE_NUCLEAR.history_job:
            setIsHistoryRunJob(true);
            getHistoryJob({
              dag_id: rowData?.dag_id,
              pageable: {
                page: 1,
                page_size: 10000,
              },
            });
            break;
          case LIST_KEY_SEE_MORE_TABLE_NUCLEAR.results_collection:
            sendCollectionResult(rowData);
            break;

          default:
            break;
        }
      },
    };

    const columns = [
      synthesis_mechanism
        ? {
            title: <IntlMessages id='sidebar.toggleJob' />,
            dataIndex: 'active',
            width: 100,
            fixed: 'left',
            key: 'active',
            render: (_, record) => {
              const dag_id = record?.id;
              return (
                <Switch
                  disabled={!isPermissionUpdate}
                  defaultChecked={record?.active}
                  onChange={(checked) => {
                    sendToggleDag({
                      dag_id,
                      is_pause_dag: !checked,
                    });
                  }}
                />
              );
            },
          }
        : null,
      {
        title: <IntlMessages id='sidebar.nameJob' />,
        dataIndex: 'job_name',
        width: 220,
        fixed: 'left',
        key: 'job_name_airflow',
        sorter: true,
        render: (data) => {
          return (
            // <RenderLink to={generateRouteDetailJob(type, category, record?.id)}>
            //   {data}
            // </RenderLink>
            <span>{data}</span>
          );
        },
      },
      {
        title: <IntlMessages id='common.status' />,
        dataIndex: 'dag_state',
        width: 180,
        key: 'dag_state',
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
            return <Tag color='#1677ff'>{data?.dag_state}</Tag>;
          }
        },
      },
      {
        title: <IntlMessages id='input.Owner' />,
        dataIndex: 'user_info_response',
        width: 160,
        key: 'user_info_response',
        render: (data) => {
          return <RenderNameUser user={data} />;
        },
      },
      {
        title: <IntlMessages id='sidebar.schedule' />,
        dataIndex: 'scheduler',
        width: 160,
        key: 'scheduler',
        render: (data) => {
          return <Tag>{data}</Tag>;
        },
      },
      {
        title: <IntlMessages id='table.lastRun' />,
        dataIndex: 'last_parsed_time',
        width: 160,
        key: 'last_parsed_time',
        align: 'center',
        render: (data) => {
          // return <RenderDateTime value={data} />;
          return data && moment(data).utcOffset(7).format(DATE_TIME);
        },
      },
      {
        title: <IntlMessages id='table.lastNextRun' />,
        dataIndex: 'next_dagrun_create_after',
        width: 160,
        key: 'next_dagrun_create_after',
        align: 'center',
        render: (data) => {
          // return <RenderDateTime value={data} />;
          return moment(data).utcOffset(7).format(DATE_TIME);
        },
      },
      {
        key: KEY_ACTION_COLUMN,
        actions: synthesis_mechanism
          ? [
              {
                label: 'sidebar.start_process',
                actionName: ITEM_PERMISSIONS.UPDATE,
                icon: (
                  <Icon
                    style={{
                      color: '#416ef0',
                    }}
                    component={PlayCircleFilled}
                  />
                ),
                onClick: (data) => {
                  const id_dag = data?.id;
                  if (data?.active) {
                    sendStartDag(id_dag);
                  } else {
                    notification.warning(
                      'Vui lòng bật job trước khi kích hoạt tiến trình !',
                    );
                  }
                },
              },
              {
                label: 'table.action.detail',
                actionName: ITEM_PERMISSIONS.VIEW,
                icon: <Icon component={AcEyeIcon} />,
                onClick: (data) => {
                  navigate(generateRouteDetailJob(type, category, data?.id));
                },
              },
              {
                label: 'table.action.delete',
                actionName: ITEM_PERMISSIONS.DELETE,
                icon: <Icon component={AcTrashIcon} />,
                onClick: (data) => {
                  setRowData(data);
                  setActionDialog(ACTION_DIALOG_NUCLEAR_REGION.DELETE_JOB);
                  setIsDialogOpen(true);
                },
              },
              {
                label: 'table.action.see_more',
                actionName: ITEM_PERMISSIONS.VIEW,
                render: (data) => {
                  return (
                    <div
                      key='dropdown_see_more'
                      onClick={() => {
                        setRowData(data);
                      }}>
                      <Dropdown
                        // getPopupContainer={() => refDropDownSeeMore.current}
                        trigger={['click']}
                        placement='bottomRight'
                        menu={menuPropsSeeMoreActionTable}>
                        <MoreOutlined />
                      </Dropdown>
                      <div ref={refDropDownSeeMore}></div>
                    </div>
                  );
                },
              },
            ]
          : [
              {
                label: 'look_up_collected_results',
                icon: <FileSearchOutlined />,
                onClick: (data) => {
                  setRowData(data);
                  setIsisCollectedResult(true);
                },
              },
            ],
      },
    ].filter(Boolean);

    // content Dialog
    const CONTENT_DIALOG = {
      [ACTION_DIALOG_NUCLEAR_REGION.UPDATE_PARAMS]: {
        title: 'edit_parameters',
        success: 'edit_parameters_success',
        children: <FormNameJob isUpdate={true} />,
        textButtonConfirm: 'common.update_schedule',
        initialValues: rowData
          ? {
              job_name: rowData?.job_name,
              mode_scheduler: rowData?.mode_scheduler,
              ...renderModeSchedule(rowData),
            }
          : {},
        preSaveData: (data) => {
          return data;
        },
        action: async (data) => {
          const dataUpdate = handleRedundantData({
            ...data,
            job_name:
              rowData?.job_name.trim() === data?.job_name.trim()
                ? ''
                : data?.job_name,
            ...renderModeSchedule(data),
            mode_scheduler: '',
          });
          const encryptDataUpdate = await encryptData(dataUpdate);

          return instanceCoreApi.put(API.UPDATE_JOB_AIRFLOW(rowData?.id), {
            data: encryptDataUpdate,
          });
        },
      },
      [ACTION_DIALOG_NUCLEAR_REGION.DELETE_JOB]: {
        title: 'confirm.deleteDagAirflow',
        success: 'confirm.deleteDagAirflowSuccess',
        children: (
          <p>
            <IntlMessages id='confirm.deleteDagAirflowSure' />
            <span className='warning-text-color'>{rowData?.job_name}</span>
          </p>
        ),
        textButtonConfirm: 'dialog.button.confirm',
        initialValues: {},
        preSaveData: (data) => {
          return data;
        },
        action: () => {
          return instanceCoreApi.delete(API.DELETE_DAG(rowData?.id));
        },
      },
      [ACTION_DIALOG_NUCLEAR_REGION.SCHEDULE_SYNTHETIC]: {
        title: 'schedule_data_aggregation_auto',
        success: 'schedule_data_aggregation_auto_success',
        children: <FormNameJob isUpdate={true} isSchedule={true} />,
        textButtonConfirm: 'dialog.button.confirm',
        initialValues: rowData
          ? {
              job_name: rowData?.job_name,
              unit: rowData?.unit,
              quantity: rowData?.quantity,
            }
          : {},
        preSaveData: (data) => {
          return data;
        },
        action: async (data) => {
          const dataUpdate = handleRedundantData({
            ...data,
            quantity: Number.parseInt(data?.quantity) || 1,
          });
          const encryptDataUpdate = await encryptData(dataUpdate);
          return instanceCoreApi.put(API.UPDATE_JOB_AIRFLOW(rowData?.id), {
            data: encryptDataUpdate,
          });
        },
      },
      [ACTION_DIALOG_NUCLEAR_REGION.NORMALIZATION]: {
        title: 'confirm.data_normalization',
        success: 'confirm.data_normalization_success',
        children: <FormRules isUpdate={true} dataDetailJob={dataDetailJob} />,
        size: MODAL_SIZE.LARGE,
        textButtonConfirm: 'common.update_schedule',
        initialValues: dataDetailJob
          ? {
              rules: renderRulesJob(dataDetailJob?.scheduler_response?.rules),
            }
          : {},
        preSaveData: (data) => {
          return data;
        },
        action: async (data) => {
          const ruleOld = dataDetailJob?.scheduler_response?.rules || [];
          const rulesNew = handlePrevRulesAddJob(data) || [];

          const newRulesUpdate = rulesNew?.filter(
            (obj2) => !ruleOld.some((obj1) => isEqual(obj1, obj2)),
          );
          const encryptNewRulesUpdate = await encryptData({
            rules: newRulesUpdate,
          });

          return instanceCoreApi.put(API.UPDATE_JOB_AIRFLOW(rowData?.id), {
            data: encryptNewRulesUpdate,
          });
        },
      },
      [ACTION_DIALOG_NUCLEAR_REGION.RESULTS_COLLECTION]: {
        title: 'look_up_collected_results',
        success: 'look_up_collected_results',
        children: (
          <FormSearch
            key={`formSearch-${rowData?.id}`}
            data={dataDetailJob?.scheduler_response || {}}
            type={type}
          />
        ),
        size: MODAL_SIZE.XLARGE,
        textButtonConfirm: '',
        initialValues: {},
        preSaveData: (data) => {
          return data;
        },
        action: () => {},
      },
    };
    const renderLoading = () => {
      if (loadingToggleDag) {
        return false;
      }
      return (
        loadingStartDag ||
        loadingScheduling ||
        loadingHistoryJob ||
        loadingDetailJob ||
        loadingCollectionResult
      );
    };

    return (
      <div className={clsx(style.wrapTableNuclear)}>
        <AppPageMetadata
          title={
            !isEmpty(titleAppMeta)
              ? messages[titleAppMeta]
              : messages['data_aggregation_mechanism']
          }
        />
        <Spin spinning={renderLoading()}>
          <DataTable
            key={`reload_${reloadTableKey}`}
            syncURL={false}
            initTable={{
              filters: [
                {
                  name: 'category',
                  value: category,
                  operation: FILTER_OPERATION.EQ,
                },
                {
                  name: 'type',
                  value: type,
                  operation: FILTER_OPERATION.EQ,
                },
              ],
            }}
            toolbars={
              synthesis_mechanism
                ? [
                    <AntButton
                      key={ITEM_PERMISSIONS.ADD}
                      type='primary'
                      icon={<PlusOutlined />}
                      onClick={() => {
                        setRowData(null);
                        if (type === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.ATM) {
                          navigate(
                            `${generateRouteAddJob(
                              category,
                            )}?${KEY_SEARCH_PARAM_NUCLEAR}=${category}&${KEY_PARAM_DATA_MARK}=${type}`,
                          );
                        }
                        if (type === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DTM) {
                          navigate(
                            `${generateRouteAddDataMark(
                              category,
                            )}?${KEY_SEARCH_PARAM_NUCLEAR}=${category}&${KEY_PARAM_DATA_MARK}=${type}`,
                          );
                        }
                      }}>
                      {messages['table.toolbar.addNew']}
                    </AntButton>,
                  ]
                : []
            }
            url={API.GET_DAG_LIST_AIRFLOW}
            columns={columns}>
            <AntModal
              okButtonProps={{ hidden: true }}
              size={MODAL_SIZE.XLARGE}
              bodyStyle={{ maxHeight: '75vh', overflow: 'auto' }}
              centered
              title={
                isHistoryRunJob ? 'Lịch sử chạy Job' : 'Danh sách lập lịch Job'
              }
              open={isModalHistory}
              onCancel={() => {
                setIsModalHistory(false);
                setDataSearchHistory({
                  status: 'all',
                });
              }}>
              <JobRunHistory
                isHistoryRunJob={isHistoryRunJob}
                dataListHistoryJob={dataListHistoryJob}
                dataSearch={dataSearchHistory}
                setDataSearch={setDataSearchHistory}
              />
            </AntModal>
            {!synthesis_mechanism && (
              <Component
                {...props}
                isCollectedResult={isCollectedResult}
                rowData={rowData}
                setIsisCollectedResult={setIsisCollectedResult}
              />
            )}

            <DialogConfirm
              key={`${actionDialog}-${rowData?.id}`}
              visible={isDialogOpen}
              onClose={() => setIsDialogOpen(false)}
              afterClose={() => setRowData(null)}
              initialValues={CONTENT_DIALOG[actionDialog]?.initialValues}
              textTitle={CONTENT_DIALOG[actionDialog]?.title || ''}
              textSuccess={CONTENT_DIALOG[actionDialog]?.success}
              size={CONTENT_DIALOG[actionDialog]?.size || MODAL_SIZE.MEDIUM}
              textButtonConfirm={
                CONTENT_DIALOG[actionDialog]?.textButtonConfirm
              }
              preSaveData={CONTENT_DIALOG[actionDialog]?.preSaveData}
              onSaveToServer={CONTENT_DIALOG[actionDialog]?.action}>
              {CONTENT_DIALOG[actionDialog]?.children || <></>}
            </DialogConfirm>
          </DataTable>
        </Spin>
      </div>
    );
  };
};

wrapperTableNuclearRegion.propTypes = {};

wrapperTableNuclearRegion.defaultProps = {};

export default wrapperTableNuclearRegion;
