import React, { useRef } from 'react';
import './index.style.less';
import PropTypes from 'prop-types';
// import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';

// import UserInfo from '../components/UserInfo';
import AppScrollbar from '../../AppScrollbar';
import clsx from 'clsx';
import AppVerticalMenu from '../components/AppVerticalNav';
import { useSidebarContext } from '../../../utility/AppContextProvider/SidebarContextProvider';
import MainSidebar from '../components/MainSidebar';
import AppLogo from '../components/AppLogo';
import AppLogoWithoutText from '../components/AppLogoWithoutText';
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';

const AppSidebar = ({ isCollapsed, onToggleSidebar }) => {
  const { isSidebarBgImage } = useSidebarContext();
  const refScrollMenu = useRef();

  return (
    <MainSidebar
      className={clsx('mini-sidebar-toggle', {
        'mini-sidebar-toggle-img-background': isSidebarBgImage,
      })}
      collapsible
      breakpoint='xl'
      collapsedWidth='0'
      collapsed={isCollapsed}>
      <div className='app-mini-sidebar-logo-container'>
        <div className='app-mini-sidebar-logo'>
          {isCollapsed ? (
            <div onClick={onToggleSidebar}>
              <AppLogoWithoutText />
            </div>
          ) : (
            <AppLogo />
          )}
        </div>

        {!isCollapsed &&
          React.createElement(
            isCollapsed ? AiOutlineMenuUnfold : AiOutlineMenuFold,
            {
              className: 'trigger, app-mini-sidebar-icon',
              onClick: onToggleSidebar,
            },
          )}
      </div>

      {/* <UserInfo hasColor /> */}
      <AppScrollbar ref={refScrollMenu} className='app-mini-sidebar-scrollbar'>
        <AppVerticalMenu refScrollMenu={refScrollMenu} />
      </AppScrollbar>
    </MainSidebar>
  );
};

export default AppSidebar;

AppSidebar.propTypes = {
  isCollapsed: PropTypes.bool,
  onToggleSidebar: PropTypes.func,
};
