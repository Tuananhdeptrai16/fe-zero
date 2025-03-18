import React, { createContext, useRef, useState } from 'react';
import DataTable from 'src/@crema/core/DataTable';

import IntlMessages from 'src/@crema/utility/IntlMessages';
import Icon, {
  ClockCircleOutlined,
  DeliveredProcedureOutlined,
  PlusOutlined,
  ScheduleOutlined,
} from '@ant-design/icons';

import { useIntl } from 'react-intl';
import DialogConfirm from 'src/@crema/component/DialogConfirm/index';
import FormContinueStep from 'src/@crema/component/FormContinueStep/index';
import { FORM_TYPES } from 'src/shared/constants/FormDataTable';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import API from 'src/@crema/services/apis/index';
import { ITEM_PERMISSIONS } from 'src/shared/constants/Permission';
import { FormInfoDataModal } from '../FormInfoDataModal';
import { RenderLink } from 'src/@crema/component/TableRender';
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
import { isEmpty, isObjectNotEmpty } from 'src/shared/utils/Typeof';
import { FormConfigureScheduling } from './FormConfigureScheduling';
import {
  REPLICATION_FREQUENCY,
  SCHEDULE_TYPES,
} from 'src/shared/constants/DataSelect';
import { MODAL_SIZE } from 'src/shared/constants/Modal';
import AntModal from 'src/@crema/component/AntModal';
import { Steps } from 'antd';
import AntButton from 'src/@crema/component/AntButton';
import FormContent from 'src/@crema/component/FormContent';
import ConfigureDataEnrichment from 'src/pages/AutomaticDataEnrichment/Components/ConfigureDataEnrichment/ConfigureDataEnrichment';
import clsx from 'clsx';
import style from './InfoData.module.scss';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';

export const ConTextDataConnection = createContext();

const StreamConnection = ({ category, pageName }) => {
  const { messages } = useIntl();
  const navigate = useNavigate();
  const [rowData, setRowData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfigScheduling, setIsConfigScheduling] = useState(false);
  const { search } = useLocation();
  const [isOpenModalStep, setIsOpenModalStep] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const preSaveDataTest = (data, resBeforeCheck) => {
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
    const convertData = {
      ...data,
      source: { ...data?.source, source_id: data?.source?.airbyte_source_id },
      destination: {
        ...data?.destination,
        destination_id: data?.destination?.id,
      },
    };
    const dataCreateConnection = convertDataConnectionUpdate(
      convertData,
      rowData?.connection_id,
    );
    if (!isEmpty(category)) {
      dataCreateConnection.category = category;
      (dataCreateConnection.source_display_name = data?.source?.display_name),
        (dataCreateConnection.destination_display_name =
          data?.destination?.display_name);
    }
    if (!isEmpty(streams)) {
      dataCreateConnection.sync_catalog.streams = streams;
    }
    return dataCreateConnection;
  };

  const preSaveData = (data) => {
    const convertData = {
      ...data,
      source: { ...data?.source, source_id: data?.source?.airbyte_source_id },
      destination: {
        ...data?.destination,
        destination_id: data?.destination?.id,
      },
    };
    const dataCreateConnection = convertDataConnectionUpdate(
      convertData,
      rowData?.connection_id,
    );
    if (!isEmpty(category)) {
      dataCreateConnection.category = category;
      (dataCreateConnection.source_display_name = data?.source?.display_name),
        (dataCreateConnection.destination_display_name =
          data?.destination?.display_name);
    }
    return dataCreateConnection;
  };

  const refSendData = useRef();
  const [dataContext, setDataContext] = useState(false);

  const initialDataSave = {
    ...dataContext,
    source: {
      airbyte_source_id: dataContext?.source_id,
      display_name: dataContext?.source_display_name,
    },
    destination: {
      id: dataContext?.destination_id,
      display_name: dataContext?.destination_display_name,
    },
    replication_frequency: dataContext?.schedule_data?.basic_schedule?.units,
    cron_expression: dataContext?.schedule_data?.cron?.cron_expression,
  };

  const steps = [
    {
      title: 'Tạo mới',
      content: (
        <FormContent
          initialValues={dataContext ? initialDataSave : {}}
          layout='vertical'
          onFinish={(data) => {
            setDataContext(preSaveData(data));
            nextStep();
          }}
          ref={refSendData}>
          <FormInfoDataModal category={category} />
        </FormContent>
      ),
    },
    {
      title: 'Cấu hình làm sạch dữ liệu',
      content: <ConfigureDataEnrichment dataSave={dataContext} />,
    },
  ];
  const [current, setCurrent] = useState(0);

  const nextStep = () => setCurrent(current + 1);
  const prevStep = () => setCurrent(current - 1);
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <ConTextDataConnection.Provider
      value={{
        dataCreateConnection: dataContext,
        nextStep,
        prevStep,
        setIsOpenModalStep,
        setCurrent,
        setDataContext,
      }}>
      <AppPageMetadata title={messages['list_progress']} />
      <DataTable
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
          filters: [
            {
              name: 'category',
              value: category,
              operation: 'eq',
            },
          ],
        }}
        toolbars={[
          <AntButton
            key={ITEM_PERMISSIONS.ADD}
            type='primary'
            icon={<PlusOutlined />}
            onClick={() => {
              setRowData(null);
              setIsOpenModalStep(true);
            }}>
            {messages['table.toolbar.addNew']}
          </AntButton>,
        ]}
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
                  to={config.routes.detailInfoData(
                    pageName,
                    data?.connection_id,
                  )}>
                  {value}
                </RenderLink>
              );
            },
          },
          {
            title: <IntlMessages id='table.source_name' />,
            dataIndex: 'source',
            width: 200,
            key: 'source_name',
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
            title: <IntlMessages id='common.connection_type' />,
            dataIndex: 'connection_type',
            width: 200,
            key: 'connection_type',
            render: (type) =>
              SCHEDULE_TYPES.find((item) => item.value === type)?.label ?? '-',
          },
          {
            title: <IntlMessages id='common.connection_time' />,
            dataIndex: 'connection_data',
            width: 200,
            key: 'connection_data',
            render: (data) => {
              if (!isObjectNotEmpty(data)) {
                return '-';
              }
              const connectionType = Object.keys(data)?.[0];
              const connectionData = data[connectionType];
              if (connectionType === 'cron') {
                return connectionData?.cron_expression;
              }
              return REPLICATION_FREQUENCY.find(
                (item) => item.value === connectionData?.units,
              )?.label;
            },
          },
          {
            key: KEY_ACTION_COLUMN,
            actions: [
              {
                label: 'table.action.detail',
                actionName: ITEM_PERMISSIONS.VIEW,
                icon: <Icon component={AcEyeIcon} />,
                onClick: (data) => {
                  navigate(
                    `${config.routes.detailInfoData(
                      pageName,
                      data?.connection_id,
                    )}${search}`,
                  );
                },
              },
              {
                label: 'table.view_history_list',
                actionName: ITEM_PERMISSIONS.VIEW,
                icon: <Icon component={ClockCircleOutlined} />,
                onClick: (data) => {
                  navigate(
                    `${config.routes.detailHistoryData(
                      pageName,
                      data?.connection_id,
                    )}${search}`,
                  );
                },
              },
              {
                label: 'Cấu hình đặt lịch',
                actionName: ITEM_PERMISSIONS.UPDATE,
                icon: <ScheduleOutlined />,
                onClick: (data) => {
                  setRowData(data);
                  setIsConfigScheduling(true);
                },
              },
              {
                label: 'Cấu hình làm sạch dữ liệu',
                actionName: ITEM_PERMISSIONS.UPDATE,
                icon: <DeliveredProcedureOutlined />,
                onClick: (data) => {
                  navigate(
                    `${config.routes.configClear(
                      pageName,
                      data?.connection_id,
                    )}${search}`,
                    {
                      state: {
                        connectionId: data?.connection_id,
                      },
                    },
                  );
                },
              },
            ],
          },
        ]}>
        <AntModal
          className={clsx(style.form_steps_modal)}
          footer={null}
          size={MODAL_SIZE.XLARGE}
          bodyStyle={{ maxHeight: '75vh', overflow: 'auto' }}
          centered
          title={steps[current]?.title}
          open={isOpenModalStep}
          onCancel={() => {
            setDataContext(false);
            setIsOpenModalStep(false);
            if (current === 0) {
              refSendData?.current.setFieldValue();
            }
            setCurrent(0);
          }}>
          <>
            <Steps current={current} items={items} />
            <div className='steps-content'>{steps[current].content}</div>
            <div className='steps-action'>
              {current < steps.length - 1 && (
                <>
                  <AntButton
                    onClick={() => {
                      setDataContext(false);
                      setIsOpenModalStep(false);
                      if (current === 0) {
                        refSendData?.current.setFieldValue();
                      }
                    }}>
                    Hủy
                  </AntButton>
                  <AntButton
                    type='primary'
                    onClick={() => {
                      refSendData?.current.submit();
                    }}>
                    Tiếp tục
                  </AntButton>
                </>
              )}
            </div>
          </>
        </AntModal>
        <FormContinueStep
          key={rowData && `action-${rowData?.connection_id}`}
          visible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          formType={rowData ? FORM_TYPES.UPDATE : FORM_TYPES.ADD}
          method={rowData ? METHOD_FETCH.PUT : METHOD_FETCH.POST}
          preSaveDataTest={preSaveDataTest}
          category={category}
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
          initialValues={rowData ? rowData : {}}>
          <FormInfoDataModal category={category} />
        </FormContinueStep>
        <DialogConfirm
          key={rowData?.source_id + 'delete'}
          visible={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          textTitle={'confirm.deleteProgress'}
          textSuccess={'confirm.deleteProgressSuccess'}
          onSaveToServer={() =>
            instanceCoreApi.post(API.DELETE_CONNECTION_AIR_BYTE, {
              connection_id: rowData?.connection_id,
            })
          }>
          <p>
            <IntlMessages id='confirm.deleteProgressSure' />
            <span className='warning-text-color'>{rowData?.name}</span>
          </p>
        </DialogConfirm>

        <DialogConfirm
          key={rowData?.source_id + 'schedule'}
          visible={isConfigScheduling}
          onClose={() => setIsConfigScheduling(false)}
          textTitle={
            rowData ? 'update_configure_scheduling' : 'configure_scheduling'
          }
          textSuccess={
            rowData
              ? 'update_configure_scheduling_success'
              : 'configure_scheduling_success'
          }
          textAntButtonConfirm={
            rowData ? 'common.update_schedule' : 'form.AntButtonAdd'
          }
          initialValues={
            rowData
              ? {
                  ...rowData,
                  replication_frequency:
                    rowData?.connection_data?.basic_schedule?.units,
                  cron_expression:
                    rowData?.connection_data?.cron?.cron_expression,
                  schedule_type: rowData?.connection_type,
                }
              : {}
          }
          onSaveToServer={async (data) => {
            const scheduleType = data?.schedule_type;
            const scheduleData = {};

            if (scheduleType === 'basic') {
              scheduleData.basic_schedule = {
                units: data?.replication_frequency,
                time_unit: 'hours',
              };
            }
            if (scheduleType === 'cron') {
              scheduleData.cron = {
                cron_time_zone: 'Asia/Ho_Chi_Minh',
                cron_expression: data?.cron_expression,
              };
            }
            // const newDataUpdateConnection = {
            //   ...rowData,
            //   name: rowData.display_name,
            //   schedule_type: scheduleType,
            //   schedule_data:
            //     scheduleType === 'manual' ? undefined : scheduleData,
            // };
            const newDataUpdate = {
              connection_id: rowData.connection_id,
              source_id: rowData.source_id,
              name: rowData.display_name,
              destination_id: rowData.destination_id,
              schedule_type: scheduleType,
              schedule_data:
                scheduleType === 'manual' ? undefined : scheduleData,
            };
            const encryptNewDataUpdate = await encryptData(newDataUpdate);
            return instanceCoreApi.post(API.UPDATE_CONNECTION_AIR_BYTE, {
              data: encryptNewDataUpdate,
            });
          }}>
          <FormConfigureScheduling />
        </DialogConfirm>
      </DataTable>
    </ConTextDataConnection.Provider>
  );
};
export default StreamConnection;
