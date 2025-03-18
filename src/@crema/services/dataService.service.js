import { DATA_SERVICE_API } from './apis/index';
import { instanceCoreApi } from './setupAxios';

export const addDataServiceApi = (data) => {
  return instanceCoreApi.post(DATA_SERVICE_API.CREATE_DATA_SERVICE, data);
};
export const deleteDataServiceApi = (id) => {
  return instanceCoreApi.delete(DATA_SERVICE_API.DELETE_DATA_SERVICE(id));
};

export const updateDataServiceApi = ({ id, data }) => {
  return instanceCoreApi.put(DATA_SERVICE_API.UPDATE_DATA_SERVICE(id), data);
};

export const updateStatusDataServiceApi = (id, data) => {
  return instanceCoreApi.put(DATA_SERVICE_API.UPDATE_DATA_SERVICE(id), data);
};
