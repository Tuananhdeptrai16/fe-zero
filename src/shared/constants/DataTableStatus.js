import { KEY_STATUS_CREATE_JUDICIAL_RECORD } from 'src/pages/judicialRecords/createRecordInformation/utils';

export const RAW_DOCUMENT_STATUS_OCR_PROCESSING = 'ocr_processing';
export const RAW_DOCUMENT_STATUS_DONE_OCR = 'done_ocr';
export const RAW_DOCUMENT_STATUS_VERIFIED = 'verified';

export const JUDICIAL_STATUS = {
  NEW_REQUEST: 'new-request',
  WAITING_CHECK: 'waiting-check',
  WAITING_VERIFY: 'waiting-verify',
  RECHECK: 'recheck',
  VERIFIED: 'verified',
  LOCKED: 'locked',
};

export const ORGANIZATION_STATUS = {
  PENDING: 'pending',
  VERIFIED: 'verified',
  APPROVED: 'approved',
  LOCKED: 'locked',
};

export const USER_ACTION_LOG = [
  {
    value: 'login',
    text: 'Đăng nhập',
    color: 'blue',
  },
  {
    value: 'logout',
    text: 'Đăng xuất',
    color: 'orange',
  },
  {
    value: 'access',
    text: 'Xác thực',
    color: 'default',
  },
];

export const STATUS_RAW_DOCUMENT = [
  {
    value: RAW_DOCUMENT_STATUS_OCR_PROCESSING,
    text: 'Đang số hóa',
    color: 'orange',
  },
  {
    value: RAW_DOCUMENT_STATUS_DONE_OCR,
    text: 'Đã số hóa xong',
    color: 'blue',
  },
  {
    value: RAW_DOCUMENT_STATUS_VERIFIED,
    text: 'Hoàn thành',
    color: 'green',
  },
];

export const STATUS_BANNER_MMS = [
  {
    value: 'created',
    color: 'warning',
    text: 'Đang tạo Template ID',
  },
  {
    value: 'created_template_success',
    color: 'warning',
    text: 'Chờ phê duyệt Template',
  },
  {
    value: 'created_template_fail',
    color: 'error',
    text: 'Tạo Template ID thất bại',
  },
  {
    value: 'reject_targeting',
    color: 'error',
    text: 'Targeting không hợp lệ',
  },
  {
    value: 'reject_template',
    color: 'error',
    text: 'Từ chối phê duyệt template',
  },
  // {
  //   value: "approve_template",
  //   color: "primary",
  //   text: "Chờ phê duyệt nội dung"
  // },
  // {
  //   value: "reject",
  //   color: "error",
  //   text: "Từ chối phê duyệt nội dung"
  // },
  // {
  //   value: "approve",
  //   color: "info",
  //   text: "Đã phê duyệt nội dung"
  // },
  {
    value: 'waiting',
    color: 'warning',
    text: 'Chờ chạy',
  },
  {
    value: 'running',
    color: 'success',
    text: 'Đang chạy',
  },
  {
    value: 'pause',
    color: 'purple',
    text: 'Tạm dừng',
  },
  {
    value: 'stop',
    color: 'default',
    text: 'Đã dừng chạy',
  },
];

export const STATUS_BANNER_MMS_FILTER = [
  {
    value: 'created',
    color: 'warning',
    text: 'Đang tạo Template ID',
  },
  {
    value: 'created_template_success',
    color: 'warning',
    text: 'Chờ phê duyệt Template',
  },
  {
    value: 'created_template_fail',
    color: 'error',
    text: 'Tạo Template ID thất bại',
  },
  // {
  //   value: "reject_targeting",
  //   color: "error",
  //   text: "Targeting không hợp lệ"
  // },
  {
    value: 'reject_template',
    color: 'error',
    text: 'Từ chối phê duyệt template',
  },
  // {
  //   value: "approve_template",
  //   color: "primary",
  //   text: "Chờ phê duyệt nội dung"
  // },
  // {
  //   value: "reject",
  //   color: "error",
  //   text: "Từ chối phê duyệt nội dung"
  // },
  {
    value: 'waiting',
    color: 'warning',
    text: 'Chờ chạy',
  },
  {
    value: 'running',
    color: 'success',
    text: 'Đang chạy',
  },
  {
    value: 'pause',
    color: 'purple',
    text: 'Tạm dừng',
  },
  {
    value: 'stop',
    color: 'default',
    text: 'Đã dừng chạy',
  },
];

export const STATUS_ADS_DATA_FILTER = [
  {
    value: 'calculating',
    color: 'primary',
    text: 'Đang tính toán',
  },
  {
    value: 'confirming',
    color: 'warning',
    text: 'Chờ xác nhận',
  },
  {
    value: 'waiting',
    color: 'warning',
    text: 'Chờ chạy',
  },
  {
    value: 'running',
    color: 'success',
    text: 'Đang chạy',
  },
  {
    value: 'pause',
    color: 'purple',
    text: 'Tạm dừng',
  },
  {
    value: 'stop',
    color: 'default',
    text: 'Đã dừng chạy',
  },
];

export const STATUS_BANNER_REDIRECT = [
  {
    value: 'created',
    color: 'warning',
    text: 'created',
  },
  {
    value: 'reject',
    color: 'error',
    text: 'reject',
  },
  {
    value: 'approve',
    color: 'info',
    text: 'approve',
  },
  {
    value: 'waiting',
    color: 'warning',
    text: 'waiting',
  },
  {
    value: 'running',
    color: 'success',
    text: 'running',
  },
  {
    value: 'pause',
    color: 'purple',
    text: 'pause',
  },
  {
    value: 'stop',
    color: 'default',
    text: 'stop',
  },
];

export const STATUS_BANNER_REDIRECT_FILTER = [
  {
    value: 'created',
    color: 'warning',
    text: 'Chờ phê duyệt',
  },
  {
    value: 'reject',
    color: 'error',
    text: 'Từ chối phê duyệt',
  },
  {
    value: 'waiting',
    color: 'warning',
    text: 'Chờ chạy',
  },
  {
    value: 'running',
    color: 'success',
    text: 'Đang chạy',
  },
  {
    value: 'pause',
    color: 'purple',
    text: 'Tạm dừng',
  },
  {
    value: 'stop',
    color: 'default',
    text: 'Đã dừng chạy',
  },
];

export const STATUS_REPORT_EDIT_PROJECT = [
  {
    color: 'warning',
    value: 'not_handle',
    label: 'Chờ xử lý',
  },
  {
    color: 'success',
    value: 'approve',
    label: 'Đã xử lý',
  },
];

export const AMBASSADOR_REGISTER_STATUS = [
  {
    value: 'reject',
    color: 'error',
    text: 'ambassador.status.reject',
  },
  {
    color: 'warning',
    value: 'not_handle',
    text: 'ambassador.status.notHandle',
  },
  {
    color: 'success',
    value: 'approve',
    text: 'ambassador.status.approve',
  },
];

export const PROJECT_CHANGE_STATUS = [
  {
    color: 'warning',
    value: 'not_handle',
    text: 'project.change.not_handle',
  },
  {
    color: 'success',
    value: 'approve',
    text: 'table.status.processed',
  },
  {
    value: 'reject',
    color: 'error',
    text: 'table.status.refused',
  },
  {
    value: 'appeal',
    color: 'magenta',
    text: 'table.status.appealed',
  },
];

export const STATUS_VERIFY_RECORD_JUDICIAL = [
  {
    value: JUDICIAL_STATUS.NEW_REQUEST,
    text: 'Yêu cầu mới',
    color: 'green',
  },
  {
    value: JUDICIAL_STATUS.WAITING_CHECK,
    text: 'Chờ kiểm tra',
    color: 'orange',
  },
  {
    value: JUDICIAL_STATUS.WAITING_VERIFY,
    text: 'Chờ xác thực',
    color: 'orange',
  },
  {
    value: JUDICIAL_STATUS.RECHECK,
    text: 'Kiểm tra lại',
    color: 'red',
  },
  {
    value: JUDICIAL_STATUS.VERIFIED,
    text: 'Đã xác thực',
    color: 'green',
  },
  {
    value: JUDICIAL_STATUS.LOCKED,
    text: 'Đã gửi lên bộ',
    color: 'green',
  },
];

export const STATUS_MINISTRY_RECORD_JUDICIAL = [
  {
    value: KEY_STATUS_CREATE_JUDICIAL_RECORD.PENDING,
    text: 'Đang tải lên',
    color: 'orange',
  },
  {
    value: KEY_STATUS_CREATE_JUDICIAL_RECORD.DONE,
    text: 'Đã đồng bộ',
    color: 'green',
  },
  {
    value: KEY_STATUS_CREATE_JUDICIAL_RECORD.ERROR,
    text: 'Lỗi đồng bộ',
    color: 'red',
  },
];

export const STATUS_PERMISSION = [
  {
    value: false,
    text: 'Bị cấm dùng',
    color: 'red',
  },
  {
    value: true,
    text: 'Cho phép dùng',
    color: 'green',
  },
];

export const STATUS_SHARE_API_CONFIG = [
  {
    value: false,
    text: 'Đã hủy kích hoạt',
    color: 'red',
  },
  {
    value: true,
    text: 'Đang kích hoạt',
    color: 'green',
  },
];
