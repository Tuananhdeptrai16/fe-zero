import { ORGANIZATION_STATUS } from 'src/shared/constants/DataTableStatus';
import API from 'src/@crema/services/apis';
export const KEY = {
  ALL: 'all',
  WAITING: 'waiting',
  RECEIVE: 'receive',
  CHECK: 'check',
  RECHECK: 'recheck',
};
export const FILTER_TAB = [
  {
    filters: [],
    keyword: '',
  },
  {
    filters: [
      {
        name: 'status',
        value: [ORGANIZATION_STATUS.PENDING],
        operation: 'in',
      },
      {
        name: 'verified_by',
        value: true,
        operation: 'is_null',
      },
    ],
    keyword: '',
  },
  {
    filters: [
      {
        name: 'status',
        value: [ORGANIZATION_STATUS.PENDING],
        operation: 'in',
      },
      {
        name: 'verified_by',
        value: false,
        operation: 'is_null',
      },
      {
        name: 'reject_reason',
        value: true,
        operation: 'is_null',
      },
    ],
    keyword: '',
  },
  {
    filters: [
      {
        name: 'status',
        value: [ORGANIZATION_STATUS.VERIFIED],
        operation: 'in',
      },
    ],
    keyword: '',
  },
  {
    filters: [
      {
        name: 'status',
        value: [ORGANIZATION_STATUS.PENDING],
        operation: 'in',
      },
      {
        name: 'reject_reason',
        value: false,
        operation: 'is_null',
      },
    ],
    keyword: '',
  },
];

export const MODAL_TYPE = {
  RECEIVE: 'receive',
  REJECT: 'reject',
  RETRY_VERIFY: 'retryVerify',
};

export const MODAL_CONFIRM = {
  [MODAL_TYPE.RECEIVE]: {
    textTitle: 'confirm.receiveOrganizationRecord',
    contentId: 'confirm.receiveOrganizationRecordSure',
    textSuccess: 'confirm.receiveOrganizationRecordSuccess',
    action: (id) => API.RECEIVE_CITIZEN_PROFILE_REQUEST_ORGANIZATION(id),
  },
  [MODAL_TYPE.REJECT]: {
    textTitle: 'confirm.rejectOrganizationRecord',
    contentId: 'confirm.rejectOrganizationRecordSure',
    textSuccess: 'confirm.rejectOrganizationRecordSuccess',
    action: (id) => API.UN_RECEIVE_CITIZEN_PROFILE_REQUEST_ORGANIZATION(id),
  },
  [MODAL_TYPE.RETRY_VERIFY]: {
    textTitle: 'confirm.retryVerifyOrganizationRecord',
    contentId: 'confirm.retryVerifyOrganizationRecordSure',
    textSuccess: 'confirm.retryVerifyOrganizationRecordSuccess',
    action: (id) => API.REJECT_CITIZEN_PROFILE_REQUEST_ORGANIZATION(id),
  },
};
