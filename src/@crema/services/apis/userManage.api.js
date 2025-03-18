const userManageApi = {
  //User management
  CHANGE_STATUS_USER: '/api/v1/admin/users/update-status',
  UPDATE_ROLE: '/api/v1/admin/users/change-roles',
  GET_ALL_ROLE: '/api/v1/admin/role/get-all',
  GET_ROLE_BY_ORGANIZATION: (id) =>
    `/api/v1/admin/role/get-role-by-organization-id/${id}`,
};

export default userManageApi;
