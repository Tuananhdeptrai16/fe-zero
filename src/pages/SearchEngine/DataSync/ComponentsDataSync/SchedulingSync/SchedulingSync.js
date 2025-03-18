import React from 'react';
import style from './SchedulingSync.module.scss';
import clsx from 'clsx';
import { Col, Row, Skeleton } from 'antd';
import FormContent from 'src/@crema/component/FormContent';
import notification from 'src/shared/utils/notification';
import useIntl from 'react-intl/lib/src/components/useIntl';
import { useParams } from 'react-router-dom';
import { formatDateJs } from 'src/shared/utils/DateTime';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import useCallApi from 'src/@crema/hook/useCallApi';
import { getMessageResponse } from 'src/shared/utils/Service';
import API from 'src/@crema/services/apis';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import PropTypes from 'prop-types';
import FormScheduling from './FormScheduling';

SchedulingSync.propTypes = {
  activeTab: PropTypes.string,
  setActiveTab: PropTypes.func,
  keyTab: PropTypes.string,
};

function SchedulingSync({ activeTab, setActiveTab, keyTab }) {
  const { messages } = useIntl();
  const { id: source_index_id } = useParams();
  // fetch detail SchedulingSync index current
  const {
    data: dataIndexSchedulingSync,
    isLoading: loadingFetchScheduling,
    error,
  } = useFetch(
    {
      method: METHOD_FETCH.GET,
      url: API.DETAILS_SCHEDULE_SYNC_INDEX(source_index_id),
    },
    [source_index_id, activeTab, keyTab],
  );

  const dataOldIndexScheduling = error
    ? undefined
    : dataIndexSchedulingSync?.result;

  const initialValuesFormScheduling = dataOldIndexScheduling
    ? {
        ...dataOldIndexScheduling,
      }
    : {};
  // useCallAPI server
  const onSaveToServer = (data) => {
    if (dataOldIndexScheduling) {
      return instanceCoreApi.put(
        API.UPDATE_SCHEDULE_SYNC(source_index_id),
        data,
      );
    } else {
      return instanceCoreApi.post(API.CREATE_SCHEDULE_SYNC, data);
    }
  };

  const { loading, send } = useCallApi({
    success: (response) => {
      notification.success(
        response?.result || 'Hệ thống đã tiếp nhận yêu cầu lập lịch',
      );
      setActiveTab('3');
    },
    callApi: onSaveToServer,
    error: (err) => {
      const messageError = getMessageResponse(err) || 'Lập lịch thất bại';
      notification.error(messages[messageError] || messageError);
    },
  });

  //
  const handleSchedulingSync = (value) => {
    const dataCreateScheduling = {
      ...value,
      source_index_id: Number.parseInt(source_index_id),
      start_date: formatDateJs(value?.start_date),
      end_date: formatDateJs(value?.end_date),
    };
    const dataUpdateScheduling = {
      unit: value?.unit,
      start_date: formatDateJs(value?.start_date),
      end_date: formatDateJs(value?.end_date),
    };
    if (dataOldIndexScheduling) {
      send(dataUpdateScheduling);
    } else {
      send(dataCreateScheduling);
    }
  };

  return (
    <>
      {loadingFetchScheduling ? (
        <>
          <Skeleton active />
          <Skeleton active />
        </>
      ) : (
        <div className={clsx(style.wrapSchedulingSync)}>
          <div>
            <h4 className={clsx(style.schedulingSync_title)}>
              {dataOldIndexScheduling
                ? messages['common.update_data_sync']
                : messages['common.schedule_data_sync']}
            </h4>
            <Row
              gutter={[12, 12]}
              className={clsx(style.contentSchedulingSync)}>
              <Col span={24}>
                <FormContent
                  onFinish={handleSchedulingSync}
                  initialValues={initialValuesFormScheduling}>
                  <FormScheduling
                    dataOldIndexScheduling={dataOldIndexScheduling}
                    loading={loading}
                  />
                </FormContent>
              </Col>
            </Row>
          </div>
        </div>
      )}
    </>
  );
}

export default SchedulingSync;
