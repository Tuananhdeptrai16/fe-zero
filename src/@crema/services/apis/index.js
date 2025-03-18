const API = {
  REFRESH_TOKEN: '/api/v1/public/users/refresh-token',
  AUTH_ME: '/api/v1/me',
  CHANGE_USER_INFO_FIRST_LOGIN:
    '/api/v1/user/change-user-info-first-time-login',
  SIGN_IN: '/api/v1/public/auth/authenticate',
  SIGN_UP: '/api/v1/public/auth/user/register',
  LOGOUT: '/api/auth/logout',
  MEDIA_UPLOAD: '/api/nextcloud/upload',
  FILE_UPLOAD: '/api/nextcloud/upload',
  FORGOT_PASSWORD: '/api/auth/reset-password',
  CHANGE_USER_INFO: '/api/v1/user/change-info',
  CHANGE_PASSWORD: '/api/v1/user/change-password',
  PAGE_PERMISSIONS: '/api/v1/admin/permission/get-by-page-name',
  RESET_PASSWORD: '/api/admin/user/create-self-password',
  NOTIFICATION: '/api/notification',
  SYSTEM_CONFIG_ALL: '/api/system-config/all',
  CAMPAIGN: '/api/statistic/campaign',
  CAMPAIGN_SELECT: '/api/campaign/select',
  ADD_NEW_CAMPAIGN: '/api/campaign/store',
  UPDATE_CAMPAIGN: '/api/campaign/update',
  DELETE_CAMPAIGN: '/api/campaign/mass-delete',
  CAMPAIGN_DETAIL: '/api/campaign/detail',
  CHANGE_STATUS_CAMPAIGN: '/api/campaign/change-status',
  AGENCY_SELECT: 'api/agency-advertiser/select',
  AGENCY_ADVERTISER_SELECT: '/api/agency-advertiser/select',
  ADD_NEW_INVENTORY: '/api/inventory/display-ads/store',
  UPDATE_INVENTORY: '/api/inventory/display-ads/update',
  DELETE_INVENTORY: '/api/inventory/display-ads/delete',
  MASS_DELETE_INVENTORY: '/api/inventory/display-ads/mass-delete',
  INVENTORY_DETAIL: '/api/inventory/display-ads/detail',
  SUB_INVENTORY_DETAIL: '/api/channel/detail',
  SUB_INVENTORY_SELECT: '/api/channel/select',
  SUB_INVENTORY_SUGGEST: '/api/channel/suggest',
  LAYOUT_SELECT: '/api/layout/select',
  DELETE_LAYOUT: '/api/layout/delete',
  CREATE_LAYOUT: '/api/layout/store',
  UPDATE_LAYOUT: '/api/layout/update',
  ADD_NEW_DISPLAY_ZONE: '/api/zone/store',
  UPDATE_DISPLAY_ZONE: '/api/zone/update',
  DELETE_DISPLAY_ZONE: '/api/zone/delete',
  MASS_DELETE_DISPLAY_ZONE: '/api/zone/mass-delete',
  ADD_NEW_TAG: '/api/tag/store',
  UPDATE_TAG: '/api/tag/update',
  DELETE_TAG: '/api/tag/delete',
  MASS_DELETE_TAG: '/api/tag/mass-delete',
  INVENTORY_SELECT: '/api/inventory/display-ads/select',
  TAG_SELECT: '/api/tag/select',
  ADD_NEW_SUB_INVENTORY: '/api/channel/store',
  UPDATE_SUB_INVENTORY: '/api/channel/update',
  DELETE_ADS_TYPE: 'api/ads-type/delete',
  MASS_DELETE_ADS_TYPE: 'api/ads-type/mass-delete',
  EXPORT_EXCEL_CONTACT: '/api/v1/admin/contact-request/export/excel',

  DELETED_SUB_INVENTORY: '/api/channel/delete',
  MASS_DELETED_SUB_INVENTORY: '/api/channel/mass-delete',
  CREATE_DISPLAY_TYPE: '/api/ads-type/store',
  UPDATE_DISPLAY_TYPE: '/api/ads-type/update',
  LOCATION_SELECT: '/api/location/select',
  ADS_TYPE_SELECT: '/api/ads-type/select',
  DETAIL_BANNER: '/api/banner/detail',
  GET_LOOKUP_COLLECTED_RESULTS_INTERMEDIATE:
    '/api/v1/admin/airbyte-destination/table/query-record',
  EXPORT_EXCEL_LOOKUP_INTERMEDIATE_AREA:
    '/api/v1/admin/airbyte-destination/table/export-excel',
  EXPORT_PDF_LOOKUP_INTERMEDIATE_AREA:
    '/api/v1/admin/airbyte-destination/table/export-pdf',

  ADMIN_USER_APPROVE: 'api/admin/user/approve',
  ADMIN_USER_DELETE: (id) => `/api/v1/admin/users/delete/${id}`,
  ADMIN_USER_LOCKED: '/api/admin/user/locked',
  ADMIN_USER_UNLOCKED: '/api/admin/user/unlocked',
  ADMIN_USER_GET_REPORT_TIME_RANGE: 'api/admin/user/get-report-time-range',
  ADMIN_USER_SET_REPORT_TIME_RANGE: '/api/admin/user/set-report-time-range',
  ADMIN_USER_UPDATE_PASSWORD: '/api/admin/user/update-password',
  ADMIN_USER_GET_ACCESS_DATA: '/api/admin/user/get-access-data',
  ADMIN_USER_SET_ACCESS_DATA: '/api/admin/user/set-access-data',

  BRAND_NAME_SELECT: '/api/brandname/select',
  BUSINESS_ACTIVITY_SELECT: '/api/business-activity/select',
  DELETE_ADS_REDIRECT: '/api/ads/delete',
  CHANGE_STATUS_ADS_REDIRECT: '/api/ads/change-status',

  GET_LIST_ADMIN_ROLE: '/api/v1/admin/role/search',
  GET_ROLES_ORGANIZATION: (id) =>
    `/api/v1/admin/role/get-role-by-organization-id/${id}`,
  CREATE_ADMIN_ROLE: '/api/v1/admin/role',
  UPDATE_ADMIN_ROLE: '/api/v1/admin/role',
  DELETE_ADMIN_ROLE: '/api/v1/admin/role/delete',
  UPDATE_ADMIN_ROLE_PERMISSIONS: '/api/v1/admin/permission-role/add-list',
  GET_ALL_PERMISSIONS: '/api/v1/admin/permission/get-all',
  GET_USER_ORG_BY_ROLE_ID: (id) => `/api/v1/admin/role/get-user-org/${id}`,
  DEACTIVATE_PERMISSION_USER: '/api/v1/admin/user-role/deactive',
  ACTIVATE_PERMISSION_USER: '/api/v1/admin/user-role/active',
  DEACTIVATE_PERMISSION_ORGANIZATION:
    '/api/v1/admin/organization-role/deactive',
  ACTIVATE_PERMISSION_ORGANIZATION: '/api/v1/admin/organization-role/active',

  GET_LIST_ADMIN_PERMISSIONS: '/api/v1/admin/permission/search',
  CREATE_ADMIN_PERMISSION: '/api/v1/admin/permission',
  UPDATE_ADMIN_PERMISSION: '/api/v1/admin/permission',
  DELETE_ADMIN_PERMISSION: '/api/v1/admin/permission/delete',
  CHANGE_STATUS_PERMISSION: (id) =>
    `/api/v1/admin/permission/change-status/${id}`,

  GET_LIST_DOCUMENT_TEMPLATE: '/api/v1/admin/document-template/search',
  GET_LIST_DOCUMENT_TEMPLATE_VIEW:
    '/api/v1/admin/document-template/search-view',
  CREATE_DOCUMENT_TEMPLATE: '/api/v1/admin/document-template',
  UPDATE_DOCUMENT_TEMPLATE: '/api/v1/admin/document-template',
  DELETE_DOCUMENT_TEMPLATE: '/api/v1/admin/document-template/delete',
  SELECT_DOCUMENT_TEMPLATE: '/api/v1/admin/document-template/select',

  // System setting
  GET_LIST_SYSTEM_SETTING: '/api/v1/admin/system-setting/search',
  CREATE_SYSTEM_SETTING: '/api/v1/admin/system-setting',
  UPDATE_SYSTEM_SETTING: '/api/v1/admin/system-setting',
  DELETE_SYSTEM_SETTING: '/api/v1/admin/system-setting/delete',

  //targeting
  CREATE_TARGET_OS: '/api/os/store',
  UPDATE_TARGET_OS: '/api/os/update',
  DELETE_TARGET_OS: '/api/os/delete',
  SELECT_TARGET_OS: '/api/os/select',
  IMPORT_TARGET_OS: '/api/os/import',
  UPLOAD_TARGET_OS: '/api/os/import',

  CREATE_TARGET_DEVICE: '/api/device/store',
  UPDATE_TARGET_DEVICE: '/api/device/update',
  DELETE_TARGET_DEVICE: '/api/device/delete',
  SELECT_TARGET_DEVICE: '/api/device/select',
  UPLOAD_TARGET_DEVICE: '/api/device/import',

  CREATE_TARGET_GENDER: '/api/gender/store',
  UPDATE_TARGET_GENDER: '/api/gender/update',
  DELETE_TARGET_GENDER: '/api/gender/delete',
  SELECT_TARGET_GENDER: '/api/gender/select',

  CREATE_TARGET_LOCATION: '/api/location/store',
  UPDATE_TARGET_LOCATION: '/api/location/update',
  DELETE_TARGET_LOCATION: '/api/location/delete',
  SELECT_TARGET_LOCATION: '/api/location/select',
  UPLOAD_TARGET_LOCATION: '/api/location/import',

  SELECT_TARGET_AGE: '/api/group-age/select',
  CREATE_TARGET_AGE: '/api/group-age/store',
  UPDATE_TARGET_AGE: '/api/group-age/update',
  DELETE_TARGET_AGE: '/api/group-age/delete',

  SELECT_TARGET_CONNECTION_TYPE: '/api/network/select',
  CREATE_TARGET_CONNECTION_TYPE: '/api/network/store',
  UPDATE_TARGET_CONNECTION_TYPE: '/api/network/update',
  DELETE_TARGET_CONNECTION_TYPE: '/api/network/delete',

  //Investor service
  TOGGLE_INVESTOR_STATUS: '/api/v1/admin/investor/change-active',
  UPDATE_INVESTOR: '/api/v1/admin/investor',
  CREATE_INVESTOR: '/api/v1/admin/investor',
  GET_INVESTOR: '/api/v1/admin/investor',
  GET_LIST_USER: '/api/v1/admin/users/search',
  GET_LIST_USER_WITHOUT_ORGANIZATION: (id) =>
    `/api/v1/admin/users/get-all-by-organization-id?organization-id=${id}`,
  CREATE_USER: '/api/v1/admin/users/insert-new',
  SELECT_USER: '/api/v1/admin/users/select',
  GET_ALL_USER: '/api/v1/admin/users/get-all',

  //Region service
  TOGGLE_REGION_STATUS: '/api/v1/admin/area/change-active',
  GET_PROVINCES: '/api/v1/admin/province/search',
  UPDATE_REGION: '/api/v1/admin/area',
  CREATE_REGION: '/api/v1/admin/area',
  GET_DISTRICT: '/api/v1/admin/district/search',

  // QA
  GET_LIST_QA: '/api/v1/admin/question-and-answer/search',
  GET_LIST_CATEGORY_QA: '/api/v1/admin/category-question/search',
  UPDATE_CATEGORY_QA: '/api/v1/admin/category-question',
  CREATE_CATEGORY_QA: '/api/v1/admin/category-question',
  DELETE_CATEGORY_QA: '/api/v1/admin/category-question/delete',

  // Report edit project
  GET_LIST_REPORT_EDIT_PROJECT: '/api/v1/admin/report-person/list/search',
  ADD_REPORT_EDIT_PROJECT: '/api/v1/admin/report-person/new',
  UPDATE_PROCESSED_REPORT_EDIT_PROJECT: '/api/v1/admin/report-person/approve',
  REJECT_REPORT_EDIT_PROJECT: '/api/v1/admin/report-person/reject',

  //Project service
  TOGGLE_PROJECT_STATUS: '/api/v1/admin-ambassador/project/change-active',
  PROJECT_TYPE: '/api/v1/public/project-type',
  PROJECT_STATE: '/api/v1/public/project-state',
  GET_PROJECT_UTILS: '/api/v1/public/project-util',
  PUT_UPDATE_PROJECT: '/api/v1/admin/project/:id',
  POST_ADD_PROJECT: '/api/v1/admin/project',
  GET_PROJECT_LIST: '/api/v1/admin/project/search',
  GET_PROJECT_LIST_BY_IDS: '/api/v1/admin-ambassador/project/get-ListIds',
  APPROVE_CHANGE_PROJECTS: '/api/v1/admin/edit-project/approve-list-edit',
  APPROVE_PROJECT: '/api/v1/admin-ambassador/project/approve',
  REJECT_PROJECT: '/api/v1/admin-ambassador/project/reject',

  //edit - project
  GET_LIST_EDIT_PROJECT: '/api/v1/admin/edit-project/search',
  APPROVE_EDIT_PROJECT: '/api/v1/admin/edit-project/approve-edit',

  //News service
  TOGGLE_NEWS_STATUS: '/api/v1/admin/blog/change-status',
  GET_CATEGORY: '/api/v1/admin/blog-category/search',
  SELECT_CATEGORY: '/api/v1/admin/blog-category/select',
  UPDATE_NEW: '/api/v1/admin/blog',
  CREATE_NEW: '/api/v1/admin/blog',

  //User management
  CHANGE_STATUS_USER: '/api/v1/admin/users/update-status',
  CHANGE_ADMIN_ROLE: '/api/v1/admin/users/change-roles',
  UPDATE_USER: (id) => `/api/v1/admin/users/${id}`,
  USER_UPDATE_ROLE: '/api/v1/admin/users/update-role-org',
  //Report management
  CHANGE_STATUS_REPORT: '/api/v1/admin/report/change-active',
  CHANGE_STATUS_PACKAGE: '/api/v1/admin/document-type/change-active',

  //Order service
  GET_DETAIL_ORDER: '/api/v1/admin/order',
  VERIFY_ORDER: '/api/v1/admin/order/change-status',
  GET_TOTAL_REVENUE: '/api/v1/admin/order/get/total-revenue',
  //Report download
  GET_REPORT_DOWNLOAD_DETAIL: '/api/v1/admin/report/downloaded/getAll',
  EXPORT_ORDER_EXCEL: '/api/v1/admin/order/export/excel',
  EXPORT_MOMO_EXCEL: 'api/v1/admin/order-momo/export/excel',

  //Partner
  GET_LIST_PARTNER: '/api/v1/admin/business-partner/list',
  DELETE_PARTNER: '/api/v1/admin/business-partner/delete',
  ADD_PARTNER: '/api/v1/admin/business-partner',
  UPDATE_PARTNER: '/api/v1/admin/business-partner',

  //ORGANIZATION
  SELECT_ORGANIZATION: '/api/v1/admin/organization/select',
  SEARCH_ORGANIZATION: '/api/v1/admin/organization/search',
  CREATE_ORGANIZATION: '/api/v1/admin/organization',
  UPDATE_ORGANIZATION: (id) => `/api/v1/admin/organization/${id}`,
  DELETE_ORGANIZATION: (id) => `/api/v1/admin/organization/delete/${id}`,
  GET_ALL_ORGANIZATION: '/api/v1/admin/organization/get-all',
  GET_ALL_ORGANIZATION_BY_USER: '/api/v1/admin/organization/get-all-by-user',
  UPDATE_USER_ORGANIZATION: (organizationId, roleId) =>
    `/api/v1/admin/organization/select-organization?organization_id=${organizationId}&role_id=${roleId}`,
  GET_CURRENT_ROLE: (id) =>
    `/api/v1/admin/user-role-current/get-current-role/${id}`,

  //DETAIL-ORGANIZATION
  SELECT_DETAIL_ORGANIZATION: '/api/v1/admin/organization/select',
  SEARCH_DETAIL_ORGANIZATION: '/api/v1/admin/organization/member-list',
  CREATE_DETAIL_ORGANIZATION: '/api/v1/admin/organization/add-member',
  UPDATE_DETAIL_ORGANIZATION: (id) =>
    `/api/v1/admin/organization/update-properties/${id}`,
  DELETE_DETAIL_ORGANIZATION: '/api/v1/admin/organization/remove-member',

  //DEPARTMENT
  SELECT_DEPARTMENT: '/api/v1/admin/department/select',
  SEARCH_DEPARTMENT: '/api/v1/admin/department/search',
  CREATE_DEPARTMENT: '/api/v1/admin/department',
  UPDATE_DEPARTMENT: (id) => `/api/v1/admin/department/${id}`,
  DELETE_DEPARTMENT: (id) => `/api/v1/admin/department/delete/${id}`,
  GET_DEPARTMENT_BY_ORGANIZATION: (id) =>
    `api/v1/admin/department/get-by-organization/${id}`,

  SEARCH_MEMBER_LIST_ORGANIZATION: '/api/v1/admin/organization/member-list',
  CREATE_MEMBER_LIST_ORGANIZATION: '/api/v1/admin/organization/add-member',
  DELETE_MEMBER_LIST_ORGANIZATION: '/api/v1/admin/organization/remove-member',

  //RAW DOCUMENT
  SELECT_RAW_DOCUMENT: '/api/v1/admin/raw-document/select',
  SEARCH_RAW_DOCUMENT: '/api/v1/admin/raw-document/search',
  VERIFY_RAW_DOCUMENT: '/api/v1/admin/raw-document/verify',
  UPDATE_TEMPLATE_RAW_DOCUMENT: (id) =>
    `/api/v1/admin/raw-document/update-template/${id}`,
  SAVE_DRAFT_RAW_DOCUMENT: (id) => `/api/v1/admin/raw-document/drafting/${id}`,
  APPROVED_RAW_DOCUMENT: '/api/v1/admin/raw-document/approved',
  COUNT_RAW_DOCUMENT: '/api/v1/admin/raw-document/count',
  CREATE_RAW_DOCUMENT: '/api/v1/admin/raw-document',
  DETAIL_RAW_DOCUMENT: (id) => `/api/v1/admin/raw-document/detail/${id}`,
  UPDATE_RAW_DOCUMENT: (id) => `/api/v1/admin/raw-document/${id}`,
  DELETE_RAW_DOCUMENT: (id) => `/api/v1/admin/raw-document/delete/${id}`,
  MASS_DELETE_RAW_DOCUMENT: '/api/v1/admin/raw-document/mass-delete',
  SEARCH_RAW_DOCUMENT_BY_ORGANIZATION:
    '/api/v1/admin/raw-document/search-organization',

  //DOCUMENT
  SELECT_DOCUMENT_TYPE: '/api/v1/admin/document-type/select',
  SEARCH_DOCUMENT_TYPE: '/api/v1/admin/document-type/search',
  UPDATE_DOCUMENT_TYPE: (id) => `/api/v1/admin/document-type/${id}`,
  CREATE_DOCUMENT_TYPE: '/api/v1/admin/document-type',
  DELETE_DOCUMENT_TYPE: (id) => `/api/v1/admin/document-type/delete/${id}`,

  //RELATE-DOCUMENT
  SEARCH_RELATE_DOCUMENT: '/api/v1/admin/relate-document/search',
  CREATE_RELATE_DOCUMENT: '/api/v1/admin/relate-document',
  SELECT_RELATE_DOCUMENT: '/api/v1/admin/relate-document/select',
  UPDATE_RELATE_DOCUMENT: (id) => `/api/v1/admin/relate-document/${id}`,
  DELETE_RELATE_DOCUMENT: (id) => `/api/v1/admin/relate-document/delete/${id}`,
  SEARCH_RELATE_DOCUMENT_BY_CITIZEN:
    '/api/v1/admin/relate-document/related-citizen',
  SEARCH_ES_RELATE_DOCUMENT: '/api/v1/admin/relate-document/search-es',

  // VERDICT
  SELECT_VERDICT: '/api/v1/admin/verdict/select',
  SEARCH_VERDICT_BY_CITIZEN: '/api/v1/admin/verdict/related-citizen',

  //PROHIBIT
  SUGGEST_PROHIBIT_BY_CITIZEN:
    '/api/v1/admin/prohibit-positions-document/related-citizen',
  SELECT_PROHIBIT: '/api/v1/admin/prohibit-positions-document/select',
  SEARCH_ES_PROHIBIT: '/api/v1/admin/prohibit-positions-document/search-es',

  //JUDICIAL RECORD
  SAVE_DRAFT_JUDICIAL_RECORD: '/api/v1/admin/judicial-records/draft-save',
  CREATE_JUDICIAL_RECORD: '/api/v1/admin/judicial-records',
  EDIT_JUDICIAL_RECORD: (id) => `/api/v1/admin/judicial-records/${id}`,
  DELETE_JUDICIAL_RECORD: (id) => `/api/v1/admin/judicial-records/${id}`,
  MASS_DELETE_JUDICIAL_RECORD: '/api/v1/admin/judicial-records/mass-delete',
  LOCK_JUDICIAL_RECORD: (id) => `/api/v1/admin/judicial-records/locked/${id}`,
  UNLOCK_JUDICIAL_RECORD: (id) =>
    `/api/v1/admin/judicial-records/unlocked/${id}`,
  UPDATE_JUDICIAL_RECORD: (id) => `/api/v1/admin/judicial-records/${id}`,
  DETAIL_JUDICIAL_RECORD: '/api/v1/admin/judicial-records',
  COMMENT_SEARCH_JUDICIAL_RECORD:
    '/api/v1/admin/judicial-records/comment/search-judicial-records',
  //citizen-profile-request
  SEARCH_JUDICIAL_RECORD: '/api/v1/admin/citizen-profile-request/search',
  COUNT_JUDICIAL_RECORD: '/api/v1/admin/citizen-profile-request/count',
  SEARCH_CITIZEN_PROFILE_REQUEST_ORGANIZATION:
    '/api/v1/admin/citizen-profile-request-organization/search',
  COUNT_CITIZEN_PROFILE_REQUEST_ORGANIZATION:
    '/api/v1/admin/citizen-profile-request-organization/count',
  DETAIL_CITIZEN_PROFILE_REQUEST_ORGANIZATION: (id) =>
    `/api/v1/admin/judicial-records/detail-organization/${id}`,
  RECEIVE_CITIZEN_PROFILE_REQUEST_ORGANIZATION: (id) =>
    `/api/v1/admin/citizen-profile-request-organization/receive/${id}`,
  UN_RECEIVE_CITIZEN_PROFILE_REQUEST_ORGANIZATION: (id) =>
    `/api/v1/admin/citizen-profile-request-organization/un-receive/${id}`,
  REJECT_CITIZEN_PROFILE_REQUEST_ORGANIZATION: (id) =>
    `/api/v1/admin/citizen-profile-request-organization/reject/${id}`,
  APPROVE_CITIZEN_PROFILE_REQUEST_ORGANIZATION: (id) =>
    `/api/v1/admin/citizen-profile-request-organization/approve/${id}`,
  VERIFY_CITIZEN_PROFILE_REQUEST_ORGANIZATION: (id) =>
    `/api/v1/admin/citizen-profile-request-organization/verify/${id}`,
  EDiT_VERIFY_JUDICIAL_RECORD: (id) =>
    `api/v1/admin/citizen-profile-request-document/update-document-approve/${id}`,

  AUTO_SYNC_JUDICIAL_RECORD:
    '/api/v1/admin/citizen-profile-request-result/synch-data',
  SYNC_DATA_JUDICIAL_RECORD: (id, clientId) =>
    `/api/v1/admin/citizen-profile-request-result/synch-data/${id}?client_id=${clientId}`,
  SYNC_DATA_JUDICIAL_RECORD_RETRY: (id, clientId) =>
    `/api/v1/admin/citizen-profile-request-result/retry/${id}?client_id=${clientId}`,
  CHANGE_STATUS_JUDICIAL_RECORD: (id) =>
    `/api/v1/admin/citizen-profile-request-result/change-status/${id}`,
  LOGIN_BOT_SYNC_JUDICIAL: (clientId) =>
    `/api/v1/admin/user-bot-app/get-info?client-id=${clientId}`,

  // DIGITIZED DATA
  SEARCH_PUSH_CONNECT_API: '/api/v1/admin/manage-api-push/search',
  CREATE_PUSH_CONNECT_API: '/api/v1/admin/manage-api-push',
  UPDATE_PUSH_CONNECT_API: (id) => `/api/v1/admin/manage-api-push/${id}`,
  DELETE_PUSH_CONNECT_API: (id) => `/api/v1/admin/manage-api-push/delete/${id}`,
  GET_PUSH_CONNECT_API: (id) => `/api/v1/admin/manage-api-push/${id}`,
  SEARCH_PUSH_DATA: '/api/v1/admin/push-data/search',
  CREATE_PUSH_DATA: '/api/v1/admin/push-data',
  UPDATE_PUSH_DATA: (id) => `/api/v1/admin/push-data/${id}`,
  ACTIVATE_PUSH_DATA: (id) => `/api/v1/admin/push-data/active/${id}`,
  DEACTIVATE_PUSH_DATA: (id) => `/api/v1/admin/push-data/deactive/${id}`,
  DELETE_PUSH_DATA: (id) => `/api/v1/admin/push-data/delete/${id}`,
  SEARCH_API_RECEIVE: '/api/v1/admin/manage-api-receive/search',
  CREATE_API_RECEIVE: '/api/v1/admin/manage-api-receive',
  GET_API_RECEIVE: (id) => `/api/v1/admin/manage-api-receive/${id}`,
  UPDATE_API_RECEIVE: (id) => `/api/v1/admin/manage-api-receive/${id}`,
  DELETE_API_RECEIVE: (id) => `/api/v1/admin/manage-api-receive/delete/${id}`,
  SEARCH_RECEIVE_DATA: '/api/v1/admin/receive-data/search',
  CREATE_RECEIVE_DATA: '/api/v1/admin/receive-data',
  UPDATE_RECEIVE_DATA: (id) => `/api/v1/admin/receive-data/${id}`,
  ACTIVATE_RECEIVE_DATA: (id) => `/api/v1/admin/receive-data/active/${id}`,
  DEACTIVATE_RECEIVE_DATA: (id) => `/api/v1/admin/receive-data/deactive/${id}`,
  DELETE_RECEIVE_DATA: (id) => `/api/v1/admin/receive-data/delete/${id}`,
  EXPORT_PDF_JUDICIAL_RECORD: (id) =>
    `/api/v1/admin/judicial-records/export/${id}`,

  SEARCH_COMMENT_JUDICIAL_RECORD:
    '/api/v1/admin/judicial-records/comment/search',
  SEARCH_COMMENT_ORGANIZATION_JUDICIAL_RECORD:
    '/api/v1/admin/judicial-records/comment/search-organization',
  INSERT_COMMENT_ORGANIZATION_JUDICIAL_RECORD:
    '/api/v1/admin/judicial-records/comment/insert-organization',
  GET_COMMENT_JUDICIAL_RECORD: (id) =>
    `/api/v1/admin/judicial-records/comment/${id}`,

  GET_VIEW_SYNC_STATUS_JUDICIAL: (id) =>
    `/api/v1/admin/bot-job-migrate/citizen-profile-detail/${id}`,

  SEARCH_USER_ACTION_LOG: '/api/v1/admin/user-action-log/search',
  EXPORT_EXCEL_USER_ACTION_LOG: '/api/v1/admin/user-action-log/export/excel',
  EXPORT_EXCEL_TEST: '/api/v1/admin/airbyte-destination/table/export-excel',
  SEARCH_ACCESS_LOG: '/api/v1/admin/user-action-log/search',
  EXPORT_EXCEL_ACCESS_LOG: '/api/v1/admin/user-action-log/export/excel',
  SEARCH_SETTING_LOG: '/api/v1/admin/setting-log/search',
  UPDATE_SETTING_LOG: (id) => `/api/v1/admin/setting-log/${id}`,
  SEARCH_LOGIN_STATUS: '/api/v1/admin/user-action-log/manage-user-login',
  FORCE_LOGOUT_USER: (userId) =>
    `/api/v1/admin/user-action-log/user-force-logout/${userId}`,
  FORCE_LOCK_USER: (userId) =>
    `/api/v1/admin/user-action-log/user-force-lock/${userId}`,

  SEARCH_NOTIFICATION: '/api/v1/admin/notification/search',
  CHANGE_ALL_READ_NOTI: '/api/v1/admin/notification/change-all-read',
  SHARE_NOTIFICATION: `/api/v1/admin/notification/share`,
  CHANGE_STATUS_NOTIFICATION: '/api/v1/admin/notification/change-status',
  GET_ALL_SETTING_NOTIFICATION: '/api/v1/admin/notification-setting/all',
  CHANGE_STATUS_USER_SETTING_NOTIFICATION:
    '/api/v1/admin/user-notification-setting/change-status',
  GET_ALL_USER_SETTING_NOTIFICATION:
    '/api/v1/admin/user-notification-setting/all',

  SEARCH_SHARE_API_CONGIG: '/api/v1/admin/share-api-config/search',
  UPDATE_SHARE_API_CONFIG: (id) => `/api/v1/admin/share-api-config/${id}`,
  ADD_SHARE_API_CONFIG: '/api/v1/admin/share-api-config',
  DELETE_SHARE_API_CONFIG: (id) =>
    `/api/v1/admin/share-api-config/delete/${id}`,
  MASS_DELETE_SHARE_API_CONFIG: '/api/v1/admin/share-api-config/mass-delete',
  ACTIVATE_SHARE_API_CONFIG: (id) =>
    `/api/v1/admin/share-api-config/active/${id}`,
  DEACTIVATE_SHARE_API_CONFIG: (id) =>
    `/api/v1/admin/share-api-config/disable/${id}`,

  //BACKEND DATA WAREHOUSE
  SEARCH_LIST_JUDICIAL_RECORD:
    '/api/v1/admin/citizen-profile-request-result/search',

  //HELP
  SEARCH_QA: '/api/v1/admin/help/search',
  DELETE_QA: (id) => `/api/v1/admin/help/delete/${id}`,
  UPDATE_QA: (id) => `/api/v1/admin/help/${id}`,
  CREATE_QA: '/api/v1/admin/help',

  //SOURCE-AIR-BYTE
  GET_SOURCE_AIR_BYTE: '/api/v1/admin/sources-air-byte/list',
  SEARCH_SOURCE_AIR_BYTE: '/api/v1/admin/sources-air-byte/search',
  GET_LIST_DESTINATION_AIR_BYTE: '/api/v1/admin/airbyte-destination/search',
  DELETE_DESTINATION_AIR_BYTE: '/api/v1/admin/destinations-air-byte/delete',
  GET_LIST_WORKSPACE: 'api/v1/admin/workspaces-air-byte/list',
  DETAIL_WORKSPACE: '/api/v1/admin/workspaces-air-byte/get',
  UPDATE_SOURCE_AIR_BYTE: `/api/v1/admin/sources-air-byte/update`,
  CREATE_SOURCE_AIR_BYTE: '/api/v1/admin/sources-air-byte/create',
  DELETE_SOURCE_AIR_BYTE: `/api/v1/admin/sources-air-byte/delete`,
  GET_BY_ORGANIZATION_SOURCE_AIR_BYTE:
    'api/v1/admin/sources-air-byte/list-by-organization',
  GET_DETAIL_SOURCE_AIR_BYTE: '/api/v1/admin/sources-air-byte/get',

  //CONNECTIONS_AIR_BYTE
  GET_CONNECTION_AIR_BYTE: '/api/v1/admin/connections-air-byte/search',
  GET_CONNECTION_AIR_BYTE_2: '/api/v1/destinations/list',
  DETAIL_CONNECTION_AIR_BYTE: '/api/v1/admin/connections-air-byte/get',
  GET_FOR_JOB_CONNECTION_AIR_BYTE:
    'api/v1/admin/connections-air-byte/attempt/get-for-job',
  SYNC_CONNECTION_AIR_BYTE: '/api/v1/admin/connections-air-byte/sync',
  CREATE_CONNECTION_AIR_BYTE: '/api/v1/admin/connections-air-byte/create',
  DELETE_CONNECTION_AIR_BYTE: '/api/v1/admin/connections-air-byte/delete',
  UPDATE_CONNECTION_AIR_BYTE: '/api/v1/admin/connections-air-byte/update',
  SYNC_JOB_CONNECTION_AIR_BYTE: '/api/v1/admin/connections-air-byte/jobs/sync',
  CANCEL_SYNC_JOB_CONNECTION_AIR_BYTE:
    '/api/v1/admin/connections-air-byte/jobs/cancel',
  STATUS_SYNC_CONNECTION_AIR_BYTE: '/api/v1/admin/connections-air-byte/status',

  UPDATE_SYNC_JOB_CONNECTION_AIR_BYTE:
    '/api/v1/admin/connections-air-byte/stop-sync',

  CREATE_DESTINATION_AIR_BYTE: '/api/v1/admin/destinations-air-byte/create',
  UPDATE_DESTINATION_AIR_BYTE: '/api/v1/admin/destinations-air-byte/update',

  HISTORY_JOB_CONNECTION_AIR_BYTE:
    'api/v1/admin/connections-air-byte/jobs/list',
  DETAIL_JOB_CONNECTION_AIR_BYTE:
    '/api/v1/admin/connections-air-byte/attempt/get-for-job',

  //GET TABLE AIR_BYTE
  GET_HISTORY_TABLE_AIR_BYTE: '/api/v1/admin/airbyte-destination/get-table',
  API_AIR_BYTE: '/api/v1/admin/airbyte',
  CHECK_CONNECTION_AIR_BYTE: '/api/v1/admin/airbyte',

  //USAGE
  SEARCH_USAGE: '/api/v1/admin/usage-guide/search',
  DELETE_USAGE: (id) => `/api/v1/admin/usage-guide/delete/${id}`,
  UPDATE_USAGE: (id) => `/api/v1/admin/usage-guide/${id}`,
  CREATE_USAGE: '/api/v1/admin/usage-guide',

  //WORKSPACE
  SEARCH_WORKSPACE_CONFIG: '/api/v1/admin/workstation-configuration/search',
  UPDATE_WORKSPACE_USER: (userId) =>
    `/api/v1/admin/workstation-configuration/update-by-user/${userId}`,
  SEARCH_WORKSPACE_USER: (userId) =>
    `/api/v1/admin/workstation-configuration/get-by-user-id/${userId}`,

  // SEARCH ENGINE
  SEARCH_LIST_INDEX_ALL: '/api/v1/admin/index/search',
  SEARCH_LIST_INDEX_ALL_BY_ORGANIZATION: (id) =>
    `/api/v1/admin/index/get-list-index?organization_id=${id}`,
  SEARCH_LIST_DATABASE_SOURCE: '/api/v1/admin/airbyte-destination/search',
  SEARCH_LIST_TABLE_COLUMNS: (id) =>
    `/api/v1/admin/database-information/table/get-list/${id}`,
  ADD_INDEX: '/api/v1/admin/index/create',
  DETAIL_INDEX: (id) => `/api/v1/admin/index/detail/${id}`,
  UPDATE_CONFIG_INDEX: (id) => `/api/v1/admin/index/update-config/${id}`,
  GET_ALL_SYNONYM: '/api/v1/admin/index-synonym/search',
  CREATE_SYNONYM: '/api/v1/admin/index-synonym/create',
  UPDATE_SYNONYM: (id) => `/api/v1/admin/index-synonym/update/${id}`,
  DELETE_SYNONYM: (id) => `/api/v1/admin/index-synonym/delete/${id}`,
  CREATE_SCHEDULE_SYNC: '/api/v1/admin/scheduler-synchronize/create',
  UPDATE_SCHEDULE_SYNC: (id) =>
    `/api/v1/admin/scheduler-synchronize/update/${id}`,
  DETAILS_SCHEDULE_SYNC_INDEX: (id) =>
    `/api/v1/admin/scheduler-synchronize/detail/${id}`,
  SCHEDULING_LIST: '/api/v1/admin/scheduler-synchronize/search',
  DELETE_SCHEDULING: (id) =>
    `/api/v1/admin/scheduler-synchronize/delete-job/${id}`,
  PAUSE_SCHEDULING: (id) =>
    `/api/v1/admin/scheduler-synchronize?is_paused=true&dag_id=${id}`,
  SYNC_NOW: (indexName) =>
    `/api/v1/admin/index/synchronize-data?index-name=${indexName}`,
  FILTER_TEST_INDEX: '/api/v1/admin/document/search-es',
  SEARCH_TEST_INDEX: '/api/v1/admin/document/search',
  GET_VIEW_SYNC_STATUS: (data) =>
    `/api/v1/admin/scheduler-synchronize/get-state?index_name=${data?.name}&run_type=${data?.type}`,
  GET_LOG_ERROR_SYNC: '/api/v1/admin/dag-airflow/get-log',

  // AIR-FLOW-SCHOOL_WAREHOUSE
  GET_DAG_LIST_AIRFLOW: '/api/v1/admin/airflow-job/search',
  TOGGLE_DAG: (data) =>
    `/api/v1/admin/airflow-job/turn-job/${data.dag_id}?is_paused=${data.is_pause_dag}`,
  START_DAG: (id) => `/api/v1/admin/airflow-job/start-job/${id}`,
  DELETE_DAG: (id) => `/api/v1/admin/airflow-job/delete/${id}`,
  GET_SCHEDULING_JOB: (id) =>
    `/api/v1/admin/dag-airflow/get-dagsRun?dag_id=${id}`,
  GET_HISTORY_RUN_JOB: '/api/v1/admin/dag-airflow/get-taskInstances',
  GET_PREVIEW_RESULT_JOB: '/api/v1/admin/enrichment-job/check-data',
  GET_PREVIEW_RESULT_JOB_SQL: '/api/v1/admin/enrichment-job/check-sql-data',

  // API DATA AGGREGATE
  GET_API_DATA_AGGREGATE: '/api/v1/share-api-data/search',
  ADD_API_DATA_AGGREGATE: '/api/v1/share-api-data/create',
  UPDATE_API_DATA_AGGREGATE: '/api/v1/share-api-data/update',
  DELETE_API_DATA_AGGREGATE: (id) => `/api/v1/share-api-data/delete?id=${id}`,
  GET_LIST_COLUMNS_BY_TABLENAME: (name) =>
    `/api/v1/share-api-data/get-list-columns/${name}`,
  GET_LIST_TABLE_API_DATA_AGGREGATE: `/api/v1/share-api-data/get-list-table`,
  GET_LOG_API: (id) => `/api/v1/share-api-data/get-log-api/${id}`,
  TOGGLE_DISABLE: (data) =>
    `/api/v1/share-api-data/active-api?id=${data.id}&active=${data.is_active}`,
  // MIN-IO
  GET_ALL_FILE_MIN_IO: '/api/v1/admin/minio/list-objects',
  DELETE_FILE_MIN_IO: '/api/v1/admin/minio/remove-object',
  DELETE_MANY_FILE_MIN_IO: '/api/v1/admin/minio/remove-objects',
  UPLOAD_FILE_MIN_IO: '/api/v1/admin/minio/upload-object',
  GET_DETAIL_FILE: (name) => `/api/v1/admin/minio/get-object?name=${name}`,

  //DATA-WAREHOUSE
  SELECT_DATA_WAREHOUSE: '/api/v1/admin/data-warehouse-info/select',
  SEARCH_DATA_WAREHOUSE: '/api/v1/admin/data-warehouse-info/search',
  SEARCH_DATA_WAREHOUSE_BY_RETRY:
    '/api/v1/admin/data-warehouse-info/search-with-departmentId',
  UPDATE_DATA_WAREHOUSE: (id) => `/api/v1/admin/data-warehouse-info/${id}`,
  CREATE_DATA_WAREHOUSE: '/api/v1/admin/data-warehouse-info',
  DELETE_DATA_WAREHOUSE: (id) =>
    `/api/v1/admin/data-warehouse-info/delete/${id}`,
  GET_TABLE_BY_SOURCE_ID: '/api/v1/admin/data-warehouse-info/table',
  GRANT_PERMISSIONS: '/api/v1/admin/warehouse-table-department',
  GET_TABLE_RETRY_DATA_API: '/api/v1/admin/warehouse-table-department/search',
  GET_LIST_API_SHARE:
    '/api/v1/admin/warehouse-table-department/retrieve-data-api',

  //DATA-GOVERNANCE
  GET_LIST_CARD_CLASSIFY: '/api/v1/admin/data-hub-tag-category/search',
  ADD_CARD_CLASSIFY: '/api/v1/admin/data-hub-tag-category',
  UPDATE_CARD_CLASSIFY: (id) => `/api/v1/admin/data-hub-tag-category/${id}`,
  DELETE_CARD_CLASSIFY: (id) =>
    `/api/v1/admin/data-hub-tag-category/delete/${id}`,

  GET_LIST_TAG_GOVERNANCE: '/api/v1/admin/data-hub-metadata/tag/search',
  GET_LIST_TAG_SEARCH_TYPE: (value) =>
    `/api/v1/admin/data-hub-metadata/tag/search?category=${value}`,
  ADD_TAG_GOVERNANCE: '/api/v1/admin/data-hub-metadata/tag',
  DELETE_TAG_GOVERNANCE: (id) => `/api/v1/admin/data-hub-metadata/tag/${id}`,

  GET_LIST_TABLE_DESTINATION: (id) =>
    `/api/v1/admin/database-information/table/get-list/${id}`,
  GET_LIST_TABLE_WAITING_DESTINATION: (id) =>
    `/api/v1/admin/database-information/table/get-waiting/${id}`,

  CREATE_JOB_AIRFLOW: '/api/v1/admin/airflow-job/create',
  UPDATE_JOB_AIRFLOW: (id) => `/api/v1/admin/airflow-job/update/${id}`,
  GET_DETAIL_JOB: (id) => `/api/v1/admin/airflow-job/detail/${id}`,
  GET_LIST_NUCLEAR_REGION: '/api/v1/admin/nuclear-region/list',
  GET_SEARCH_NUCLEAR_REGION: '/api/v1/admin/nuclear-region/search',
  GET_LOOKUP_COLLECTED_RESULTS:
    '/api/v1/admin/nuclear-region/table/query-record',
  GET_LOOKUP_INTERMEDIATE:
    '/api/v1/admin/airbyte-destination/table/query-record',
  GET_LIST_TABLE_NUCLEAR_REGION: (id) =>
    `/api/v1/admin/nuclear-region/table/get-list/${id}`,
  GET_LIST_TABLE_WAITING_NUCLEAR_REGION: (id) =>
    `/api/v1/admin/nuclear-region/table/get-waiting/${id}`,

  EXPORT_EXCEL_LOOKUP_NUCLEAR_REGION:
    '/api/v1/admin/nuclear-region/table/export-excel',
  GET_KEY_TABLE_OLD: '/api/v1/key-map',
  EXPORT_PDF_LOOKUP_NUCLEAR_REGION:
    '/api/v1/admin/nuclear-region/table/export-pdf',

  //DATA CALCULATION - FORMULA
  CREATE_FORMULA: '/api/v1/admin/calculation-formula/create',
  GET_LIST_FORMULA_CALCULATION: '/api/v1/admin/calculation-formula/search',
  DELETE_FORMULA: (id) => `/api/v1/admin/calculation-formula/delete/${id}`,
  UPDATE_FORMULA: (id) => `/api/v1/admin/calculation-formula/update/${id}`,
  CHECK_RESULT_FORMULA: (id) =>
    `/api/v1/admin/calculation-formula/check-result/${id}`,

  //LOOKUP_CRITERION
  GET_LIST_CRITERION: '/api/v1/admin/criterion/search',
  GET_LIST_CRITERION_UNUSED: '/api/v1/admin/criterion/list-of-unused-criterion',
  CREATE_CRITERION: '/api/v1/admin/criterion/create',
  DELETE_CRITERION: (id) => `/api/v1/admin/criterion/delete/${id}`,
  UPDATE_CRITERION: (id) => `/api/v1/admin/criterion/update/${id}`,
  GET_LIST_CRITERION_TYPES: '/api/v1/admin/criterion-types/list',

  // Data mark
  GET_LIST_DATA_MARK: '/api/v1/admin/dtm-region/get-list',
  CREATE_DATA_MARK: '/api/v1/admin/airflow-job/atm-to-dtm/create',
  GET_LOOKUP_COLLECTED_RESULTS_DATA_MARK:
    '/api/v1/admin/dtm-region/table/query-record',
  GET_LIST_TABLE_DATA_MARK: (id) =>
    `/api/v1/admin/dtm-region/table/get-list/${id}`,
  GET_LIST_TABLE_WAITING_DATA_MARK: (id) =>
    `/api/v1/admin/dtm-region/table/get-waiting/${id}`,
  EXPORT_EXCEL_LOOKUP_DATA_MARK: '/api/v1/admin/dtm-region/table/export-excel',
  EXPORT_PDF_LOOKUP_DATA_MARK: '/api/v1/admin/dtm-region/table/export-pdf',
  CHECK_PREVIEW_RESULT_DATA_MARK:
    '/api/v1/admin/enrichment-job/atm-to-dtm/check-data',

  //Report_Template
  GET_LIST_REPORT: '/api/v1/public/report/search',
  GET_LIST_TYPE_REPORT: '/api/v1/public/report/list-type-report',
  GET_LIST_LINK_BY_TYPE_REPORT:
    '/api/v1/public/report/list-link-by-type-report',
  UPLOAD_TEMPLATE_REPORT: (id) => `/api/v1/public/report/upload-file/${id}`,
  DELETE_REPORT: (id) => `/api/v1/public/report/delete/${id}`,

  //Export_History
  GET_LIST_HISTORY: '/api/v1/admin/history/search',

  //Summary_KPI
  GET_LIST_KPI: '/api/v1/admin/criterion-group/search',
  GET_DETAIL_KPI: (id) => `/api/v1/admin/criterion/detail/${id}`,
  CREATE_KPI: '/api/v1/admin/criterion-group/create',
  UPDATE_KPI: (id) => `/api/v1/admin/criterion-group/update/${id}`,
  DELETE_KPI: (id) => `/api/v1/admin/criterion-group/delete/${id}`,

  //Count_JOB
  GET_COUNT_JOB: '/api/v1/admin/airflow-job/count',

  // build api data source
  GET_LIST_API_BUILDER: '/api/v1/admin/connector-builder/list',
  CREATE_API_BUILDER: '/api/v1/admin/connector-builder/create',
  UPDATE_API_BUILDER: '/api/v1/admin/connector-builder/update',
  DELETE_API_BUILDER: (id) => `/api/v1/admin/connector-builder/delete/${id}`,
  DETAIL_API_BUILDER: (id) => `/api/v1/admin/connector-builder/get/${id}`,
  PUBLIC_API_BUILDER: '/api/v1/admin/connector-builder/publish-builder',
  PUBLIC_API_BUILDER_NEW: '/api/v1/admin/connector-builder/publish-new-version',
  PUBLIC_API_BUILDER_UPDATE_VERSION:
    '/api/v1/admin/connector-builder/update-version',
  CHECK_API_BUILDER: '/api/v1/admin/connector-builder/read-stream',
  UPDATE_CONFIG_TEST: '/api/v1/admin/connector-builder/update-testing-values',
  GET_HISTORY_CONFIG_TESTING: (id) =>
    `/api/v1/admin/connector-builder/get-history-testing-values/${id}`,
};

export default API;

export const AREA_API = {
  GET_LIST_AREA: '/api/v1/public/areas',
  GET_LIST_PROVINCE: '/api/v1/public/provinces',
  GET_lIST_DISTRICT: '/api/v1/public/districts',
};

export const REPORT_API = {
  PUT_UPDATE_PACKAGE: '/api/v1/admin/document-type/:id',
  POST_ADD_PACKAGE: '/api/v1/admin/document-type',
  CHANGE_STATUS_CONTENT: '/api/v1/admin/document/change-active',
  PUT_UPDATE_CONTENT: '/api/v1/admin/document/:id',
  POST_ADD_CONTENT: '/api/v1/admin/document',
  GET_PACKAGE_REPORT: '/api/v1/admin/document-type/search',
  SELECT_PACKAGE_REPORT: '/api/v1/admin/document-type/select',
  GET_REPORT_BY_ID: '/api/v1/admin/report/:id',
  PUT_UPDATE_REPORT: '/api/v1/admin/report',
  POST_ADD_REPORT: '/api/v1/admin/report',
};

export const PROJECT_API = {
  GET_DETAIL_PROJECT: '/api/v1/admin-ambassador/project/:id',
  GET_DETAIL_EDIT_HISTORY: '/api/v1/admin/edit-project/edit-history/detail',
  UPDATE_PROJECT: '/api/v1/admin-ambassador/project/:id',
  POST_CREATE_PROJECT: '/api/v1/admin-ambassador/project',
  UPDATE_HISTORY_EDIT: '/api/v1/admin/edit-project/update-history',
  ADD_HISTORY_EDIT: '/api/v1/admin-ambassador/project/update',
  GET_LIST_PROJECT: '/api/v1/admin-ambassador/project/search',
  SELECT_LIST_PROJECT: '/api/v1/admin-ambassador/project/select',
  GET_LIST_HISTORY_EDIT_PROJECT: '/api/v1/admin/edit-project/get-List',
  UPDATE_lIST_EDIT_PROJECT:
    '/api/v1/admin/edit-project/approve-list-edit-project',
  REJECT_EDIT_HISTORY_PROJECT: '/api/v1/admin/edit-project/reject-edit',
  APPEAL_EDIT_HISTORY_PROJECT: '/api/v1/admin/edit-project/appeal',
};

export const AMBASSADOR_API = {
  GET_LIST_AMBASSADOR: '/api/v1/admin/ambassador/search',
  GET_AMBASSADOR_LEVEL: '/api/v1/public/ambassador-level',
  APPROVE_AMBASSADOR: '/api/v1/admin/ambassador/approve-register',
  UPGRADE_AMBASSADOR: '/api/v1/admin/ambassador/update/level',
  REFUSE_AMBASSADOR: '/api/v1/admin/ambassador/reject-register',
  UPDATE: '/api/v1/admin/ambassador/update/',
  LOCK_AMBASSADOR: '/api/v1/admin/ambassador/lock',
  UNLOCK_AMBASSADOR: '/api/v1/admin/ambassador/unLock',
  PUT_UPDATE_INFO: '/api/v1/admin/ambassador',
  PUT_CHANGE_STATUS_INTERVIEW: '/api/v1/admin/ambassador/interview',
  GET_INFO: '/api/v1/admin/ambassador/profile',
  UPDATE_INFO: '/api/v1/admin/ambassador/profile/edit',
  GET_LIST_REQUEST_UPDATE_INFO:
    '/api/v1/admin/ambassador/update-profile/search',
  APPROVE_UPDATE_INFO: 'api/v1/admin/ambassador/update-profile/approve',
  REJECT_UPDATE_INFO: 'api/v1/admin/ambassador/update-profile/reject',
  GET_UPDATE_INFO_RECENT: '/api/v1/admin/ambassador/recent/profile/update',
};

export const SELECT_API = {
  GET_LIST_INVESTOR: '/api/v1/admin/investor/select',
  GET_LIST_USER: '/api/v1/admin/users/select',
  GET_LIST_AMBASSADOR: '/api/v1/admin/ambassador/select',
  GET_LIST_CATEGORY_QA: '/api/v1/public/question-answer/list-category',
};

export const DATA_SERVICE_API = {
  GET_DATA_SERVICE: '/api/v1/admin/api-share-config/search',
  GET_DETAIL_DATA_SERVICE: (id) =>
    `/api/v1/admin/api-share-config/detail/${id}`,
  GET_HISTORY_DATA_SERVICE: '/api/v1/admin/user-action-log/search',
  CREATE_DATA_SERVICE: '/api/v1/admin/api-share-config/create',
  UPDATE_DATA_SERVICE: (id) => `/api/v1/admin/api-share-config/update/${id}`,
  DELETE_DATA_SERVICE: (id) => `/api/v1/admin/api-share-config/delete/${id}`,
};

export const ADDITIAL_API = {
  REQUEST_ADDITIAL_DATA: '/api/v1/admin/additional-data/change-data',
  UPDATE_STATUS_ADDITIAL_DATA: (id) =>
    `/api/v1/admin/additional-data/update-data/${id}`,
  UPLOAD_FILE: '/api/v1/admin/additional-data/import',
  GET_COLUMNS: '/api/v1/admin/additional_datawarehouse/table/get-list',
  DOWNLOAD_FILE_UPLOAD_EXAMPLE:
    '/api/v1/admin/minio/get-object?name=file-mau%2',
};
