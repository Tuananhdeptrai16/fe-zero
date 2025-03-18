import React, { memo, useEffect } from 'react';
import useIntl from 'react-intl/lib/src/components/useIntl';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import style from './ConfigIndex.module.scss';
import clsx from 'clsx';
import { Skeleton, Tabs, Tag, Divider } from 'antd';
import PageConfig from './PageConfig/PageConfig';
import {
  CloudSyncOutlined,
  ExperimentOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import PageHelp from './PageHelp';
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import API from 'src/@crema/services/apis';
import { useDispatch } from 'react-redux';
import { CONFIG_INDEX } from 'src/shared/constants/ActionTypes';
import AntButton from 'src/@crema/component/AntButton';
import routes from 'src/config/routes.config';

function ConfigIndex() {
  const { messages } = useIntl();
  const { id: idIndex } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, isLoading } = useFetch(
    {
      method: METHOD_FETCH.GET,
      url: API.DETAIL_INDEX(idIndex),
    },
    [idIndex],
  );
  const dataResponseIndex = data?.result || {};
  useEffect(() => {
    dispatch({ type: CONFIG_INDEX, payload: dataResponseIndex });
  }, [dataResponseIndex]);

  return (
    <div className={clsx(style.wrapConfig_index)}>
      <AppPageMetadata title={messages['sidebar.config_index_search']} />

      {isLoading ? (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      ) : (
        <>
          {dataResponseIndex?.source_response?.source_name && (
            <h4 className={clsx(style.config_index_nameSource)}>
              {dataResponseIndex?.source_response?.source_name}
            </h4>
          )}

          <div className={clsx(style.config_index_header)}>
            <h3 className={clsx(style.config_index_title)}>
              {messages['sidebar.config_index_search']}
            </h3>
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
                icon={<CloudSyncOutlined />}
                type='primary'
                onClick={() => {
                  navigate(routes.sync_data_search_engine(idIndex));
                }}>
                {messages['sidebar.sync_data_index']}
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
          <Divider className={clsx(style.divider_header)} />
          <div className={clsx(style.wrapName_index)}>
            <h4 className={clsx(style.text)}>Tên chỉ mục tìm kiếm:</h4>
            <Tag className={clsx(style.tag)} color='cyan'>
              {dataResponseIndex?.index_name}
            </Tag>
          </div>
          <div className={clsx(style.content_config_index)}>
            <Tabs
              defaultActiveKey='1'
              items={[
                {
                  label: (
                    <>
                      <SettingOutlined
                        style={{
                          marginRight: '6px',
                        }}
                      />
                      <span>Cấu hình</span>
                    </>
                  ),
                  key: '1',
                  children: (
                    <PageConfig dataResponseIndex={dataResponseIndex} />
                  ),
                },
                {
                  label: (
                    <>
                      <QuestionCircleOutlined
                        style={{
                          marginRight: '6px',
                        }}
                      />
                      <span>Trợ giúp</span>
                    </>
                  ),
                  key: '2',
                  children: <PageHelp />,
                },
              ]}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default memo(ConfigIndex);
