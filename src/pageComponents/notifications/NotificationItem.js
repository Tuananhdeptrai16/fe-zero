import React, { useState } from 'react';
import { List, Space } from 'antd';
import { getTimeFromNow } from 'src/@crema/utility/helper/DateHelper';
import './index.style.less';
import {
  NOTI_ICON_MAP,
  NOTI_STATUS,
} from 'src/shared/constants/notification.constant';
import Icon from '@ant-design/icons';
import AppIconButton from 'src/@crema/core/AppIconButton';
import DialogConfirm from 'src/@crema/component/DialogConfirm';
import { FormShareNotification } from 'src/pageComponents/notifications/FormShareNotification';
import { formatDateJs } from 'src/shared/utils/DateTime';
import { TIMESTAMP } from 'src/shared/constants/Format';
import {
  changeStatusNoti,
  shareNotification,
} from 'src/@crema/services/notifications.service';
import useCallApi from 'src/@crema/hook/useCallApi';
import AntAvatar from 'src/@crema/component/AntAvatar/AntAvatar';
import { IconShare } from 'src/assets/icon/sidebar';

export const NotificationItem = ({ item, hideShareIcon }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { send } = useCallApi({
    callApi: changeStatusNoti,
  });
  const onDetailNoti = async () => {
    await send({ status: NOTI_STATUS.READ, noti_ids: [item?.id] });
    location.href = item?.link;
  };
  return (
    <>
      <List.Item
        className={
          item?.status !== NOTI_STATUS.READ
            ? 'itemNotify unreadItem'
            : 'itemNotify'
        }
        onClick={onDetailNoti}
        actions={
          hideShareIcon
            ? []
            : [
                <AppIconButton
                  key={'share'}
                  icon={<IconShare />}
                  title={'Chia sẻ'}
                  onClick={() => setIsOpenModal(true)}
                />,
              ]
        }>
        <List.Item.Meta
          avatar={
            <AntAvatar
              className='notify-message-avatar'
              icon={
                <Icon
                  style={{ fontSize: 32 }}
                  component={NOTI_ICON_MAP[item?.type]}
                />
              }
              alt={item.link}
            />
          }
          title={item.content}
          description={
            <Space direction={'vertical'} size={0}>
              <span>{getTimeFromNow(item?.created_at)}</span>
            </Space>
          }
        />
      </List.Item>
      <DialogConfirm
        visible={isOpenModal}
        textTitle={'Chia sẻ thông báo'}
        onClose={() => setIsOpenModal(false)}
        textSuccess={'Chia sẻ thành công!'}
        initialValues={{
          ...item,
          created_at: formatDateJs(item?.created_at, TIMESTAMP),
        }}
        preSaveData={(data) => {
          return {
            noti_id: item?.id,
            user_ids: data?.user_ids,
          };
        }}
        onSaveToServer={shareNotification}>
        <FormShareNotification />
      </DialogConfirm>
    </>
  );
};
