import API from 'src/@crema/services/apis';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';

export const updateStatusLog = ({ id, active }) => {
  return instanceCoreApi.put(API.UPDATE_SETTING_LOG(id), { active });
};
