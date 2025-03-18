import React from 'react';
import AppVerticalNav from '../AppVerticalNav';
import style from './AppSideBarLeft.module.scss';
import clsx from 'clsx';
import AppScrollbar from 'src/@crema/core/AppScrollbar';
// import PropTypes from 'prop-types';

AppSideBarLeft.propTypes = {};

function AppSideBarLeft() {
  return (
    <div>
      <AppScrollbar className={clsx(style.appScrollBarSideBarLeft)}>
        <AppVerticalNav />
      </AppScrollbar>
    </div>
  );
}

export default AppSideBarLeft;
