import { instanceCoreApi } from './setupAxios';
import API from './apis/index';
export const toggleRegionStatus = (id, active) => {
  return instanceCoreApi.put(API.TOGGLE_REGION_STATUS, null, {
    params: {
      id,
      active,
    },
  });
};
