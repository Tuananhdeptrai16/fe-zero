import { instanceCoreApi } from './setupAxios';
import API from './apis/index';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
export const toggleInvestorStatus = (id, active) => {
  return instanceCoreApi.put(API.TOGGLE_INVESTOR_STATUS, null, {
    params: {
      id,
      active,
    },
  });
};

export const getInvestorInfo = (id) => {
  const { data } = useFetch({
    url: `${API.GET_INVESTOR}/${id}`,
    method: METHOD_FETCH.GET,
  });
  return data?.result;
};
