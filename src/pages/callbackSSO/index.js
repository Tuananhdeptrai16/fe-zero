/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuthSSOContext } from 'src/@crema/utility/AuthSSOContext';
import { isEmpty } from 'src/shared/utils/Typeof';
import notification from 'src/shared/utils/notification';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import { Card, Result } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import config from 'src/config';
import { KEY_TAB_PROFILE } from 'src/shared/constants/userProfile.constant';

const CallbackSSO = () => {
  let [searchParams] = useSearchParams();
  let navigate = useNavigate();
  const { callbackSignin } = useAuthSSOContext();

  useEffect(() => {
    console.log('CallbackSSO');
    const code = searchParams.get('code');
    const callback_url = searchParams.get('callback_url');

    if (code) {
      callbackSignin();
      if (
        callback_url ===
        config.routes.profileByTab(KEY_TAB_PROFILE.GET_TOKEN_VERIFY)
      ) {
        navigate(callback_url, { replace: true });
        return;
      }
    } else if (!isEmpty(searchParams?.error)) {
      notification.error(searchParams?.error);
    }
    navigate('/');
  }, []);

  return (
    <>
      <AppPageMetadata title={'Chuyển hướng đăng nhập SSO'} />
      <Card bordered={false} className='px-0'>
        <Result
          title='Đang chuyển hướng đăng nhập SSO'
          icon={<LoadingOutlined />}
        />
      </Card>
    </>
  );
};

CallbackSSO.propTypes = {};

CallbackSSO.defaultProps = {};
CallbackSSO.requireLogin = false;
CallbackSSO.onlyAnonymous = true;
export default CallbackSSO;
