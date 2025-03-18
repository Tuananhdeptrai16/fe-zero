import { instanceCoreApi } from './setupAxios';
import API from './apis/index';

export const processedReportEditProject = (id) => {
  return instanceCoreApi.put(API.UPDATE_PROCESSED_REPORT_EDIT_PROJECT, null, {
    params: {
      id,
    },
  });
};

export const rejectReportEditProject = ({ id, data }) => {
  return instanceCoreApi.put(`${API.REJECT_REPORT_EDIT_PROJECT}/${id}`, data);
};
