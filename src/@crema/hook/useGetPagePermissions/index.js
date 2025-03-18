import { useState, useEffect } from 'react';
import useCallApi from '../useCallApi';
import { postDataPagePermissions } from '../../services/index';
import { useLocation } from 'react-router-dom';
const useGetPagePermissions = () => {
  const { pathname } = useLocation();
  const [pagePermissions, setPagePermissions] = useState([]);
  const { loading, send } = useCallApi({
    success: (data) => setPagePermissions(data?.data),
    callApi: postDataPagePermissions,
  });

  useEffect(() => {
    send(pathname.split('/').slice(1).join('-'));
  }, [pathname]);

  return { loading, pagePermissions };
};

export default useGetPagePermissions;
