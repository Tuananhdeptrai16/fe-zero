import API from './apis/index';
import { instanceCoreApi } from './setupAxios';

export const deleteDocumentType = (id) => {
  return instanceCoreApi.delete(API.DELETE_DOCUMENT_TYPE(id));
};
