import React, { useMemo } from 'react';
import './index.style.less';
import { Tabs } from 'antd';
import PersonalInfo from './PersonalInfo';
// import ChangePassword from './ChangePassword';
// import Information from './Information';
// import Notification from './Notification';
// import SocialLink from './SocialLink';
import { HiUser } from 'react-icons/hi';
// import { AiFillLock } from 'react-icons/ai';
// import { FaBandcamp, FaNetworkWired } from 'react-icons/fa';
// import { IoMdNotifications } from 'react-icons/io';
// import accountData from '../../../@crema/services/db/account';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import { KEY_TAB_PROFILE } from 'src/shared/constants/userProfile.constant';
import { useLocation, useNavigate } from 'react-router-dom';
// import { IoMdNotifications } from 'react-icons/io';
// import { NotificationSetting } from 'src/pages/profile/UserProfile/NotificationSetting';
// import { BsPersonWorkspace } from 'react-icons/bs';
// import { WorkspaceSetting } from 'src/pages/profile/UserProfile/WorkspaceSetting';
// import { AiOutlineHistory } from 'react-icons/ai';
// import ActiveHistory from 'src/pages/profile/UserProfile/ActiveHistory';
// import { MdPrivacyTip } from 'react-icons/md';
// import { PrivacySetting } from 'src/pages/profile/UserProfile/PrivacySetting';
// import { OrganizationSetting } from 'src/pages/profile/UserProfile/OrganizationSetting';
// import { FaBuilding } from 'react-icons/fa';
// import { useJWTAuthActions } from 'src/@crema/services/auth/jwt-auth/JWTAuthProvider';
// import { ROUTER_NAME } from 'src/pages/routeConfig';
// import { ITEM_PERMISSIONS } from 'src/shared/constants/Permission';
// import { useAuthUser } from 'src/@crema/utility/AuthHooks';
// import { isEmpty } from 'src/shared/utils/Typeof';

const UserProfile = () => {
  // const { checkPermissionAction } = useJWTAuthActions();
  // const { user } = useAuthUser();
  const navigate = useNavigate();
  const { search } = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(search), [search]);
  const activeKey = useMemo(
    () => searchParams.get('tab') || KEY_TAB_PROFILE.INFORMATION,
    [searchParams],
  );
  // const isShowTabOrganization =
  //   checkPermissionAction(ROUTER_NAME.ORGANIZATION, ITEM_PERMISSIONS.VIEW) && !isEmpty(user?.organization_id);
  const tabList = [
    {
      label: (
        <span className='user-profile-icon'>
          <HiUser className='icon' />
          <span>
            <IntlMessages id='userProfile.personalInfo' />
          </span>
        </span>
      ),
      key: KEY_TAB_PROFILE.INFORMATION,
      children: <PersonalInfo />,
    },
    // {
    //   label: (
    //     <span className='user-profile-icon'>
    //       <AiFillLock className='icon' />
    //       <span>
    //         <IntlMessages id='userProfile.changePassword' />
    //       </span>
    //     </span>
    //   ),
    //   key: KEY_TAB_PROFILE.CHANGE_PASSWORD,
    //   children: <ChangePassword />,
    // },
    // {
    //   label: (
    //     <span className='user-profile-icon'>
    //       <IoMdNotifications className='icon' />
    //       <span>
    //         <IntlMessages id='userProfile.notification' />
    //       </span>
    //     </span>
    //   ),
    //   key: KEY_TAB_PROFILE.NOTIFICATION,
    //   children: <NotificationSetting />,
    // },
    // {
    //   label: (
    //     <span className='user-profile-icon'>
    //       <BsPersonWorkspace className='icon' />
    //       <span>
    //         <IntlMessages id='userProfile.workspace' />
    //       </span>
    //     </span>
    //   ),
    //   key: KEY_TAB_PROFILE.WORKSPACE,
    //   children: <WorkspaceSetting />,
    // },
    // {
    //   label: (
    //     <span className='user-profile-icon'>
    //       <AiOutlineHistory className='icon' />
    //       <span>
    //         <IntlMessages id='userProfile.activityHistory' />
    //       </span>
    //     </span>
    //   ),
    //   key: KEY_TAB_PROFILE.ACTIVITY_HISTORY,
    //   children: <ActiveHistory />,
    // },
    // {
    //   label: (
    //     <span className='user-profile-icon'>
    //       <MdPrivacyTip className='icon' />
    //       <span>
    //         <IntlMessages id='userProfile.privacy' />
    //       </span>
    //     </span>
    //   ),
    //   key: KEY_TAB_PROFILE.PRIVACY,
    //   children: <PrivacySetting />,
    // },
    // isShowTabOrganization && {
    //   label: (
    //     <span className='user-profile-icon'>
    //       <FaBuilding className='icon' />
    //       <span>
    //         <IntlMessages id='userProfile.organization' />
    //       </span>
    //     </span>
    //   ),
    //   key: KEY_TAB_PROFILE.ORGANIZATION,
    //   children: <OrganizationSetting />,
    // },
  ];
  return (
    <div className='user-profile-container'>
      <Tabs
        items={tabList}
        className='user-profile-tabs'
        activeKey={activeKey}
        tabPosition='left'
        onChange={(key) => navigate({ search: `?tab=${key}` })}
      />
      {/*<TabPane*/}
      {/*  tab={*/}
      {/*    <span className='user-profile-icon'>*/}
      {/*      <FaBandcamp className='icon' />*/}
      {/*      <span>*/}
      {/*        <IntlMessages id='userProfile.information' />*/}
      {/*      </span>*/}
      {/*    </span>*/}
      {/*  }*/}
      {/*  key='3'>*/}
      {/*  <Information />*/}
      {/*</TabPane>*/}
      {/*<TabPane*/}
      {/*  tab={*/}
      {/*    <span className='user-profile-icon'>*/}
      {/*      <FaNetworkWired className='icon' />*/}
      {/*      <span>*/}
      {/*        <IntlMessages id='userProfile.social' />*/}
      {/*      </span>*/}
      {/*    </span>*/}
      {/*  }*/}
      {/*  key='4'>*/}
      {/*  <SocialLink socialLink={accountData.member} />*/}
      {/*</TabPane>*/}
      {/*<TabPane*/}
      {/*  tab={*/}
      {/*    <span className='user-profile-icon'>*/}
      {/*      <IoMdNotifications className='icon' />*/}
      {/*      <span>*/}
      {/*        <IntlMessages id='userProfile.notification' />*/}
      {/*      </span>*/}
      {/*    </span>*/}
      {/*  }*/}
      {/*  key='5'>*/}
      {/*  <Notification notification={accountData.notification} />*/}
      {/*</TabPane>*/}
    </div>
  );
};

export default UserProfile;
