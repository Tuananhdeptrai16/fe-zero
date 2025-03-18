import React, { Fragment, useEffect, useState } from 'react';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import API from 'src/@crema/services/apis';
import AntCheckbox from 'src/@crema/component/AntCheckbox';
import { Divider, Empty, Skeleton, Space } from 'antd';
import styles from './index.module.scss';
import { useIntl } from 'react-intl';
import AntButton from 'src/@crema/component/AntButton';
import { useAuthUser } from 'src/@crema/utility/AuthHooks';
import useCallApi from 'src/@crema/hook/useCallApi';
import { changeUserSettingNotificationStatus } from 'src/@crema/services/notifications.service';
import notification from 'src/shared/utils/notification';

export const NotificationSetting = () => {
  const { user } = useAuthUser();
  const { messages } = useIntl();

  const { data, isLoading } = useFetch({
    url: API.GET_ALL_USER_SETTING_NOTIFICATION,
  });
  const [listConfig, setListConfig] = useState([]);

  const { send, loading } = useCallApi({
    callApi: changeUserSettingNotificationStatus,
    success: () => {
      notification.success('Cập nhật cấu hình thông báo thành công');
    },
  });

  useEffect(() => {
    if (!data || !data.result) return;
    setListConfig(data?.result);
  }, [data]);

  const onCheckConfig = (e, config) => {
    setListConfig((prev) =>
      [...prev].map((item) => {
        if (item?.type === config?.type)
          return { ...item, status: e.target.checked };
        return item;
      }),
    );
  };

  const onSaveConfig = async () => {
    const dataToSave = listConfig.map((item) => ({
      type: item?.type,
      status: item?.status,
    }));
    await send({ user_id: user?.id, settings: dataToSave });
  };

  return (
    <div>
      {isLoading && (
        <Skeleton
          className={'itemNotify'}
          avatar
          paragraph={{ rows: 1 }}
          active
        />
      )}
      {!isLoading && listConfig.length === 0 && (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
      {!isLoading &&
        listConfig.length > 0 &&
        listConfig.map((item) => (
          <Fragment key={item?.setting?.id}>
            <AntCheckbox
              className={'ant-space-align-start'}
              checked={item?.status}
              onChange={(e) => onCheckConfig(e, item)}>
              <div className={'d-flex flex-col'}>
                <span className={styles.titleNoti}>
                  {item?.setting?.setting_name}
                </span>
                <span className={styles.descNoti}>
                  {item?.setting?.setting_description}
                </span>
              </div>
            </AntCheckbox>
            <Divider />
          </Fragment>
        ))}
      {listConfig.length > 0 && (
        <Space>
          <AntButton loading={loading} type={'primary'} onClick={onSaveConfig}>
            {messages['dialog.button.save']}
          </AntButton>
        </Space>
      )}
    </div>
  );
};
