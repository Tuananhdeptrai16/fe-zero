import React from 'react';
import { useIntl } from 'react-intl';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import IntlMessages from 'src/@crema/utility/IntlMessages';
// import { KEY_SEARCH_PARAM_DT } from 'src/shared/constants/DataTable';
import { Space } from 'antd';
// import AppTabs from 'src/@crema/core/AppTabs/AppTabs';
import API from 'src/@crema/services/apis';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import { useLocation } from 'react-router-dom';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
// import AntBadge from 'src/@crema/component/AntBadge';
// import History from './history';
import { useParams } from 'react-router-dom';
import SubHeaderApp from 'src/@crema/component/SubHeaderApp';
import SubHeaderAppTemplate from 'src/@crema/component/SubHeaderApp/SubHeaderAppTemplate';
import Setting from './setting';
import AntSpin from 'src/@crema/component/AntSpin';
// import { ROUTER_NAME } from 'src/pages/routeConfig';
// import {
//   SOURCE_DEFINITION_API_ID,
//   SOURCE_DEFINITION_FILE_ID,
//   SOURCE_DEFINITION_MSSQL_ID,
//   SOURCE_DEFINITION_MYSQL_ID,
//   SOURCE_DEFINITION_ORACLE_ID,
//   SOURCE_DEFINITION_POSTGRES_ID,
// // } from 'src/shared/constants/DataFixed';
// import AntButton from 'src/@crema/component/AntButton';
// import useCallApi from 'src/@crema/hook/useCallApi';
// import { instanceCoreApi } from 'src/@crema/services/setupAxios';
// import notification from 'src/shared/utils/notification';
import { getHistoryPathName } from 'src/shared/utils/urlPathName';

const DetailInfoData = () => {
  const { messages } = useIntl();
  const { id } = useParams();
  // const activeKey = searchParams.get(KEY_SEARCH_PARAM_DT.TAB) || 'setting';
  const { pathname } = useLocation();
  const pathNameGoBack = getHistoryPathName(pathname);
  const pageName = pathname.split('/')[1];

  const {
    data,
    isLoading,
    // fetchData: fetchDetailConnection,
  } = useFetch(
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
  // const disabledBtnToggleProgress = connectionDetail?.status;
  // // update config connection
  // const { loading: loadingUpdateConnection, send: updateConfig } = useCallApi({
  //   success: () => {
  //     notification.success('Bật/tắt tiến trình thành công');

  //     setTimeout(() => {
  //       fetchDetailConnection();
  //     }, 2000);
  //   },
  //   callApi: (data) => {
  //     return instanceCoreApi.post(API.UPDATE_CONNECTION_AIR_BYTE, data);
  //   },
  // });

  // const pageName = useMemo(() => {
  //   switch (connectionDetail?.source?.source_definition_id) {
  //     case SOURCE_DEFINITION_MSSQL_ID:
  //       return ROUTER_NAME.LIST_CONNECTION_MSSQL;
  //     case SOURCE_DEFINITION_POSTGRES_ID:
  //       return ROUTER_NAME.LIST_CONNECTION_POSTGRESQL;
  //     case SOURCE_DEFINITION_MYSQL_ID:
  //       return ROUTER_NAME.LIST_CONNECTION_MYSQL;
  //     case SOURCE_DEFINITION_ORACLE_ID:
  //       return ROUTER_NAME.LIST_CONNECTION_ORACLE;
  //     case SOURCE_DEFINITION_FILE_ID:
  //       return ROUTER_NAME.LIST_CONNECTION_FILE;
  //     case SOURCE_DEFINITION_API_ID:
  //       return ROUTER_NAME.LIST_CONNECTION_API;
  //   }
  // }, [connectionDetail]);
  if (isLoading || !connectionDetail) {
    return (
      <div className='user-pages'>
        <AntSpin />
      </div>
    );
  }

  // enable_enrichment_process
  // const enableProcess = () => {
  //   updateConfig({
  //     ...connectionDetail,
  //     connection_id: id,
  //     status: 'active',
  //   });
  // };

  // // stop_enrichment_process
  // const handleStopProcess = async () => {
  //   updateConfig({
  //     ...connectionDetail,
  //     connection_id: id,
  //     status: 'inactive',
  //   });
  // };

  //* Filters
  // const tabList = [
  //   {
  //     key: 'history',
  //     label: (
  //       <AntBadge status={activeKey === 'history' ? 'active' : 'default'}>
  //         Lịch sử công việc
  //       </AntBadge>
  //     ),
  //     children: (
  //       <History
  //         configId={id}
  //         data={connectionDetail}
  //         pageName={pageName}
  //         disabledBtnToggleProgress={disabledBtnToggleProgress}
  //       />
  //     ),
  //   },
  //   {
  //     key: 'setting',
  //     label: (
  //       <AntBadge status={activeKey === 'setting' ? 'active' : 'default'}>
  //         Thông tin tiến trình
  //       </AntBadge>
  //     ),
  //     children: <Setting configId={id} data={connectionDetail} />,
  //   },
  // ];
  return (
    <div>
      <AppPageMetadata
        title={messages['sidebar.details_data_retrieval_process']}>
        <SubHeaderApp>
          <SubHeaderAppTemplate
            isShowGoBack
            linkGoBack={pathNameGoBack}
            title={
              <Space align={'center'} className={'whitespace-nowrap'}>
                <IntlMessages id='sidebar.details_data_retrieval_process' />
              </Space>
            }
          />
        </SubHeaderApp>
        <Setting configId={id} data={connectionDetail} pageName={pageName} />
        {/* <div
          style={{
            position: 'relative',
          }}>
          <AppTabs
            activeKey={activeKey}
            onChange={(newActiveKey) => {
              setSearchParams({ [KEY_SEARCH_PARAM_DT.TAB]: newActiveKey });
            }}
            items={tabList}
            destroyInactiveTabPane
          />
          <div
            style={{
              position: 'absolute',
              right: '0px',
              top: '3px',
            }}>
            {disabledBtnToggleProgress === 'inactive' ? (
              <AntButton
                loading={loadingUpdateConnection}
                onClick={enableProcess}
                type='primary'>
                Bật tiến trình
              </AntButton>
            ) : (
              <>
                <AntButton
                  onClick={handleStopProcess}
                  loading={loadingUpdateConnection}
                  type='primary'>
                  Tắt tiến trình
                </AntButton>
              </>
            )}
          </div>
        </div> */}
      </AppPageMetadata>
    </div>
  );
};

export default DetailInfoData;
