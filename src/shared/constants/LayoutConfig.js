export const LAYOUT_TYPE_CODE = {
  IMG_ABOVE: 'layout_img_above',
  IMG_ASIDE: 'layout_img_side',
  TITLE_TOP: 'layout_title_top',
  IMG_ONLY: 'layout_img_only',
  TEXT_ONLY: 'layout_text_only',
};

export const REDIRECT_LAYOUT_TYPES = [
  {
    title: 'Hình ảnh ở trên',
    code: LAYOUT_TYPE_CODE.IMG_ABOVE,
    image: '/assets/images/layout/layout_img_above.png',
  },
  {
    title: 'Hình ảnh bên cạnh',
    code: LAYOUT_TYPE_CODE.IMG_ASIDE,
    image: '/assets/images/layout/layout_img_side.png',
  },
  {
    title: 'Tiêu đề ở trên',
    code: LAYOUT_TYPE_CODE.TITLE_TOP,
    image: '/assets/images/layout/layout_title_top.png',
  },
  {
    title: 'Chỉ hình ảnh',
    code: LAYOUT_TYPE_CODE.IMG_ONLY,
    image: '/assets/images/layout/layout_img_only.png',
  },
  {
    title: 'Chỉ văn bản',
    code: LAYOUT_TYPE_CODE.TEXT_ONLY,
    image: '/assets/images/layout/layout_text_only.png',
  },
];

export const DATA_ADS_LAYOUT_PREVIEW = {
  title: 'Tiêu đề quảng cáo mẫu',
  description: 'Mô tả quảng cáo mẫu',
  media_19_1: '/assets/images/layout/ads1-91.png',
  media_1_1: '/assets/images/layout/ads1-1.png',
};
