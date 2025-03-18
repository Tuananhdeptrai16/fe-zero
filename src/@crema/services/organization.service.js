import API from './apis/index';
import { instanceCoreApi } from './setupAxios';

export const deleteOrganization = (id) => {
  return instanceCoreApi.delete(API.DELETE_ORGANIZATION(id));
};
