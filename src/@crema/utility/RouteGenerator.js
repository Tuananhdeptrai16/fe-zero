import { Navigate, useRoutes } from 'react-router-dom';
import { ITEM_PERMISSIONS } from 'src/shared/constants/Permission';
import { isArray, isEmpty, isString } from 'src/shared/utils/Typeof';
import { intersection } from 'lodash';

/**
 * @param {Object} structure - The passed object that defines the routes.
 * @param {boolean} structure.isAuthenticated - [Required] in order to differentiate between LoggedIn/Loggedout users
 * @param {object} [structure.anonymousStructure] - it's an object that has only [ routes ] array, [ these routes available for All personas ]
 * @param {object} [structure.authorizedStructure] - it's an object that has [ fallbackPath: {string}, routes: {array} ], fallbackPath: is used for redirect when a logged [in] user tried to access unAuthorized route, routes: only The Logged [in] Routes Available
 * @param {object} [structure.unAuthorizedStructure] - it's an object that has [ fallbackPath: {string}, routes: {array} ], fallbackPath: is used for redirect when a logged [out] user tried to access route that requires [Authorization] , routes: only The Logged [out] Routes Available
 * @param {component} [structure.component fallbackComponent] - in order to redirect in all cases if the route doesn't match.
 * @param {unAuthorizedComponent} [structure.unAuthorizedComponent] - in order to show not permitted route.
 * @param {array} permissions - [Optional] in order to differentiate between admin and normal users
 * @returns {Array}
 */

const getListNameView = (name = []) => {
  const listNameView = [];
  if (isString(name)) {
    listNameView.push(`${name}.${ITEM_PERMISSIONS.VIEW}`);
  } else if (isArray(name)) {
    listNameView.push(...name.map((n) => `${n}.${ITEM_PERMISSIONS.VIEW}`));
  }
  return listNameView;
};

const checkPermissionView = (permissions, listNameView) => {
  return (
    !isEmpty(intersection(permissions, listNameView)) || isEmpty(listNameView)
  );
};

const generateRoutes = (structure, permissions = []) => {
  const {
    initialUrl,
    isAuthenticated = false,
    anonymousStructure = {},
    authorizedStructure = {},
    unAuthorizedStructure = {},
  } = structure || {};

  let dynamicRoutes = [];

  if (anonymousStructure) {
    dynamicRoutes.push(
      ...routesGenerator(isAuthenticated, anonymousStructure, 'anonymous'),
    );
  }

  if (authorizedStructure) {
    dynamicRoutes.push(
      ...routesGenerator(
        isAuthenticated,
        authorizedStructure,
        'authorized',
        permissions || [],
      ),
    );
  }

  if (unAuthorizedStructure) {
    dynamicRoutes.push(
      ...routesGenerator(
        isAuthenticated,
        unAuthorizedStructure,
        'unAuthorized',
      ),
    );
  }

  dynamicRoutes = dynamicRoutes.filter((item) => {
    if (!item.name) return true;

    const listNameView = getListNameView(item.name);
    return checkPermissionView(permissions, listNameView);
  });

  if (initialUrl) {
    dynamicRoutes.push({
      element: <Navigate to={initialUrl} replace />,
      path: '/',
    });
  } else if (!isAuthenticated) {
    dynamicRoutes.push({
      element: <Navigate to='/signin' replace />,
      path: '/',
    });
  }

  return useRoutes(dynamicRoutes);
};

/**
 * path: string
 * component: React.Component
 * routeProps: Object -----> To override route props
 * permissions: array -----> To override route props
 * redirectPath: String ----> To redirect to specific location
 * showRouteIf: to override when to show the component or when to [ Navigate ]
 */
const routesGenerator = (
  isAuthenticated = false,
  routeSet = {},
  type = 'anonymous',
  permissions,
) => {
  const generatedRoutes = [];
  const { fallbackPath = '' } = routeSet || {};

  const isAnonymous = type === 'anonymous';
  const isAuthorized = type === 'authorized';

  if (routeSet?.routes) {
    const routes = routeSet.routes;
    if (Array.isArray(routes) && routes.length > 0) {
      routes.forEach((route /*index*/) => {
        const {
          name,
          path = '',
          // routeProps = {},
          redirectPath = '',
          showRouteIf = true,
        } = route || {};
        const listNameView = getListNameView(name);

        // Show Route only [ in The list ] if this prop is true
        if (showRouteIf) {
          // check the mandatory props for a routes
          if (!path) {
            // console.log(
            //   `A [route] is skipped because one of the following, No valid [path] prop provided for the route`,
            //   isAuthenticated,
            // );
          } else {
            if (isAnonymous) {
              return generatedRoutes.push(route);
            }
            if (isAuthorized) {
              const renderCondition = isAuthorized
                ? isAuthenticated
                : !isAuthenticated;

              if (Array.isArray(route.path)) {
                route.path.map((path) => {
                  generatedRoutes.push(
                    renderCondition
                      ? !isEmpty(intersection(permissions, listNameView)) ||
                        isEmpty(listNameView)
                        ? {
                            element: route.element,
                            path: path,
                          }
                        : {
                            path: path,
                            element: routeSet.unAuthorizedComponent,
                          }
                      : {
                          path: path,
                          element: (
                            <Navigate
                              to={redirectPath || fallbackPath}
                              replace
                            />
                          ),
                        },
                  );
                });
              } else {
                generatedRoutes.push(
                  renderCondition
                    ? !isEmpty(intersection(permissions, listNameView)) ||
                      isEmpty(listNameView)
                      ? route
                      : {
                          path: route.path,
                          element: routeSet.unAuthorizedComponent,
                        }
                    : {
                        path: route.path,
                        element: (
                          <Navigate to={redirectPath || fallbackPath} replace />
                        ),
                      },
                );
              }

              return generatedRoutes;
            }
            const renderCondition = isAuthorized
              ? isAuthenticated
              : !isAuthenticated;
            if (Array.isArray(route.path)) {
              route.path.map((path) => {
                generatedRoutes.push(
                  renderCondition
                    ? {
                        element: route.element,
                        path: path,
                      }
                    : {
                        path: path,
                        element: (
                          <Navigate to={redirectPath || fallbackPath} replace />
                        ),
                      },
                );
              });
            } else {
              generatedRoutes.push(
                renderCondition
                  ? route
                  : {
                      path: route.path,
                      element: (
                        <Navigate to={redirectPath || fallbackPath} replace />
                      ),
                    },
              );
            }

            return generatedRoutes;
          }
        }
      });
    }
  } else {
    console.log(`[routes] prop can't be found in ${type}Structure Object`);
  }
  return generatedRoutes;
};

export default generateRoutes;
