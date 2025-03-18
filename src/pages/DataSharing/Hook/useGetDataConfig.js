import { useContext } from 'react';
import { MainLayOutShareAPIContext } from '../Components/MainLayOutShareAPI/MainLayOutShareAPI';

function useGetDataConfig() {
  const data = useContext(MainLayOutShareAPIContext);
  return data;
}

export default useGetDataConfig;
