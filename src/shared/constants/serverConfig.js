export const DOMAIN = process.env.REACT_APP_DOMAIN;
export const REACT_APP_CLIENT_URL = process.env.REACT_APP_CLIENT_URL;
export const REACT_APP_CORE_API = process.env.REACT_APP_CORE_API;
export const REACT_APP_DATA_WAREHOUSE_URL =
  process.env.REACT_APP_DATA_WAREHOUSE_URL;
export const REACT_APP_SECRET_KEY = process.env.REACT_APP_SECRET_KEY;
export const REACT_APP_ORGANIZATION_ID = process.env.REACT_APP_ORGANIZATION_ID;
export const IS_LOCALHOST = !window?.location.href.includes(DOMAIN);
