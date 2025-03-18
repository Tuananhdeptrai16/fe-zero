import React from 'react';
import style from './workspace.module.scss';
import clsx from 'clsx';
import { BannerDataSource } from 'src/assets/icon/sidebar';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';

const WorkspacePage = () => {
  return (
    <div className={clsx(style.workspaceContainer)}>
      <AppPageMetadata title='Bàn làm việc' />
      <div className={clsx(style.contentWorkspace)}>
        <BannerDataSource />
      </div>
    </div>
  );
};

export default WorkspacePage;
