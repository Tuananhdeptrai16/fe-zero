import { useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { checkPermissionRoutes } from 'src/@crema/utility/VerticalMenuUtils';
import routesConfig from 'src/pages/routeConfig';
import { useAuthUser } from 'src/@crema/utility/AuthHooks';
import { isEmpty } from 'src/shared/utils/Typeof';

export const useListPagePermission = () => {
  const { user } = useAuthUser();
  const { messages } = useIntl();

  const flattenRoutes = useCallback(
    (routes) => {
      return routes.reduce((flattenedRoutes, route) => {
        if (route.type === 'item') {
          flattenedRoutes.push({
            ...route,
            label: messages[route?.messageId] || route?.messageId,
          });
        } else if (
          (route.type === 'group' || route.type === 'collapse') &&
          route.children
        ) {
          flattenedRoutes.push(...flattenRoutes(route.children));
        }
        return flattenedRoutes.filter((item) => !isEmpty(item.path));
      }, []);
    },
    [messages],
  );
  const listPageName = useMemo(() => {
    const userPermissions = user?.permissions || [];

    const routes = checkPermissionRoutes(routesConfig, userPermissions);
    return flattenRoutes(routes);
  }, [flattenRoutes, user?.permissions]);

  return { listPageName };
};
