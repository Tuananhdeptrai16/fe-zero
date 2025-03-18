import React, { useState, useRef, useEffect } from 'react';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
// import jwtAxios from 'src/@crema/services/auth/jwt-auth/jwt-api';
import { FETCH_STATUS, METHOD_FETCH } from 'src/shared/constants/FetchData';
import {
  getMessageResponse,
  getResultResponse,
  isErrorResponse,
} from 'src/shared/utils/Service';
import { CacheContext } from './CacheProvider';

const generateKeySaveCache = (url, options = {}) => {
  return `${url}-${JSON.stringify(options)}`;
};

/**
 * Fetches data from a specified URL using the given configuration.
 *
 * @param {{url: string}} config - The configuration object for the fetch request.
 * @param {object} config.instance - The instance to use for the fetch request. Defaults to `instanceCoreApi`.
 * @param {string} config.url - The URL to fetch the data from.
 * @param {string} config.method - The HTTP method to use. Defaults to `METHOD_FETCH.GET`.
 * @param {object} config.body - The request body.
 * @param {object} config.params - The request parameters.
 * @param {boolean} config.loadInit - Whether to load the data on initialization. Defaults to `true`.
 * @param {boolean} config.useCache - Whether to use the cache for the response. Defaults to `false`.
 * @param {number} config.timeCache - The time in milliseconds to cache the response. Defaults to `180000`.
 * @param {boolean} config.enabled - Whether to enable the fetch request. Defaults to `true`.
 * @param {array} deps - An array of dependencies to watch for changes.
 * @return {object} The status, error, data, isLoading, and fetchData properties.
 */
const useFetch = (config, deps = []) => {
  const {
    instance = instanceCoreApi,
    url,
    method = METHOD_FETCH.GET,
    body,
    enabled = true,
    params,
    loadInit = true,
    useCache = false,
    timeCache = 180000,
    ...attrs
  } = config || {};
  const refMount = useRef(false);
  const refIndex = useRef(0);
  const [status, setStatus] = useState(FETCH_STATUS.INIT);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);
  const { getByKey: getValueCacheByKey, set: setToCache } =
    React.useContext(CacheContext);

  const fetchData = (force = false) => {
    if (!url) {
      setData({});
      setStatus(FETCH_STATUS.SUCCESS);
      return;
    }

    refIndex.current++;
    const refIndexCurrent = refIndex.current;
    setStatus(FETCH_STATUS.LOADING);
    setError('');
    const keySaveCache = generateKeySaveCache(url, { method, params, body });
    if (useCache && !force) {
      const valueInCache = getValueCacheByKey(keySaveCache);

      if (valueInCache) {
        setData(valueInCache);
        setStatus(FETCH_STATUS.SUCCESS);
        return;
      }
    }

    instance({
      method,
      url,
      data: body,
      params,
      ...attrs,
    })
      .then((dataFromServer) => {
        if (refIndexCurrent === refIndex.current) {
          if (
            isErrorResponse(dataFromServer.data) ||
            dataFromServer.status >= 400
          ) {
            const errorMessage = getMessageResponse(dataFromServer.data);
            // showMessageError(errorMessage);
            setError(errorMessage);
            setStatus(FETCH_STATUS.ERROR);
          } else {
            if (useCache) {
              setToCache(
                keySaveCache,
                getResultResponse(dataFromServer?.data),
                timeCache,
              );
            }
            setData(getResultResponse(dataFromServer?.data));
            setStatus(FETCH_STATUS.SUCCESS);
          }
        }
      })
      .catch(function (thrown) {
        if (refIndexCurrent === refIndex.current) {
          setStatus(FETCH_STATUS.ERROR);
          if (getMessageResponse(thrown)) {
            // showMessageError(getMessage(thrown));
            setError(getMessageResponse(thrown));
          }
        }
      });
  };

  useEffect(() => {
    let timeoutFetch;
    if (!enabled) {
      setStatus(FETCH_STATUS.DISABLED);
      return;
    }
    if (loadInit || refMount.current) {
      setStatus(FETCH_STATUS.LOADING);
      timeoutFetch = setTimeout(() => {
        fetchData();
      }, 150);
    }
    refMount.current = true;

    return () => {
      if (timeoutFetch) {
        clearTimeout(timeoutFetch);
      }
    };
    // eslint-disable-next-line
  }, [url, ...deps]);

  if (!url) {
    return {
      status: FETCH_STATUS.SUCCESS,
      error,
      data: {},
      isLoading: false,

      fetchData,
    };
  }

  return {
    status,
    error,
    data,
    isLoading: status === FETCH_STATUS.INIT || status === FETCH_STATUS.LOADING,

    fetchData,
  };
};

export default useFetch;
