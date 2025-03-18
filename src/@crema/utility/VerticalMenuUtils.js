/* eslint-disable */
import { Link, useLocation } from 'react-router-dom';
import { Menu, Tooltip } from 'antd';
import React from 'react';
import routesConfig from 'src/pages/routeConfig';
import { useIntl } from 'react-intl';
import { checkRouteActive } from 'src/shared/utils/Route';
import { isArray, isEmpty, isObject } from 'src/shared/utils/Typeof';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import { CaretDownOutlined } from '@ant-design/icons';
import { isURL } from 'src/shared/utils/URL';
import Icon from '@ant-design/icons';
import { ExternalLinkIcon } from 'src/assets/icon/sidebar';
import { flattenDeep } from 'lodash';

function getStyles(item, sidebarColorSet, isSidebarBgImage, index, isGroup) {
  const { pathname } = useLocation();

  if (index === 0 || isGroup) {
    return {
      color: sidebarColorSet.sidebarTextColor,
      // backgroundColor: isSidebarBgImage ? '' : sidebarColorSet.sidebarBgColor,
    };
  } else {
    const isActive = checkRouteActive(pathname, item);

    return {
      color: isActive
        ? sidebarColorSet.sidebarMenuSelectedTextColor
        : sidebarColorSet.sidebarTextColor,
      backgroundColor: isActive
        ? sidebarColorSet.sidebarMenuSelectedBgColor
        : isSidebarBgImage
        ? ''
        : sidebarColorSet.sidebarBgColor,
    };
  }
}

const renderMenuItemChildren = (item) => {
  const { icon, messageId, path } = item;
  const { messages } = useIntl();

  if (path && path.includes('/')) {
    if (path.includes('http')) {
      return (
        <a href={path}>
          {icon &&
            (React.isValidElement(icon) ? (
              <span className='ant-menu-item-icon'>{icon}</span>
            ) : (
              <icon className='ant-menu-item-icon' />
            ))}
          <span data-testid={messageId.toLowerCase + '-nav'}>
            {messages[messageId]}
          </span>
        </a>
      );
    }
    return (
      <Link to={path}>
        {icon &&
          (React.isValidElement(icon) ? (
            <span className='ant-menu-item-icon'>{icon}</span>
          ) : (
            <icon className='ant-menu-item-icon' />
          ))}
        <span data-testid={messageId.toLowerCase + '-nav'}>
          {messages[messageId]}
        </span>
      </Link>
    );
  } else {
    return (
      <>
        {icon &&
          (React.isValidElement(icon) ? (
            <span className='ant-menu-item-icon'>{icon}</span>
          ) : (
            <icon className='ant-menu-item-icon' />
          ))}
        <span data-testid={messageId.toLowerCase + '-nav'}>
          {messages[messageId]}
        </span>
      </>
    );
  }
};

const renderMenuItem = (item, sidebarColorSet, isSidebarBgImage, index) => {
  return item.type === 'collapse' ? (
    <Menu.SubMenu
      style={getStyles(item, sidebarColorSet, isSidebarBgImage, index, true)}
      key={`${item.id}-${item?.path}`}
      title={renderMenuItemChildren(item, sidebarColorSet, isSidebarBgImage)}>
      {item.children.map((item) =>
        renderMenuItem(item, sidebarColorSet, isSidebarBgImage, index + 1),
      )}
    </Menu.SubMenu>
  ) : (
    <Menu.Item
      key={`${item.id}-${item?.path}`}
      style={getStyles(item, sidebarColorSet, isSidebarBgImage, index)}>
      {item.children
        ? item.children
        : renderMenuItemChildren(item, sidebarColorSet, isSidebarBgImage)}
    </Menu.Item>
  );
};

const renderMenu = (item, sidebarColorSet, isSidebarBgImage, index) => {
  switch (item.type) {
    case 'group':
      return (
        <Menu.ItemGroup
          style={getStyles(
            item,
            sidebarColorSet,
            isSidebarBgImage,
            index,
            true,
          )}
          key={`${item.id}-${item?.path}`}
          title={renderMenuItemChildren(
            item,
            sidebarColorSet,
            isSidebarBgImage,
          )}>
          {item.children.map((item) =>
            renderMenuItem(item, sidebarColorSet, isSidebarBgImage, index + 1),
          )}
        </Menu.ItemGroup>
      );
    case 'collapse':
      return renderMenuItem(item, sidebarColorSet, isSidebarBgImage, index);
    default:
      return (
        <Menu.Item
          key={`${item.id}-${item?.path}`}
          exact={item.exact}
          style={getStyles(item, sidebarColorSet, isSidebarBgImage, index)}>
          {item.children
            ? item.children
            : renderMenuItemChildren(
                item,
                sidebarColorSet,
                isSidebarBgImage,
                index,
              )}
        </Menu.Item>
      );
  }
};

export const getBreadcrumb = (routes, pathname, breadcrumb = []) => {
  let rs = [];
  routes.forEach((route) => {
    if (!isEmpty(rs)) return;
    if (isEmpty(route.children)) {
      if (route.path === pathname) {
        rs.push({
          path: route.path,
          title: route.messageId,
        });
      }
    } else {
      const rsChild = getBreadcrumb(route.children, pathname, [
        { path: route.path, title: route.messageId },
      ]);
      if (!isEmpty(rsChild)) {
        rs.push(...rsChild);
      }
    }
  });

  if (isEmpty(rs)) return [];
  return [...breadcrumb, ...rs];
};

export const checkPermissionRoute = (route, permissionsList) => {
  return (
    route.permission === false ||
    (permissionsList.includes(`${route.id}.view`) && !route.isPageHidden)
  );
};

export const checkPermissionRoutes = (routes, permissionsList) => {
  if (isEmpty(routes) || isEmpty(permissionsList)) return [];
  const routesShow = [];
  routes.forEach((route) => {
    if (isArray(route.children) && !isEmpty(route.children)) {
      const children = checkPermissionRoutes(route.children, permissionsList);
      if (children?.length > 0) {
        routesShow.push({
          ...route,
          children,
        });
      }
    } else if (checkPermissionRoute(route, permissionsList)) {
      routesShow.push(route);
    }
  });
  return routesShow;
};

export const addMessageToRoutes = (routes, messages = {}) => {
  return (routes || []).map((route) => ({
    ...route,
    text: messages?.[route?.messageId] || route?.messageId,
    children: isEmpty(route?.children)
      ? []
      : addMessageToRoutes(route?.children, messages),
  }));
};

export const flattenRoute = (routes = []) => {
  return flattenDeep(
    routes
      .map((route) => {
        if (!isEmpty(route?.children)) {
          return flattenRoute(route?.children);
        }
        if (!isEmpty(route?.path)) {
          return route;
        }

        return null;
      })
      .filter((item) => !!item),
  );
};

const convertMenuToItem = (menu) => {
  if (isArray(menu)) {
    return menu
      .map((item) => convertMenuToItem(item))
      .filter((item) => !isEmpty(item));
  } else if (isObject(menu)) {
    if (isArray(menu?.children) && !isEmpty(menu?.children)) {
      const childrenConvert = convertMenuToItem(menu?.children);
      if (!isEmpty(childrenConvert)) {
        return {
          key: isEmpty(menu?.path) ? menu?.id : `${menu.id}__${menu?.path}`,
          icon: menu.icon,
          children: childrenConvert,
          label: (
            <div className='d-flex gap-2'>
              <IntlMessages
                id={menu.messageId}
                maxLength={27}
                placement='right'
              />
              {/* <CaretDownOutlined className='carretDownMenu' /> */}
            </div>
          ),
        };
      } else {
        return null;
      }
    }
    return {
      key: isEmpty(menu?.path) ? menu?.id : `${menu.id}__${menu?.path}`,
      path: menu?.path,
      icon: menu.icon,
      label: isURL(menu?.path) ? (
        <div className='d-flex items-center justify-between gap-2'>
          <IntlMessages id={menu.messageId} maxLength={22} placement='right' />
          {/* <Icon component={ExternalLinkIcon} /> */}
        </div>
      ) : (
        <IntlMessages id={menu.messageId} maxLength={22} placement='right' />
      ),
    };
  }
  return null;
};

export const getRouteMenus = (permissionsList) => {
  // const { sidebarColorSet } = useSidebarContext();
  // const { isSidebarBgImage } = useSidebarContext();
  const routes = checkPermissionRoutes(routesConfig, permissionsList);
  return convertMenuToItem(routes);
};

export const routesFlattenConfig = flattenRoute(routesConfig);
