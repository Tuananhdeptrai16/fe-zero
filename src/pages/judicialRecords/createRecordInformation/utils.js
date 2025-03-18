import { Progress } from 'antd';
import style from './untils.module.scss';
import clsx from 'clsx';

export const JUDICIAL_SEARCH_NAME = 'judicial_records_search';
export const CITIZEN_PROFILE_REQUEST_NAME = 'citizen_profile_request_request';
export const CITIZEN_PROFILE_ORGANIZATION_NAME =
  'citizen_profile_request_organization_request_list';
export const VERDICT_DOCUMENT_REQUEST_LIST_NAME =
  'verdict_document_request_list';
export const RELATED_DOCUMENT_REQUEST_LIST_NAME =
  'related_document_request_list';

export const PROHIBIT_POSITION_DOCUMENT_REQUEST_LIST =
  'prohibit_position_document_request_list';
export const CITIZEN_DOCUMENT_NAME =
  'citizen_profile_request_document_request_list';

export const KEY_GROUP_TYPE = {
  VERDICT: 'verdict',
  PROHIBIT: 'prohibit_position',
  RELATE_DOCUMENT: 'relate_document',
};

export const KEY_STATUS_CREATE_JUDICIAL_RECORD = {
  WAITING: 'created',
  VERIFIED: 'verified',
  IM_COMPLETED: 'drafting',
  APPROVED: 'approved',
  PENDING: 'pending',
  MINISTRY: 'ministry',
  DONE: 'done',
  ERROR: 'error',
};

export const renderSample = (data) => {
  if (data === 2) return 'Mẫu phiếu LLTP 2';
  return 'Mẫu phiếu LLTP 1';
};

//  {generatorStatusSync('pending')}
// check trang thai sync
export const generatorStatusSync = (status, textError = '') => {
  // cho dong bo
  if (status.toLowerCase() === 'null') {
    return (
      <div className={clsx(style.areSynchronizing)}>
        <Progress percent={0} status='active' showInfo={false} />
        <span className={clsx(style.text)}>Chờ đồng bộ</span>
      </div>
    );
  }
  // dang dong bo
  else if (status.toLowerCase() === 'pending') {
    return (
      <div className={clsx(style.areSynchronizing)}>
        <Progress percent={70} status='active' showInfo={false} />
        <span className={clsx(style.text)}>Đang đồng bộ</span>
      </div>
    );
  }
  // dong bo thanh cong
  else if (status.toLowerCase() === 'done') {
    return (
      <div className={clsx(style.sync_success)}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='14'
          height='14'
          viewBox='0 0 14 14'
          className={clsx(style.personalInformation_icon)}
          fill='none'>
          <path
            d='M7 0C3.13438 0 0 3.13438 0 7C0 10.8656 3.13438 14 7 14C10.8656 14 14 10.8656 14 7C14 3.13438 10.8656 0 7 0ZM10.0234 4.71406L6.73281 9.27656C6.68682 9.34076 6.62619 9.39306 6.55595 9.42914C6.48571 9.46523 6.40787 9.48405 6.32891 9.48405C6.24994 9.48405 6.17211 9.46523 6.10186 9.42914C6.03162 9.39306 5.97099 9.34076 5.925 9.27656L3.97656 6.57656C3.91719 6.49375 3.97656 6.37813 4.07812 6.37813H4.81094C4.97031 6.37813 5.12187 6.45469 5.21562 6.58594L6.32812 8.12969L8.78438 4.72344C8.87813 4.59375 9.02812 4.51562 9.18906 4.51562H9.92188C10.0234 4.51562 10.0828 4.63125 10.0234 4.71406Z'
            fill='#48CA08'
          />
        </svg>
        <span className={clsx(style.personalInformation_text)}>Đã đồng bộ</span>
      </div>
    );
  } else {
    // dong bo that bai
    return (
      <div className={clsx(style.sync_success)}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='14'
          height='14'
          viewBox='0 0 14 14'
          className={clsx(style.personalInformation_icon)}
          fill='none'>
          <path
            d='M7 0C3.13438 0 0 3.13438 0 7C0 10.8656 3.13438 14 7 14C10.8656 14 14 10.8656 14 7C14 3.13438 10.8656 0 7 0ZM9.58438 9.65938L8.55313 9.65469L7 7.80313L5.44844 9.65312L4.41563 9.65781C4.34688 9.65781 4.29063 9.60312 4.29063 9.53281C4.29063 9.50312 4.30156 9.475 4.32031 9.45156L6.35313 7.02969L4.32031 4.60938C4.30143 4.58647 4.29096 4.5578 4.29063 4.52812C4.29063 4.45937 4.34688 4.40312 4.41563 4.40312L5.44844 4.40781L7 6.25938L8.55156 4.40938L9.58281 4.40469C9.65156 4.40469 9.70781 4.45937 9.70781 4.52969C9.70781 4.55937 9.69688 4.5875 9.67813 4.61094L7.64844 7.03125L9.67969 9.45312C9.69844 9.47656 9.70938 9.50469 9.70938 9.53438C9.70938 9.60313 9.65313 9.65938 9.58438 9.65938Z'
            fill='#416ef0'
          />
        </svg>
        <span className={clsx(style.personalInformation_text)}>
          Lỗi: {textError}
        </span>
      </div>
    );
  }
};
