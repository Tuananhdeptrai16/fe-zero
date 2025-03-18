import API from './apis/index';
import { instanceCoreApi } from './setupAxios';

export const addPushConnectApi = (data) => {
  return instanceCoreApi.post(API.CREATE_PUSH_CONNECT_API, data);
};
export const deletePushConnectApi = (id) => {
  return instanceCoreApi.delete(API.DELETE_PUSH_CONNECT_API(id));
};

export const updatePushConnectApi = ({ id, data }) => {
  return instanceCoreApi.put(API.UPDATE_PUSH_CONNECT_API(id), data);
};

export const addPushData = (data) => {
  return instanceCoreApi.post(API.CREATE_PUSH_DATA, data);
};

export const updatePushData = ({ id, data }) => {
  return instanceCoreApi.put(API.UPDATE_PUSH_DATA(id), data);
};

export const activatePushData = (id) => {
  return instanceCoreApi.put(API.ACTIVATE_PUSH_DATA(id));
};

export const deactivatePushData = (id) => {
  return instanceCoreApi.put(API.DEACTIVATE_PUSH_DATA(id));
};

export const deletePushData = (id) => {
  return instanceCoreApi.delete(API.DELETE_PUSH_DATA(id));
};

export const addReceiveData = (data) => {
  return instanceCoreApi.post(API.CREATE_RECEIVE_DATA, data);
};

export const updateReceiveData = ({ id, data }) => {
  return instanceCoreApi.put(API.UPDATE_RECEIVE_DATA(id), data);
};
export const deleteReceiveData = (id) => {
  return instanceCoreApi.delete(API.DELETE_RECEIVE_DATA(id));
};
export const activateReceiveData = (id) => {
  return instanceCoreApi.put(API.ACTIVATE_RECEIVE_DATA(id));
};
export const deactivateReceiveData = (id) => {
  return instanceCoreApi.put(API.DEACTIVATE_RECEIVE_DATA(id));
};

export const deleteReceiveConnectApi = (id) => {
  return instanceCoreApi.delete(API.DELETE_API_RECEIVE(id));
};
