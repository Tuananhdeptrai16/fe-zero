import { instanceCoreApi } from './setupAxios';
import API, { PROJECT_API } from './apis/index';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
export const toggleProjectStatus = (id, active) => {
  return instanceCoreApi.put(API.TOGGLE_PROJECT_STATUS, null, {
    params: {
      id,
      active,
    },
  });
};

export const getProjectUtils = (loadInit) => {
  const { data } = useFetch({
    url: API.GET_PROJECT_UTILS,
    method: METHOD_FETCH.GET,
    loadInit: loadInit,
  });
  return data?.result;
};

export const putUpdateProject = ({ projectId, data }) => {
  return instanceCoreApi.put(
    PROJECT_API.UPDATE_PROJECT.replace(':id', projectId),
    data,
  );
};

export const postCreateProject = ({ data }) => {
  return instanceCoreApi.post(PROJECT_API.POST_CREATE_PROJECT, data);
};

export const putUpdateHistoryProject = ({
  id,
  projectId,
  editContent,
  userId,
}) => {
  return instanceCoreApi.put(
    PROJECT_API.UPDATE_HISTORY_EDIT,
    {
      id,
      user_id: userId,
      project_id: projectId,
      edit_content: editContent,
    },
    {
      params: {
        id,
      },
    },
  );
};
export const postAddHistoryProject = ({
  projectId,
  editContent,
  userId,
  projectRequest,
}) => {
  return instanceCoreApi.put(`${PROJECT_API.ADD_HISTORY_EDIT}/${projectId}`, {
    edit_history_request: {
      user_id: userId,
      project_id: projectId,
      edit_content: editContent,
    },
    project_request: projectRequest,
  });
};

export const putUpdateListEditProject = ({ data }) => {
  return instanceCoreApi.put(PROJECT_API.UPDATE_lIST_EDIT_PROJECT, data);
};

export const putAppealEditProject = ({ data, id }) =>
  instanceCoreApi.put(`${PROJECT_API.APPEAL_EDIT_HISTORY_PROJECT}/${id}`, data);
