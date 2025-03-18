import React from 'react';
import { Provider } from 'react-redux';
import moment from 'moment';

import 'antd/dist/antd.variable.css';
import './shared/styles/crema.less';
import './shared/styles/scss/spacing-helpers.scss';

import PageBreadcrumb from 'src/@crema/component/PageBreadcrumb';
import SubHeaderAppContext from 'src/@crema/component/SubHeaderApp/SubHeaderAppContext';
// import AuthSSOContextWrapper from 'src/@crema/utility/AuthSSOContext';
import setupAxiosDefault from './@crema/services/setupAxios';

import {
  AppContextProvider,
  AppLayout,
  AppLocaleProvider,
  AppThemeProvider,
  AuthRoutes,
} from './@crema';
import CacheProvider from './@crema/hook/fetchData/CacheProvider';
import configureStore from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import './@crema/services/index';
import JWTAuthAuthProvider from './@crema/services/auth/jwt-auth/JWTAuthProvider';

import './validate/initValidateCore';
import { PageHistoryProvider } from './@crema/utility/PageHistoryProvider';
moment.suppressDeprecationWarnings = true;

moment.createFromInputFallback = function (config) {
  config._d = new Date(NaN);
};

const store = configureStore();
setupAxiosDefault();

const App = () => (
  <AppContextProvider>
    <CacheProvider>
      <Provider store={store}>
        <AppThemeProvider>
          <AppLocaleProvider>
            <BrowserRouter>
              <PageHistoryProvider>
                <JWTAuthAuthProvider>
                  <AuthRoutes>
                    {/*<AuthSSOContextWrapper>*/}
                    <SubHeaderAppContext initPage={<PageBreadcrumb />}>
                      <AppLayout />
                    </SubHeaderAppContext>
                    {/*</AuthSSOContextWrapper>*/}
                  </AuthRoutes>
                </JWTAuthAuthProvider>
              </PageHistoryProvider>
            </BrowserRouter>
          </AppLocaleProvider>
        </AppThemeProvider>
      </Provider>
    </CacheProvider>
  </AppContextProvider>
);

export default App;
