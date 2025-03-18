export const KEY_ACTION_COLUMN = 'action';

export const DIRECTION_QUERY = {
  DESCEND: 'desc',
  ASCEND: 'asc',
};

export const TABLE_SORT_VALUE = {
  DESCEND: 'descend',
  ASCEND: 'ascend',
};

export const minItemShowFilter = 3;

export const KEY_SEARCH_PARAM_DT = {
  PAGE: 'p',
  PAGE_SIZE: 's',
  SEARCH: 'q',
  SORT: 'a',
  PAIR_KEY: ':',
  FILTER: 'f',
  TAB: 't',
  PATH: 'path',
};

export const FILTER_TYPE = {
  TEXT: 'text',
  NUMBER: 'number',
  SLIDER: 'slider',
  SELECT_PROVINCE: 'select_province',
  SELECT_AREA: 'select_area',
  SELECT: 'select',
  SELECT_ASYNC: 'select_async',
  DATE: 'date',
  RANGE_DATE_PICKER: 'range_date_picker',
  PERCENT: 'percent',
};

export const FILTER_OPERATION = {
  EQ: 'eq',
  LIKE: 'like',
  IN: 'in',
  IS_NULL: 'is_null',
  NIN: 'nin',
  LT: 'lt',
  LTE: 'lte',
  GT: 'gt',
  GTE: 'gte',
  LIKE_IGNORE_CASE: 'like_ignore_case',
  NE: 'ne',
};

export const GENDER_LIST = [
  { label: 'Nam', value: 'nam' },
  { label: 'Nữ', value: 'nữ' },
  { label: 'Khác', value: 'khác' },
];

export const GENDER_MAPPING = {
  nam: 'Nam',
  nữ: 'Nữ',
  male: 'Nam',
  female: 'Nữ',
};

export const CITIZEN_RELATIONS = [
  { label: 'Mẹ', value: 'mother' },
  { label: 'Cha', value: 'father' },
  { label: 'Vợ', value: 'wife' },
  { label: 'Chồng', value: 'husband' },
  { label: 'Anh trai', value: 'brother' },
  { label: 'Chị gái', value: 'sister' },
];

export const METHOD_LIST = [
  {
    label: 'GET',
    value: 'GET',
  },
  {
    label: 'POST',
    value: 'POST',
  },
  {
    label: 'PUT',
    value: 'PUT',
  },
  {
    label: 'DELETE',
    value: 'DELETE',
  },
];

export const TYPE_DIGITIZED_DATA_LIST = [
  {
    label: 'classify',
    value: 'classify',
  },
  {
    label: 'extract_only',
    value: 'extract_only',
  },
  {
    label: 'ocr_extract',
    value: 'ocr_extract',
  },
  {
    label: 'ocr_bulk_extract',
    value: 'ocr_bulk_extract',
  },
  { label: 'ocr', value: 'ocr' },
];

export const KEY_PLATFORM = {
  DISTRICT: 'district',
  DEPARTMENT: 'department',
  PROVINCE: 'province',
  LGSP: 'lgsp',
  CITY: 'city',
  PROVINCIAL_INFORMATION_PORTAL: 'provincial_information_portal',
  OTHER_SYSTEMS_PROCURACY: 'other_systems_other_systems_procuracy',
  OTHER_SYSTEMS_COURT: 'other_systems_court',
  OTHER_SYSTEM_THA: 'other_system_tha',
  OTHER_SYSTEMS_POLICE: 'other_systems_police',
};
export const PLATFORMS = [
  {
    value: KEY_PLATFORM.DISTRICT,
    label: 'Nền tảng kho dữ liệu dùng chung Quận/Huyện',
  },
  {
    value: KEY_PLATFORM.DEPARTMENT,
    label: 'Nền tảng kho dữ liệu dùng chung Sở/Ngành',
  },
  {
    value: KEY_PLATFORM.PROVINCE,
    label: 'Nền tảng kho dữ liệu dùng chung tỉnh',
  },
  { value: KEY_PLATFORM.LGSP, label: 'Nền tảng LGSP' },
  { value: KEY_PLATFORM.CITY, label: 'Nền tảng điều hành đô thị Thông minh' },
  {
    value: KEY_PLATFORM.PROVINCIAL_INFORMATION_PORTAL,
    label: 'Cổng thông tin tỉnh',
  },
  {
    value: KEY_PLATFORM.OTHER_SYSTEMS_PROCURACY,
    label: 'Hệ thống khác tại Viện kiểm sát',
  },
  {
    value: KEY_PLATFORM.OTHER_SYSTEMS_COURT,
    label: 'Hệ thống khác tại Tòa án',
  },
  {
    value: KEY_PLATFORM.OTHER_SYSTEM_THA,
    label: 'Hệ thống khác tại Thi hành án',
  },
  {
    value: KEY_PLATFORM.OTHER_SYSTEMS_POLICE,
    label: 'Hệ thống khác tại Công an',
  },
];
