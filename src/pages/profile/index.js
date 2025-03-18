import React from 'react';
import { ROUTER_NAME } from 'src/pages/routeConfig';

const UserProfile = React.lazy(() => import('./UserProfile'));
export const profileConfig = [
  {
    path: '/my-profile',
    element: <UserProfile />,
    name: ROUTER_NAME.PROFILE,
  },
];
