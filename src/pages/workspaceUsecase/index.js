import React, { useContext, useMemo, useState } from 'react';
import './index.style.less';
import { Divider, Empty, Space, Typography } from 'antd';
import { WorkspaceItem } from 'src/pageComponents/workspace/WorkspaceItem';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import { isEmpty } from 'src/shared/utils/Typeof';
import { useAuthUser } from 'src/@crema/utility/AuthHooks';
import { useIntl } from 'react-intl';
import { NewWorkspaceSearch } from 'src/pageComponents/workspace/NewWorkspaceSearch';
import PageHistoryContext from 'src/@crema/utility/PageHistoryProvider';
import { FeatureWorkspace } from 'src/shared/constants/FeatureWorkspace';
import {
  addMessageToRoutes,
  checkPermissionRoute,
  routesFlattenConfig,
} from 'src/@crema/utility/VerticalMenuUtils';

const WorkspacePage = () => {
  const { messages } = useIntl();
  const { user, isLoading } = useAuthUser();
  const { pageHistory } = useContext(PageHistoryContext);
  const userPermissions = user?.permissions;
  const counts = {};

  pageHistory.forEach((value) => {
    counts[value] = (counts[value] || 0) + 1;
  });

  const [openPopup, setOpenPopup] = useState(false);
  const allFeature = useMemo(() => {
    return addMessageToRoutes(
      FeatureWorkspace.map((item) => {
        item.children = (item.children || []).filter((route) =>
          checkPermissionRoute(route, userPermissions),
        );
        item.path = item.children?.[0]?.path;
        return item;
      }).filter((item) => !isEmpty(item.children)),
      messages,
    ).filter((item) => !isEmpty(item.text));
  }, [userPermissions, messages]);

  const groupPathHistory = useMemo(() => {
    return (pageHistory || []).reduce((prev, curr, index) => {
      const statics = prev?.[curr] || { count: 0, priority: index };
      statics.priority = index;
      statics.count += 1;
      return {
        ...prev,
        [curr]: statics,
      };
    }, {});
  }, [pageHistory]);

  const listMenuRecent = useMemo(() => {
    const menuFlatten = addMessageToRoutes(
      routesFlattenConfig.filter((route) =>
        checkPermissionRoute(route, userPermissions),
      ),
      messages,
    ).filter((item) => !isEmpty(item.text));

    return menuFlatten
      .map((item) => {
        const statics = groupPathHistory[item.path] || {
          count: 0,
          priority: 0,
        };

        return {
          ...item,
          count: statics.count,
          priority: statics.priority,
        };
      })
      .filter((item) => item.count > 0)
      .sort((a, b) => {
        if (b.count !== a.count) {
          return b.count - a.count;
        }

        return b.priority - a.priority;
      });
  }, [messages, userPermissions, groupPathHistory]);

  return (
    <div className={'workspaceContainer '} onClick={() => setOpenPopup(false)}>
      <AppPageMetadata title={'Bàn làm việc'} />
      <div className={'workspaceContent'}>
        <div className='d-flex flex-col justify-center items-center container_bg'>
          <h1 className={'greetingTitle'}>Xin chào, {user?.displayName}</h1>
          <div className={'workspaceSearch'}>
            <NewWorkspaceSearch
              openPopup={openPopup}
              setOpenPopup={setOpenPopup}
            />
          </div>
        </div>
        <div className='container-items'>
          <div className='container-items-content'>
            {!isEmpty(listMenuRecent) && (
              <>
                <h2 className={'workspaceTitle'}>Thường xuyên truy cập</h2>
                <Space size={40} className='d-flex w-full '>
                  {listMenuRecent?.slice(0, 4)?.map((item, index) => (
                    <div key={item?.id}>
                      <WorkspaceItem
                        item={item}
                        index={index}
                        isLoading={isLoading}
                      />
                    </div>
                  ))}
                </Space>
              </>
            )}
            {isEmpty(allFeature) && !isLoading && (
              <Empty
                description={
                  <Typography.Title level={5}>
                    Bạn không có tính năng khả dụng
                  </Typography.Title>
                }
              />
            )}
            {!isEmpty(allFeature) && !isLoading && (
              <>
                <Divider></Divider>
                <h2 className={'workspaceTitle'}>Tất cả ứng dụng</h2>
                <Space size={40} className='d-flex w-full flex-wrap'>
                  {allFeature?.map((item, index) => (
                    <div key={item?.id}>
                      <WorkspaceItem item={item} index={index} />
                    </div>
                  ))}
                </Space>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspacePage;
