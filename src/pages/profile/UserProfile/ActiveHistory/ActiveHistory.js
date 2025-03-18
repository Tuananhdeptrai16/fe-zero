import React, { memo, useState } from 'react';
import clsx from 'clsx';
import style from './ActiveHistory.module.scss';
import { List, Avatar, Empty, Skeleton } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useAuthUser } from 'src/@crema/utility/AuthHooks';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import API from 'src/@crema/services/apis';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import { Link } from 'react-router-dom';
import { isEmpty } from 'src/shared/utils/Typeof';
import { showNestTimeStr } from 'src/shared/utils/filter';
import AntAvatar from 'src/@crema/component/AntAvatar/AntAvatar';

function ActiveHistory() {
  const { user } = useAuthUser();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data, isLoading } = useFetch(
    {
      url: API.SEARCH_USER_ACTION_LOG,
      method: METHOD_FETCH.POST,
      body: {
        filters: [{ name: 'user_id', value: user?.id, operation: 'eq' }],
        pageable: {
          page: page,
          page_size: pageSize,
          sort: [{ property: 'start_time', direction: 'desc' }],
        },
      },
    },
    [user?.id, pageSize, page],
  );
  const listActionHistory = data?.result?.items || [];
  const total = data?.result?.total || 0;
  const isLoadingInit = isEmpty(listActionHistory) && isLoading;

  const dataActiveHistory = data?.result?.items
    ? data?.result?.items?.map((item) => {
        let content = null;
        switch (item?.code) {
          case 'login':
            content = (
              <p className={clsx(style.listHistory_meta_content_text)}>
                Đăng nhập hệ thống
              </p>
            );
            break;
          case 'logout':
            content = (
              <p className={clsx(style.listHistory_meta_content_text)}>
                Đăng xuất hệ thống
              </p>
            );
            break;
          case 'create_document':
            content = (
              <>
                <p className={clsx(style.listHistory_meta_content_text)}>
                  Đã tải lên văn bản
                </p>
                <Link
                  to={item.linkArticle}
                  className={clsx(style.listHistory_meta_content_link)}>
                  sss
                </Link>
              </>
            );
            break;
          default:
        }

        return {
          content,
          datePost: showNestTimeStr(item?.start_time),
          imgUser: item?.user_info_response?.avatar_url ?? '',
        };
      })
    : [];

  return (
    <div className={clsx(style.wrapActiveHistory)}>
      {!isLoadingInit ? (
        dataActiveHistory.length > 0 ? (
          <List
            loading={isLoading}
            className={clsx(style.listHistory)}
            header={
              <p className={clsx(style.activeHistory_header)}>Hoạt động</p>
            }
            bordered={false}
            dataSource={dataActiveHistory}
            pagination={{
              onChange: (pageNew, pageSizeNew) => {
                if (pageSizeNew !== pageSize) {
                  setPage(1);
                  setPageSize(pageSizeNew);
                } else {
                  setPage(pageNew);
                }
              },
              total: total,
              showTotal: (total, range) =>
                `${range[0]} -${range[1]} của ${total} bản ghi`,
              defaultCurrent: page,
              current: page,
              showLessItems: true,
              pageSize: pageSize,
              pageSizeOptions: [5, 10, 20, 50, 100],
            }}
            renderItem={(item) => (
              <List.Item className={clsx(style.listHistory_item)}>
                <List.Item.Meta
                  className={clsx(style.listHistory_meta)}
                  avatar={
                    <AntAvatar
                      icon={item.imgUser ? null : <UserOutlined />}
                      src={item.imgUser}
                      alt='img-user'
                      className={clsx(style.listHistory_meta_avatar)}
                    />
                  }
                  title={
                    <div className={clsx(style.listHistory_meta_content)}>
                      {item?.content}
                    </div>
                  }
                  description={
                    <p className={clsx(style.listHistory_meta_des)}>
                      {item.datePost}
                    </p>
                  }
                />
              </List.Item>
            )}
          />
        ) : (
          <Empty
            className={clsx(style.wrapNotDataHistory)}
            description='Người dùng chưa có lịch sử hoạt động !'
          />
        )
      ) : (
        <List
          itemLayout='vertical'
          dataSource={[1, 2, 3]}
          renderItem={(item) => (
            <List.Item key={item}>
              <Skeleton loading={true} active avatar>
                <List.Item.Meta
                  avatar={<Avatar src={''} />}
                  title={''}
                  description={''}
                />
              </Skeleton>
            </List.Item>
          )}
        />
      )}
    </div>
  );
}

export default memo(ActiveHistory);
