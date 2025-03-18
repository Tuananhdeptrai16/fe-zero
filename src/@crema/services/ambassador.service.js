import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import { AMBASSADOR_API } from 'src/@crema/services/apis';

export const putChangeStatusInterview = (id) => {
  return instanceCoreApi.put(
    `${AMBASSADOR_API.PUT_CHANGE_STATUS_INTERVIEW}/${id}`,
  );
};

export const putRejectFormRegister = (id, reason_for_refusal) => {
  return instanceCoreApi.put(
    AMBASSADOR_API.REFUSE_AMBASSADOR,
    { reason_for_refusal },
    {
      params: { id },
    },
  );
};

export const putApproveRegister = ({ id, data }) => {
  return instanceCoreApi.put(AMBASSADOR_API.APPROVE_AMBASSADOR, data, {
    params: { id },
  });
};

export const putApproveUpdateInfo = ({ id }) =>
  instanceCoreApi.put(
    AMBASSADOR_API.APPROVE_UPDATE_INFO,
    {},
    { params: { id } },
  );

export const putRejectUpdateInfo = ({ id, data }) =>
  instanceCoreApi.put(AMBASSADOR_API.REJECT_UPDATE_INFO, data, {
    params: { id },
  });
