import { authRouteConfig } from './auth';
import { initialUrl } from '../shared/constants/AppConst';
import Error403 from './errorPages/Error403';
import React from 'react';
import { samplePagesConfigs } from './sample';
import { profileConfig } from './profile';

const authorizedStructure = {
  // fallbackPath: '/signin',
  unAuthorizedComponent: <Error403 />,
  routes: [...samplePagesConfigs, ...profileConfig],
};

const unAuthorizedStructure = {
  fallbackPath: initialUrl,
  routes: authRouteConfig,
};

export { authorizedStructure, unAuthorizedStructure };
