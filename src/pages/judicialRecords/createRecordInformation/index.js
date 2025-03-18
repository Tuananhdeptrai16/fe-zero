import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import { FILTER_OPERATION } from 'src/shared/constants/DataTable';

import AppTabs from 'src/@crema/core/AppTabs/AppTabs';
import API from 'src/@crema/services/apis';
import { useLocation, useNavigate } from 'react-router-dom';
import { Badge } from 'antd';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import TableJudicialRecord from 'src/pages/judicialRecords/createRecordInformation/components/TableJudicialRecord';
import { KEY_STATUS_CREATE_JUDICIAL_RECORD as KEY } from 'src/pages/judicialRecords/createRecordInformation/utils';

const CreateRecordInformation = () => {
  const navigate = useNavigate();

  const { search } = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(search), [search]);
  const activeKey = useMemo(
    () => searchParams.get('status') || KEY.IM_COMPLETED,
    [searchParams],
  );

  const { messages } = useIntl();

  // body request
  const renderInitFilter = (key) => {
    if (key === KEY.MINISTRY) {
      return {
        filters: [
          {
            name: 'status_synchronize',
            operation: FILTER_OPERATION.IS_NULL,
            value: false,
          },
        ],
      };
    }
    if (key === KEY.VERIFIED) {
      return {
        filters: [
          {
            name: 'status',
            operation: FILTER_OPERATION.IN,
            value: [KEY.VERIFIED, KEY.APPROVED],
          },
          {
            name: 'status_synchronize',
            operation: FILTER_OPERATION.IS_NULL,
            value: true,
          },
        ],
      };
    }
    if (key === KEY.WAITING) {
      return {
        filters: [
          {
            name: 'status',
            operation: FILTER_OPERATION.EQ,
            value: KEY.WAITING,
          },
          {
            name: 'status_synchronize',
            operation: FILTER_OPERATION.IS_NULL,
            value: true,
          },
        ],
      };
    }
    if (key === KEY.IM_COMPLETED) {
      return {
        filters: [
          {
            name: 'status',
            operation: FILTER_OPERATION.EQ,
            value: KEY.IM_COMPLETED,
          },
          {
            name: 'status_synchronize',
            operation: FILTER_OPERATION.IS_NULL,
            value: true,
          },
        ],
      };
    }
  };

  const { data: dataCountRes, fetchData: refetchCount } = useFetch({
    url: API.COUNT_JUDICIAL_RECORD,
    method: METHOD_FETCH.POST,
    body: {
      group_by: [
        renderInitFilter(KEY.VERIFIED),
        renderInitFilter(KEY.WAITING),
        renderInitFilter(KEY.IM_COMPLETED),
        renderInitFilter(KEY.MINISTRY),
      ],
    },
  });

  const dataCount = dataCountRes?.result?.total || [];

  const tabList = [
    {
      key: KEY.IM_COMPLETED,
      label: (
        <Badge
          overflowCount={999}
          status={activeKey === KEY.IM_COMPLETED ? 'active' : 'default'}
          className='pr-5'
          count={dataCount?.[2] || 0}>
          Chưa hoàn thành
        </Badge>
      ),
      children: (
        <TableJudicialRecord
          activeKey={KEY.IM_COMPLETED}
          initTable={renderInitFilter(KEY.IM_COMPLETED)}
          refetchCount={refetchCount}
        />
      ),
    },

    {
      key: KEY.WAITING,
      label: (
        <Badge
          status={activeKey === KEY.WAITING ? 'active' : 'default'}
          className='pr-5'
          count={dataCount?.[1] || 0}>
          Chờ xác thực
        </Badge>
      ),
      children: (
        <TableJudicialRecord
          activeKey={KEY.WAITING}
          initTable={renderInitFilter(KEY.WAITING)}
          refetchCount={refetchCount}
        />
      ),
    },

    // da xac thuc
    {
      key: KEY.VERIFIED,
      label: (
        <Badge
          status={activeKey === KEY.VERIFIED ? 'active' : 'default'}
          className='pr-5'
          count={dataCount?.[0] || 0}>
          Đã xác thực
        </Badge>
      ),
      children: (
        <TableJudicialRecord
          activeKey={KEY.VERIFIED}
          initTable={renderInitFilter(KEY.VERIFIED)}
          refetchCount={refetchCount}
        />
      ),
    },

    {
      key: KEY.MINISTRY,
      label: (
        <Badge
          status={activeKey === KEY.MINISTRY ? 'active' : 'default'}
          className='pr-5'
          count={dataCount?.[3] || 0}>
          Tải lên bộ
        </Badge>
      ),
      children: (
        <TableJudicialRecord
          activeKey={KEY.MINISTRY}
          initTable={renderInitFilter(KEY.MINISTRY)}
          refetchCount={refetchCount}
        />
      ),
    },
  ];

  const onChangeTab = (key) => {
    navigate({ search: `?status=${key}` });
    refetchCount();
  };

  return (
    <div>
      <AppPageMetadata title={messages['sidebar.judicial_record.create']}>
        {/*<AppCard className='ant-tab-table'>*/}
        <AppTabs
          className={'tab-sticky-header'}
          activeKey={activeKey}
          onChange={(key) => onChangeTab(key)}
          items={tabList}
          destroyInactiveTabPane
        />
        {/*</AppCard>*/}
      </AppPageMetadata>
    </div>
  );
};

export default CreateRecordInformation;
