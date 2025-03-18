import React from 'react';
import { RenderFieldRawContent } from 'src/@crema/component/TableRender';
import AppTableContainer from 'src/@crema/core/AppTableContainer';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import { ExportOutlined } from '@ant-design/icons';
import AppIconButton from 'src/@crema/core/AppIconButton';
import { FIELD_MAP } from 'src/shared/constants/FieldKeyMap';
// import RenderNameUser from 'src/@crema/component/TableRender/RenderNameUser';
import clsx from 'clsx';
import style from './FormTable.module.scss';
import config from 'src/config';

export const BanHoldingPositionTable = ({ data }) => {
  const columns = [
    {
      title: 'STT',
      key: 'stt',
      dataIndex: 'stt',
      render: (_, _data, index) => index + 1,
      width: 50,
      fixed: 'left',
    },
    {
      title: <IntlMessages id='judicial.decisionNo' />,
      dataIndex: 'content',
      fixed: 'left',
      width: 200,
      render: (row) => (
        <RenderFieldRawContent field={FIELD_MAP.SO_QUYET_DINH} rawText={row} />
      ),
    },
    {
      title: <IntlMessages id='judicial.decisionDay' />,
      dataIndex: 'content',
      render: (row) => (
        <RenderFieldRawContent
          field={FIELD_MAP.NGAY_QUYET_DINH}
          rawText={row}
        />
      ),
      width: 150,
    },
    {
      title: <IntlMessages id='judicial.prohibitPos' />,
      width: 200,
      render: (_, row) => (
        <RenderFieldRawContent
          field={FIELD_MAP.CHUC_VU_CAM}
          rawText={row?.content}
        />
      ),
    },
    {
      title: <IntlMessages id='judicial.banPeriod' />,
      width: 150,
      render: (_, row) => (
        <RenderFieldRawContent
          field={FIELD_MAP.THOI_HAN_CAM}
          rawText={row?.content}
        />
      ),
    },
    {
      title: <IntlMessages id='judicial.banFrom' />,
      width: 150,
      render: (_, row) => (
        <RenderFieldRawContent
          field={FIELD_MAP.CAM_TU_NGAY}
          rawText={row?.content}
        />
      ),
    },
    {
      title: <IntlMessages id='judicial.documentPostingUnit' />,
      width: 180,
      dataIndex: 'raw_document',
      render: (data) => {
        return data?.document_template?.organization?.display_name;
      },
    },
    {
      title: <IntlMessages id='judicial.lastUpdatedTime' />,
      width: 180,
      render: (_, row) => (
        <RenderFieldRawContent
          field={FIELD_MAP.NGAY_CAP_NHAT}
          rawText={row?.content}
        />
      ),
    },
    {
      title: <IntlMessages id='common.action' />,
      key: 'KEY_ACTION_COLUMN',
      fixed: 'right',
      align: 'center',
      width: 120,
      render: (_, row) => {
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <AppIconButton
              title={<IntlMessages id={'table.viewDetail'} />}
              size={'small'}
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
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <AppTableContainer
        columns={columns}
        data={data}
        className={clsx(style.wrapTableBanHolding)}
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
};
