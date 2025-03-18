import RenderContentHTML from 'src/@crema/component/TableRender/RenderContentHTML';
import React from 'react';
import Media from 'src/@crema/component/Media';
import { RenderDate } from 'src/@crema/component/TableRender';
import { Tag } from 'antd';

export const statusInterview = {
  interviewed: 'Đã phỏng vấn',
  not_interview: 'Chưa phỏng vấn',
};

export const statusRegister = {
  reject: 'Đã từ chối',
  not_handle: 'Chờ xử lý',
  approve: 'Đã xử lý',
};

export const listLevelAmbassador = [
  {
    value: 'area',
    label: 'Khu vực',
  },
  {
    value: 'province',
    label: 'Tỉnh/TP',
  },
  { label: 'Dự án', value: 'project' },
];

export const AMBASSADOR_LEVEL = {
  area: 'Khu vực',
  province: 'Tỉnh/TP',
  district: 'Quận/Huyện',
  project: 'Dự án',
  represent: 'Đại diện chủ đầu tư',
};

export const POSITION_EXPECT = {
  area: 'Đại sứ Vùng',
  province: 'Đại sứ Tỉnh/TP',
  district: 'Đại sứ Quận/Huyện',
  project: 'Đại sứ Dự án',
  represent: 'Đại diện chủ đầu tư',
};

export const AMBASSADOR_CHANGE_LABEL = [
  {
    belongsTo: 'Tên đại sứ',
    value: 'name',
    render: (text) => <span>{text}</span>,
  },
  {
    belongsTo: 'Ảnh đại diện',
    value: 'avatar_url',
    render: (src) => <Media src={src} width={100} height={100} />,
  },

  {
    belongsTo: 'Ngày sinh',
    value: 'birthday',
    align: 'center',
    render: (date) => <RenderDate value={date} />,
  },
  {
    belongsTo: 'Số điện thoại',
    value: 'phone_number',
    render: (text) => <span>{text}</span>,
  },
  {
    belongsTo: 'Email',
    value: 'email',
    render: (text) => <span>{text}</span>,
  },
  {
    belongsTo: 'Link facebook',
    value: 'facebook_url',
    render: (url) => <span>{url}</span>,
  },
  {
    belongsTo: 'Zalo',
    value: 'zalo_url',
    render: (url) => <span>{url}</span>,
  },
  {
    belongsTo: 'Địa chỉ',
    value: 'address',
    render: (text) => <span>{text}</span>,
  },

  {
    belongsTo: 'Giới thiệu về bản thần',
    value: 'introduce_yourself',
    align: 'right',
    render: (text) => (
      <RenderContentHTML shortNumWord={125} content={text} isShowHTML />
    ),
  },

  {
    belongsTo: 'Kinh nghiệm trong ngành',
    value: 'experience',
    render: (text) => <span>{text}</span>,
  },
  {
    belongsTo: 'Cấp độ',
    value: 'level',
    render: (text) => <span>{text}</span>,
  },
  {
    belongsTo: 'Khu vực phụ trách',
    value: 'management_area.area',
    key: 'id',
    render: (text) => <span>{text?.name}</span>,
  },
  {
    belongsTo: 'Tỉnh phụ trách',
    value: 'management_area.province',
    key: 'id',
    render: (text) => <span>{text?.name}</span>,
  },
  {
    belongsTo: 'Dự án phụ trách',
    value: 'management_area.projects',
    key: 'id',
    render: (projects) => {
      return (
        <div>
          {projects?.map((item, index) => (
            <Tag
              style={{ padding: 4, margin: 4, fontWeight: 500 }}
              key={`${item?.id}-${index}`}>
              {item?.title}
            </Tag>
          ))}
        </div>
      );
    },
  },
  {
    belongsTo: 'Chủ đầu tư phụ trách',
    value: 'management_area.investor',
    key: 'id',
    render: (text) => <span>{text?.name}</span>,
  },
];
