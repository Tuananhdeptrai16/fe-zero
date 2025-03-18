import {
  COMMON_DOCUMENT_FIELD,
  PROHIBIT_POSITION_DOCUMENT_FIELD,
  RELATED_DOCUMENT_FIELD,
  VERDICT_FIELD,
} from 'src/shared/constants/FieldKeyMap';

export const ORGANIZATION_CODE = {
  THA: 'THA',
  CA: 'CA',
  VKS: 'VKS',
  TA: 'TA',
};

export const ORGANIZATIONS = [
  {
    value: ORGANIZATION_CODE.THA,
    label: 'Thi hành án',
    fields: [
      RELATED_DOCUMENT_FIELD,
      PROHIBIT_POSITION_DOCUMENT_FIELD,
      COMMON_DOCUMENT_FIELD,
    ],
  },
  {
    value: ORGANIZATION_CODE.CA,
    label: 'Công an',
    fields: [
      RELATED_DOCUMENT_FIELD,
      PROHIBIT_POSITION_DOCUMENT_FIELD,
      COMMON_DOCUMENT_FIELD,
    ],
  },
  {
    value: ORGANIZATION_CODE.VKS,
    label: 'Viện Kiểm Sát',
    fields: [
      RELATED_DOCUMENT_FIELD,
      PROHIBIT_POSITION_DOCUMENT_FIELD,
      COMMON_DOCUMENT_FIELD,
    ],
  },
  {
    value: ORGANIZATION_CODE.TA,
    label: 'Tòa án',
    fields: [
      VERDICT_FIELD,
      RELATED_DOCUMENT_FIELD,
      PROHIBIT_POSITION_DOCUMENT_FIELD,
      COMMON_DOCUMENT_FIELD,
    ],
  },
];
