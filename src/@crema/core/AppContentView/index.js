import React, { useEffect, useMemo } from 'react';
import { Layout } from 'antd';
import { useDispatch } from 'react-redux';
import { withResizeDetector } from 'react-resize-detector';
import { RESIZE_APP_CONTENT } from 'src/shared/constants/ActionTypes';
import { CLASS_NAME_LAYOUT } from 'src/shared/constants/Key';
import { AppSuspense } from '../../index';
import { authorizedStructure, unAuthorizedStructure } from 'src/pages';
import AppErrorBoundary from '../AppErrorBoundary';
import './index.style.less';
import generateRoutes from '../../utility/RouteGenerator';
import { useAuthUser } from '../../utility/AuthHooks';
import { useAuthSSOContext } from 'src/@crema/utility/AuthSSOContext';
import { useLocation } from 'react-router-dom';
import { errorPagesConfigs } from 'src/pages/errorPages';
import Error404 from 'src/pages/errorPages/Error404';
import PageLoading from 'src/pages/errorPages/Loading';
import { logout } from 'src/@crema/services/Application/AuthenStorage';

const { Content } = Layout;

// eslint-disable-next-line react/prop-types
const AppContentView = ({ width, height }) => {
  const dispatch = useDispatch();
  const { signIn } = useAuthSSOContext();
  const { pathname } = useLocation();
  const { user, isAuthenticated } = useAuthUser();
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch({ type: RESIZE_APP_CONTENT, payload: { width, height } });
    }, 150);

    return () => {
      clearTimeout(timeout);
    };
  }, [width, height, dispatch]);

  useEffect(() => {
    if (
      !isAuthenticated &&
      !pathname?.includes('callback_sso') &&
      !pathname?.includes('signin')
    ) {
      logout();
    }
  }, [isAuthenticated]);

  const anonymousStructure = useMemo(() => {
    if (isAuthenticated) {
      return {
        routes: errorPagesConfigs.concat([
          {
            path: '*',
            element: <Error404 />,
          },
        ]),
      };
    } else {
      return {
        routes: errorPagesConfigs.concat([
          {
            path: '*',
            element: <PageLoading />,
          },
        ]),
      };
    }
  }, [isAuthenticated]);
  return (
    <div className={'main-content-view-wrapper'}>
      <Content className={CLASS_NAME_LAYOUT}>
        <AppSuspense>
          <AppErrorBoundary>
            {generateRoutes(
              {
                signIn,
                initialUrl: '/workspace',
                isAuthenticated: isAuthenticated,
                unAuthorizedStructure,
                authorizedStructure,
                anonymousStructure,
              },
              user?.permissions,
            )}
          </AppErrorBoundary>
        </AppSuspense>
      </Content>
    </div>
  );
};

export default withResizeDetector(AppContentView);
