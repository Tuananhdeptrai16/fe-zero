import React from 'react';

const Signin = React.lazy(() => import('./Signin'));
const Signup = React.lazy(() => import('./Signup'));
const ForgotPassword = React.lazy(() => import('./ForgotPassword'));
const ConfirmSignupAwsCognito = React.lazy(() =>
  import('./ConfirmSignupAwsCognito'),
);
const ResetPasswordAwsCognito = React.lazy(() =>
  import('./ResetPasswordAwsCognito'),
);
const CallbackSSO = React.lazy(() => import('src/pages/callbackSSO'));

export const authRouteConfig = [
  {
    path: '/signin',
    element: <Signin />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/callback_sso',
    element: <CallbackSSO />,
  },
  {
    path: '/forget-password',
    element: <ForgotPassword />,
  },
  {
    path: '/confirm-signup',
    element: <ConfirmSignupAwsCognito />,
  },
  {
    path: '/auth/social-callback',
    element: <ResetPasswordAwsCognito />,
  },
];
