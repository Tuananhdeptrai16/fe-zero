import API from './apis/index';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';

export const getDetailReportDownload = (id, from_date, to_date) => {
  const { data } = useFetch(
    {
      url: API.GET_REPORT_DOWNLOAD_DETAIL,
      method: METHOD_FETCH.POST,
      body: {
        report_id: id,
        from_date: from_date,
        to_date: to_date,
      },
    },
    [id, from_date, to_date],
  );
  return data?.result;
};
