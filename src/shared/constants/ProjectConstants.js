import RenderContentHTML from 'src/@crema/component/TableRender/RenderContentHTML';
import { Tag } from 'antd';
import ListMedia from 'src/@crema/component/ListMedia';
import React from 'react';

export const PROJECT_ACTION = {
  HIDE: 'HIDE',
  SHOW: 'SHOW',
};

export const PROJECT_CHANGE_ACTION = {
  VERIFY: 'verify',
};

export const FIELD_TAB = {
  BASIC: 'basic',
  DESCRIPTION: 'description',
  DETAIL: 'detail',
  UTILS: 'utils',
  MEDIA: 'media',
};

export const PROJECT_CHANGE_LABEL = [
  {
    belongsTo: 'Tên dự án',
    value: 'title',
    tab: FIELD_TAB.BASIC,
    render: (text) => <span>{text}</span>,
  },
  {
    belongsTo: 'Tỉnh/Thành phố',
    value: 'province',
    fieldId: 'province_id',
    key: 'id',
    tab: FIELD_TAB.BASIC,
    render: (text) => <span>{text?.name}</span>,
  },
  {
    belongsTo: 'Quận/Huyện',
    value: 'district',
    fieldId: 'district_id',
    key: 'id',
    tab: FIELD_TAB.BASIC,
    render: (text) => <span>{text?.name}</span>,
  },
  {
    belongsTo: 'Kinh độ',
    value: 'longitude',
    tab: FIELD_TAB.BASIC,
    render: (text) => <span>{text}</span>,
  },
  {
    belongsTo: 'Vĩ độ',
    value: 'latitude',
    tab: FIELD_TAB.BASIC,
    render: (text) => <span>{text}</span>,
  },
  {
    belongsTo: 'Loại hình dự án',
    value: 'project_type',
    fieldId: 'type_id',
    key: 'id',
    tab: FIELD_TAB.BASIC,
    render: (text) => <span>{text?.name}</span>,
  },
  {
    belongsTo: 'Trạng thái',
    value: 'state',
    fieldId: 'state_id',
    key: 'id',
    tab: FIELD_TAB.BASIC,
    render: (state) => <span>{state?.name}</span>,
  },
  {
    belongsTo: 'Chủ đầu tư',
    value: 'investor',
    fieldId: 'investor_id',
    key: 'id',
    tab: FIELD_TAB.BASIC,
    render: (text) => <span>{text?.name}</span>,
  },
  {
    belongsTo: 'Đại sứ cống hiến',
    value: 'dedication_ambassador',
    fieldId: 'dedication_ambassador_id',
    key: 'id',
    tab: FIELD_TAB.BASIC,
    render: (text) => <span>{text?.name}</span>,
  },

  {
    belongsTo: 'Mô tả dự án',
    value: 'cdn_description',
    tab: FIELD_TAB.DESCRIPTION,
    align: 'right',
    render: (text) => (
      <RenderContentHTML shortNumWord={125} content={text} isShowHTML />
    ),
  },

  {
    belongsTo: 'Kích thước',
    value: 'size',
    tab: FIELD_TAB.DETAIL,
    render: (text) => <span>{text}</span>,
  },
  {
    belongsTo: 'Diện tích dự án',
    value: 'area_text',
    tab: FIELD_TAB.DETAIL,
    render: (text) => <span>{text}</span>,
  },
  {
    belongsTo: 'Diện tích xây dựng',
    value: 'construction_area',
    tab: FIELD_TAB.DETAIL,
    render: (text) => <span>{text}</span>,
  },
  {
    belongsTo: 'Mật độ xây dựng',
    value: 'building_density',
    tab: FIELD_TAB.DETAIL,
    render: (text) => <span>{text}</span>,
  },
  {
    belongsTo: 'Quy mô',
    value: 'scale',
    tab: FIELD_TAB.DETAIL,
    render: (text) => <span>{text}</span>,
  },
  {
    belongsTo: 'Giá(triệu/m2)',
    value: 'price',
    tab: FIELD_TAB.DETAIL,
    render: (text) => <span>{text}</span>,
  },
  {
    belongsTo: 'Số tòa',
    value: 'num_tower',
    tab: FIELD_TAB.DETAIL,
    render: (text) => <span>{text}</span>,
  },
  {
    belongsTo: 'Số căn hộ',
    value: 'num_apartment',
    tab: FIELD_TAB.DETAIL,
    render: (text) => <span>{text}</span>,
  },
  {
    belongsTo: 'Pháp lý',
    value: 'juridical',
    tab: FIELD_TAB.DETAIL,
    render: (text) => <span>{text}</span>,
  },
  {
    belongsTo: 'Thời điểm hoàn thành',
    value: 'completion_time',
    tab: FIELD_TAB.DETAIL,
    render: (text) => <span>{text}</span>,
  },
  {
    belongsTo: 'Đơn vị quản lý',
    value: 'management_unit',
    tab: FIELD_TAB.DETAIL,
    render: (text) => <span>{text}</span>,
  },
  {
    belongsTo: 'Đơn vị thiết kế',
    value: 'design_unit',
    tab: FIELD_TAB.DETAIL,
    render: (text) => <span>{text}</span>,
  },
  {
    belongsTo: 'Đơn vị thi công',
    value: 'construction_unit',
    tab: FIELD_TAB.DETAIL,
    render: (text) => <span>{text}</span>,
  },
  {
    belongsTo: 'Đơn vị phân phối',
    value: 'distributor',
    tab: FIELD_TAB.DETAIL,
    render: (text) => <span>{text}</span>,
  },
  {
    belongsTo: 'Đơn vị phát triển',
    value: 'development_unit',
    tab: FIELD_TAB.DETAIL,
    render: (text) => <span>{text}</span>,
  },
  {
    belongsTo: 'Nhà thầu',
    value: 'contractor',
    tab: FIELD_TAB.DETAIL,
    render: (text) => <span>{text}</span>,
  },
  {
    belongsTo: 'Kết luận mới nhất',
    value: 'state_detail',
    tab: FIELD_TAB.DETAIL,
    render: (text) => <span>{text}</span>,
  },

  {
    belongsTo: 'Tiện ích',
    value: 'utils',
    tab: FIELD_TAB.UTILS,
    fieldId: 'util_ids',
    key: 'id',
    render: (utils = []) => {
      return (
        <div>
          {utils.map((item, index) => (
            <Tag key={`${item?.id}-${index}`} color='blue'>
              {item?.name}
            </Tag>
          ))}
        </div>
      );
    },
  },

  {
    belongsTo: 'Media',
    value: 'medias',
    key: 'cdn_path',
    tab: FIELD_TAB.MEDIA,
    render: (medias = []) => {
      return (
        <ListMedia
          wrap
          data={medias}
          size={'small'}
          sizeItem={{ width: 160, height: 90 }}
          controls
        />
      );
    },
  },
];

export const fieldTabBasic = PROJECT_CHANGE_LABEL.filter(
  (item) => item?.tab === FIELD_TAB.BASIC,
);

export const fieldDescription = PROJECT_CHANGE_LABEL.filter(
  (item) => item?.tab === FIELD_TAB.DESCRIPTION,
);

export const fieldTabDetail = PROJECT_CHANGE_LABEL.filter(
  (item) => item?.tab === FIELD_TAB.DETAIL,
);
export const fieldTabUtils = PROJECT_CHANGE_LABEL.filter(
  (item) => item?.tab === FIELD_TAB.UTILS,
);
export const fieldTabMedia = PROJECT_CHANGE_LABEL.filter(
  (item) => item?.tab === FIELD_TAB.MEDIA,
);
