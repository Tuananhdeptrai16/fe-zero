import React from 'react';
import { useIntl } from 'react-intl';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import { KEY_SEARCH_PARAM_DT } from 'src/shared/constants/DataTable';
// import AppCard from 'src/@crema/core/AppCard/index';
import { Space } from 'antd';
import AppTabs from 'src/@crema/core/AppTabs/AppTabs';
import API from 'src/@crema/services/apis';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import { useSearchParams } from 'react-router-dom';
// import config from 'src/config';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import AntBadge from 'src/@crema/component/AntBadge';
// import { useParams } from 'react-router-dom';
import SubHeaderApp from 'src/@crema/component/SubHeaderApp';
import SubHeaderAppTemplate from 'src/@crema/component/SubHeaderApp/SubHeaderAppTemplate';
import Setting from './settings';
// import RenderDateTime from '../../@crema/component/TableRender/RenderDateTime';
// import { useAuthUser } from 'src/@crema/utility/AuthHooks';

const DetailData = () => {
  // const { user } = useAuthUser();
  const { messages } = useIntl();
  //   const { id } = useParams();
  // const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const activeKey = searchParams.get(KEY_SEARCH_PARAM_DT.TAB) || 'settings';

  const { data } = useFetch(
    {
      url: API.COUNT_RAW_DOCUMENT,
      method: METHOD_FETCH.POST,
      body: {
        group_by: [
          {
            filters: [
              {
                name: 'state',
                value: ['ocr_processing', 'done_ocr'],
                operation: 'in',
              },
            ],
            keyword: '',
          },
          {
            filters: [
              {
                name: 'state',
                value: ['verified', 'done'],
                operation: 'in',
              },
            ],
            keyword: '',
          },
        ],
      },
    },
    [],
  );

  //* Filters
  const tabList = [
    {
      key: 'settings',
      label: (
        <AntBadge status={activeKey === 'settings' ? 'active' : 'default'}>
          Cài Đặt
        </AntBadge>
      ),
      children: <Setting />,
    },
    {
      key: 'connection',
      label: (
        <AntBadge status={activeKey === 'connection' ? 'active' : 'default'}>
          Kết nối
        </AntBadge>
      ),
    },
  ];
  return (
    <div>
      <AppPageMetadata title={messages['sidebar.rawDocument']}>
        {/*<AppCard className='ant-tab-table'>*/}
        <SubHeaderApp deps={[data?.request_organization?.due_date]}>
          <SubHeaderAppTemplate
            isShowGoBack
            title={
              <Space align={'center'} className={'whitespace-nowrap'}>
                <IntlMessages id='Chi tiết nguồn dữ liệu' />
              </Space>
            }
          />
        </SubHeaderApp>
        <AppTabs
          className={'tab-sticky-header'}
          activeKey={activeKey}
          onChange={(newActiveKey) => {
            setSearchParams({ [KEY_SEARCH_PARAM_DT.TAB]: newActiveKey });
          }}
          items={tabList}
          destroyInactiveTabPane
        />
        {/*</AppCard>*/}
      </AppPageMetadata>
    </div>
  );
};

export default DetailData;
