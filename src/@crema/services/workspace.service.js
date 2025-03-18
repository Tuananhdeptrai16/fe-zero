import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import API from 'src/@crema/services/apis';

export const updateConfigWorkspace = ({ userId, data }) => {
  return instanceCoreApi.put(API.UPDATE_WORKSPACE_USER(userId), data);
};
