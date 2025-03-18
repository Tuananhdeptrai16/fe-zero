import React, { memo, useEffect } from 'react';
import { useIntl } from 'react-intl';
import AntButton from 'src/@crema/component/AntButton/index';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata/index';
import DataTable from 'src/@crema/core/DataTable';
import { ITEM_PERMISSIONS } from 'src/shared/constants/Permission';
import {
  ExperimentOutlined,
  PlusOutlined,
  SettingOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import API from 'src/@crema/services/apis/index';
import { RenderDate } from 'src/@crema/component/TableRender';
import {
  // FILTER_OPERATION,
  KEY_ACTION_COLUMN,
} from 'src/shared/constants/DataTable';
import { useNavigate } from 'react-router-dom';
import routes from 'src/config/routes.config';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  CLEAR_ADD_INDEX,
  SOURCE_ENGINE_ACTIVE,
} from 'src/shared/constants/ActionTypes';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import { Spin } from 'antd';

SearchEngine.propTypes = {
  idOrganization: PropTypes.number.isRequired,
};
function SearchEngine({ idOrganization }) {
  const { messages } = useIntl();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: SOURCE_ENGINE_ACTIVE, payload: idOrganization });
  }, [idOrganization]);

  useEffect(() => {
    dispatch({ type: CLEAR_ADD_INDEX });
  });

  const { data: dataDetailOrganization, isLoading } = useFetch(
    {
      method: METHOD_FETCH.POST,
      url: API.SEARCH_ORGANIZATION,
      body: {
        filters: [{ name: 'id', operation: 'eq', value: idOrganization }],
        pageable: {
          page: 1,
          page_size: 100,
        },
      },
    },
    [idOrganization],
  );

  const columns = [
    {
      title: <IntlMessages id='sidebar.search_engine_index_name' />,
      dataIndex: 'index_name',
      width: 300,
      fixed: 'left',
      key: 'index_name',
      sorter: true,
    },
    {
      title: <IntlMessages id='sidebar.names_of_departments' />,
      dataIndex: 'source',
      width: 316,
      fixed: 'left',
      key: 'source',
      render: () => {
        if (isLoading) {
          return <Spin></Spin>;
        } else {
          return (
            <span>{dataDetailOrganization?.result?.items[0].display_name}</span>
          );
        }
      },
    },
    {
      title: <IntlMessages id='sidebar.search_engine_edit_date' />,
      dataIndex: 'updated_at',
      width: 300,
      key: 'updated_at',
      render: (data) => {
        return <span>{RenderDate({ value: data })}</span>;
      },
    },
    {
      title: <IntlMessages id='sidebar.search_engine_create_date' />,
      dataIndex: 'created_at',
      width: 300,
      key: 'created_at',
      render: (data) => {
        return <span>{RenderDate({ value: data })}</span>;
      },
    },
    {
      key: KEY_ACTION_COLUMN,
      actions: [
        {
          label: 'sidebar.config_index',
          // actionName: ITEM_PERMISSIONS.SETTING,
          icon: (
            <SettingOutlined
              style={{
                color: '#111827',
              }}
            />
          ),
          onClick: (data) => {
            navigate(routes.config_index(data?.id));
          },
        },
        {
          label: 'sidebar.sync_data_index',
          // actionName: ITEM_PERMISSIONS.SYNC,
          icon: (
            <SyncOutlined
              style={{
                color: '#111827',
              }}
            />
          ),
          onClick: (data) => {
            navigate(routes.sync_data_search_engine(data?.id));
          },
        },
        {
          label: 'sidebar.test_data_index',
          // actionName: ITEM_PERMISSIONS.SYNC,
          icon: (
            <ExperimentOutlined
              style={{
                color: '#111827',
              }}
            />
          ),
          onClick: (data) => {
            navigate(routes.test_search_index(data?.id));
          },
        },
      ],
    },
  ];

  return (
    <div>
      <AppPageMetadata title={messages['sidebar.search_engine_index_list']} />
      <DataTable
        isShowSearch
        initTable={{
          filters: [],
          page: 1,
          pageSize: 10,
        }}
        toolbars={[
          <AntButton
            key={ITEM_PERMISSIONS.ADD}
            type='primary'
            icon={<PlusOutlined />}
            onClick={() => {
              navigate(`${routes.search_engine_index_add}?q=${idOrganization}`);
            }}>
            {messages['sidebar.search_engine_index_add_search']}
          </AntButton>,
        ]}
        url={API.SEARCH_LIST_INDEX_ALL_BY_ORGANIZATION(idOrganization)}
        columns={columns}></DataTable>
    </div>
  );
}

export default memo(SearchEngine);
