import React, { useEffect, useRef, useState } from 'react';
import style from './SystemMonitoringReport.module.scss';
import clsx from 'clsx';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import useIntl from 'react-intl/lib/src/components/useIntl';
import AppTabs from 'src/@crema/core/AppTabs/AppTabs';
// import useSubscribeMessageEvent from 'src/hooks/useSubcribeMessageEvent';
import {
  LISTENER_MESSAGE_EVENT,
  // POST_MESSAGE_EVENT,
  // LISTENER_MESSAGE_EVENT,
  // POST_MESSAGE_EVENT,
} from 'src/shared/constants/DataFixed';
import { postMessageIframe } from 'src/shared/utils/window';

function SystemMonitoringReport() {
  const { messages } = useIntl();
  const [activeKey, setActiveKey] = useState('1');
  const refIframe = useRef();

  const onChangeTab = (key) => {
    setActiveKey(key);
  };

  const tabList = [
    {
      key: '1',
      label: 'Tổng quan ứng dụng',
      children: (
        <iframe
          src='https://pdp-grafana.mhdigital.vn/d/W5KDrdKnz12/tong-quan-ung-dung?orgId=1&refresh=10s&theme=light'
          width='100%'
          id='iframe_grafana'
          ref={refIframe}
          height={`${window.innerHeight - 120}px`}
          className={clsx(style.wrapIframe)}
          title='Tổng quan ứng dụng'></iframe>
      ),
    },
    {
      key: '4',
      label: 'Cổng truy xuất hệ thống',
      children: (
        <iframe
          src='https://pdp-grafana.mhdigital.vn/d/n5bu_kv4515/cong-truy-xuat-he-thong?orgId=1&refresh=10s&theme=light'
          width='100%'
          ref={refIframe}
          height={`${window.innerHeight - 120}px`}
          className={clsx(style.wrapIframe)}
          title='Cổng truy xuất hệ thống'></iframe>
      ),
    },
  ];

  // post message
  useEffect(() => {
    if (refIframe.current) {
      const payload = {
        event: LISTENER_MESSAGE_EVENT.ADD_STYLE,
        payload: {
          content: `body { background-color: red !important; }`,
        },
      };
      const optionsPostMessage = {
        target: refIframe.current,
      };
      postMessageIframe(payload, optionsPostMessage);
    }
  }, [activeKey]);

  return (
    <div className={clsx(style.wrapSystemMonitoringReport)}>
      <AppPageMetadata title={messages['sidebar.reporting_system']}>
        <AppTabs
          className={'tab-sticky-header'}
          activeKey={activeKey}
          onChange={(key) => onChangeTab(key)}
          items={tabList}
          destroyInactiveTabPane
        />
      </AppPageMetadata>
    </div>
  );
}

export default SystemMonitoringReport;
