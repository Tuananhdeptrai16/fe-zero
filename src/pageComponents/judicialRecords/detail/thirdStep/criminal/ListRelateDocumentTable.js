import { Typography } from 'antd';
import React from 'react';
import {
  RenderDate,
  RenderFieldRawContent,
} from 'src/@crema/component/TableRender';
import AppTableContainer from 'src/@crema/core/AppTableContainer';
import { FIELD_MAP } from 'src/shared/constants/FieldKeyMap';
import RenderNameUser from 'src/@crema/component/TableRender/RenderNameUser';
// import { Link } from 'react-router-dom';
import style from './FormTable.module.scss';
import clsx from 'clsx';

import IntlMessages from 'src/@crema/utility/IntlMessages';
import AppIconButton from 'src/@crema/core/AppIconButton';
import { ExportOutlined } from '@ant-design/icons';
import config from 'src/config';

export const ListRelateDocumentTable = ({ titleTable, listRelateDoc }) => {
  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      render: (_, _data, index) => index + 1,
      fixed: 'left',
    },
    {
      title: 'Loại quyết định',
      key: 'document_type',
      dataIndex: 'document_type_name',
      fixed: 'left',
    },
    {
      title: 'Số quyết định',
      key: FIELD_MAP.SO_QUYET_DINH,
      dataIndex: 'content',
      render: (row) => (
        <RenderFieldRawContent rawText={row} field={FIELD_MAP.SO_QUYET_DINH} />
      ),
    },
    {
      title: <IntlMessages id={'judicial.decisionDay'} />,
      dataIndex: FIELD_MAP.NGAY_QUYET_DINH,
      render: (_, record) => {
        return (
          <RenderFieldRawContent
            field={FIELD_MAP.NGAY_QUYET_DINH}
            rawText={record?.content || ''}
          />
        );
      },
    },
    {
      title: 'Người đăng tải hồ sơ',
      key: 'created_by_user',
      dataIndex: 'created_by_user',
      render: (record) => <RenderNameUser user={record} />,
    },
    {
      title: 'Thời gian cập nhật gần nhất',
      dataIndex: 'created_at',
      key: 'created_at',
      align: 'center',
      render: (record) => <RenderDate value={record} />,
    },
    {
      title: 'Thao tác',
      fixed: 'right',
      render: (row) => (
        <AppIconButton
          title={<IntlMessages id={'table.viewDetail'} />}
          icon={<ExportOutlined style={{ fontSize: '16px' }} />}
          onClick={() => {
            window.open(
              config.routes.detailRawDocument(
                row?.raw_document_object?.raw_document_id ||
                  row?.raw_document_id,
              ),
              '_blank',
            );
          }}
        />
      ),
    },
  ];
  return (
    <div className={clsx(style.wrapListRelateDocumentTable)}>
      {titleTable && (
        <Typography.Title level={4}>{titleTable}</Typography.Title>
      )}
      <AppTableContainer
        columns={columns}
        data={listRelateDoc}
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
};
