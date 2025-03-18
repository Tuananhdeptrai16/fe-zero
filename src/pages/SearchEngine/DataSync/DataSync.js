import React, { useState } from 'react';
import useIntl from 'react-intl/lib/src/components/useIntl';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import style from './DataSync.module.scss';
import clsx from 'clsx';
import { Divider, Skeleton, Tabs, Tag, Tooltip } from 'antd';
import Sync from './ComponentsDataSync/Sync';
import ManageDataSyncProcess from './ComponentsDataSync/ManageDataSyncProcess';
import AntButton from 'src/@crema/component/AntButton';
import {
  ExperimentOutlined,
  PlusOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import routes from 'src/config/routes.config';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import API from 'src/@crema/services/apis';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
// import PropTypes from 'prop-types';
// DataSync.propTypes = {};

function DataSync() {
  const { messages } = useIntl();
  const { id: idIndex } = useParams();
  const [keyTab, setKeyTab] = useState('1');
  const navigate = useNavigate();

  // details index
  const { data, isLoading } = useFetch(
    {
      method: METHOD_FETCH.GET,
      url: API.DETAIL_INDEX(idIndex),
    },
    [idIndex],
  );
  const dataDetailIndex = data?.result || {};
  const onChange = (valueTab) => {
    setKeyTab(valueTab);
  };

  // return jsx
  return (
    <div className={clsx(style.wrapSyncData)}>
      <AppPageMetadata title={messages['sidebar.sync_search_engine']} />
      {isLoading ? (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      ) : (
        <>
          {dataDetailIndex?.source_response?.source_name && (
            <h4 className={clsx(style.name_source)}>
              {dataDetailIndex?.source_response?.source_name}
            </h4>
          )}

          <div className={clsx(style.wrapHeader)}>
            <div className={clsx(style.SyncData_header)}>
              <h4 className={clsx(style.sync_data_header_title)}>
                {messages['sidebar.sync_data_index']}
              </h4>
              <div className={clsx(style.wrapActions)}>
                <AntButton
                  icon={<PlusOutlined />}
                  type='primary'
                  onClick={() => {
                    navigate(routes.search_engine_index_add);
                  }}>
                  {messages['common.addNewSearchIndex']}
                </AntButton>
                <AntButton
                  icon={<SettingOutlined />}
                  type='primary'
                  onClick={() => {
                    navigate(routes.config_index(idIndex));
                  }}>
                  {messages['sidebar.config_index_search']}
                </AntButton>
                <AntButton
                  icon={<ExperimentOutlined />}
                  type='primary'
                  onClick={() => {
                    navigate(routes.test_search_index(idIndex));
                  }}>
                  {messages['common.experiment']}
                </AntButton>
              </div>
            </div>
            <div className={clsx(style.wrapHeader_index_name)}>
              <h4 className={clsx(style.label)}>
                {messages['sidebar.search_engine_index_name']}:
              </h4>
              {dataDetailIndex?.index_name?.length > 160 ? (
                <Tooltip title={dataDetailIndex?.index_name}>
                  <Tag className={clsx(style.tag)} color='cyan'>
                    {dataDetailIndex?.index_name.slice(0, 160)}...
                  </Tag>
                </Tooltip>
              ) : (
                <>
                  <Tag className={clsx(style.tag)} color='cyan'>
                    {dataDetailIndex?.index_name}
                  </Tag>
                </>
              )}
            </div>
          </div>
          <Divider className={clsx(style.divider_header)} />
          <Tabs
            defaultActiveKey='1'
            activeKey={keyTab}
            tabPosition='left'
            onChange={onChange}
            items={[
              {
                label: messages['sidebar.sync_data_index'],
                key: '1',
                children: (
                  <Sync keyTab={keyTab} dataDetailIndex={dataDetailIndex} />
                ),
              },
              {
                label: messages['sidebar.manage_data_synchronization_process'],
                key: '2',
                children: (
                  <ManageDataSyncProcess
                    keyTab={keyTab}
                    dataDetailIndex={dataDetailIndex}
                  />
                ),
              },
            ]}
          />
        </>
      )}
    </div>
  );
}

export default DataSync;
