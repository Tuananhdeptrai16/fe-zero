import React, { useEffect, useMemo, useRef } from 'react';
import { Layout } from 'antd';
import { useUrlSearchParams } from 'use-url-search-params';
import './layout.style.less';
import { AppContentView } from '../../index';
import Layouts from './Layouts';
import { LayoutType } from 'src/shared/constants/AppEnums';
import AppScrollbar from '../AppScrollbar';
import {
  useLayoutActionsContext,
  useLayoutContext,
} from '../../utility/AppContextProvider/LayoutContextProvider';
import { useAuthUser } from '../../utility/AuthHooks';
import { useSidebarActionsContext } from '../../utility/AppContextProvider/SidebarContextProvider';
import AuthPageLayout from 'src/@crema/component/AuthPageLayout';
import { isEmpty } from 'src/shared/utils/Typeof';
import { useIntl } from 'react-intl';
import _ from 'lodash';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import API from 'src/@crema/services/apis';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import { ITEM_PERMISSIONS } from 'src/shared/constants/Permission';
import useCallApi from 'src/@crema/hook/useCallApi';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import { runPromiseAsync } from 'src/shared/utils/Object';
import ChangeInfoFirstLogin from 'src/pages/auth/ChangeInfoFirstLogin';
import { routesFlattenConfig } from 'src/@crema/utility/VerticalMenuUtils';

const autoUpdatePermission =
  process.env.REACT_APP_AUTO_UPDATE_PERMISSION === 'true' ||
  !process.env.REACT_APP_PERMISSION;

const AppLayout = () => {
  const { isAuthenticated, user } = useAuthUser();
  const { messages } = useIntl();
  const { navStyle, layoutType } = useLayoutContext();
  const { updateNavStyle } = useLayoutActionsContext();
  const { updateMenuStyle, setSidebarBgImage } = useSidebarActionsContext();
  const [params] = useUrlSearchParams();
  const AppLayout = Layouts[navStyle];
  const refAutoUpdatePermission = useRef(false);

  // console.log('user', user);

  if (isAuthenticated && autoUpdatePermission) {
    const { send } = useCallApi({
      callApi: (data) =>
        instanceCoreApi.post(API.CREATE_ADMIN_PERMISSION, data),
      success: ({ result }) => {
        console.log('result', result);
      },
    });

    const { data, isLoading: isLoadingAllPermission } = useFetch({
      url: API.GET_ALL_PERMISSIONS,
      method: METHOD_FETCH.GET,
    });
    const allPermission = data?.result || [];

    const menuUser = useMemo(() => {
      return routesFlattenConfig
        .map((item, index) => ({
          ...item,
          key: `${item?.id}-${index}`,
          text: messages?.[item?.messageId] || item?.messageId,
        }))
        .filter((item) => !isEmpty(item.text));
    }, [messages]);

    const menuGroupDuplicate = Object.values(_.groupBy(menuUser, 'id')).filter(
      (items) => items.length > 1,
    );
    if (menuGroupDuplicate?.length > 0) {
      console.log('menuKeyDuplicate', menuGroupDuplicate);
      throw new Error('Duplicate id menu');
    }

    useEffect(() => {
      if (
        !refAutoUpdatePermission.current &&
        !isLoadingAllPermission &&
        !isEmpty(allPermission) &&
        autoUpdatePermission
      ) {
        refAutoUpdatePermission.current = true;
        const permissionAllSystem = menuUser
          .map((menu) => {
            return [
              ITEM_PERMISSIONS.VIEW,
              ITEM_PERMISSIONS.ADD,
              ITEM_PERMISSIONS.UPDATE,
              ITEM_PERMISSIONS.DELETE,
            ].map((permission) => ({
              display_name: `${menu?.text} - ${permission}`,
              name: `${menu?.id}.${permission}`,
            }));
          })
          .flat();
        const namePermissions = allPermission.map((item) => item?.name);
        const permissionAllSystemNotExist = permissionAllSystem.filter(
          (permission) => {
            return namePermissions.indexOf(permission.name) === -1;
          },
        );

        if (permissionAllSystemNotExist.length > 0) {
          runPromiseAsync(
            ...permissionAllSystemNotExist.map(
              (permission) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    send(permission).then((rs) => resolve(rs));
                  }, 1000);
                }),
            ),
          );
        }
      }
    }, [allPermission, isLoadingAllPermission, menuUser, send]);
  }

  useEffect(() => {
    if (layoutType === LayoutType.BOXED) {
      document.body.classList.add('boxedLayout');
      document.body.classList.remove('framedLayout');
    } else if (layoutType === LayoutType.FRAMED) {
      document.body.classList.remove('boxedLayout');
      document.body.classList.add('framedLayout');
    } else {
      document.body.classList.remove('boxedLayout');
      document.body.classList.remove('framedLayout');
    }
  }, [layoutType]);

  useEffect(() => {
    if (params.layout) updateNavStyle(params.layout);
    if (params.menuStyle) updateMenuStyle(params.menuStyle);
    if (params.sidebarImage) setSidebarBgImage(true);
  }, []);

  // disable func change info in first login
  const isFirstLogin = true || user?.first_login;

  return (
    <React.Fragment>
      {isAuthenticated && isFirstLogin ? (
        <AppLayout />
      ) : (
        <Layout className='auth'>
          <AppScrollbar className='main-auth-scrollbar'>
            <AuthPageLayout>
              {!isFirstLogin && isAuthenticated ? (
                <ChangeInfoFirstLogin />
              ) : (
                <AppContentView />
              )}
            </AuthPageLayout>
          </AppScrollbar>
        </Layout>
      )}
    </React.Fragment>
  );
};

export default React.memo(AppLayout);
