import { instanceCoreApi } from './setupAxios';
import API, { REPORT_API } from './apis/index';
//User management service
export const putChangeStatusReport = (id, active) => {
  return instanceCoreApi.put(API.CHANGE_STATUS_REPORT, null, {
    params: {
      id,
      active,
    },
  });
};

export const putChangeStatusPackage = (id, active) => {
  return instanceCoreApi.put(API.CHANGE_STATUS_PACKAGE, null, {
    params: {
      id,
      active,
    },
  });
};

export const putChangeStatusContent = (id, active) => {
  return instanceCoreApi.put(REPORT_API.CHANGE_STATUS_CONTENT, null, {
    params: {
      id,
      active,
    },
  });
};

// edit in list report
export const putEditReport = ({ reportId, data }) => {
  return instanceCoreApi.put(
    `${REPORT_API.PUT_UPDATE_REPORT}/${reportId}`,
    data,
  );
};

export const postAddReport = (data) => {
  return instanceCoreApi.post(REPORT_API.POST_ADD_REPORT, data);
};
