import React, { useState } from 'react';
import { Badge, Button, Dropdown, Tooltip } from 'antd';

import AppScrollbar from '../AppScrollbar';
import IntlMessages from '../../utility/IntlMessages';
import './index.style.less';
import { useAuthUser } from 'src/@crema/utility/AuthHooks';
import { NOTI_TYPE } from 'src/shared/constants/notification.constant';
import { ListNotification } from 'src/pageComponents/notifications/ListNotification';
import { useIntl } from 'react-intl';
import AppTabs from 'src/@crema/core/AppTabs/AppTabs';
import { useNavigate } from 'react-router-dom';
import config from 'src/config';
import { NotificationOption } from 'src/pageComponents/notifications/NotificationOption';
import { BellOutlined } from '@ant-design/icons';
import useCallApi from 'src/@crema/hook/useCallApi';
import { postGetAuthMe } from 'src/@crema/services';

const AppNotifications = ({ isWorkspace }) => {
  const { user } = useAuthUser();
  const { messages } = useIntl();
  const nav = useNavigate();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [numNewNoti, setNumNewNoti] = useState(user?.num_noti_new);

  const { send } = useCallApi({
    callApi: postGetAuthMe,
    success: ({ result }) => {
      setNumNewNoti(result?.num_noti_new);
    },
  });

  const tabItems = [
    {
      label: messages['common.all'],
      key: NOTI_TYPE.ALL,
      children: (
        <ListNotification
          page={page}
          setPage={setPage}
          hideShareIcon={false}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      ),
    },
    {
      label: <IntlMessages id={'common.share'} />,
      key: NOTI_TYPE.SHARE,
      children: (
        <ListNotification
          typeNoti={NOTI_TYPE.SHARE}
          page={page}
          setPage={setPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          hideShareIcon
        />
      ),
    },
    {
      label: <IntlMessages id={'common.warning'} />,
      key: NOTI_TYPE.WARNING,
      children: (
        <ListNotification
          typeNoti={NOTI_TYPE.WARNING}
          page={page}
          setPage={setPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          hideShareIcon={false}
        />
      ),
    },
    {
      label: <IntlMessages id={'common.group'} />,
      key: NOTI_TYPE.GROUP,
      children: (
        <ListNotification
          typeNoti={NOTI_TYPE.GROUP}
          page={page}
          setPage={setPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          hideShareIcon={false}
        />
      ),
    },
    {
      label: <IntlMessages id={'common.account'} />,
      key: NOTI_TYPE.PRIVATE,
      children: (
        <ListNotification
          typeNoti={NOTI_TYPE.PRIVATE}
          page={page}
          setPage={setPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          hideShareIcon={false}
        />
      ),
    },
  ];

  const items = [
    {
      label: (
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}>
          <AppScrollbar className='notify-scroll-submenu'>
            <AppTabs
              onChange={() => setPage(1)}
              destroyInactiveTabPane
              items={tabItems}
              tabBarStyle={{ paddingLeft: 24, paddingRight: 8, margin: 0 }}
            />
          </AppScrollbar>
        </div>
      ),
      key: 'app_notifications-2',
    },
    {
      label: (
        <div
          className={'d-flex items-center justify-between px-3'}
          onClick={(e) => {
            e.stopPropagation();
          }}>
          <Button
            className='px-0'
            type='link'
            onClick={() => nav(config.routes.notifications)}>
            <IntlMessages id='common.viewAll' />
          </Button>
          <NotificationOption
            onReadAllSuccess={() => {
              setPage(1);
              setPageSize((prev) => (prev > 15 ? 15 : prev + 1));
              send();
            }}
          />
        </div>
      ),
      key: 'app_notifications-3',
    },
  ];

  return (
    <Dropdown
      menu={{ items }}
      placement='bottom'
      className='dropdown'
      trigger={['click']}
      destroyPopupOnHide
      onOpenChange={(open) => {
        if (!open) return send();
      }}
      overlayClassName='notify-header-message'>
      <a
        className={'d-flex items-center w-full'}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}>
        <Tooltip title={'Thông báo'}>
          <Badge count={numNewNoti} offset={[0, 0]}>
            <span className='notify-icon'>
              <BellOutlined
                style={{
                  fontSize: 20,
                  color: isWorkspace ? '#FFFFFF' : '#000000',
                }}
              />
            </span>
          </Badge>
        </Tooltip>
        <span className='notify-text'>
          <IntlMessages id='common.notifications' />
        </span>
      </a>
    </Dropdown>
  );
};

export default AppNotifications;
