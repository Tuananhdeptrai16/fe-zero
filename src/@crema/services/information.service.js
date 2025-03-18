import API from './apis/index';
import { instanceCoreApi } from './setupAxios';

export const deleteInformation = (id) => {
  return instanceCoreApi.delete(API.DELETE_INFORMATION(id));
};
