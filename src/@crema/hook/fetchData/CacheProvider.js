import React from 'react';
import { DEFAULT_FUNCTION } from 'src/shared/constants/Default';
import {
  getDataCache,
  saveDataCache,
} from '../../services/Application/CacheStorage';

const CacheContext = React.createContext({
  set: DEFAULT_FUNCTION,
  getByKey: DEFAULT_FUNCTION,
});

const { Consumer, Provider } = CacheContext;

// eslint-disable-next-line react/prop-types
function CacheProvider({ children }) {
  const getByKey = (key) => {
    return getDataCache(key);
  };

  const set = (name, data, timeCache) => {
    saveDataCache(name, data, timeCache);
  };

  const contextValue = {
    getByKey,
    set,
  };

  return <Provider value={contextValue}>{children}</Provider>;
}

CacheProvider.propTypes = {};

CacheProvider.defaultProps = {};

export { Consumer as CacheConsumer, CacheContext };
export default CacheProvider;
