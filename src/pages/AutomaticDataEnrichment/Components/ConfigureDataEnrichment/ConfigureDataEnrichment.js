import { Col, Row, Skeleton, Spin } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import useIntl from 'react-intl/lib/src/components/useIntl';
// import PropTypes from 'prop-types';
import SourceTable from './ComponentTable/SourceTable/SourceTable';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import API from 'src/@crema/services/apis';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import style from './ConfigureDataEnrichment.module.scss';
import clsx from 'clsx';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import useCallApi from 'src/@crema/hook/useCallApi';
import { getMessageResponse } from 'src/shared/utils/Service';
import notification from 'src/shared/utils/notification';
import { stringify, parse } from 'src/shared/utils/String';
import {
  convertObjectKeyToSnakeCase,
  encryptData,
} from 'src/shared/utils/Object';
import { isEmpty } from 'src/shared/utils/Typeof';
import { useParams } from 'react-router-dom';
import AntButton from 'src/@crema/component/AntButton';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import DialogConfirm from 'src/@crema/component/DialogConfirm';
import { ConTextDataConnection } from 'src/pages/streamConnection/infoData';

const ConfigureDataEnrichment = ({ dataSave, connectionId }) => {
  const { messages } = useIntl();
  const [isDialogOpen, setIsOpenDialog] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [dataDetailConnection, setDataDetailConnection] = useState(null);
  const { id: idConnection } = useParams();
  const dataContextConnection = useContext(ConTextDataConnection);
  const [discoverSchema, setDiscoverSchema] = useState();
  const [getSource, setGetSource] = useState();
  const [getConnection, setGetConnection] = useState();

  const encrypt = async () => {
    const encryptDataDiscoverSchema = await encryptData({
      api: '/v1/sources/discover_schema',
      body: stringify({
        sourceId: dataSave?.source_id ?? connectionId,
        disable_cache: true,
      }),
    });

    const encryptDataGetSource = await encryptData({
      api: '/v1/sources/get',
      body: `{"sourceId":"${dataSave?.source_id ?? connectionId}"}`,
    });

    const encryptDataGetConnection = await encryptData({
      api: '/v1/web_backend/connections/get',
      body: stringify({
        connectionId: dataDetailConnection?.connection_id ?? connectionId,
        withRefreshedCatalog: true,
      }),
    });

    setDiscoverSchema(encryptDataDiscoverSchema);
    setGetSource(encryptDataGetSource);
    setGetConnection(encryptDataGetConnection);
    console.log('1: ', encryptDataDiscoverSchema);
    console.log('2: ', encryptDataGetSource);
    console.log('3: ', encryptDataGetConnection);
  };

  useEffect(() => {
    encrypt();
  }, []);

  console.log('4: ', discoverSchema);
  console.log('5: ', getSource);
  console.log('6: ', getConnection);
  const { data: dataGetSyncCatalog, isLoading: loadingCatalog } = useFetch(
    {
      method: METHOD_FETCH.POST,
      url: API.API_AIR_BYTE,
      enabled: dataSave?.source_id,
      body: {
        data: discoverSchema,
      },
    },
    [discoverSchema],
  );
  // Get detail source
  const { data: dataGetSource } = useFetch(
    {
      method: METHOD_FETCH.POST,
      url: API.API_AIR_BYTE,
      enabled: dataSave?.source_id,
      body: {
        data: getSource,
      },
    },
    [getSource],
  );
  // console.log(dataGetSource);
  const dataDetailSource = parse(dataGetSource?.result) || {};
  const responseAirByte = parse(dataGetSyncCatalog?.result) || {};
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
  // detail connection
  const {
    data,
    isLoading,
    fetchData: fetchDetailConnection,
  } = useFetch(
    {
      method: METHOD_FETCH.POST,
      url: API.DETAIL_CONNECTION_AIR_BYTE,
      body: {
        connection_id: idConnection,
      },
    },
    [idConnection],
  );

  useEffect(() => {
    if (data) {
      setDataDetailConnection(data?.result || {});
    }
  }, [data]);

  const disabledBtnSync = dataDetailConnection?.status;

  const { loading: isLoadingCatalog, send: reloadDataConnection } = useCallApi({
    success: (response) => {
      const dataResPrevToSnakeCase = parse(response?.result) || {};
      const newInfoConnection = convertObjectKeyToSnakeCase(
        dataResPrevToSnakeCase,
      );
      newInfoConnection?.sync_catalog?.streams?.forEach((item) => {
        const name = item?.stream?.name;
        const findColumnOld =
          dataResPrevToSnakeCase?.syncCatalog?.streams?.find((item) => {
            return item?.stream?.name?.toUpperCase() === name?.toUpperCase();
          });
        if (!isEmpty(findColumnOld)) {
          item.stream.json_schema.properties =
            findColumnOld?.stream?.jsonSchema?.properties;
        }
      });

      if (!isEmpty(newInfoConnection)) {
        setDataDetailConnection(newInfoConnection);
        notification.success('Làm mới bảng dữ liệu thành công');
      } else {
        notification.error('Làm mới bảng dữ liệu thất bại');
      }
    },
    callApi: () =>
      instanceCoreApi.post(API.API_AIR_BYTE, {
        data: getConnection,
      }),
  });

  // status sync connection
  const { data: dataStatus, fetchData: fetchDataStatusSync } = useFetch(
    {
      method: METHOD_FETCH.POST,
      url: API.STATUS_SYNC_CONNECTION_AIR_BYTE,
      body: {
        connection_ids: [idConnection],
      },
    },
    [idConnection],
  );
  const dataStatusSync = dataStatus?.result[0];
  // console.log(dataStatusSync);
  useEffect(() => {
    const idInterval = setInterval(() => {
      if (idConnection) {
        fetchDataStatusSync();
      }
    }, 2000);

    return () => {
      clearInterval(idInterval);
    };
  }, []);

  const isRunningSync = dataStatusSync?.is_running;

  //  sync
  const onSaveToServerSync = (data) => {
    return instanceCoreApi.post(API.SYNC_JOB_CONNECTION_AIR_BYTE, data);
  };
  const { loading: loadingSync, send: SendSync } = useCallApi({
    success: () => {
      notification.success('Kích hoạt tiến trình đồng bộ thành công');
      fetchDataStatusSync();
      // fetchDetailConnection();
    },
    callApi: onSaveToServerSync,
    error: (err) => {
      const messageError = getMessageResponse(err) || 'Đồng bộ thất bại';
      notification.error(messages[messageError] || messageError);
    },
  });
  const handleSync = () => {
    const idConnectionSync = dataDetailConnection?.connection_id;
    SendSync({
      connection_id: idConnectionSync,
    });
  };

  // update config
  const onSaveUpdateConfig = (data) => {
    return instanceCoreApi.post(API.UPDATE_SYNC_JOB_CONNECTION_AIR_BYTE, data);
  };
  const { loading: loadingUpdateConfig, send: updateConfig } = useCallApi({
    success: () => {
      setIsOpenDialog(false);
      notification.success('Cập nhật cấu hình thành công');
      setIsModalOpen(false);
      fetchDetailConnection();
    },
    callApi: onSaveUpdateConfig,
    error: (err) => {
      const messageError =
        getMessageResponse(err) || 'Cập nhật cấu hình thất bại';
      notification.error(messages[messageError] || messageError);
    },
  });

  // pause
  const onPauseSync = (data) => {
    return instanceCoreApi.post(API.CANCEL_SYNC_JOB_CONNECTION_AIR_BYTE, data);
  };
  const { loading: loadingPause, send: SendPauseSync } = useCallApi({
    success: () => {
      notification.success(
        isPause
          ? 'Tạm dừng tiến trình đồng bộ thành công'
          : 'Dừng tiến trình đồng bộ thành công',
      );
      setIsOpenDialog(false);
      fetchDataStatusSync();
    },
    callApi: onPauseSync,
  });
  const handlePauseSync = async () => {
    const idJobSync = dataStatusSync?.last_sync_job_id;
    await SendPauseSync({
      id: idJobSync,
    });
  };
  // enable_enrichment_process
  const enableProcess = () => {
    const idConnection = dataDetailConnection?.connection_id;
    updateConfig({
      connection_id: idConnection,
      status: 'active',
    });
  };

  // stop_enrichment_process
  const handleStopProcess = async () => {
    const idConnection = dataDetailConnection?.connection_id;
    await updateConfig({
      connection_id: idConnection,
      status: 'inactive',
    });
    // handlePauseSync();
  };

  return (
    <>
      {isLoading && isEmpty(dataDetailConnection) ? (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      ) : (
        <Spin spinning={isLoading || isLoadingCatalog || loadingCatalog}>
          <div className={clsx(style.wrapConfig)}>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                {isEmpty(dataContextConnection) && (
                  <div className={clsx(style.header_config)}>
                    <div className={clsx(style.wrapActions)}>
                      {disabledBtnSync !== 'inactive' && !isRunningSync && (
                        <AntButton
                          onClick={handleSync}
                          loading={loadingSync}
                          type='primary'>
                          {messages['sidebar.activate_enrichment_process']}
                        </AntButton>
                      )}
                      {isRunningSync && (
                        <AntButton
                          type='primary'
                          loading={loadingPause}
                          onClick={() => {
                            setIsOpenDialog(true);
                            setIsPause(true);
                          }}>
                          {messages['sidebar.pause_enrichment_process']}
                        </AntButton>
                      )}
                      {disabledBtnSync !== 'inactive' && (
                        <AntButton
                          onClick={() => {
                            setIsOpenDialog(true);
                            setIsPause(false);
                          }}
                          type='primary'
                          danger>
                          {messages['sidebar.stop_enrichment_process']}
                        </AntButton>
                      )}
                      {disabledBtnSync === 'inactive' && (
                        <AntButton onClick={enableProcess} type='primary'>
                          {messages['sidebar.enable_enrichment_process']}
                        </AntButton>
                      )}
                    </div>
                  </div>
                )}
                <SourceTable
                  dataDetailConnection={dataDetailConnection}
                  updateConfig={updateConfig}
                  reloadDataConnection={reloadDataConnection}
                  loadingUpdateConfig={loadingUpdateConfig}
                  isDialogOpen={isDialogOpen}
                  setIsOpenDialog={setIsOpenDialog}
                  dataStatusSync={dataStatusSync}
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                  streams={streams}
                  dataDetailSource={dataDetailSource}
                  dataSave={dataSave}
                />
              </Col>
            </Row>
          </div>
          <DialogConfirm
            key={'id_form_confirm'}
            visible={isDialogOpen}
            onClose={() => setIsOpenDialog(false)}
            textTitle={
              isPause
                ? 'confirm.pause_enrichment_process'
                : 'confirm.stop_enrichment_process'
            }
            textSuccess={
              isPause
                ? 'confirm.pause_enrichment_process_success'
                : 'confirm.stop_enrichment_process_success'
            }
            onSaveToServer={isPause ? handlePauseSync : handleStopProcess}>
            <p>
              <IntlMessages
                id={
                  isPause
                    ? 'confirm.pause_enrichment_process_Sure'
                    : 'confirm.stop_enrichment_process_Sure'
                }
              />
              {/* <span className='warning-text-color'>
                {dataStatusSync?.last_sync_job_id}
              </span> */}
            </p>
          </DialogConfirm>
        </Spin>
      )}
    </>
  );
};

ConfigureDataEnrichment.propTypes = {};

export default ConfigureDataEnrichment;
