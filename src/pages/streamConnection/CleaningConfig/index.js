import React from 'react';
import { useIntl } from 'react-intl';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import { Space } from 'antd';
import SubHeaderApp from 'src/@crema/component/SubHeaderApp';
import SubHeaderAppTemplate from 'src/@crema/component/SubHeaderApp/SubHeaderAppTemplate';
import ConfigureDataEnrichment from 'src/pages/AutomaticDataEnrichment/Components/ConfigureDataEnrichment/ConfigureDataEnrichment';
import { useLocation } from 'react-router-dom';

const CleaningConfig = () => {
  const { messages } = useIntl();
  const location = useLocation();
  const { connectionId } = location.state || {};

  return (
    <div>
      <AppPageMetadata title={messages['sidebar.configure_data']}>
        <SubHeaderApp>
          <SubHeaderAppTemplate
            isShowGoBack
            title={
              <Space align={'center'} className={'whitespace-nowrap'}>
                Cấu hình làm sạch dữ liệu
              </Space>
            }
          />
        </SubHeaderApp>
        <div>
          <ConfigureDataEnrichment connectionId={connectionId} />
        </div>
      </AppPageMetadata>
    </div>
  );
};

export default CleaningConfig;
