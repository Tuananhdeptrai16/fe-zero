export const REDIRECT_LAYOUT_TYPES = [
  {
    title: 'Hình ảnh ở trên',
    code: 'layout_img_above',
    image: '/assets/images/layout/layout_img_above.png',
  },
  {
    title: 'Hình ảnh bên cạnh',
    code: 'layout_img_side',
    image: '/assets/images/layout/layout_img_side.png',
  },
  {
    title: 'Tiêu đề ở trên',
    code: 'layout_title_top',
    image: '/assets/images/layout/layout_title_top.png',
  },
  {
    title: 'Chỉ hình ảnh',
    code: 'layout_img_only',
    image: '/assets/images/layout/layout_img_only.png',
  },
  {
    title: 'Chỉ văn bản',
    code: 'layout_text_only',
    image: '/assets/images/layout/layout_text_only.png',
  },
];

export const REDIRECT_LAYOUT_TYPE_MAP = [
  {
    value: 'layout_text_only',
    text: 'textOnly',
    color: 'purple',
  },
  {
    value: 'layout_title_top',
    text: 'titleTop',
    color: 'danger',
  },
  { value: 'layout_img_side', text: 'imageSide', color: 'success' },
  {
    value: 'layout_img_above',
    text: 'imageAbove',
    color: 'primary',
  },
  {
    value: 'layout_img_only',
    text: 'imageOnly',
    color: 'warning',
  },
];

export const SELECT_MMS_TYPE = [
  {
    value: 0,
    text: 'Chăm sóc khách hàng',
  },
  {
    value: 1,
    text: 'Quảng cáo',
  },
];

export const MEDIA_TYPES = [
  {
    text: 'Image',
    value: 'image',
  },
  // {
  //   text: 'Video',
  //   value: 'video',
  // },
  // {
  //   text: 'Audio',
  //   value: 'audio',
  // },
  {
    text: 'Text',
    value: 'text',
  },
];

export const PLATFORM = [
  {
    value: 'web',
    text: 'Web',
  },
  {
    value: 'app',
    text: 'App',
  },
];

export const BANNER_MMS_CONTENT_TYPE = [
  {
    value: 'header',
    text: 'Header',
  },
  {
    value: 'text',
    text: 'Nội dung chữ',
  },
  {
    value: 'image',
    text: 'Hình ảnh',
  },
  {
    value: 'video',
    text: 'Video',
  },
];

export const TYPE_TRANSACTION_REDIRECT = [
  {
    color: 'default',
    value: 'charge',
    text: 'Trừ tiền quảng cáo',
  },
  {
    color: 'warning',
    value: 'balance',
    text: 'Chuyển tiền dịch vụ',
  },
  {
    color: 'success',
    value: 'recharge',
    text: 'Nạp tiền',
  },
  {
    color: 'error',
    value: 'reduce',
    text: 'Chuyển tiền nội bộ ra',
  },
  {
    color: 'purple',
    value: 'increase',
    text: 'Chuyển tiền nội bộ vào',
  },
];
