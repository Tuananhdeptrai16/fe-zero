import routesConfig from '../../pages/routeConfig';
// import { isEmpty } from 'src/shared/utils/Typeof';
import { useIntl } from 'react-intl';
import {
  GROUP_TYPE_PROHIBIT_POSITIONS_DOCUMENT,
  GROUP_TYPE_RELATE_DOCUMENT,
  GROUP_TYPE_VERDICT,
  SOURCE_DEFINITION_MSSQL_ID,
  SOURCE_DEFINITION_MSSQL_NAME,
  SOURCE_DEFINITION_MYSQL_ID,
  SOURCE_DEFINITION_MYSQL_NAME,
  SOURCE_DEFINITION_POSTGRES_ID,
  SOURCE_DEFINITION_POSTGRES_NAME,
} from 'src/shared/constants/DataFixed';

export const GROUP_TYPES = [
  { label: 'Bản án', value: GROUP_TYPE_VERDICT },
  { label: 'Quyết định', value: GROUP_TYPE_RELATE_DOCUMENT },
  {
    label: 'Cấm đảm nhiệm chức vụ',
    value: GROUP_TYPE_PROHIBIT_POSITIONS_DOCUMENT,
  },
];

export const TYPE_HOST = [
  { label: 'Cục bộ', value: 'local' },
  { label: 'Đám mây', value: 'cloud' },
];

export const TYPE_IDENTIFICATION = [
  { label: 'CMT', value: 'cmt' },
  { label: 'CCCD', value: 'cccd' },
];

export const TYPE_LLTP = [
  { label: 'Mẫu phiếu LLTP số 1', value: 1 },
  { label: 'Mẫu phiếu LLTP số 2', value: 2 },
];

export const TELE_CODE_NATIONAL = [
  { label: 'Việt Nam', value: '+84' },
  { label: 'Trung Quốc', value: '+86' },
  { label: 'Thái Lan', value: '+66' },
  { label: 'Lào', value: '+856' },
];

export const useBuildMenuToOption = (menu, pagePermission) => {
  const { messages } = useIntl();
  const options = [];
  menu.forEach((route) => {
    if (route.type === 'item') {
      const routeId = route.id;
      const permissions = pagePermission
        .filter((permission) => permission.name.indexOf(`${routeId}.`) === 0)
        .map((permission) => ({
          id: permission?.id,
          name: permission.name.split('.')?.[1],
        }))
        .sort(function (a, b) {
          return a.name.localeCompare(b.name);
        });
      options.push({
        label: messages[route.messageId] || route.messageId,
        value: route.id,
        isPageHidden: route.isPageHidden,
        id: route.id,
        permissions: permissions,
        level: route.level,
      });
    }

    if (route.type === 'collapse' || route.type === 'group') {
      const collapseOptions = {
        id: route.id,
        label: messages[route.messageId] || route.messageId,
        options: [],
        level: route.level,
      };
      if (route.children) {
        const childrenOps = useBuildMenuToOption(
          route.children,
          pagePermission,
        );
        options.push(collapseOptions);
        options.push(...childrenOps);
      }
    }
  });

  return options;
};

export const DEFAULT_PERMISSION_SELECT = (pagePermission = []) => {
  return useBuildMenuToOption(routesConfig, pagePermission);
};

export const getPageNameByPathname = (pathname, routers = routesConfig) => {
  let pageName = '';
  routers.forEach((route) => {
    if (!pageName) {
      if (route.type === 'item') {
        if (route?.path === pathname) {
          pageName = route?.id;
        }
      } else if (route.type === 'collapse' || route.type === 'group') {
        pageName = getPageNameByPathname(pathname, route.children || []);
      }
    }
  });
  return pageName;
};

export const LOCATION_STATE = {
  region: 'location.regionHome',
  country: 'location.countryHome',
  city: 'location.cityHome',
};

export const ambassadorRoleIdDA = 17;
export const ambassadorRoleIdTinh = 23;
export const ambassadorRoleIdVung = 24;
export const ambassadorRoleIdCDT = 18;

export const ambassadorNameDA = 'project';
export const ambassadorNameTinh = 'province';
export const ambassadorNameVung = 'area';
export const ambassadorNameCDT = 'represent';

export const AMBASSADOR_LEVEL = [
  {
    value: ambassadorNameVung,
    label: 'Khu vực',
    roleId: ambassadorRoleIdVung,
    rank: 1,
  },
  {
    value: ambassadorNameTinh,
    label: 'Tỉnh',
    roleId: ambassadorRoleIdTinh,
    rank: 2,
  },
  {
    value: ambassadorNameDA,
    label: 'Dự án',
    roleId: ambassadorRoleIdDA,
    rank: 3,
  },
  {
    value: ambassadorNameCDT,
    label: 'Đại diện chủ đầu tư',
    roleId: ambassadorRoleIdCDT,
    rank: 4,
  },
];

export const LOCATION_SELECT = [
  {
    label: LOCATION_STATE['country'],
    value: 'country',
  },
  {
    label: LOCATION_STATE['city'],
    value: 'city',
  },
  {
    label: LOCATION_STATE['region'],
    value: 'region',
  },
];

export const MOMO_CODES = [
  {
    code: '0',
    description: 'Thành công',
  },
  {
    code: '9000',
    description: 'Giao dịch đã được xác nhận thành công',
  },
  {
    code: '8000',
    description:
      'Giao dịch đang ở trạng thái cần được người dùng xác nhận thanh toán lại',
  },
  {
    code: '7000',
    description: 'Giao dịch đang được xử lý',
  },
  {
    code: '7002',
    description:
      'Giao dịch đang được xử lý bởi nhà cung cấp loại hình thanh toán',
  },
  {
    code: '1000',
    description:
      'Giao dịch đã được khởi tạo, chờ người dùng xác nhận thanh toán',
  },
  {
    code: '11',
    description: 'Truy cập bị từ chối',
  },
  {
    code: '12',
    description: 'Phiên bản API không được hỗ trợ cho yêu cầu này',
  },
  {
    code: '13',
    description: 'Xác thực doanh nghiệp thất bại',
  },
  {
    code: '20',
    description: 'Yêu cầu sai định dạng',
  },
  {
    code: '22',
    description: 'Số tiền giao dịch không hợp lệ',
  },
  {
    code: '40',
    description: 'RequestId bị trùng',
  },
  {
    code: '41',
    description: 'OrderId bị trùng',
  },
  {
    code: '42',
    description: 'OrderId không hợp lệ hoặc không được tìm thấy',
  },
  {
    code: '43',
    description:
      'Yêu cầu bị từ chối vì xung đột trong quá trình xử lý giao dịch',
  },
  {
    code: '44',
    description: 'Giao dịch bị từ chối vì mã thanh toán không hợp lệ',
  },
  {
    code: '1001',
    description:
      'Giao dịch thanh toán thất bại do tài khoản người dùng không đủ tiền',
  },
  {
    code: '1002',
    description: 'Giao dịch bị từ chối do nhà phát hành tài khoản thanh toán',
  },
  {
    code: '1003',
    description: 'Giao dịch bị đã bị hủy',
  },
  {
    code: '1004',
    description:
      'Giao dịch thất bại do số tiền thanh toán vượt quá hạn mức thanh toán của người dùng',
  },
  {
    code: '1005',
    description: 'Giao dịch thất bại do url hoặc QR code đã hết hạn',
  },
  {
    code: '1006',
    description:
      'Giao dịch thất bại do người dùng đã từ chối xác nhận thanh toán',
  },
  {
    code: '1007',
    description:
      'Giao dịch bị từ chối vì tài khoản không tồn tại hoặc đang ở trạng thái ngưng hoạt động',
  },
  {
    code: '1026',
    description: 'Giao dịch bị hạn chế theo thể lệ chương trình khuyến mãi',
  },
  {
    code: '1030',
    description: 'Đơn hàng thanh toán thất bại do thông tin không hợp lệ',
  },
  {
    code: '1080',
    description:
      'Giao dịch hoàn tiền bị từ chối. Giao dịch thanh toán ban đầu không được tìm thấy',
  },
  {
    code: '1081',
    description:
      'Giao dịch hoàn tiền bị từ chối. Giao dịch thanh toán ban đầu có thể đã được hoàn',
  },
  {
    code: '2001',
    description: 'Giao dịch thất bại do sai thông tin liên kết',
  },
  {
    code: '2007',
    description: 'Giao dịch thất bại do liên kết hiện đang bị tạm khóa',
  },
  {
    code: '3001',
    description: 'Liên kết thất bại do người dùng từ chối xác nhận',
  },
  {
    code: '3002',
    description: 'Liên kết bị từ chối do không thỏa quy tắc liên kết',
  },
  {
    code: '3003',
    description: 'Hủy liên kết bị từ chối do đã vượt quá số lần hủy',
  },
  {
    code: '3004',
    description: 'Liên kết này không thể hủy do có giao dịch đang chờ xử lý',
  },
  {
    code: '4001',
    description:
      'Giao dịch bị hạn chế do người dùng chưa hoàn tất xác thực tài khoản',
  },
  {
    code: '4010',
    description: 'Quá trình xác minh OTP thất bại',
  },
  {
    code: '4011',
    description: 'OTP chưa được gửi hoặc hết hạn',
  },
  {
    code: '4100',
    description: 'Giao dịch thất bại do người dùng không đăng nhập thành công',
  },
  {
    code: '4015',
    description: 'Quá trình xác minh 3DS thất bại',
  },
  {
    code: '10',
    description: 'Hệ thống đang được bảo trì',
  },
  {
    code: '99',
    description: 'Lỗi không xác định',
  },
];

export const DATA_SOURCE_FORMAT_TYPE = [
  { label: 'csv', value: 'csv' },
  { label: 'json', value: 'json' },
  // { label: 'jsonl', value: 'jsonl' },
  { label: 'excel', value: 'excel' },
  // { label: 'excel_binary', value: 'excel_binary' },
  // { label: 'fwf', value: 'fwf' },
  // { label: 'feather', value: 'feather' },
  // { label: 'parquet', value: 'parquet' },
  // { label: 'yaml', value: 'yaml' },
];

export const S3_OUTPUT_FORMAT = [
  { label: 'CSV: Giá trị được phân tách bằng dấu phẩy', value: 'CSV' },
  { label: 'JSON Lines: JSON được phân cách bằng dòng mới', value: 'JSONL' },
];

export const COMPRESSIONS = [
  { label: 'Không nén', value: 'csv' },
  { label: 'GZIP', value: 'json' },
];

export const FLATTENING = [
  { label: 'Không làm phẳng', value: 'csv' },
  { label: 'Làm phẳng cấp độ gốc', value: 'json' },
];

export const COMPRESSION_CODEC = [
  { label: 'Không nén', value: 'csv' },
  { label: 'Deflate', value: 'json' },
  { label: 'bzip2', value: 'json' },
  { label: 'xz', value: 'json' },
  { label: 'zstandard', value: 'json' },
  { label: 'snappy', value: 'json' },
];

export const BUCKET_REGIONS = [
  {
    value: 'us-east-2',
    label: 'Miền Đông Hoa Kỳ (Ohio)',
  },
  {
    value: 'us-east-1',
    label: 'Miền Đông Hoa Kỳ (Virginia)',
  },
  {
    value: 'us-west-1',
    label: 'Miền Tây Hoa Kỳ (Bắc California)',
  },
  {
    value: 'us-west-2',
    label: 'Miền Tây Hoa Kỳ (Oregon)',
  },
  {
    value: 'af-south-1',
    label: 'Châu Phi (Cape Town)',
  },
  {
    value: 'ap-east-1',
    label: 'Châu Á Thái Bình Dương (Hồng Kông)',
  },
  {
    value: 'ap-south-2',
    label: 'Châu Á Thái Bình Dương (Hyderabad)',
  },
  {
    value: 'ap-southeast-3',
    label: 'Châu Á Thái Bình Dương (Jakarta)',
  },
  {
    value: 'ap-southeast-4',
    label: 'Châu Á Thái Bình Dương (Melbourne)',
  },
  {
    value: 'ap-south-1',
    label: 'Châu Á Thái Bình Dương (Mumbai)',
  },
  {
    value: 'ap-northeast-3',
    label: 'Châu Á Thái Bình Dương (Osaka)',
  },
  {
    value: 'ap-northeast-2',
    label: 'Châu Á Thái Bình Dương (Seoul)',
  },
  {
    value: 'ap-southeast-1',
    label: 'Châu Á Thái Bình Dương ( Singapore)',
  },
  {
    value: 'ap-southeast-2',
    label: 'Châu Á Thái Bình Dương (Sydney)',
  },
  {
    value: 'ap-northeast-1',
    label: 'Châu Á Thái Bình Dương (Tokyo)',
  },
  {
    value: 'ca-central-1',
    label: 'Canada (Miền Trung)',
  },
  {
    value: 'ca-west-1',
    label: 'Tây Canada (Calgary)',
  },
  {
    value: 'eu-central-1',
    label: 'Châu Âu (Frankfurt)',
  },
  {
    value: 'eu-west-1',
    label: 'Châu Âu (Ireland)',
  },
  {
    value: 'eu-west-2',
    label: 'Châu Âu (London)',
  },
  {
    value: 'eu-south-1',
    label: 'Châu Âu (Milan)',
  },
  {
    value: 'eu-west-3',
    label: 'Châu Âu (Paris)',
  },
  {
    value: 'eu-south-2',
    label: 'Châu Âu (Tây Ban Nha)',
  },
  {
    value: 'eu-north-1',
    label: 'Châu Âu (Stockholm)',
  },
  {
    value: 'eu-central-2',
    label: 'Châu Âu (Zurich)',
  },
  {
    value: 'il-central-1',
    label: 'Israel (Tel Aviv)',
  },
  {
    value: 'me-south-1',
    label: 'Trung Đông (Bahrain)',
  },
  {
    value: 'me-central-1',
    label: 'Trung Đông (UAE)',
  },
  {
    value: 'sa-east-1',
    label: 'Nam Mỹ (São Paulo)',
  },
];
export const DATA_SOURCE_SFTP_FORMAT_TYPE = [
  { label: 'csv', value: 'csv' },
  { label: 'json', value: 'json' },
];

export const DATA_SOURCE_STORAGE_PROVIDE = [
  { label: 'HTTPS: Web công cộng', value: 'HTTPS' },
  // { label: 'GCS: Bộ nhớ đám mây của Google', value: 'GCS' },
  // { label: 'S3: Dịch vụ web của amazon', value: 'S3' },
  // { label: 'AzBlob: Lưu trữ Azure Blob', value: 'AzBlob' },
  // { label: 'SSH: Vỏ bọc an toàn', value: 'SSH' },
  // { label: 'SCP: Giao thức sao chép an toàn', value: 'SCP' },
  { label: 'SFTP: Bảo mật truyền tệp', value: 'SFTP' },
  // { label: 'Hệ thống tập tin cục bộ (có giới hạn)', value: 'local' },
];

export const SCHEDULE_TYPES = [
  { label: 'Lập lịch', value: 'basic' },
  {
    label: 'Thủ công',
    value: 'manual',
  },
  {
    label: 'Biểu thức cron',
    value: 'cron',
  },
];

export const REPLICATION_FREQUENCY = [
  {
    label: 'Mỗi giờ',
    value: 1,
  },
  {
    label: '2 giờ 1 lần',
    value: 2,
  },
  {
    label: '3 giờ 1 lần',
    value: 3,
  },
  {
    label: '6 giờ 1 lần',
    value: 6,
  },
  {
    label: '8 giờ 1 lần',
    value: 8,
  },
  {
    label: '12 giờ 1 lần',
    value: 12,
  },
  {
    label: 'Mỗi ngày',
    value: 24,
  },
];

export const DETECT_PROPAGATE_SCHEMA = [
  { label: 'Truyền bá những thay đổi của trường', value: 'propagate_columns' },
  {
    label: 'Tuyên truyền tất cả các thay đổi của trường và luồng',
    value: 'propagate_fully',
  },
  { label: 'Phát hiện các thay đổi và phê duyệt thủ công', value: 'ignore' },
  { label: 'Phát hiện các thay đổi và tạm dừng kết nối', value: 'disable' },
];

export const SSH_TUNEL_METHOD = [
  { label: 'No Tunnel', value: 'no_tunnel' },
  { label: 'SSH Key Authentication', value: 'key_authen' },
  { label: 'Password Authentication', value: 'password_authen' },
];

export const SSL_METHOD_KEY = {
  UN_ENCRYPTED: 'unencrypted',
  TRUST_SERVER_CERTIFICATE: 'encrypted_trust_server_certificate',
  VERIFY_CERTIFICATE: 'encrypted_verify_certificate',
};
export const SslMethodOptions = [
  {
    label: 'Không mã hóa',
    value: SSL_METHOD_KEY.UN_ENCRYPTED,
  },
  {
    label: 'Được mã hóa (Chứng chỉ máy chủ tin cậy)',
    value: SSL_METHOD_KEY.TRUST_SERVER_CERTIFICATE,
  },
  {
    label: 'Được mã hóa (Chứng chỉ đã được xác minh)',
    value: SSL_METHOD_KEY.VERIFY_CERTIFICATE,
  },
];

export const UPDATE_METHOD_MSSQL_KEY = {
  CDC: 'CDC',
  STANDARD: 'STANDARD',
  CDLO: 'CDLO',
  TOKEN: 'TOKEN',
};
export const updateMethodMssqlOption = [
  {
    label: 'Đọc các thay đổi bằng cách sử dụng Thu thập dữ liệu thay đổi (CDC)',
    value: UPDATE_METHOD_MSSQL_KEY.CDC,
  },
  {
    label: 'Quét các thay đổi bằng con trỏ do người dùng xác định',
    value: UPDATE_METHOD_MSSQL_KEY.STANDARD,
  },
];
export const updateMethodMssqlAuthenticationOption = [
  {
    label: 'Basic Auth',
    value: UPDATE_METHOD_MSSQL_KEY.CDLO,
  },
  {
    label: 'OAuth 2.0',
    value: UPDATE_METHOD_MSSQL_KEY.TOKEN,
  },
];

export const UPDATE_METHOD_URL_KEY = {
  BASIC: 'basic',
  OAUTH: 'oauth2.0',
};

export const authenticationOptionPagination = [
  {
    label: 'Basic Auth',
    value: UPDATE_METHOD_URL_KEY.BASIC,
  },
  {
    label: 'OAuth 2.0',
    value: UPDATE_METHOD_URL_KEY.OAUTH,
  },
];

export const TUNNEL_METHOD_KEY = {
  NO_TUNNEL: 'NO_TUNNEL',
  SSH_KEY_AUTH: 'SSH_KEY_AUTH',
  PASSWORD_AUTH: 'SSH_PASSWORD_AUTH',
};

export const tunnelMethodOptions = [
  {
    label: 'Không sử dụng',
    value: TUNNEL_METHOD_KEY.NO_TUNNEL,
  },
  {
    label: 'Xác thực khóa SSH',
    value: TUNNEL_METHOD_KEY.SSH_KEY_AUTH,
  },
  {
    label: 'Xác thực mật khẩu',
    value: TUNNEL_METHOD_KEY.PASSWORD_AUTH,
  },
];

export const AUTHENTICATION_OPTIONS = [
  {
    label: 'Xác thực khóa SSH',
    value: TUNNEL_METHOD_KEY.SSH_KEY_AUTH,
  },
  {
    label: 'Xác thực mật khẩu',
    value: TUNNEL_METHOD_KEY.PASSWORD_AUTH,
  },
];

export const SSL_MODE_KEY = {
  DISABLE: 'disable',
  ALLOW: 'allow',
  PREFER: 'prefer',
  REQUIRE: 'require',
  VERIFY_CA: 'verify-ca',
  VERIFY_FULL: 'verify-full',
};
export const sslModeOptions = [
  {
    label: 'Vô hiệu hóa',
    value: SSL_MODE_KEY.DISABLE,
  },
  {
    label: 'Cho phép',
    value: SSL_MODE_KEY.ALLOW,
  },
  {
    label: 'Thích hơn',
    value: SSL_MODE_KEY.PREFER,
  },
  {
    label: 'Yêu cầu',
    value: SSL_MODE_KEY.REQUIRE,
  },
  {
    label: 'Xác minh một phần',
    value: SSL_MODE_KEY.VERIFY_CA,
  },
  {
    label: 'Xác minh đầy đủ',
    value: SSL_MODE_KEY.VERIFY_FULL,
  },
];

export const UPDATE_METHOD_POSTGRES_KEY = {
  CDC: 'CDC',
  XMIN: 'Xmin',
  STANDARD: 'Standard',
  CDA: 'CDA',
  TOKEN: 'TOKEN',
};

export const updateMethodPostgresOptions = [
  {
    label: 'Đọc các thay đổi bằng cách sử dụng nhật ký ghi trước (CDC)',
    value: UPDATE_METHOD_POSTGRES_KEY.CDC,
  },
  {
    label: 'Phát hiện thay đổi với cột hệ thống Xmin',
    value: UPDATE_METHOD_POSTGRES_KEY.XMIN,
  },
  {
    label: 'Quét các thay đổi bằng con trỏ do người dùng xác định',
    value: UPDATE_METHOD_POSTGRES_KEY.STANDARD,
  },
];

export const lsnCommitBehaviourOptions = [
  {
    label: 'Trong khi đọc dữ liệu',
    value: 'While reading Data',
  },
  {
    label: 'Sau khi tải dữ liệu ở đích',
    value: 'After loading Data in the destination',
  },
];

export const SSL_MODE_MYSQL_KEY = {
  PREFERRED: 'preferred',
  REQUIRED: 'required',
  VERIFY_CA: 'verify_ca',
  VERIFY_IDENTITY: 'verify_identity',
};

export const sslModeMysqlOptions = [
  {
    label: 'Ưu tiên',
    value: SSL_MODE_MYSQL_KEY.PREFERRED,
  },
  {
    label: 'Bắt buộc',
    value: SSL_MODE_MYSQL_KEY.REQUIRED,
  },
  {
    label: 'Xác minh CA',
    value: SSL_MODE_MYSQL_KEY.VERIFY_CA,
  },
  {
    label: 'Xác minh danh tính',
    value: SSL_MODE_MYSQL_KEY.VERIFY_IDENTITY,
  },
];

export const UPDATE_METHOD_MYSQL_KEY = {
  CDC: 'CDC',
  STANDARD: 'STANDARD',
};
export const updateMethodMysqlOption = [
  {
    label: 'Đọc các thay đổi bằng Nhật ký ghi trước (CDC)',
    value: UPDATE_METHOD_MYSQL_KEY.CDC,
  },
  {
    label: 'Quét các thay đổi bằng con trỏ do người dùng xác định',
    value: UPDATE_METHOD_MYSQL_KEY.STANDARD,
  },
];

export const ORACLE_CONNECTION_TYPE = {
  SERVICE_NAME: 'service_name',
  SID: 'sid',
};
export const oracleConnectionTypeOptions = [
  {
    label: 'Tên dịch vụ',
    value: ORACLE_CONNECTION_TYPE.SERVICE_NAME,
  },
  {
    label: 'ID hệ thống (SID)',
    value: ORACLE_CONNECTION_TYPE.SID,
  },
];

export const ORACLE_ENCRYPTION_KEY = {
  UN_ENCRYPTED: 'unencrypted',
  NNE: 'client_nne',
  TLS: 'encrypted_verify_certificate',
};

export const oracleEncryptionOptions = [
  {
    label: 'Không được mã hóa',
    value: ORACLE_ENCRYPTION_KEY.UN_ENCRYPTED,
  },
  {
    label: 'Mã hóa mạng gốc (NNE)',
    value: ORACLE_ENCRYPTION_KEY.NNE,
  },
  {
    label: 'Mã hóa TLS (xác minh chứng chỉ)',
    value: ORACLE_ENCRYPTION_KEY.TLS,
  },
];

export const oracleEncryptionAlgorithmOptions = [
  {
    label: 'AES256',
    value: 'AES256',
  },
  {
    label: 'RC4_56',
    value: 'RC4_56',
  },
  {
    label: '3DES168',
    value: '3DES168',
  },
];

// search engine
export const SELECT_SCHEDULE_REPEAT = [
  {
    label: 'Giờ',
    value: 'hour',
  },
  {
    label: 'Ngày',
    value: 'date',
  },
  {
    label: 'Tuần',
    value: 'week',
  },
  {
    label: 'Tháng',
    value: 'month',
  },
];

export const SOURCE_TYPES = [
  {
    label: SOURCE_DEFINITION_MSSQL_NAME,
    value: SOURCE_DEFINITION_MSSQL_ID,
  },
  {
    label: SOURCE_DEFINITION_POSTGRES_NAME,
    value: SOURCE_DEFINITION_POSTGRES_ID,
  },
  {
    label: SOURCE_DEFINITION_MYSQL_NAME,
    value: SOURCE_DEFINITION_MYSQL_ID,
  },
  // {
  //   label: SOURCE_DEFINITION_ORACLE_NAME,
  //   value: SOURCE_DEFINITION_ORACLE_ID,
  // },
  // {
  //   label: SOURCE_DEFINITION_API_NAME,
  //   value: SOURCE_DEFINITION_API_ID,
  // },
  // {
  //   label: SOURCE_DEFINITION_FILE_NAME,
  //   value: SOURCE_DEFINITION_FILE_ID,
  // },
];

export const SCHEDULE_DATA_AGGREGATION_AUTO = [
  {
    label: 'Giờ/lần',
    value: 'hour',
  },
  {
    label: 'Ngày/lần',
    value: 'date',
  },
  {
    label: 'Tuần/lần',
    value: 'week',
  },
  {
    label: 'Tháng/lần',
    value: 'month',
  },
];

export const SCHEDULE_DATA_SERVICE_MODE = [
  {
    label: 'Nội bộ',
    value: 'private',
  },
  {
    label: 'Khác',
    value: 'public',
  },
];

export const SOURCE_UNITS = [
  {
    label: 'Học viện Chính trị Quốc gia Hồ Chí Minh',
    value: 'HCM',
  },
  {
    label: 'Học viện Báo chí tuyên truyền',
    value: 'BCTT',
  },
  {
    label: 'Học viện chính trị',
    value: 'CT',
  },
];

export const SOURCE_SERVICES = [
  {
    label: 'Vụ 1',
    value: '1',
  },
  {
    label: 'Vụ 2',
    value: '2',
  },
  {
    label: 'Vụ 3',
    value: '3',
  },
];

export const CLASSIFY = [
  {
    label: 'KPIs về Học viện',
    value: '1',
  },
  {
    label: 'KPIs về đào tạo - tình hình đào tạo',
    value: '2',
  },
  {
    label: 'KPIs về giảng viên - đánh giá chất lượng',
    value: '3',
  },
  {
    label: 'KPIs về học viên - sinh viên',
    value: '4',
  },
  {
    label: 'KPIs về hoạt động nghiên cứu khoa học',
    value: '5',
  },
  {
    label: 'KPIs về đào tạo - tình hình học tập',
    value: '6',
  },
  {
    label: 'KPIs về đào tạo - đánh giá kết quả học tập',
    value: '7',
  },
];
