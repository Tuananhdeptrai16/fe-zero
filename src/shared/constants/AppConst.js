import { authRole, AuthType } from './AppEnums';

export const defaultUser = {
  displayName: 'John Alex',
  email: 'demo@example.com',
  authType: AuthType.JWT_AUTH,
  token: 'access-token',
  role: authRole.ADMIN,
  photoURL: '/assets/images/avatar/A11.jpg',
};

export const initialUrl = '/'; // this url will open after login
