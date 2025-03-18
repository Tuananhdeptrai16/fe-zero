import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ThemeContextProvider from './ThemeContextProvider';
import LocaleContextProvider from './LocaleContextProvide';
import LayoutContextProvider from './LayoutContextProvider';
import SidebarContextProvider from './SidebarContextProvider';
import { IS_LOCALHOST } from 'src/shared/constants/serverConfig';

const AppContextProvider = ({ children }) => {
  useEffect(() => {
    if (!IS_LOCALHOST) {
      document.cookie =
        'dev_long_token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
      document.cookie =
        'dev_token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
    }
  }, []);
  return (
    <ThemeContextProvider>
      <LocaleContextProvider>
        <LayoutContextProvider>
          <SidebarContextProvider>{children}</SidebarContextProvider>
        </LayoutContextProvider>
      </LocaleContextProvider>
    </ThemeContextProvider>
  );
};

export default AppContextProvider;

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
