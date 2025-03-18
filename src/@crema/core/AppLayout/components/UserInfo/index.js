/* eslint-disable */
import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { Badge, Dropdown, Space } from 'antd';
import { FaChevronDown } from 'react-icons/fa';
import './index.style.less';
import { useThemeContext } from 'src/@crema/utility/AppContextProvider/ThemeContextProvider';
import { useAuthUser } from 'src/@crema/utility/AuthHooks';
import { useSidebarContext } from 'src/@crema/utility/AppContextProvider/SidebarContextProvider';
import PropTypes from 'prop-types';
import { useAuthSSOContext } from 'src/@crema/utility/AuthSSOContext';
import AntAvatar from 'src/@crema/component/AntAvatar/AntAvatar';
import { CheckOutlined, DownOutlined } from '@ant-design/icons';
import { logout } from 'src/@crema/services/Application/AuthenStorage';
import FormRowDataTable from 'src/@crema/component/FormRowDataTable';
import { MODAL_SIZE } from 'src/shared/constants/Modal';
import { FORM_TYPES } from 'src/shared/constants/FormDataTable';
import FormInputRadio from './FormInputRadio/FormInputRadio';
import API from 'src/@crema/services/apis';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import useFetch from 'src/@crema/hook/fetchData/useFetch';

const OrganizationUnitItem = ({
  fullName,
  role,
  organization_name,
  isActive,
}) => {
  return (
    <div
      className={`d-flex justify-between items-center ${
        isActive ? 'user-profile-dropdown-active' : ''
      }`}
      style={{ minWidth: 200 }}>
      <div className={'d-flex flex-col'}>
        <span style={{ fontWeight: isActive ? 500 : 400 }}>
          {organization_name || 'ADMIN'}
        </span>
        <Space>
          <span style={{ color: '#00000073' }}>{fullName}</span>
          {role && (
            <span
              style={{
                fontSize: 10,
                border: '1px solid #D9D9D9',
                padding: '4px 6px',
                borderRadius: 2,
                color: '#00000073',
              }}>
              {role}
            </span>
          )}
        </Space>
      </div>
      {isActive && <CheckOutlined style={{ color: '#1890FF' }} />}
    </div>
  );
};

export const ConTextOrganization = createContext();

const UserInfo = ({ hasColor }) => {
  const { themeMode } = useThemeContext();
  const { signOut } = useAuthSSOContext();
  const { user } = useAuthUser();
  const navigate = useNavigate();
  const { sidebarColorSet } = useSidebarContext();
  const { isSidebarBgImage } = useSidebarContext();
  const [isChange, setIsChange] = useState(false)
  const [organization, setOrganization] = useState(null)
  const [role, setRole] = useState()
  const [countOrganization, setCountOrganization] = useState(0)
  
  const { data: currentRole } = useFetch({
    url: API.GET_CURRENT_ROLE(user?.id),
    method: METHOD_FETCH.GET,
  });

  const currentRoleId = currentRole?.result?.role_id
  const currentRoleName = currentRole?.result?.role_info?.name

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
  //     <Menu.Item onClick={() => navigate('/my-profile')}>My Profile</Menu.Item>
  //     <Menu.Item onClick={() => logout()}>Logout</Menu.Item>
  //   </Menu>
  // );

  // console.log(organization, countOrganization)

  const items = [
    {
      label: (<div onClick={()=>setIsChange(true)}>Thay đổi Cơ sở đào tạo</div>),
      key: 'user_info-0',
    },
    {
      label: (
        <div onClick={() => navigate('/my-profile')}>Thông tin cá nhân</div>
      ),
      key: 'user_info-1',
    },
    // {
    //   label: 'Đơn vị tổ chức',
    //   key: 'organization',
    //   children: [
    //     {
    //       label: (
    //         <OrganizationUnitItem
    //           isActive
    //           fullName={user?.displayName}
    //           role={user?.roles?.[0]}
    //           organization_name={user?.organization_name}
    //         />
    //       ),
    //       key: 'key-1',
    //     },
    //   ],
    // },
    {
      label: <div onClick={() => logout()}>Đăng xuất</div>,
      key: 'user_info-2',
    },
  ];

  return (
    <>
    <ConTextOrganization.Provider
      value={{
        setOrganization,
        setCountOrganization,
        setRole
      }}
    >
      {hasColor ? (
        <div
          style={{
            backgroundColor: isSidebarBgImage
              ? ''
              : sidebarColorSet.sidebarHeaderColor,
            color: sidebarColorSet.sidebarTextColor,
          }}
          className={clsx('cr-user-info cr-user-info-hasColor', {
            light: themeMode === 'light',
          })}>
          <Dropdown
            className='user-profile-dropdown relative'
            overlayClassName='dropdown-list'
            menu={{ items }}
            trigger={['click']}
            placement='bottomRight'
            overlayStyle={{
              zIndex: 999,
              minWidth: 150,
            }}>
            <a className='cr-user-info-inner ant-dropdown-link'>
              {user?.photoURL ? (
                <Badge dot color='#22c55e' offset={[-4, 4]}>
                  <AntAvatar
                    className='cr-user-info-avatar'
                    src={user?.photoURL}
                  />
                </Badge>
              ) : (
                <Badge dot color='#22c55e' offset={[-4, 4]}>
                  <AntAvatar className='cr-user-info-avatar'>
                    {getUserAvatar()}
                  </AntAvatar>
                </Badge>
              )}
              <span className='cr-user-info-content'>
                <span className='cr-user-designation text-truncate'>
                  {currentRoleName?.toLowerCase()}
                </span>
                <span className='cr-user-name-info'>
                  <h3
                    className={clsx('cr-user-name text-truncate', {
                      light: themeMode === 'light',
                    })}>
                    {user?.displayName}
                  </h3>
                  <span className='cr-user-arrow'>
                    <FaChevronDown />
                  </span>
                </span>
              </span>
              <DownOutlined />
            </a>
          </Dropdown>
        </div>
      ) : (
        <div
          className={clsx('cr-user-info', {
            light: themeMode === 'light',
          })}>
          <Dropdown
            className='user-profile-dropdown'
            overlayClassName='dropdown-list'
            menu={{ items }}
            trigger={['click']}
            placement='bottomRight'
            overlayStyle={{
              zIndex: 1052,
              minWidth: 150,
              position: 'fixed',
              top: 45,
            }}>
            <a className='cr-user-info-inner ant-dropdown-link'>
              {user?.photoURL ? (
                <Badge dot color='#22c55e' offset={[-4, 4]}>
                  <AntAvatar
                    className='cr-user-info-avatar'
                    src={user?.photoURL}
                  />
                </Badge>
              ) : (
                <Badge dot color='#22c55e' offset={[-4, 4]}>
                  <AntAvatar className='cr-user-info-avatar'>
                    {getUserAvatar()}
                  </AntAvatar>
                </Badge>
              )}
              <span className='cr-user-info-content'>
                <span className='cr-user-designation text-truncate'>
                  {currentRoleName?.toLowerCase()}
                </span>
                <span className='cr-user-name-info'>
                  <h3
                    className={clsx('cr-user-name text-truncate', {
                      light: themeMode === 'light',
                    })}>
                    {user?.displayName}
                  </h3>
                </span>
              </span>
              <DownOutlined />
            </a>
          </Dropdown>
        </div>
      )}
      <FormRowDataTable
          title={'Lựa chọn cơ sở đào tạo'}
          key={'choose_training_facilities'}
          size={MODAL_SIZE.MEDIUM}
          visible={isChange}
          onClose={() => setIsChange(false)}
          formType={FORM_TYPES.UPDATE}
          preSaveData={({organization_id})=> organization_id ? organization_id : currentRoleId}
          isChange
          onSuccess={()=> {
            setIsChange(false)
            navigate('/workspace')
            window.location.reload();
          }}
          method={METHOD_FETCH.POST}
          resource={
            API.UPDATE_USER_ORGANIZATION(organization, role)
          }
          >
            <FormInputRadio currentRoleId={currentRoleId}/>
        </FormRowDataTable>
      </ConTextOrganization.Provider>
    </>
  );
};

export default UserInfo;

UserInfo.propTypes = {
  hasColor: PropTypes.bool,
};
