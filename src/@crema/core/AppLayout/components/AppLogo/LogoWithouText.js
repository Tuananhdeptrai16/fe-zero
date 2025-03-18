import React from 'react';
import './index.style.less';
import PropTypes from 'prop-types';
import { useSidebarContext } from 'src/@crema/utility/AppContextProvider/SidebarContextProvider';

const AppLogoWithoutText = ({ hasSidebarColor }) => {
  const { sidebarColorSet } = useSidebarContext();
  return (
    <div className='app-logo'>
      {hasSidebarColor && sidebarColorSet.mode === 'dark' ? (
        <img src='/assets/images/logo/logo_new.png' alt='PDMP-logo' />
      ) : (
        <img src='/assets/images/logo/logo_new.png' alt='PDMP-logo' />
      )}
    </div>
  );
};

export default AppLogoWithoutText;

AppLogoWithoutText.propTypes = {
  hasSidebarColor: PropTypes.bool,
};
