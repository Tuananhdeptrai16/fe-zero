import {
  KEY_DOCUMENT_CODE_NUMBER,
  KEY_DOCUMENT_NUMBER,
} from 'src/shared/constants/SettingSystem';
import { FIELD_MAP } from 'src/shared/constants/FieldKeyMap';

const COL_SPAN = 8;
const WIDTH_LABEL_COL_1 = 8;
const WIDTH_LABEL_COL_2 = 8;
const WIDTH_LABEL_COL_3 = 8;
const WIDTH_LABEL_COL_1_XL = 10;
const WIDTH_LABEL_COL_2_XL = 8;
const WIDTH_LABEL_COL_3_XL = 10;

const renderLayoutWidthLabel = (width, widthXl) => {
  return {
    labelCol: { xxl: { span: width }, xl: { span: widthXl } },
  };
};

export const INPUT_FORM_VERDICT = [
  {
    type: 'input',
    name: KEY_DOCUMENT_CODE_NUMBER,
    label: 'judicial.verdictCode',
    colSpan: COL_SPAN,
    layout: renderLayoutWidthLabel(WIDTH_LABEL_COL_1, WIDTH_LABEL_COL_1_XL),
  },
  {
    type: 'input',
    name: KEY_DOCUMENT_NUMBER,
    label: 'judicial.verdictNo',
    colSpan: COL_SPAN,
    layout: renderLayoutWidthLabel(WIDTH_LABEL_COL_2, WIDTH_LABEL_COL_2_XL),
  },
  {
    type: 'input',
    name: FIELD_MAP.NGAY_TUYEN_AN,
    label: 'judicial.sentenceDay',
    colSpan: COL_SPAN,
    layout: renderLayoutWidthLabel(WIDTH_LABEL_COL_3, WIDTH_LABEL_COL_3_XL),
  },
  {
    type: 'input',
    name: FIELD_MAP.TOA_AN_DA_TUYEN_BAN_AN,
    label: 'judicial.court',
    colSpan: COL_SPAN * 2,
    layout: renderLayoutWidthLabel(
      WIDTH_LABEL_COL_1 / 2,
      WIDTH_LABEL_COL_1_XL / 2,
    ),
  },
  { colSpan: COL_SPAN }, // Empty column
  {
    type: 'input',
    name: FIELD_MAP.TOI_DANH,
    label: 'judicial.crime',
    colSpan: COL_SPAN * 2,
    layout: renderLayoutWidthLabel(
      WIDTH_LABEL_COL_1 / 2,
      WIDTH_LABEL_COL_1_XL / 2,
    ),
  },
  { colSpan: COL_SPAN }, // Empty column
  {
    type: 'input',
    name: FIELD_MAP.DIEU_KHOAN,
    label: 'judicial.term',
    colSpan: COL_SPAN * 2,
    layout: renderLayoutWidthLabel(
      WIDTH_LABEL_COL_1 / 2,
      WIDTH_LABEL_COL_1_XL / 2,
    ),
  },
  { colSpan: COL_SPAN }, // Empty column
  {
    type: 'input',
    name: FIELD_MAP.HINH_PHAT_CHINH,
    label: 'judicial.majorPenalty',
    colSpan: COL_SPAN * 2,
    layout: renderLayoutWidthLabel(
      WIDTH_LABEL_COL_1 / 2,
      WIDTH_LABEL_COL_1_XL / 2,
    ),
  },
  { colSpan: COL_SPAN }, // Empty column
  {
    type: 'input',
    name: FIELD_MAP.THOI_GIAN_PHAT_TU,
    label: 'judicial.jailTime',
    colSpan: COL_SPAN * 2,
    layout: renderLayoutWidthLabel(
      WIDTH_LABEL_COL_1 / 2,
      WIDTH_LABEL_COL_1_XL / 2,
    ),
  },
  { colSpan: COL_SPAN }, // Empty column
  {
    type: 'textarea',
    name: FIELD_MAP.GHI_CHU_HINH_PHAT_CHINH,
    label: 'judicial.keyPenNote',
    colSpan: COL_SPAN * 2,
    layout: renderLayoutWidthLabel(
      WIDTH_LABEL_COL_1 / 2,
      WIDTH_LABEL_COL_1_XL / 2,
    ),
  },
  { colSpan: COL_SPAN }, // Empty column
  {
    type: 'textarea',
    name: FIELD_MAP.HINH_PHAT_BO_SUNG,
    label: 'judicial.additionPen',
    colSpan: COL_SPAN * 2,
    layout: renderLayoutWidthLabel(
      WIDTH_LABEL_COL_1 / 2,
      WIDTH_LABEL_COL_1_XL / 2,
    ),
  },
  { colSpan: COL_SPAN }, // Empty column
  {
    type: 'textarea',
    name: FIELD_MAP.NGHIA_VU_DAN_SU,
    label: 'judicial.civilDuty',
    colSpan: COL_SPAN * 2,
    layout: renderLayoutWidthLabel(
      WIDTH_LABEL_COL_1 / 2,
      WIDTH_LABEL_COL_1_XL / 2,
    ),
  },
  { colSpan: COL_SPAN }, // Empty column
  {
    type: 'textarea',
    name: FIELD_MAP.BIEN_PHAP_TU_PHAP,
    label: 'judicial.measure',
    colSpan: COL_SPAN * 2,
    layout: renderLayoutWidthLabel(
      WIDTH_LABEL_COL_1 / 2,
      WIDTH_LABEL_COL_1_XL / 2,
    ),
  },
  { colSpan: COL_SPAN },

  {
    type: 'input',
    name: FIELD_MAP.AN_PHI,
    label: 'judicial.courtFee',
    colSpan: COL_SPAN,
    layout: renderLayoutWidthLabel(WIDTH_LABEL_COL_1, WIDTH_LABEL_COL_1_XL),
  },
  {
    type: 'input',
    name: FIELD_MAP.NGAY_CHAP_HANH,
    label: 'judicial.executionDate',
    colSpan: COL_SPAN,
    layout: renderLayoutWidthLabel(WIDTH_LABEL_COL_2, WIDTH_LABEL_COL_2_XL + 3),
  },
  { colSpan: COL_SPAN }, // Empty column
  {
    type: 'input',
    name: FIELD_MAP.GHI_CHU_NGAY_CHAP_HANH,
    label: 'judicial.note',
    colSpan: COL_SPAN * 2,
    layout: renderLayoutWidthLabel(
      WIDTH_LABEL_COL_1 / 2,
      WIDTH_LABEL_COL_1_XL / 2,
    ),
  },
  { colSpan: COL_SPAN },
  {
    type: 'textarea',
    name: 'notes',
    label: 'table.note',
    colSpan: COL_SPAN * 2,
    layout: renderLayoutWidthLabel(
      WIDTH_LABEL_COL_1 / 2,
      WIDTH_LABEL_COL_1_XL / 2,
    ),
  },
  { colSpan: COL_SPAN }, // Empty column

  {
    type: 'input',
    name: FIELD_MAP.TRANG_THAI,
    label: 'judicial.hcCbs',
    colSpan: COL_SPAN,
    layout: renderLayoutWidthLabel(WIDTH_LABEL_COL_1, WIDTH_LABEL_COL_1_XL),
  },
  {
    type: 'input',
    name: FIELD_MAP.NGAY_LAP,
    label: 'judicial.createdAt',
    colSpan: COL_SPAN,
    layout: renderLayoutWidthLabel(WIDTH_LABEL_COL_2, WIDTH_LABEL_COL_2_XL + 3),
  },
  { colSpan: COL_SPAN }, // Empty column
  {
    type: 'input',
    name: FIELD_MAP.GHI_CHU_NGAY_CHAP_HANH,
    label: 'judicial.dateCompletionSentence',
    colSpan: COL_SPAN * 2,
    layout: renderLayoutWidthLabel(
      WIDTH_LABEL_COL_1 / 2,
      WIDTH_LABEL_COL_1_XL / 2,
    ),
  },
];
