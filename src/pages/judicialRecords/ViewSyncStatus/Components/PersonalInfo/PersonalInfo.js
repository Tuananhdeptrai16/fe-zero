import React, { memo } from 'react';
import style from '../../ViewSyncStatus.module.scss';
import clsx from 'clsx';
// import { Progress } from 'antd';
import AppCard from 'src/@crema/core/AppCard';
import { generatorStatusSync } from 'src/pages/judicialRecords/createRecordInformation/utils';

function PersonalInfo({ isLoadingSyncStatus, resultDataSyncStatus }) {
  const statusSyncPersonalInfo = resultDataSyncStatus?.status
    ? resultDataSyncStatus?.status
    : '';

  return (
    <AppCard
      loading={isLoadingSyncStatus}
      className={clsx(style.wrapInfoSyncItem, style.personInfo)}>
      <div className={clsx(style.personalInformation)}>
        <h5 className={clsx(style.personalInformation_title)}>
          Thông tin nhân thân
        </h5>
        <div className={clsx(style.personalInformation_content)}>
          {statusSyncPersonalInfo.toUpperCase() === 'WAIT_FOR_MIGRATE'
            ? // cho dong bo
              generatorStatusSync('null')
            : statusSyncPersonalInfo.toUpperCase() === 'PENDING'
            ? // dang dong bo
              generatorStatusSync('pending')
            : statusSyncPersonalInfo.toUpperCase() === 'DONE'
            ? // dong bo thanh cong
              generatorStatusSync('done')
            : // dong bo that bai
            statusSyncPersonalInfo.toUpperCase() === 'FAIL'
            ? generatorStatusSync('failed', 'Lỗi đồng bộ !')
            : generatorStatusSync('null')}
        </div>
      </div>
    </AppCard>
  );
}

export default memo(PersonalInfo);
