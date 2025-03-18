import React from 'react';
import '../AppLogo/index.style.less';
import PropTypes from 'prop-types';
import {
  URL_LOGO_DEFAULT,
  WORKDIR_LOGO_DYNAMIC,
} from 'src/shared/constants/DataFixed';
import { useSidebarContext } from 'src/@crema/utility/AppContextProvider/SidebarContextProvider';
import { useAuthUser } from 'src/@crema/utility/AuthHooks';

const AppLogoWithoutText = ({ hasSidebarColor }) => {
  const { sidebarColorSet } = useSidebarContext();
  const { user } = useAuthUser();
  const logoUrl =
    `${WORKDIR_LOGO_DYNAMIC}${user?.logo_url}` ?? URL_LOGO_DEFAULT;
  return (
    <div className='app-logo'>
      {hasSidebarColor && sidebarColorSet.mode === 'dark' ? (
        <img src={logoUrl} alt='crema-logo' className='img-no-text' />
      ) : (
        <img src={logoUrl} alt='crema-logo' className='img-no-text' />
      )}
    </div>
  );
};

export default AppLogoWithoutText;

AppLogoWithoutText.propTypes = {
  hasSidebarColor: PropTypes.bool,
};
