import { Col, Row, Space } from 'antd';
import React from 'react';
import useIntl from 'react-intl/lib/src/components/useIntl';
import { useLocation, useParams } from 'react-router-dom';
import { AppLoader } from 'src/@crema';
import SubHeaderApp from 'src/@crema/component/SubHeaderApp';
import SubHeaderAppTemplate from 'src/@crema/component/SubHeaderApp/SubHeaderAppTemplate';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import AppTabs from 'src/@crema/core/AppTabs/AppTabs';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import API from 'src/@crema/services/apis';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import { getHistoryPathName } from 'src/shared/utils/urlPathName';
import QueryJob from './QueryJob';
import SelectColumns from '../AddJob/Components/SelectColumns/SelectColumns';
import Normalization from '../AddJob/Components/Normalization/Normalization';
import style from './DetailJob.module.scss';
import clsx from 'clsx';
// import PropTypes from 'prop-types';
DetailsJob.propTypes = {};

function DetailsJob() {
  const { messages } = useIntl();

  const { id: dagId } = useParams();
  const { pathname } = useLocation();

  const pathNameGoBack = getHistoryPathName(pathname);
  // get detail job
  const { data, isLoading } = useFetch(
    {
      method: METHOD_FETCH.GET,
      url: API.GET_DETAIL_JOB(dagId),
    },
    [dagId],
  );
  const dataDetailJob = data?.result;

  const tabItems = [
    {
      label: 'Truy vấn',
      key: 'query',
      children: <QueryJob dataDetailJob={dataDetailJob} />,
    },
    {
      label: 'Chọn cột',
      key: 'select_columns',
      children: <SelectColumns isDetail dataDetailJob={dataDetailJob} />,
    },
    {
      label: 'Chuẩn hóa',
      key: 'normalization',
      children: <Normalization isDetail dataDetailJob={dataDetailJob} />,
    },
  ];

  return isLoading ? (
    <AppLoader />
  ) : (
    <div className={clsx(style.wrapDetailJob)}>
      <AppPageMetadata title={messages['form.formTitleDetail']} />
      <SubHeaderApp>
        <SubHeaderAppTemplate
          isShowGoBack
          linkGoBack={pathNameGoBack}
          title={
            <Space align={'center'} className={'whitespace-nowrap'}>
              <IntlMessages id={'form.formTitleDetail'} />
            </Space>
          }
        />
      </SubHeaderApp>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <AppTabs
            type='card'
            tabBarStyle={{
              marginBottom: '0',
            }}
            onChange={() => {}}
            items={tabItems}
          />
        </Col>
      </Row>
    </div>
  );
}

export default DetailsJob;
