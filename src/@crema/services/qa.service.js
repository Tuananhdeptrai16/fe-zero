import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import API from 'src/@crema/services/apis';

export const deleteQA = (id) => {
  return instanceCoreApi.delete(`${API.DELETE_QA}/${id}`);
};

export const deleteCategoryQA = (id) => {
  return instanceCoreApi.delete(`${API.DELETE_CATEGORY_QA}/${id}`);
};
