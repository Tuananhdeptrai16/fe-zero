import React from 'react';
import { useIntl } from 'react-intl';
import { Space } from 'antd';
import { renderSample } from 'src/pages/judicialRecords/createRecordInformation/utils';
import { RenderDate } from 'src/@crema/component/TableRender';

export const LabelSearchJudicialRecord = ({ item }) => {
  const { messages } = useIntl();
  const { citizen_profile } = item || {};

  return (
    <div className={'d-flex flex-col'}>
      <b>{renderSample(citizen_profile?.profile_type)}</b>
      <div className={'d-flex justify-between'}>
        <span>
          {messages['common.name']}: {citizen_profile?.full_name}
        </span>
        {citizen_profile?.date_of_birth && (
          <Space align={'start'}>
            {messages['common.birthday']}:
            <RenderDate value={citizen_profile?.date_of_birth} />
          </Space>
        )}
      </div>
    </div>
  );
};
