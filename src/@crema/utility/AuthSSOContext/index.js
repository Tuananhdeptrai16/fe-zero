/* eslint-disable */
import { AuthProvider, useAuth } from 'oidc-react';
import React, { useMemo, useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import useCallApi from '../../hook/useCallApi';
import { useAuthMethod, useAuthUser } from 'src/@crema/utility/AuthHooks';
import {
  logout,
  saveLongToken,
  saveToken,
} from 'src/@crema/services/Application/AuthenStorage';
import { isEmpty } from 'src/shared/utils/Typeof';
import { postGetAuthMe } from 'src/@crema/services';
import { FETCH_START } from 'src/shared/constants/ActionTypes';
import { useLocation } from 'react-router-dom';
import { instanceCoreApi, URL_PRODUCT } from 'src/@crema/services/setupAxios';
import config from 'src/config';
import { KEY_TAB_PROFILE } from 'src/shared/constants/userProfile.constant';

const Context = React.createContext({});

const { Provider } = Context;

const CONFIG = {
  authority: 'http://10.15.68.186:9763/oauth2/oidcdiscovery',
  clientId: '5oAt8GBeErnfA5i2jkCr3uCrmyYa',
  clientSecret: 'JJ9aHIE6SUeoTNINftIxKEqpwRQa',
};

function AuthSSOContext({ sendCallback, children }) {
  const refSessionIframe = useRef();
  const [timeoutCheckSession, setTimeCheckSession] = useState(3000);
  const [sessionIframe, setSessionIframe] = useState();
  const { pathname } = useLocation();
  const { logout } = useAuthMethod();
  const { user: me } = useAuthUser();
  const auth = useAuth();
  const userManager = auth?.userManager;
  const loadingAuth = auth?.isLoading;

  const getUserCurrent = (callback) => {
    userManager
      .getUser()
      .then((user) => {
        callback(user || auth?.userData);
      })
      .catch((error) => {
        callback(auth?.userData);
        console.log('error', error);
      });
  };

  const callbackSignin = () => {
    // auth.userManager
    //   .getUser()
    //   .then((user) => {
    //     // window.history.replaceState(
    //     //   {},
    //     //   window.document.title,
    //     //   window.location.origin + window.location.pathname,
    //     // );
    //     if (user) {
    //       sendCallback(user);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log('error', error);
    //   });
  };

  const signinSilent = () => {
    userManager
      .signinSilent()
      .then((user) => {
        const email = user?.profile?.email;
        if (user && email !== me?.email) {
          sendCallback(user);
        }
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const logoutServer = () => {
    return logout(false);
  };

  const signOut = () => {
    // Nếu xử lý gọi api logout lâu quá thì pass qua luôn
    getUserCurrent((userData) => {
      logoutServer().then(() => {
        if (userData?.id_token) {
          userManager
            .signoutRedirect({ id_token_hint: userData?.id_token })
            .then(() => {
              window.location.href = '/';
            });
        } else {
          window.location.href = '/';
        }
      });
    });
  };

  const signoutSilent = () => {
    userManager
      .signoutSilent()
      .then((rs) => {
        console.log(rs);
        logoutServer();
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const signIn = () => {
    // if (process.env.NODE_ENV === 'development') {
    //   return new Promise((resolve, reject) => {
    //     reject('Error');
    //   });
    // }
    userManager.signinSilent();
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(auth.signIn());
      }, 150);
    });
  };

  useEffect(() => {
    if (
      !loadingAuth &&
      !pathname?.includes('/signin') &&
      !pathname?.includes('/callback_sso')
    ) {
      signinSilent();
    }
  }, []);

  const contextValue = {
    callbackSignin,
    signinSilent,
    signoutSilent,
    signIn,
    signOut,
  };

  const sendMessageCheckSession = () => {
    const targetWindow = refSessionIframe?.current?.contentWindow;
    if (targetWindow) {
      userManager.getUser().then((userData) => {
        if (userData) {
          const message = `${CONFIG.clientId} ${userData.session_state}`;
          targetWindow.postMessage(message, '*');
        }
      });
    }
  };

  const processMessageFromSSO = (event) => {
    if (window === event.source) {
      // ignore browser extensions that are sending messages.
      return;
    }

    if (event.data) {
      switch (event.data) {
        case 'changed':
          // signOut();
          return;
        case 'error':
        case 'unchanged':
        default:
        // No handle
        // TODO logout
      }
    }
  };

  useEffect(() => {
    if (userManager?.metadataService?.getCheckSessionIframe) {
      userManager.metadataService
        .getCheckSessionIframe()
        .then((newSessionIframeUrl) => {
          if (newSessionIframeUrl) {
            setSessionIframe(newSessionIframeUrl);
          }
        })
        .catch((e) => console.log(e));
    }
  }, [userManager]);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      sendMessageCheckSession();
    }, timeoutCheckSession);

    return () => {
      clearInterval(timeInterval);
    };
  }, [userManager, timeoutCheckSession]);

  useEffect(() => {
    window.addEventListener('message', processMessageFromSSO);

    return () => {
      window.removeEventListener('message', processMessageFromSSO);
    };
  }, []);

  return (
    <Provider value={contextValue}>
      {sessionIframe && (
        <iframe
          ref={refSessionIframe}
          src={sessionIframe}
          style={{ display: 'none' }}
        />
      )}
      {children}
    </Provider>
  );
}

AuthSSOContext.propTypes = {};

AuthSSOContext.defaultProps = {};

export const useAuthSSOContext = () => React.useContext(Context);

const AuthSSOContextWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const { user: me } = useAuthUser();
  const { pathname, search } = useLocation();
  const { signInUser } = useAuthMethod();

  const getAuthMeSuccess = (success) => {
    signInUser(success, null);
  };

  const getAuthMeError = (error) => {
    signInUser(null, error);
  };

  const getAuthMe = () => {
    dispatch({ type: FETCH_START });
    return sendAuthen();
  };

  const { send: sendAuthen } = useCallApi({
    success: (success) => {
      const userInfo = success?.result;
      if (userInfo) {
        getAuthMeSuccess(success);
      } else {
        // getAuthMeError({
        //   message: 'Lỗi tài khoản, liên hệ Admin để được hỗ trợ',
        // });
        logout('account_error');
      }
    },
    callApi: postGetAuthMe,
    error: (error) => {
      getAuthMeError(error);
    },
  });

  const errorCallbackSSO = (response) => {
    console.log(response);
  };

  const successCallbackSSO = (response) => {
    if (response) {
      const { token: long_token, short_token: token } = response?.result;
      saveToken(token);
      saveLongToken(long_token);
      setTimeout(() => {
        getAuthMe(token);
      }, 0);
    }
  };

  const callApiSSOCallback = (data) => {
    return instanceCoreApi.post('/api/v1/public/login-sso/verify-user', data);
  };

  const { send: sendCallback } = useCallApi({
    success: successCallbackSSO,
    callApi: callApiSSOCallback,
    error: errorCallbackSSO,
  });

  let callback_url = `${URL_PRODUCT}/callback_sso`;
  let callback_url_logout = `${URL_PRODUCT}/signin`;

  if (process.env.NODE_ENV === 'development') {
    callback_url = `http://localhost:3000/callback_sso`;
    callback_url_logout = `http://localhost:3000/signin`;
  }

  if (
    pathname === config.routes.profile &&
    search === `?tab=${KEY_TAB_PROFILE.GET_TOKEN_VERIFY}` &&
    !me
  ) {
    callback_url += `?callback_url=${config.routes.profileByTab(
      KEY_TAB_PROFILE.GET_TOKEN_VERIFY,
    )}`;
  }
  const oidcConfig = useMemo(() => {
    return {
      onSignIn: (user) => {
        // window.history.replaceState(
        //   {},
        //   window.document.title,
        //   window.location.origin + window.location.pathname,
        // );
        // console.log('user', user);
        if (user) {
          const email = user?.profile?.aud;
          if (pathname?.includes('/callback_sso')) {
            sendCallback(user);
          }
        }
      },
      autoSignIn: false,
      authority: CONFIG.authority,
      clientId: CONFIG.clientId,
      clientSecret: CONFIG.clientSecret,
      redirectUri: callback_url,
      postLogoutRedirectUri: callback_url_logout,
      responseType: 'code',
      //response_mode:'fragment',
      scope: 'openid address phone profile groups email',

      popupRedirectUri: callback_url,
      popupPostLogoutRedirectUri: callback_url,

      silentRedirectUri: callback_url,
      automaticSilentRenew: true,
      silentRequestTimeout: 10000,

      filterProtocolClaims: true,
      loadUserInfo: true,

      // Manually specify metadata to stop automatic discovery
      metadata: {
        issuer: "https://10.8.0.11:9443",
        authorization_endpoint: "https://10.8.0.11:9443/oauth2/authorize",
        token_endpoint: "https://10.8.0.11:9443/oauth2/token",
        userinfo_endpoint: "https://10.8.0.11:9443/oauth2/userinfo",
        end_session_endpoint: "https://10.8.0.11:9443/oauth2/logout",
      }
    };
  }, []);

  return (
    <AuthProvider {...oidcConfig}>
      <AuthSSOContext sendCallback={sendCallback}>{children}</AuthSSOContext>
    </AuthProvider>
  );
};

export default AuthSSOContextWrapper;

export const wrapperAuthSSOContext = (Component) => {
  // eslint-disable-next-line react/display-name
  return React.forwardRef((props, ref) => {
    const authSSOContext = useAuthSSOContext();

    return <Component ref={ref} {...props} authSSOContext={authSSOContext} />;
  });
};
