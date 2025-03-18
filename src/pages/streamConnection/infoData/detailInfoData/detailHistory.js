import React from 'react';
import { useIntl } from 'react-intl';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import { Space } from 'antd';
import API from 'src/@crema/services/apis';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import History from './history';
import { useLocation, useParams } from 'react-router-dom';
import SubHeaderApp from 'src/@crema/component/SubHeaderApp';
import SubHeaderAppTemplate from 'src/@crema/component/SubHeaderApp/SubHeaderAppTemplate';
import AntSpin from 'src/@crema/component/AntSpin';

const DetailHistory = () => {
  const { messages } = useIntl();
  const { pathname } = useLocation();
  const { id } = useParams();
  const pageName = pathname.split('/')[1];

  const { data, isLoading } = useFetch(
    {
      url: API.DETAIL_CONNECTION_AIR_BYTE,
      method: METHOD_FETCH.POST,
      body: {
        connection_id: id,
      },
    },
    [id],
  );

  const connectionDetail = data?.result;

  if (isLoading || !connectionDetail) {
    return (
      <div className='user-pages'>
        <AntSpin />
      </div>
    );
  }
  return (
    <div>
      <AppPageMetadata title={messages['sidebar.history_job']}>
        <SubHeaderApp>
          <SubHeaderAppTemplate
            isShowGoBack
            title={
              <Space align={'center'} className={'whitespace-nowrap'}>
                <IntlMessages
                  id={`Lịch sử công việc của tiến trình "${connectionDetail?.name}"`}
                />
              </Space>
            }
          />
        </SubHeaderApp>
        <History
          configId={id}
          data={connectionDetail}
          disabledBtnToggleProgress={connectionDetail?.status}
          pageName={pageName}
        />
      </AppPageMetadata>
    </div>
  );
};

export default DetailHistory;
