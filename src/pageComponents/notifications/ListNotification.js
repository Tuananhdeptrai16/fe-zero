import React, { useState } from 'react';
import { List, Skeleton } from 'antd';
import { NotificationItem } from 'src/pageComponents/notifications/NotificationItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import useCallApi from 'src/@crema/hook/useCallApi';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import API from 'src/@crema/services/apis';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import { FILTER_OPERATION } from 'src/shared/constants/DataTable';
import useEffectDepth from 'src/@crema/hook/useEffectDepth';

export const ListNotification = ({
  typeNoti,
  page,
  setPage,
  pageSize,
  hideShareIcon,
}) => {
  const [totalRows, setTotalRows] = useState(0);
  const [listNoti, setListNoti] = useState([]);
  const { loading: isLoading, send } = useCallApi({
    success: (data, params) => {
      const newData = data?.result?.items;
      setTotalRows(data?.result?.total);
      if (params?.page === 1) {
        setListNoti(newData);
        return;
      }
      setListNoti([...listNoti, ...newData]);
    },
    error: (err) => console.debug('error_get_noti', err),
    callApi: () => {
      return instanceCoreApi({
        url: API.SEARCH_NOTIFICATION,
        method: METHOD_FETCH.POST,
        data: {
          filters: typeNoti
            ? [
                {
                  name: 'type',
                  operator: FILTER_OPERATION.EQ,
                  value: typeNoti,
                },
              ]
            : [],
          pageable: {
            page: page,
            page_size: pageSize,
            sort: [{ property: 'created_at', direction: 'desc' }],
          },
        },
      });
    },
  });

  const loadMore = () => {
    if (!isLoading) {
      setPage((oldPage) => {
        return oldPage + 1;
      });
    }
  };

  useEffectDepth(() => {
    send({ page, typeNoti, pageSize });
  }, [pageSize, page, typeNoti]);

  return (
    <div>
      <InfiniteScroll
        dataLength={listNoti?.length}
        next={loadMore}
        hasMore={listNoti.length < totalRows}
        loader={
          isLoading && (
            <Skeleton
              className={'itemNotify'}
              avatar
              paragraph={{ rows: 1 }}
              active
            />
          )
        }>
        {isLoading &&
          page === 1 &&
          [...new Array(10)].map((_, index) => (
            <Skeleton
              style={{ padding: '10px 24px' }}
              key={index}
              loading={isLoading}
              active
              avatar
              title={false}
            />
          ))}
        {(!isLoading || page !== 1) && (
          <List
            onClick={(e) => e.stopPropagation()}
            dataSource={listNoti}
            renderItem={(item) => (
              <NotificationItem
                key={item?.id}
                item={item}
                hideShareIcon={hideShareIcon}
              />
            )}
          />
        )}
      </InfiniteScroll>
    </div>
  );
};
