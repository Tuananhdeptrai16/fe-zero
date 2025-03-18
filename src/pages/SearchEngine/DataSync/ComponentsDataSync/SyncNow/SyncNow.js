import { RiseOutlined, SyncOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import AntButton from 'src/@crema/component/AntButton';
import notification from 'src/shared/utils/notification';
import style from './SyncNow.module.scss';
import clsx from 'clsx';
import DetailSync from '../DetailSync';
import PropTypes from 'prop-types';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import useCallApi from 'src/@crema/hook/useCallApi';
import { getMessageResponse } from 'src/shared/utils/Service';
import useIntl from 'react-intl/lib/src/components/useIntl';
import API from 'src/@crema/services/apis';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import { Skeleton } from 'antd';

SyncNow.propTypes = {
  dataDetailIndex: PropTypes.object,
  activeTab: PropTypes.string,
};

function SyncNow({ dataDetailIndex, activeTab, keyTab }) {
  const [isDisableBtnNow, setIsDisableBtnNow] = useState(false);
  const [isViewStatusSync, setIsViewStatusSync] = useState(false);

  useEffect(() => {
    setIsViewStatusSync(false);
    setIsDisableBtnNow(false);
  }, [activeTab, keyTab]);

  const { data, isLoading, error } = useFetch(
    {
      method: METHOD_FETCH.GET,
      url: API.DETAILS_SCHEDULE_SYNC_INDEX(dataDetailIndex?.id),
    },
    [dataDetailIndex, activeTab, keyTab],
  );

  // useCallAPI server sync now
  const { messages } = useIntl();
  const onSaveToServer = (data) => {
    return instanceCoreApi.post(API.SYNC_NOW(data), {});
  };

  const { loading, send } = useCallApi({
    success: (response) => {
      notification.success(response?.result || 'Đồng bộ ngay thành công');
      setIsDisableBtnNow(true);
    },
    callApi: onSaveToServer,
    error: (err) => {
      const messageError = getMessageResponse(err) || 'Đồng bộ ngay thất bại !';
      notification.error(messages[messageError] || messageError);
    },
  });

  //
  const handleSyncNow = () => {
    send(dataDetailIndex?.index_name);
  };

  return (
    <>
      {isLoading ? (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      ) : (
        <>
          {!data?.result?.name || error ? (
            <>
              <AntButton
                disabled={true}
                type='primary'
                loading={loading}
                icon={<SyncOutlined />}
                onClick={handleSyncNow}>
                Đồng bộ ngay
              </AntButton>
              <h4 className={clsx(style.messageWaning)}>
                Vui lòng lập lịch trước khi đồng bộ ngay !
              </h4>
            </>
          ) : (
            <div className={clsx(style.wrapSyncNow)}>
              {!isViewStatusSync ? (
                <>
                  <AntButton
                    disabled={isDisableBtnNow}
                    type='primary'
                    loading={loading}
                    icon={<SyncOutlined />}
                    onClick={handleSyncNow}>
                    Đồng bộ ngay
                  </AntButton>
                  {isDisableBtnNow && (
                    <div className={clsx(style.syncNowContents)}>
                      <span className={clsx(style.content_title)}>
                        Hệ thống đã tiếp nhận yêu cầu đồng bộ của bạn.
                      </span>
                      <AntButton
                        onClick={() => {
                          setIsViewStatusSync(true);
                        }}
                        icon={<RiseOutlined />}>
                        Xem tiến độ
                      </AntButton>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <DetailSync
                    dataDetailIndex={dataDetailIndex}
                    type='manual'
                    setIsGoBack={setIsViewStatusSync}
                  />
                </>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}

export default SyncNow;
