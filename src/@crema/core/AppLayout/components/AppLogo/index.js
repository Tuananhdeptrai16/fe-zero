import React from 'react';
import './index.style.less';
import PropTypes from 'prop-types';
import { useSidebarContext } from 'src/@crema/utility/AppContextProvider/SidebarContextProvider';
import { useNavigate } from 'react-router-dom';
import { useAuthUser } from 'src/@crema/utility/AuthHooks';

const AppLogo = ({
  hasSidebarColor,
  darkLogoUrl = '/assets/images/logo/logo_new.png',
  lightLogoUrl = '/assets/images/logo/logo_new.png',
}) => {
  const navigate = useNavigate();
  const { user } = useAuthUser();
  const imageContent = user?.logo_url;
  const { sidebarColorSet } = useSidebarContext();
  return (
    <div
      className='app-logo'
      onClick={() => {
        navigate('/');
      }}>
      {hasSidebarColor && sidebarColorSet.mode === 'dark' ? (
        <img src={imageContent ?? darkLogoUrl} alt='logo-dark' />
      ) : (
        <img src={imageContent ?? lightLogoUrl} alt='light-logo' />
      )}
    </div>
  );
};

export default AppLogo;

AppLogo.propTypes = {
  hasSidebarColor: PropTypes.bool,
};
