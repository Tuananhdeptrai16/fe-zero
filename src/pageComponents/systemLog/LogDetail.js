import React, { Fragment } from 'react';
import { Col, Divider, Row } from 'antd';
import { useIntl } from 'react-intl';
import RenderNameUser from 'src/@crema/component/TableRender/RenderNameUser';
import AppScrollbar from 'src/@crema/core/AppScrollbar';
import RenderStatusTag from '../../@crema/component/TableRender/RenderStatusTag';
import RenderDateTime from 'src/@crema/component/TableRender/RenderDateTime';

const WIDTH_LABEL = 6;
const WIDTH_DESC = 18;

const INPUT_DRAWER = [
  {
    type: 'user',
    label: 'table.username',
    fieldName: 'user_info_response',
  },
  {
    type: 'time',
    label: 'common.latestAccessTime',
    fieldName: 'start_time',
  },
  {
    type: 'text',
    label: 'IP',
    fieldName: 'ip_address',
  },
  {
    type: 'status',
    label: 'table.action',
    fieldName: 'code',
  },
  {
    type: 'json',
    label: 'Request',
    fieldName: 'request_body',
  },
  {
    type: 'json',
    label: 'Response',
    fieldName: 'response_body',
  },
];
export const LogDetail = ({ record, hideResponseRequest = false }) => {
  const { messages } = useIntl();
  return (
    <AppScrollbar>
      <Row>
        {INPUT_DRAWER.filter((item) => {
          if (hideResponseRequest) {
            if (
              item.fieldName === 'request_body' ||
              item.fieldName === 'response_body'
            )
              return false;
          }

          return true;
        }).map((item) => (
          <Fragment key={item.fieldName}>
            <Col span={WIDTH_LABEL}>
              <span className={'font-bold'}>
                {messages[item.label] ?? item.label}
              </span>
            </Col>

            <Col span={WIDTH_DESC}>
              {item?.type === 'text' && <span>{record?.[item.fieldName]}</span>}
              {item?.type === 'time' && (
                <span>
                  <RenderDateTime value={record?.[item.fieldName]} />
                </span>
              )}
              {item?.type === 'user' && (
                <RenderNameUser user={record?.[item.fieldName]} />
              )}
              {item?.type === 'json' && record?.[item?.fieldName] && (
                <pre>
                  {JSON.stringify(
                    JSON.parse(record?.[item.fieldName]),
                    null,
                    2,
                  )}
                </pre>
              )}
              {item?.type === 'status' && record?.[item?.fieldName] && (
                <RenderStatusTag
                  value={record?.[item.fieldName]}
                  statusType={'USER_ACTION_LOG'}
                />
              )}
            </Col>
            <Divider dashed />
          </Fragment>
        ))}
      </Row>
    </AppScrollbar>
  );
};
