import React from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { Dropdown, Space } from 'antd';
import { FaChevronDown } from 'react-icons/fa';
import './index.style.less';
import { useThemeContext } from '../../../../utility/AppContextProvider/ThemeContextProvider';
import { useAuthUser } from '../../../../utility/AuthHooks';
import { useSidebarContext } from '../../../../utility/AppContextProvider/SidebarContextProvider';
import PropTypes from 'prop-types';
import RenderNameUser from 'src/@crema/component/TableRender/RenderNameUser';
import { useAuthSSOContext } from 'src/@crema/utility/AuthSSOContext';
import AntAvatar from 'src/@crema/component/AntAvatar/AntAvatar';

const UserInfo = ({ hasColor }) => {
  const { themeMode } = useThemeContext();

  const { signOut } = useAuthSSOContext();
  const { user = {} } = useAuthUser();
  const navigate = useNavigate();
  const { sidebarColorSet } = useSidebarContext();
  const { isSidebarBgImage } = useSidebarContext();
  const getUserAvatar = () => {
    if (user?.displayName) {
      return user?.displayName
        .split(' ')
        ?.map((name) => name?.[0])
        ?.join('')
        .toUpperCase();
    }
    if (user?.email) {
      return user?.email.charAt(0).toUpperCase();
    }
  };

  // const menu = (
  //   <Menu className='dropdown-list'>
  //     <Menu.Item className='cr-user-mini-toggle-balance-dropdown-list'>
  //       <h3 className='cr-user-mini-toggle-name '>
  //         Balance:{' '}
  //         <span className='cr-user-mini-toggle-balance-amount'>
  //           226.688 USD
  //         </span>
  //       </h3>
  //     </Menu.Item>
  //     <Menu.Item onClick={() => navigate('/my-profile')}>My Profile</Menu.Item>
  //     <Menu.Item onClick={() => logout()}>Logout</Menu.Item>
  //   </Menu>
  // );

  const items = [
    // {
    //   label: (
    //     <div className='cr-user-mini-toggle-balance-dropdown-list'>
    //       <h3 className='cr-user-mini-toggle-name '>
    //         Balance:{' '}
    //         <span className='cr-user-mini-toggle-balance-amount'>
    //           226.688 USD
    //         </span>
    //       </h3>
    //     </div>
    //   ),
    //   key: 'user_info-1',
    // },
    {
      label: (
        <div onClick={() => navigate('/my-profile')}>Thông tin cá nhân</div>
      ),
      key: 'user_info-2',
    },
    {
      label: <div onClick={() => signOut()}>Đăng xuất</div>,
      key: 'user_info-3',
    },
  ];
  return (
    <>
      {hasColor ? (
        <div
          style={{
            backgroundColor: isSidebarBgImage
              ? ''
              : sidebarColorSet.sidebarHeaderColor,
            color: sidebarColorSet.sidebarTextColor,
          }}
          className={clsx(
            'cr-user-mini-toggle-info cr-user-mini-toggle-info-hasColor',
            {
              light: themeMode === 'light',
            },
          )}>
          <Dropdown
            overlayClassName={'dropdown-list'}
            className='user-profile-dropdown'
            menu={{ items }}
            trigger={['click']}
            placement='bottomRight'
            overlayStyle={{
              zIndex: 1052,
              minWidth: 150,
            }}>
            <a className='cr-user-mini-toggle-info-inner ant-dropdown-link'>
              {user?.photoURL ? (
                <AntAvatar
                  className='cr-user-mini-toggle-info-avatar'
                  src={user?.photoURL}
                  size={'default'}
                />
              ) : (
                <AntAvatar
                  size={'default'}
                  className='cr-user-mini-toggle-info-avatar'>
                  {getUserAvatar()}
                </AntAvatar>
              )}
              <span className='cr-user-mini-toggle-info-content'>
                <span className='cr-user-mini-toggle-name-info'>
                  <h3
                    className={clsx('cr-user-mini-toggle-name text-truncate', {
                      light: themeMode === 'light',
                    })}>
                    <RenderNameUser user={user} />
                  </h3>
                  <span className='cr-user-mini-toggle-arrow'>
                    <FaChevronDown />
                  </span>
                </span>
              </span>
              {user?.photoURL ? (
                <AntAvatar
                  size={'default'}
                  className='cr-user-mini-toggle-info-avatar'
                  src={user?.photoURL}
                />
              ) : (
                <AntAvatar
                  size={'default'}
                  className='cr-user-mini-toggle-info-avatar'>
                  {getUserAvatar()}
                </AntAvatar>
              )}
            </a>
          </Dropdown>
        </div>
      ) : (
        <div
          className={clsx('cr-user-mini-toggle-info', {
            light: themeMode === 'light',
          })}>
          <Dropdown
            overlayClassName={'dropdown-list'}
            className='user-profile-dropdown'
            menu={{ items }}
            trigger={['click']}
            placement='bottomRight'
            overlayStyle={{
              zIndex: 1052,
              minWidth: 150,
            }}>
            <a className='cr-user-mini-toggle-info-inner ant-dropdown-link'>
              <span className='cr-user-mini-toggle-info-content'>
                <span className='cr-user-mini-toggle-name-info'>
                  <Space>
                    <h3
                      className={clsx(
                        'cr-user-mini-toggle-name text-truncate',
                        {
                          light: themeMode === 'light',
                        },
                      )}>
                      <RenderNameUser user={user} />
                    </h3>
                  </Space>
                </span>
              </span>
              {user?.photoURL ? (
                <AntAvatar
                  size={'default'}
                  className='cr-user-mini-toggle-info-avatar'
                  src={user?.photoURL}
                />
              ) : (
                <AntAvatar
                  size={'default'}
                  className='cr-user-mini-toggle-info-avatar'>
                  {getUserAvatar()}
                </AntAvatar>
              )}
              <span className='cr-user-mini-toggle-arrow'>
                <FaChevronDown />
              </span>
            </a>
          </Dropdown>
        </div>
      )}
    </>
  );
};

export default UserInfo;

UserInfo.propTypes = {
  hasColor: PropTypes.bool,
};
