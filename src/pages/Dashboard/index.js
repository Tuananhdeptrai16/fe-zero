import React from 'react';
// import useGetPagePermissions from '../../@crema/hook/useGetPagePermissions';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata/index';
import Analytics from './Analytics/index';

const Dashboard = () => {
  return (
    <>
      <AppPageMetadata title='Dashboard' />
      <Analytics />
    </>
  );
};

export default Dashboard;
