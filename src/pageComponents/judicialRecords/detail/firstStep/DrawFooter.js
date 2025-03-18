import { Col, Divider, Row, Space, Typography } from 'antd';
import React from 'react';
import './index.style.less';
import AntButton from 'src/@crema/component/AntButton';
import { useIntl } from 'react-intl';
import { truncate } from 'lodash';
import RenderNameUser from 'src/@crema/component/TableRender/RenderNameUser';
import { formatDateJs } from 'src/shared/utils/DateTime';
import { KEY_PUBLISH_DATE } from 'src/shared/constants/SettingSystem';
import { RenderFieldRawContent } from 'src/@crema/component/TableRender';
import { FIELD_MAP } from 'src/shared/constants/FieldKeyMap';
import Link from 'src/@crema/component/Link';
import config from 'src/config';

export const DrawFooter = ({ rowData, onCloseDrawer, onConfirmDocument }) => {
  const { messages } = useIntl();
  return (
    <div>
      <Row gutter={30}>
        <Col span={12}>
          <div className={'d-flex flex-col'}>
            <Space>
              <Typography.Text type='secondary'>Tên văn bản:</Typography.Text>
              <Link
                target='_blank'
                to={config.routes.detailRawDocument(
                  rowData?.raw_document_id ||
                    rowData?.raw_document_object?.raw_document_id,
                )}>
                <Typography.Text style={{ color: 'inherit' }}>
                  {truncate(rowData?.document_type_name, {
                    length: 150,
                  })}
                </Typography.Text>
              </Link>
            </Space>
          </div>
          <Space>
            <Typography.Text type='secondary'>
              Ngày tuyên án/Ngày ra quyết định:
            </Typography.Text>
            <Typography.Text>
              {RenderFieldRawContent({
                rawText: rowData?.content,
                field: FIELD_MAP.NGAY_TUYEN_AN,
              }) ||
                RenderFieldRawContent({
                  rawText: rowData?.content,
                  field: KEY_PUBLISH_DATE,
                }) ||
                RenderFieldRawContent({
                  rawText: rowData?.content,
                  field: FIELD_MAP.NGAY_QUYET_DINH,
                })}
            </Typography.Text>
          </Space>
        </Col>
        <Col span={12}>
          <div className={'d-flex flex-col'}>
            <Space>
              <Typography.Text type='secondary'>
                Người đăng tải:
              </Typography.Text>
              <Typography.Text>
                {<RenderNameUser user={rowData?.created_by_user} />}
              </Typography.Text>
            </Space>
          </div>
          <Space>
            <Typography.Text type='secondary'>
              Ngày đăng tải văn bản:
            </Typography.Text>
            <Typography.Text>
              {formatDateJs(rowData?.created_at)}
            </Typography.Text>
          </Space>
        </Col>
      </Row>
      <Divider />
      <Space className='w-full justify-end'>
        <AntButton onClick={onCloseDrawer}>
          {messages['dialog.button.cancel']}
        </AntButton>
        <AntButton type='primary' onClick={onConfirmDocument}>
          Xác nhận văn bản thuộc công dân này
        </AntButton>
      </Space>
    </div>
  );
};
