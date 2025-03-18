import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthUser } from 'src/@crema/utility/AuthHooks';
import PropTypes from 'prop-types';
import './index.style.less';
import routeConfig from 'src/pages/routeConfig';
import { getOpenKeys, getPramByKey } from 'src/shared/utils/Route';
import { getRouteMenus } from 'src/@crema/utility/VerticalMenuUtils';
import { isEmpty } from 'src/shared/utils/Typeof';
import { isURL } from 'src/shared/utils/URL';
// import routes from 'src/config/routes.config';
import { findParentByPath } from 'src/shared/utils/Menu';

const AppHorizontalNav = ({ className, refScrollMenu }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { user } = useAuthUser();
  const userPermissions = user?.permissions || [];

  // const [selectedKey, setSelectedKey] = useState();
  const [openKeys, setOpenKeys] = useState([]);

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
      // setSelectedKey(selectedKeys[selectedKeys.length - 1]);
      // setOpenKeys(selectedKeys.slice(0, selectedKeys.length - 1));
      setTimeout(() => {
        updateHeightScrollMenu();
      }, 200);
    }
  }, []);

  const onOpenChange = (event) => {
    const { key } = event;
    const [keyCurrent] = (key || '').split('__');

    const param = getPramByKey(keyCurrent, routeConfig);

    if (!isEmpty(param)) {
      const checkUrl = isURL(param);
      if (checkUrl) {
        window.location.href = param;
        // window.open(param);
      } else {
        navigate(param);
      }
    }
  };

  const itemsNavHorizontal = getRouteMenus(userPermissions) || [];
  const listFirstItem = itemsNavHorizontal?.map((item) => {
    return {
      ...item,
      children: null,
    };
  });
  // get items by path
  const menuByPathCurrent = findParentByPath(itemsNavHorizontal, pathname);

  return (
    <Menu
      mode='horizontal'
      triggerSubMenuAction='click'
      className={className}
      items={listFirstItem || []}
      openKeys={openKeys}
      onOpenChange={(listOpenKeys) => {
        setOpenKeys(listOpenKeys);
        updateHeightScrollMenu();
      }}
      selectedKeys={isEmpty(menuByPathCurrent) ? [] : [menuByPathCurrent?.key]}
      onClick={onOpenChange}
    />
  );
};

export default AppHorizontalNav;
AppHorizontalNav.propTypes = {
  className: PropTypes.string,
};
