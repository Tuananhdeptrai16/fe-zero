import React, { useMemo } from 'react';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import { useLocation, useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { FILTER_OPERATION } from 'src/shared/constants/DataTable';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import { TableActionLog } from 'src/pageComponents/systemLog/TableActionLog';
import AppTabs from 'src/@crema/core/AppTabs/AppTabs';
import SettingLogPage from 'src/pages/systemLog/settings';

const TAB_TYPE = {
  ACCESS_HISTORY: 'access_history',
  AUTH_HISTORY: 'auth_history',
  SETTING: 'setting',
};
const UserActionLogPage = () => {
  const navigate = useNavigate();
  const { messages } = useIntl();
  const { search } = useLocation();

  const searchParams = useMemo(() => new URLSearchParams(search), [search]);
  const activeKey = useMemo(
    () => searchParams.get('t') || TAB_TYPE.AUTH_HISTORY,
    [searchParams],
  );

  const renderInitFilter = (key) => {
    if (key === TAB_TYPE.AUTH_HISTORY) {
      return {
        filters: [
          {
            name: 'code',
            operation: FILTER_OPERATION.IN,
            value: ['login', 'logout'],
          },
        ],
      };
    }
    return {
      filters: [
        {
          name: 'code',
          operation: FILTER_OPERATION.NIN,
          value: ['login', 'logout'],
        },
      ],
    };
  };

  const tabList = [
    {
      key: TAB_TYPE.AUTH_HISTORY,
      label: <IntlMessages id={'systemLog.authHistory'} />,
      children: (
        <TableActionLog initTable={renderInitFilter(TAB_TYPE.AUTH_HISTORY)} />
      ),
    },
    {
      key: TAB_TYPE.ACCESS_HISTORY,
      label: <IntlMessages id={'systemLog.accessHistory'} />,
      children: (
        <TableActionLog initTable={renderInitFilter(TAB_TYPE.ACCESS_HISTORY)} />
      ),
    },
    {
      key: TAB_TYPE.SETTING,
      label: <IntlMessages id={'sidebar.setting_log'} />,
      children: <SettingLogPage />,
    },
  ];

  const onChangeTab = (key) => {
    navigate({ search: `?t=${key}` });
  };

  return (
    <>
      <AppPageMetadata title={messages['sidebar.user_action_log']}>
        <AppTabs
          className={'tab-sticky-header'}
          renderTabBar={(props, TabBar) => <TabBar {...props} />}
          activeKey={activeKey}
          onChange={onChangeTab}
          items={tabList}
          destroyInactiveTabPane
        />
      </AppPageMetadata>
    </>
  );
};

export default UserActionLogPage;
