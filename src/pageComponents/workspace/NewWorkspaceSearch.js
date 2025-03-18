import React, { useMemo, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Dropdown, Empty, Space } from 'antd';
import './style.css';
import AntInput from 'src/@crema/component/AntInput';
import { useIntl } from 'react-intl';
import { useAuthUser } from 'src/@crema/utility/AuthHooks';
import {
  addMessageToRoutes,
  checkPermissionRoute,
  routesFlattenConfig,
} from 'src/@crema/utility/VerticalMenuUtils';
import { isEmpty } from 'src/shared/utils/Typeof';
import Link from 'src/@crema/component/Link';
import { matchText } from 'src/shared/utils/String';
import HighlightText from 'src/@crema/core/HighlightText';
import AppScrollbar from 'src/@crema/core/AppScrollbar';

export const NewWorkspaceSearch = () => {
  const { messages } = useIntl();
  const [searchText, setSearchText] = useState('');
  const { user } = useAuthUser();

  const userPermissions = user?.permissions;

  const menuUser = useMemo(() => {
    return addMessageToRoutes(
      routesFlattenConfig.filter((route) =>
        checkPermissionRoute(route, userPermissions),
      ),
      messages,
    )
      .map((item, index) => ({
        ...item,
        key: `${item?.id}-${index}`,
      }))
      .filter((item) => !isEmpty(item.text));
  }, [messages, userPermissions]);

  const menuUserShow = useMemo(() => {
    let itemsShow = menuUser || [];
    if (!isEmpty(searchText)) {
      itemsShow = (menuUser || []).filter((item) => {
        try {
          return matchText(item?.text, searchText);
        } catch (err) {
          console.log('filter', err);
          return false;
        }
      });
    }
    return itemsShow.map((item) => ({
      label: (
        <Link to={item?.path}>
          <HighlightText textToHighlight={item?.text} searchText={searchText} />
        </Link>
      ),
    }));
  }, [menuUser, searchText]);

  const onChange = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);
  };

  return (
    <Space>
      <Dropdown
        menu={{ items: menuUserShow }}
        trigger={['click']}
        overlayClassName='dropdown-br-0'
        dropdownRender={(menu) => {
          return (
            <div
              style={{
                position: 'relative',
                top: '-10px',
                maxHeight: 200,
                borderRadius: '4px',
                overflowY: 'auto',
                backgroundColor: '#fff',
                boxShadow:
                  '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
              }}>
              <AppScrollbar style={{ height: 200 }}>
                {isEmpty(menuUserShow) && (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={'Không tìm thấy tính năng phù hợp'}
                  />
                )}
                {!isEmpty(menuUserShow) && menu}
              </AppScrollbar>
            </div>
          );
        }}>
        <AntInput
          prefix={
            <SearchOutlined
              style={{
                marginRight: 4,
                color: 'rgb(207 201 201)',
              }}
              onClick={() => {}}
            />
          }
          onClick={(e) => {
            e.preventDefault();
          }}
          placeholder='Tìm kiếm tính năng ...'
          style={{
            border: 'none',
            outline: 'none',
            boxShadow: 'none',
            width: 600,
            height: 48,
            padding: '10px',
          }}
          value={searchText}
          onChange={onChange}
        />
      </Dropdown>
    </Space>
  );
};
