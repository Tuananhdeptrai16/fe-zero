import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { history } from 'src/redux/store';

import { FETCH_ERROR, FETCH_SUCCESS } from 'src/shared/constants/ActionTypes';
import {
  getToken,
  removeToken,
  logout as logoutStorage,
  getLongToken,
} from '../../Application/AuthenStorage';
import {
  postDataPagePermissions,
  postGetAuthMe,
  postLogoutUser,
} from '../../index';
import { getMessageResponse } from 'src/shared/utils/Service';
import notification from 'src/shared/utils/notification';
import useCallApi from 'src/@crema/hook/useCallApi';
import { useLocation } from 'react-router-dom';
import { getPageNameByPathname } from 'src/shared/constants/DataSelect';
import { ROUTER_NAME } from 'src/pages/routeConfig';
import { ITEM_PERMISSIONS } from 'src/shared/constants/Permission';

const JWTAuthContext = createContext();
const JWTAuthActionsContext = createContext();

export const useJWTAuth = () => useContext(JWTAuthContext);

export const useJWTAuthActions = () => useContext(JWTAuthActionsContext);

const checkPermission =
  process.env.REACT_APP_PERMISSION === 'true' ||
  !process.env.REACT_APP_PERMISSION;

const JWTAuthAuthProvider = ({ children }) => {
  const loadingRef = useRef({});
  const { pathname } = useLocation();
  const [jwtAuthData, setJWTAuthData] = useState({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });
  const isAuthenticated = jwtAuthData.isAuthenticated;
  const [permissionPage, setPermissionPage] = useState({});

  const dispatch = useDispatch();
  const longToken = getLongToken();

  const { send: fetchPermissionPage } = useCallApi({
    success: (data, pageName) => {
      loadingRef.current[pageName] = false;
      if (checkPermission) {
        setPermissionPage((permissionPageCurrent) => ({
          ...permissionPageCurrent,
          [pageName]: data?.result || [],
        }));
      } else {
        setPermissionPage((permissionPageCurrent) => ({
          ...permissionPageCurrent,
          [pageName]: [
            ...(data?.result || []),
            ...Object.values(ITEM_PERMISSIONS).map((permission) => ({
              name: `${pageName}.${permission}`,
            })),
          ],
        }));
      }
    },
    callApi: postDataPagePermissions,
  });

  const pageName = useMemo(() => {
    return getPageNameByPathname(pathname);
  }, [pathname]);

  useEffect(() => {
    if (isAuthenticated && !loadingRef.current[pageName] && pageName) {
      loadingRef.current[pageName] = true;
      fetchPermissionPage(pageName);
    }
    // eslint-disable-next-line
  }, [pageName, isAuthenticated]);

  const { send } = useCallApi({
    success: (data) => {
      const userInfo = data?.result;
      if (userInfo) {
        const { ambassador_response } = userInfo || {};
        if (ambassador_response?.status === 'lock') {
          logoutStorage('not_access');
        } else {
          if (checkPermission) {
            setJWTAuthData({
              user: userInfo,
              isLoading: false,
              isAuthenticated: true,
            });
          } else {
            setJWTAuthData({
              user: {
                ...userInfo,
                item_permissions: [
                  ...(userInfo?.item_permissions || []),
                  ...Object.values(ROUTER_NAME)
                    .map((item) =>
                      Object.values(ITEM_PERMISSIONS).map(
                        (permission) => `${item}.${permission}`,
                      ),
                    )
                    .flat(),
                ],
              },
              isLoading: false,
              isAuthenticated: true,
            });
          }
        }
      } else {
        logoutStorage('account_error');
      }
    },
    callApi: postGetAuthMe,
    error: (error) => {
      const messageError = getMessageResponse(error?.raw);
      if (messageError === 'Unauthorized') {
        notification.error(messageError);
        removeToken();
      }
      setJWTAuthData({
        user: undefined,
        isLoading: false,
        isAuthenticated: false,
      });
    },
  });

  const { send: sendLogout } = useCallApi({
    useToastShowError: true,
    success: (_, reload = true) => {
      logoutStorage('', reload);
      // setJWTAuthData({
      //   user: null,
      //   isLoading: false,
      //   isAuthenticated: false,
      // });
    },
    callApi: () => postLogoutUser(jwtAuthData?.user?.id, longToken),
    error: (error) => {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    },
  });

  useEffect(() => {
    const getAuthUser = () => {
      const token = getToken();

      if (!token) {
        setJWTAuthData({
          user: undefined,
          isLoading: false,
          isAuthenticated: false,
        });
        return;
      }
      send();
    };

    getAuthUser();
    // eslint-disable-next-line
  }, []);

  const signInUser = (success, error) => {
    if (success) {
      const userInfo = success?.result;
      if (checkPermission) {
        setJWTAuthData({
          user: userInfo,
          isLoading: false,
          isAuthenticated: true,
        });
      } else {
        setJWTAuthData({
          user: {
            ...userInfo,
            item_permissions: [
              ...(userInfo?.item_permissions || []),
              ...Object.values(ROUTER_NAME)
                .map((item) =>
                  Object.values(ITEM_PERMISSIONS).map(
                    (permission) => `${item}.${permission}`,
                  ),
                )
                .flat(),
            ],
          },
          isLoading: false,
          isAuthenticated: true,
        });
      }
      dispatch({ type: FETCH_SUCCESS });
    }
    if (error) {
      setJWTAuthData({
        ...jwtAuthData,
        isAuthenticated: false,
        isLoading: false,
      });
      dispatch({ type: FETCH_ERROR, payload: error.message });
    }
  };

  const signUpUser = (success, error) => {
    if (success) {
      dispatch({ type: FETCH_SUCCESS });
    } else if (error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    }
  };

  const logout = (reload = true) => {
    console.log('reload logout', reload);
    return sendLogout(false);
  };

  const removeUser = () => {
    removeToken();
    setJWTAuthData({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
  };

  history.listen(({ location }) => {
    if (location?.pathname == '/signin' && jwtAuthData.isAuthenticated) {
      removeUser();
    }
  });

  const checkPermissionAction = useCallback(
    (pageName, action) => {
      if (pageName && permissionPage[pageName] === undefined) {
        if (loadingRef.current[pageName]) return false;

        loadingRef.current[pageName] = true;
        fetchPermissionPage(pageName);
      }

      return (permissionPage[pageName] || []).some(
        (permission) => permission?.name === `${pageName}.${action}`,
      );
    },
    // eslint-disable-next-line
    [permissionPage],
  );

  return (
    <JWTAuthContext.Provider
      value={{
        ...jwtAuthData,
        permissionPage,
        pageNameCurrent: pageName,
      }}>
      <JWTAuthActionsContext.Provider
        value={{
          signUpUser,
          signInUser,
          removeUser,
          logout,
          checkPermissionAction,
        }}>
        {children}
      </JWTAuthActionsContext.Provider>
    </JWTAuthContext.Provider>
  );
};
export default JWTAuthAuthProvider;

JWTAuthAuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
