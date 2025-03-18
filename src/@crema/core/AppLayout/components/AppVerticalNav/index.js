import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import { getRouteMenus } from 'src/@crema/utility/VerticalMenuUtils';
import clsx from 'clsx';
import './index.style.less';
import { useAuthUser } from 'src/@crema/utility/AuthHooks';
import routeConfig from 'src/pages/routeConfig';
import { getOpenKeys } from 'src/shared/utils/Route';
import { isEmpty } from 'src/shared/utils/Typeof';
import { findParentByPath } from 'src/shared/utils/Menu';
import { usePrevious } from '@dnd-kit/utilities';

const AppVerticalNav = ({ refScrollMenu }) => {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  const { user } = useAuthUser();
  const userPermissions = user?.permissions;
  const [openKeys, setOpenKeys] = useState([]);
  const [selectedKey, setSelectedKey] = useState();

  const listItemRouters = useMemo(() => {
    if (!isEmpty(userPermissions)) {
      return getRouteMenus(userPermissions);
    }
    return [];
  }, [userPermissions]);

  const menuByPathCurrent = useMemo(() => {
    return findParentByPath(listItemRouters, pathname);
  }, [listItemRouters, pathname]);
  const menuByPathPrev = usePrevious(menuByPathCurrent);
  // get items by path
  let listItemMenuVerticalRender = [];
  if (isEmpty(menuByPathCurrent)) {
    if (pathname === '/list-source-organization') {
      listItemMenuVerticalRender = menuByPathPrev || listItemRouters[0];
    }
    if (pathname === '/list-scientist') {
      listItemMenuVerticalRender = menuByPathPrev || listItemRouters[3];
    }
  } else {
    listItemMenuVerticalRender = menuByPathCurrent;
  }
  const updateHeightScrollMenu = () => {
    setTimeout(() => {
      if (refScrollMenu?.current?.recalculate) {
        refScrollMenu?.current?.recalculate();
      }
    }, 200);
  };

  useEffect(() => {
    const selectedKeys = getOpenKeys(pathname, routeConfig) || [];
    if (selectedKeys && selectedKeys.length > 1) {
      setSelectedKey(selectedKeys[selectedKeys.length - 1]);
      setOpenKeys(selectedKeys.slice(0, selectedKeys.length - 1));
      setTimeout(() => {
        updateHeightScrollMenu();
      }, 200);
    }
  }, [pathname]);

  const onOpenChange = (event) => {
    const { key } = event;
    setSelectedKey(key);
    const [, path] = (key || '').split('__');

    if (path) {
      if (pathname !== path) {
        if (path.includes('http')) {
          window.open(path, '_self');
        } else {
          navigate(`${path}${search}`);
        }
      }
    }
  };

  return (
    <Menu
      mode='inline'
      forceSubMenuRender
      triggerSubMenuAction='click'
      items={listItemMenuVerticalRender?.children || []}
      className={clsx('app-main-sidebar-menu')}
      openKeys={openKeys}
      onOpenChange={(openKeys) => {
        setOpenKeys(openKeys);
        updateHeightScrollMenu();
      }}
      selectedKeys={selectedKey}
      onClick={onOpenChange}></Menu>
  );
};

export default AppVerticalNav;
