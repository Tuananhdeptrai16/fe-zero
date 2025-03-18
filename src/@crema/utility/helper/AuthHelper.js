import { authRole } from 'src/shared/constants/AppEnums';

export const getUserFromAuth0 = (user) => {
  if (user)
    return {
      id: 1,
      uid: user.sub,
      displayName: user.name,
      email: user.email,
      photoURL: user.picture,
      role: authRole.USER,
    };
  return user;
};

export const getUserFromFirebase = (user) => {
  if (user)
    return {
      id: 1,
      uid: user.uid,
      displayName: user.displayName ? user.displayName : 'Crema User',
      email: user.email,
      photoURL: user.photoURL ? user.photoURL : '/assets/images/avatar/A11.jpg',
      role: authRole.USER,
    };
  return user;
};
export const getUserFromAWS = (user) => {
  if (user)
    return {
      id: 1,
      uid: user.username,
      displayName: user.attributes.name ? user.attributes.name : 'Crema User',
      email: user.attributes.email,
      photoURL: user.photoURL,
      role: authRole.USER,
    };
  return user;
};

export const getUserFromJwtAuth = (user) => {
  if (user) {
    const roles = authRole[user?.roles];
    return {
      ...user,
      id: user.id,
      uid: user._id,
      displayName:
        `${user?.first_name ?? ''} ${user?.last_name ?? ''}`.trim() ||
        user?.username ||
        user?.email ||
        'Người dùng ẩn danh',
      permissions:
        [
          ...user?.item_permissions,
          'list-source-mssql.view',
          'list-source-postgresql.view',
          'list-source-mysql.view',
          'list-source-oracle.view',
          'list-source-file.view',
          'list-source-api.view',
        ] || [],
      email: user.email,
      photoURL: user.avatar_url,
      area: user.area,
      province: user.province,
      district: user.district,
      projects: user.projects,
      role: roles,
      username: user?.username,
      phoneNumber: user?.phone_number,
      first_name: user?.first_name,
      last_name: user?.last_name,
    };
  }
  return user;
};
