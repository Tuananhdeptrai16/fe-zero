import React from 'react';
import AppAnimateGroup from '../../../@crema/core/AppAnimateGroup';
import AppPageMetadata from '../../../@crema/core/AppPageMetadata';
import AppLoader from '../../../@crema/core/AppLoader';

const PageLoading = () => {
  return (
    <AppAnimateGroup type='bottom'>
      <AppPageMetadata title='Đang tải' />
      <AppLoader />
    </AppAnimateGroup>
  );
};

export default PageLoading;
