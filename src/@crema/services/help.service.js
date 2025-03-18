import API from 'src/@crema/services/apis';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';

export const deleteQA = (id) => {
  return instanceCoreApi.delete(API.DELETE_QA(id));
};
