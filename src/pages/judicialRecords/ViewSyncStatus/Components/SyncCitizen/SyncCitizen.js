import React, { memo } from 'react';
import style from '../../ViewSyncStatus.module.scss';
import clsx from 'clsx';
import AppCard from 'src/@crema/core/AppCard';
import config from 'src/config';
import { useNavigate } from 'react-router-dom';

//  config.routes.detailJudicialRecord(activeKey, record?.id)

function SyncCitizen({
  isLoadingSyncStatus,
  resultDataSyncStatus,
  checkSyncErrorPersonalInfo,
}) {
  const navigate = useNavigate();
  const handeGetDetailsCitizen = () => {
    navigate(
      config.routes.detailJudicialRecord(
        'verified',
        resultDataSyncStatus?.citizen_profile_id,
      ),
    );
  };

  return (
    <AppCard
      loading={isLoadingSyncStatus}
      className={clsx(style.cardItemSyncCitizen)}>
      {checkSyncErrorPersonalInfo.toLowerCase().trim() === 'failed' ||
      checkSyncErrorPersonalInfo.toLowerCase().trim() === 'error' ? (
        <h5
          className={clsx(style.syncCitizen_title)}
          style={{
            color: 'red',
          }}>
          Đồng bộ lỗi thông tin LLTP công dân :
        </h5>
      ) : (
        <h5 className={clsx(style.syncCitizen_title)}>
          Đang đồng bộ thông tin LLTP công dân :
        </h5>
      )}

      <div
        className={clsx(style.syncCitizen_wrap_name)}
        onClick={handeGetDetailsCitizen}>
        <h5 className={clsx(style.syncCitizen_name)}>
          {resultDataSyncStatus?.citizen_profile?.full_name
            ? resultDataSyncStatus?.citizen_profile?.full_name
            : 'Nguyen Van A'}
        </h5>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='17'
          height='16'
          viewBox='0 0 17 16'
          fill='none'
          className={clsx(style.syncCitizen_icon)}>
          <path
            d='M1.9601 15.1746H15.103C15.419 15.1746 15.6744 14.9193 15.6744 14.6032V8.17463C15.6744 8.09606 15.6101 8.03177 15.5315 8.03177H14.5315C14.453 8.03177 14.3887 8.09606 14.3887 8.17463V13.8889H2.67439V2.17463H8.38867C8.46724 2.17463 8.53153 2.11035 8.53153 2.03177V1.03177C8.53153 0.953202 8.46724 0.888916 8.38867 0.888916H1.9601C1.64403 0.888916 1.38867 1.14427 1.38867 1.46034V14.6032C1.38867 14.9193 1.64403 15.1746 1.9601 15.1746Z'
            fill='#007BEC'
          />
          <path
            d='M12.2221 1.51267L13.1542 2.44482L5.46989 10.1327C5.41453 10.1881 5.41453 10.2791 5.46989 10.3345L6.22703 11.0916C6.28239 11.147 6.37346 11.147 6.42882 11.0916L14.1149 3.40553L15.0506 4.34125C15.1346 4.42517 15.2792 4.37518 15.2935 4.25732L15.6685 1.05375C15.6792 0.960889 15.6006 0.884103 15.5096 0.894816L12.306 1.26982C12.2794 1.27308 12.2543 1.28375 12.2335 1.30058C12.2127 1.31742 12.197 1.33976 12.1883 1.36506C12.1795 1.39037 12.1781 1.41761 12.184 1.44371C12.19 1.4698 12.2032 1.4937 12.2221 1.51267Z'
            fill='#007BEC'
          />
        </svg>
      </div>
    </AppCard>
  );
}

export default memo(SyncCitizen);
