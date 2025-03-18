import React, { useMemo, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Dropdown, Empty } from 'antd';

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

export const AppSearch = ({ isWorkspace, ...rest }) => {
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
      ...item,
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
    <div
      className='search-input-header'
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '5px',
        paddingRight: '10px',
      }}>
      <Dropdown
        menu={{ items: menuUserShow }}
        trigger={['click']}
        overlayClassName='dropdown-br-0'
        dropdownRender={(menu) => {
          return (
            <div
              style={{
                maxHeight: 300,
                overflowY: 'auto',
                backgroundColor: '#fff',
                boxShadow:
                  '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
              }}>
              {isEmpty(menuUserShow) && (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={'Không tìm thấy tính năng phù hợp'}
                />
              )}
              {!isEmpty(menuUserShow) && menu}
            </div>
          );
        }}>
        <AntInput
          prefix={
            <SearchOutlined
              style={{
                marginRight: 4,
                color: isWorkspace ? '#FFFFFF' : 'rgb(207 201 201)',
              }}
              onClick={() => {}}
              {...rest}
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
            width: 200,
          }}
          className={isWorkspace ? 'input_placeHolder_workspace' : ''}
          value={searchText}
          onChange={onChange}
        />
      </Dropdown>
    </div>
  );
};
