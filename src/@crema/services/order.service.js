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
export const getDetailOrder = (id) => {
  const { data } = useFetch(
    {
      url: `${API.GET_DETAIL_ORDER}/${id}`,
      method: METHOD_FETCH.GET,
    },
    [id],
  );
  return data?.result;
};

export const postExportExcelOrder = ({ data }) =>
  instanceCoreApi.post(API.EXPORT_ORDER_EXCEL, data, {
    responseType: 'blob',
  });

export const postExportExcelMoMo = ({ data }) =>
  instanceCoreApi.post(API.EXPORT_MOMO_EXCEL, data, {
    responseType: 'blob',
  });
