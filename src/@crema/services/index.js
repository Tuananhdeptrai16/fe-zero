import { instanceCoreApi } from './setupAxios';
import mock from './apis/MockConfig';

import './apis';
import API from './apis/index';

mock.onAny().passThrough();

export const postDataPagePermissions = (page) => {
  return instanceCoreApi.get(API.PAGE_PERMISSIONS, { params: { name: page } });
};

export const getAuthMeByAuthen = (token) => {
  return instanceCoreApi.get(
    API.AUTH_ME,
    {},
    { headers: { Authorization: `Bearer ${token}` } },
  );
};

export const postGetAuthMe = () => {
  return instanceCoreApi.get(API.AUTH_ME, {});
};

export const postSignInUser = ({ username, password }) => {
  return instanceCoreApi.post(API.SIGN_IN, {
    username,
    password,
  });
};

export const postSignUpUser = ({
  role,
  full_name,
  email,
  password,
  phone_number,
  website,
}) => {
  return instanceCoreApi.post(API.SIGN_UP, {
    role,
    full_name,
    email,
    password,
    phone_number,
    website,
  });
};

export const postLogoutUser = (userId, longToken) => {
  return instanceCoreApi.post(
    API.LOGOUT,
    {},
    {
      params: {
        userId,
        longToken,
      },
    },
  );
};

export const postDataResetPasswordByToken = (data) => {
  return instanceCoreApi.post(
    API.RESET_PASSWORD,
    {
      password: data.password,
      id: data.id,
    },
    { headers: { Authorization: 'Bearer ' + data.token } },
  );
};

export const postForgotPassword = (email) => {
  return instanceCoreApi.post(API.FORGOT_PASSWORD, { email });
};

export const postCreateCampaign = ({
  name,
  agency,
  agency_id,
  budget,
  start_time,
  end_time,
  advertiser = null,
  advertiser_id = null,
  id = null,
}) => {
  return instanceCoreApi.post(API.ADD_NEW_CAMPAIGN, {
    name,
    agency,
    agency_id,
    budget,
    start_time,
    end_time,
    advertiser,
    advertiser_id,
    id,
  });
};

export const postGetSelectAgency = (
  keyword = '',
  include_me = true,
  page = 1,
  sortBy = ['full_name'],
  sortDesc = [false],
) => {
  return instanceCoreApi.post(API.AGENCY_SELECT, {
    include_me,
    keyword,
    page,
    sortBy,
    sortDesc,
  });
};

export const postDeleteCampaign = (ids) => {
  return instanceCoreApi.post(API.DELETE_CAMPAIGN, {
    ids,
  });
};

export const postDeleteAdsType = (id) => {
  return instanceCoreApi.post(API.DELETE_ADS_TYPE, {
    id,
  });
};

export const postMassDeleteAdsType = (ids) => {
  return instanceCoreApi.post(API.MASS_DELETE_ADS_TYPE, {
    ids,
  });
};

export const postDeleteTag = (id) => {
  return instanceCoreApi.post(API.DELETE_TAG, {
    id,
  });
};

export const postMassDeleteTag = (ids) => {
  return instanceCoreApi.post(API.MASS_DELETE_TAG, {
    ids,
  });
};

export const postDeleteInventory = (id) => {
  return instanceCoreApi.post(API.DELETE_INVENTORY, { id });
};

export const postMassDeleteInventory = (ids) => {
  return instanceCoreApi.post(API.MASS_DELETE_INVENTORY, { ids });
};

export const postDeleteSubInventory = (id) => {
  return instanceCoreApi.post(API.DELETED_SUB_INVENTORY, { id });
};

export const postMassDeleteSubInventory = (ids) => {
  return instanceCoreApi.post(API.MASS_DELETED_SUB_INVENTORY, { ids });
};

export const postDeleteDisplayZone = (id) => {
  return instanceCoreApi.post(API.DELETE_DISPLAY_ZONE, { id });
};

export const postMassDeleteDisplayZone = (ids) => {
  return instanceCoreApi.post(API.MASS_DELETE_DISPLAY_ZONE, { ids });
};

export const postDeleteLayout = (id) => {
  return instanceCoreApi.post(API.DELETE_LAYOUT, {
    id: id,
  });
};

export const postGetDetailCampaign = (id) => {
  return instanceCoreApi.post(`${API.DETAIL_CAMPAIGN}?id=${id}`, {});
};

export const postResendVerified = (id) => {
  return instanceCoreApi.post(API.ADMIN_USER_APPROVE, {
    id: id,
  });
};

export const postDeleteAccount = (id) => {
  return instanceCoreApi.delete(API.ADMIN_USER_DELETE(id));
};

export const postLockAccount = (id) => {
  return instanceCoreApi.post(API.ADMIN_USER_LOCKED, {
    id: id,
  });
};

export const postUnlockAccount = (id) => {
  return instanceCoreApi.post(API.ADMIN_USER_UNLOCKED, {
    id: id,
  });
};

export const postTimeConfig = ({ id, start_time, end_time }) => {
  return instanceCoreApi.post(API.ADMIN_USER_SET_REPORT_TIME_RANGE, {
    id,
    start_time,
    end_time,
  });
};

export const postUpdatePassword = ({ id, password }) => {
  return instanceCoreApi.post(API.ADMIN_USER_UPDATE_PASSWORD, {
    id,
    password,
  });
};

export const postSetAccessData = ({ brandname_ids, cat_ids, id }) => {
  return instanceCoreApi.post(API.ADMIN_USER_SET_ACCESS_DATA, {
    brandname_ids,
    cat_ids,
    id,
  });
};

export const updatePermissionRole = (data) => {
  return instanceCoreApi.post(API.UPDATE_ADMIN_ROLE_PERMISSIONS, data);
};

export const updateRolesTemplateOrganization = (id, data) => {
  return instanceCoreApi.put(API.UPDATE_ROLES_TEMPLATE_ORGANIZATION(id), data);
};

export const updateRolesTemplateDepartment = (id, data) => {
  return instanceCoreApi.put(API.UPDATE_ROLES_TEMPLATE_DEPARTMENT(id), data);
};

export const postDeleteAdminRole = (id) => {
  return instanceCoreApi.delete(`${API.DELETE_ADMIN_ROLE}/${id}`);
};

export const postDeleteSystemSetting = (id) => {
  return instanceCoreApi.delete(`${API.DELETE_SYSTEM_SETTING}/${id}`);
};

export const postDeletePermission = (id) => {
  return instanceCoreApi.delete(`${API.DELETE_ADMIN_PERMISSION}/${id}`);
};

export const postDeleteOs = (id) => {
  return instanceCoreApi.post(API.DELETE_TARGET_OS, { id: id });
};

export const postDeleteDevice = (id) => {
  return instanceCoreApi.post(API.DELETE_TARGET_DEVICE, { id: id });
};

export const postDeleteGender = (id) => {
  return instanceCoreApi.post(API.DELETE_TARGET_GENDER, { id: id });
};

export const postDeleteLocation = (id) => {
  return instanceCoreApi.post(API.DELETE_TARGET_LOCATION, { id: id });
};

export const postDeleteAge = (id) => {
  return instanceCoreApi.post(API.DELETE_TARGET_AGE, { id: id });
};

export const postDeleteConnectionType = (id) => {
  return instanceCoreApi.post(API.DELETE_TARGET_AGE, { id: id });
};

export const deletePartnerBusiness = (id) => {
  return instanceCoreApi.delete(`${API.DELETE_PARTNER}/${id}`);
};

export const changeStatusPermission = ({ id, active }) => {
  return instanceCoreApi.put(API.CHANGE_STATUS_PERMISSION(id), null, {
    params: {
      active,
    },
  });
};

export const postAddUser = (data) => {
  return instanceCoreApi.post(API.CREATE_USER, data);
};
