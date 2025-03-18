import {
  CalendarOutlined,
  CloudSyncOutlined,
  OrderedListOutlined,
} from '@ant-design/icons';
import { Tabs } from 'antd';
import React, { useState } from 'react';
import SyncNow from '../SyncNow';
import SchedulingSync from '../SchedulingSync';
import useIntl from 'react-intl/lib/src/components/useIntl';
import SchedulingList from '../SchedulingList';
import PropTypes from 'prop-types';

Sync.propTypes = {
  dataDetailIndex: PropTypes.object,
  keyTab: PropTypes.string,
};

function Sync({ dataDetailIndex, keyTab }) {
  const { messages } = useIntl();
  const [activeTab, setActiveTab] = useState('1');
  const handleChangeTap = (value) => {
    setActiveTab(value);
  };
  return (
    <div>
      <h4>{messages['sidebar.sync_data_index']}</h4>
      <Tabs
        defaultActiveKey='1'
        activeKey={activeTab}
        onChange={handleChangeTap}
        items={[
          {
            label: (
              <>
                <CloudSyncOutlined
                  style={{
                    marginRight: '6px',
                  }}
                />
                <span>{messages['common.syncNow']}</span>
              </>
            ),
            key: '1',
            children: (
              <SyncNow
                keyTab={keyTab}
                activeTab={activeTab}
                dataDetailIndex={dataDetailIndex}
              />
            ),
          },
          {
            label: (
              <>
                <CalendarOutlined
                  style={{
                    marginRight: '6px',
                  }}
                />
                <span>{messages['common.schedule']}</span>
              </>
            ),
            key: '2',
            children: (
              <SchedulingSync
                keyTab={keyTab}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            ),
          },
          {
            label: (
              <>
                <OrderedListOutlined
                  style={{
                    marginRight: '6px',
                  }}
                />
                <span>{messages['common.schedule_list']}</span>
              </>
            ),
            key: '3',
            children: (
              <SchedulingList
                keyTab={keyTab}
                dataDetailIndex={dataDetailIndex}
                activeTab={activeTab}
              />
            ),
          },
        ]}
      />
    </div>
  );
}

export default Sync;
