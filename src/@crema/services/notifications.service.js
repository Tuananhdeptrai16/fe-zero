import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import API from 'src/@crema/services/apis';

export const changeAllReadNoti = () => {
  return instanceCoreApi.put(API.CHANGE_ALL_READ_NOTI);
};

export const shareNotification = (data) => {
  return instanceCoreApi.post(API.SHARE_NOTIFICATION, data);
};

export const changeStatusNoti = (data) => {
  return instanceCoreApi.put(API.CHANGE_STATUS_NOTIFICATION, data);
};

export const changeUserSettingNotificationStatus = ({ user_id, settings }) => {
  return instanceCoreApi.post(API.CHANGE_STATUS_USER_SETTING_NOTIFICATION, {
    user_id,
    settings,
  });
};
