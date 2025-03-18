import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import API from 'src/@crema/services/apis';

export const putDeactivateUserPermission = ({ user_id, role_id }) => {
  return instanceCoreApi.put(API.DEACTIVATE_PERMISSION_USER, null, {
    params: {
      role_id,
      user_id,
    },
  });
};

export const putActivateUserPermission = ({ user_id, role_id }) => {
  return instanceCoreApi.put(API.ACTIVATE_PERMISSION_USER, null, {
    params: {
      role_id,
      user_id,
    },
  });
};

export const putDeactivateOrganizationPermission = ({ role_id, org_id }) => {
  return instanceCoreApi.put(API.DEACTIVATE_PERMISSION_ORGANIZATION, null, {
    params: {
      role_id,
      org_id,
    },
  });
};

export const putActivateOrganizationPermission = ({ role_id, org_id }) => {
  return instanceCoreApi.put(API.ACTIVATE_PERMISSION_ORGANIZATION, null, {
    params: {
      role_id,
      org_id,
    },
  });
};
