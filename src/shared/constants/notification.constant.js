import {
  GroupIcon,
  PrivateIcon,
  ShareIcon,
  WarningIcon,
} from 'src/assets/icon/notifications';

export const NOTI_STATUS = {
  VIEWED: 'viewed',
  READ: 'read',
  NEW: 'new',
};

export const NOTI_TYPE = {
  ALL: 'all',
  WARNING: 'warning',
  SHARE: 'share',
  GROUP: 'group',
  PRIVATE: 'private',
};

export const NOTI_ICON_MAP = {
  [NOTI_TYPE.WARNING]: WarningIcon,
  [NOTI_TYPE.SHARE]: ShareIcon,
  [NOTI_TYPE.GROUP]: GroupIcon,
  [NOTI_TYPE.PRIVATE]: PrivateIcon,
};
