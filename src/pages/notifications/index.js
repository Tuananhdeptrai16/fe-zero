import React, { useState } from 'react';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import { useIntl } from 'react-intl';
import SubHeaderApp from 'src/@crema/component/SubHeaderApp';
import SubHeaderAppTemplate from 'src/@crema/component/SubHeaderApp/SubHeaderAppTemplate';
import AppTabs from 'src/@crema/core/AppTabs/AppTabs';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import { ListNotification } from 'src/pageComponents/notifications/ListNotification';
import AppCard from 'src/@crema/core/AppCard';
import { NOTI_TYPE } from 'src/shared/constants/notification.constant';
import { NotificationOption } from 'src/pageComponents/notifications/NotificationOption';

const NotificationPage = () => {
  const { messages } = useIntl();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  const tabItems = [
    {
      label: messages['common.all'],
      key: NOTI_TYPE.ALL,
      children: (
        <ListNotification
          page={page}
          setPage={setPage}
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
        />
      ),
    },
  ];

  return (
    <div>
      <AppPageMetadata title={messages['common.notification']} />
      <SubHeaderApp>
        <SubHeaderAppTemplate
          title={messages['common.notification']}
          isShowGoBack
        />
      </SubHeaderApp>
      <AppCard bodyStyle={{ padding: 0 }}>
        <AppTabs
          onChange={() => setPage(1)}
          destroyInactiveTabPane
          items={tabItems}
          tabBarStyle={{ paddingLeft: 24, paddingRight: 8, margin: 0 }}
          tabBarExtraContent={
            <NotificationOption
              onReadAllSuccess={() => {
                setPage(1);
                setPageSize((prev) => (prev > 15 ? 15 : prev + 1));
              }}
            />
          }
        />
      </AppCard>
    </div>
  );
};

export default NotificationPage;
