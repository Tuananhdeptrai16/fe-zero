import { instanceCoreApi } from './setupAxios';
import API from './apis/index';
export const toggleNewsStatus = (id, status) => {
  return instanceCoreApi.put(API.TOGGLE_NEWS_STATUS, null, {
    params: {
      id,
      status,
    },
  });
};
