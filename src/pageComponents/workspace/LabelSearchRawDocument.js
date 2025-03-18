import React from 'react';
import { useIntl } from 'react-intl';
import {
  RenderDate,
  RenderFieldRawContent,
} from 'src/@crema/component/TableRender';
import { KEY_DOCUMENT_NUMBER } from 'src/shared/constants/SettingSystem';
import { FIELD_MAP } from 'src/shared/constants/FieldKeyMap';
import { UserOutlined } from '@ant-design/icons';
import RenderNameUser from 'src/@crema/component/TableRender/RenderNameUser';
import { Space } from 'antd';

export const LabelSearchRawDocument = ({ item }) => {
  const { messages } = useIntl();
  const renderDocumentNumber = (groupType) => {
    if (groupType === 'verdict') {
      return RenderFieldRawContent({
        rawText: item?.raw_text,
        field: KEY_DOCUMENT_NUMBER,
      });
    }
    return (
      RenderFieldRawContent({
        rawText: item?.raw_text,
        field: FIELD_MAP.SO_QUYET_DINH,
      }) ||
      RenderFieldRawContent({
        rawText: item?.raw_text,
        field: FIELD_MAP.SO_GIAY_CHUNG_NHAN,
      })
    );
  };

  return (
    <div className={'d-flex flex-col'}>
      <b>{item?.document_template?.name}</b>
      <div className={'d-flex justify-between'}>
        <span>
          {messages['judicial.verdictCode']}:{' '}
          {renderDocumentNumber(
            item?.document_template?.document_type?.group_type,
          )}
        </span>
        <Space split={'-'}>
          {item?.created_user && (
            <Space align={'start'}>
              <UserOutlined />
              <RenderNameUser user={item?.created_user} />
            </Space>
          )}
          <RenderDate value={item?.created_at} />
        </Space>
      </div>
    </div>
  );
};
