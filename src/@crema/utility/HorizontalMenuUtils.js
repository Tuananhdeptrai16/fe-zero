import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import React from 'react';
import { checkRouteActive } from 'src/shared/utils/Route';
import routesConfig from '../../pages/routeConfig';
import { useIntl } from 'react-intl';
import { useSidebarContext } from './AppContextProvider/SidebarContextProvider';
import { checkPermissionRoutes } from 'src/@crema/utility/VerticalMenuUtils';

function getStyles(item, sidebarColorSet) {
  const { pathname } = useLocation();

  const isActive = checkRouteActive(pathname, item);
  return {
    display: 'flex',
    alignItems: 'center',
    color: isActive
      ? sidebarColorSet.sidebarMenuSelectedTextColor
      : sidebarColorSet.sidebarTextColor,
    backgroundColor: isActive
      ? sidebarColorSet.sidebarMenuSelectedBgColor
      : sidebarColorSet.sidebarBgColor,
  };
}

const renderMenuItemChildren = (item) => {
  const { icon, messageId, path } = item;
  const { messages } = useIntl();

  if (path && path.includes('/'))
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
  else {
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

const renderMenuItem = (item, sidebarColorSet, index) => {
  return item.type === 'collapse' ? (
    <Menu.SubMenu
      style={getStyles(item, sidebarColorSet, index, true)}
      key={item.path ? item.path : item.id}
      title={renderMenuItemChildren(item, sidebarColorSet)}>
      {item.children.map((item) =>
        renderMenuItem(item, sidebarColorSet, index + 1),
      )}
    </Menu.SubMenu>
  ) : (
    <Menu.Item key={item.id} style={getStyles(item, sidebarColorSet, index)}>
      {item.children
        ? item.children
        : renderMenuItemChildren(item, sidebarColorSet)}
    </Menu.Item>
  );
};

const renderHorMenu = (item, sidebarColorSet, index) => {
  switch (item.type) {
    case 'group':
      return (
        <Menu.SubMenu
          style={getStyles(item, sidebarColorSet, index, true)}
          key={item.path ? item.path : item.id}
          title={renderMenuItemChildren(item, sidebarColorSet)}>
          {item.children.map((item) =>
            renderMenuItem(item, sidebarColorSet, index + 1),
          )}
        </Menu.SubMenu>
      );
    case 'collapse':
      return (
        <Menu.SubMenu
          style={getStyles(item, sidebarColorSet, index, true)}
          key={item.path ? item.path : item.id}
          title={renderMenuItemChildren(item, sidebarColorSet)}>
          {item.children.map((item) =>
            renderMenuItem(item, sidebarColorSet, index + 1),
          )}
        </Menu.SubMenu>
      );
    default:
      return (
        <Menu.Item
          key={item.id}
          style={getStyles(item, sidebarColorSet, index)}>
          {item.children
            ? item.children
            : renderMenuItemChildren(item, sidebarColorSet)}
        </Menu.Item>
      );
  }
};

export const getRoutePermissions = (permissionsList = []) => {
  const routes = [];
  routesConfig.forEach((route) => {
    if (permissionsList.includes(`${route.id}.view`) && route.type === 'item') {
      routes.push(route);
    }
    if (route.type === 'collapse') {
      const cloneRoute = { ...route };
      cloneRoute.children = cloneRoute.children.filter((child) =>
        permissionsList.includes(`${child.id}.view`),
      );
      if (cloneRoute.children.length > 0) {
        routes.push(cloneRoute);
      }
    }
  });
  return routes;
};

export const getRouteHorMenus = (permissionsList) => {
  const { sidebarColorSet } = useSidebarContext();

  const routes = checkPermissionRoutes(routesConfig, permissionsList);

  return routes.map((route) => renderHorMenu(route, sidebarColorSet, 0));
};
