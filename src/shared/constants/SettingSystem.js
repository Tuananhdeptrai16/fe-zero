import { INPUT_TYPE, INPUT_TYPE_LABEL } from 'src/shared/constants/InputType';

export const KEY_OTHER = 'other';
export const KEY_DOCUMENT_NUMBER = 'case_number';
export const KEY_DOCUMENT_CODE_NUMBER = 'code_case_number';
export const KEY_DOCUMENT_COURT = 'court';
export const KEY_DOCUMENT_NOTES = 'notes';
export const KEY_PUBLISH_DATE = 'date_of_verdict';

export const KEY_FULL_NAME = 'full_name';

export const KEY_GENDER = 'gender';
export const KEY_BIRTHDAY = 'date_of_birth';

export const KEY_FORM_SETTING_SYSTEM = [
  {
    value: KEY_DOCUMENT_NUMBER,
    label: 'Số bản án',
  },
  {
    value: KEY_PUBLISH_DATE,
    label: 'Ngày ban hành bản án',
  },
  {
    value: KEY_DOCUMENT_COURT,
    label: 'Tòa án',
  },
  {
    value: KEY_DOCUMENT_NOTES,
    label: 'Ghi chú',
  },
  {
    value: 'name',
    label: 'Tên bản án/quyết định/cấm ĐNCV',
  },
  {
    value: KEY_OTHER,
    label: 'Dữ liệu khác',
  },
];
export const TYPE_FORM_SETTING_SYSTEM = [
  {
    value: INPUT_TYPE.TEXT,
    label: INPUT_TYPE_LABEL[INPUT_TYPE.TEXT],
  },
  {
    value: INPUT_TYPE.NUMBER,
    label: INPUT_TYPE_LABEL[INPUT_TYPE.NUMBER],
  },
  {
    value: INPUT_TYPE.CHECKBOX,
    label: INPUT_TYPE_LABEL[INPUT_TYPE.CHECKBOX],
  },
  {
    value: INPUT_TYPE.TEXT_AREA,
    label: INPUT_TYPE_LABEL[INPUT_TYPE.TEXT_AREA],
  },
  {
    value: INPUT_TYPE.DATE,
    label: INPUT_TYPE_LABEL[INPUT_TYPE.DATE],
  },
  {
    value: INPUT_TYPE.DATE_RANGE,
    label: INPUT_TYPE_LABEL[INPUT_TYPE.DATE_RANGE],
  },
  {
    value: INPUT_TYPE.SELECT,
    label: INPUT_TYPE_LABEL[INPUT_TYPE.SELECT],
  },
  {
    value: INPUT_TYPE.SELECT_ASYNC,
    label: INPUT_TYPE_LABEL[INPUT_TYPE.SELECT_ASYNC],
  },
];
export const TYPE_SETTING_SYSTEM = [
  {
    value: INPUT_TYPE.TEXT_AREA,
    label: INPUT_TYPE_LABEL[INPUT_TYPE.TEXT_AREA],
  },
  {
    value: INPUT_TYPE.TEXT,
    label: INPUT_TYPE_LABEL[INPUT_TYPE.TEXT],
  },
  {
    value: INPUT_TYPE.IMAGE,
    label: INPUT_TYPE_LABEL[INPUT_TYPE.IMAGE],
  },
  {
    value: INPUT_TYPE.LIST_IMAGE,
    label: INPUT_TYPE_LABEL[INPUT_TYPE.LIST_IMAGE],
  },
  {
    value: INPUT_TYPE.LIST_IMAGE_LINK,
    isListItem: true,
    label: INPUT_TYPE_LABEL[INPUT_TYPE.LIST_IMAGE_LINK],
  },
  {
    value: INPUT_TYPE.LINK_VIDEO,
    label: INPUT_TYPE_LABEL[INPUT_TYPE.LINK_VIDEO],
  },
  {
    value: INPUT_TYPE.LIST_VIDEO,
    isListItem: true,
    label: INPUT_TYPE_LABEL[INPUT_TYPE.LIST_VIDEO],
  },
  {
    value: INPUT_TYPE.FILE,
    label: INPUT_TYPE_LABEL[INPUT_TYPE.FILE],
  },
  {
    value: INPUT_TYPE.BANNER_ADS,
    label: INPUT_TYPE_LABEL[INPUT_TYPE.BANNER_ADS],
  },
];
