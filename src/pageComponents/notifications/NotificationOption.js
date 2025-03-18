import React from 'react';
import AntButton from 'src/@crema/component/AntButton';
import { Badge } from 'antd';
import useCallApi from 'src/@crema/hook/useCallApi';
import { changeAllReadNoti } from 'src/@crema/services/notifications.service';
import { useNavigate } from 'react-router-dom';
import config from 'src/config';
import { KEY_TAB_PROFILE } from 'src/shared/constants/userProfile.constant';

export const NotificationOption = ({ onReadAllSuccess }) => {
  const nav = useNavigate();

  const { send, loading } = useCallApi({
    callApi: changeAllReadNoti,
    success: onReadAllSuccess,
  });
  const onMarkReadAll = async (e) => {
    e.stopPropagation();
    await send();
  };
  return (
    <div>
      <AntButton
        loading={loading}
        className='px-0'
        type={'link'}
        onClick={onMarkReadAll}
        size={'small'}>
        Đánh dấu tất cả là đã đọc
      </AntButton>
      <Badge className='mx-1' color='rgba(0, 0, 0, 0.25)' dot size={'small'} />
      <AntButton
        type={'link'}
        className='px-0'
        size={'small'}
        onClick={() =>
          nav(config.routes.profileByTab(KEY_TAB_PROFILE.NOTIFICATION))
        }>
        Cài đặt thông báo
      </AntButton>
    </div>
  );
};
