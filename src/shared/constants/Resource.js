export const GET_LIST_INVESTOR = '/api/v1/admin/investor/search';
export const GET_LIST_REGION = '/api/v1/admin/area/search';
export const GET_LIST_PROJECT = '/api/v1/admin-ambassador/project/search';
export const GET_LIST_ORDER = '/api/v1/admin/order/search';
export const GET_LIST_ORDER_MOMO = '/api/v1/admin/order-momo/search';
export const GET_LIST_REPORT_DOWNLOAD =
  '/api/v1/admin/report/downloaded-report/search';
export const GET_LIST_NEWS = '/api/v1/admin/blog/search';

// User management api
export const GET_LIST_ADMIN_USER = '/api/v1/admin/users/search';
export const GET_LIST_CONTACTS = '/api/v1/admin/contact-request/search';

// Report management api
export const GET_LIST_REPORTS = '/api/v1/admin/report/search';
export const GET_LIST_PACKAGE_REPORT = '/api/v1/admin/document-type/search';
export const GET_LIST_CONTENT_REPORT = '/api/v1/admin/document/search';

// Ambassador
export const GET_LIST_FORM_REGISTER_AMBASSADOR =
  '/api/v1/admin/ambassador/search/register';
export const GET_LIST_AMBASSADOR = '/api/v1/admin/ambassador/search';
// additional-data
export const GET_ADDITIAL_DATA = '/api/v1/admin/additional-data/search';
export const GET_TABLE_DATA = {
  INFOR: '/api/v1/admin/additional-data/table/query-record?category=INFOR',
  ACHIEVES:
    '/api/v1/admin/additional-data/table/query-record?category=ACHIEVES',
  LEADERS: '/api/v1/admin/additional-data/table/query-record?category=LEADERS',
  TEACHERS:
    '/api/v1/admin/additional-data/table/query-record?category=TEACHERS',
};
