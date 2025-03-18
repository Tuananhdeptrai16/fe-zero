import API from './apis/index';
import { instanceCoreApi } from './setupAxios';

export const subsetDeleteOrganization = (id) => {
  return instanceCoreApi.delete(API.DELETE_DEPARTMENT(id));
};
