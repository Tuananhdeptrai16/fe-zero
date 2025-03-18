import { Col, Row, Space } from 'antd';
import React from 'react';
import useIntl from 'react-intl/lib/src/components/useIntl';
import { useParams, useSearchParams } from 'react-router-dom';
import { AppLoader } from 'src/@crema';
import SubHeaderApp from 'src/@crema/component/SubHeaderApp';
import SubHeaderAppTemplate from 'src/@crema/component/SubHeaderApp/SubHeaderAppTemplate';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import AppTabs from 'src/@crema/core/AppTabs/AppTabs';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import API from 'src/@crema/services/apis';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import QueryJob from './QueryJob';
import SelectColumns from '../../NuclearRegion/Components/DataAggregationMechanism/AddJob/Components/SelectColumns/SelectColumns';
import Normalization from '../../NuclearRegion/Components/DataAggregationMechanism/AddJob/Components/Normalization/Normalization';
import { TYPE_DATA_MARK_SCHOOL_WAREHOUSE } from 'src/shared/constants/DataFixed';
import style from './DetailFormula.module.scss';
import clsx from 'clsx';

// import PropTypes from 'prop-types';
DetailFormula.propTypes = {};

function DetailFormula(props) {
  const { messages } = useIntl();
  const { id: idFormula } = useParams();
  const [searchParams] = useSearchParams();

  const isDetail = Boolean(searchParams.get('detail'));
  const isUpdate = Boolean(searchParams.get('update'));

  // get detail formula
  const { data, isLoading } = useFetch(
    {
      method: METHOD_FETCH.POST,
      url: API.GET_LIST_FORMULA_CALCULATION,
      enabled: Boolean(idFormula),
      body: {
        filters: [
          {
            name: 'id',
            operation: 'eq',
            value: idFormula,
          },
        ],
        pageable: {
          page: 1,
          page_size: 1,
        },
      },
    },
    [idFormula],
  );
  const dataDetailFormula = data?.result?.items[0] || {};
  const dataRenderDetailFormula = {
    formula_name: dataDetailFormula?.formula_name,
    scheduler_response: {
      ...dataDetailFormula,
      typeDataMark: TYPE_DATA_MARK_SCHOOL_WAREHOUSE.FML,
    },
  };

  const tabItems = [
    {
      label: 'Truy vấn',
      key: 'query',
      children: (
        <QueryJob
          isUpdate={isUpdate}
          isDetail={isDetail}
          dataDetailJob={dataRenderDetailFormula}
          onlySelectQuery={props.onlySelectQuery}
        />
      ),
    },
    {
      label: 'Chọn cột',
      key: 'select_columns',
      children: (
        <SelectColumns
          isUpdate={isUpdate}
          isDetail={isDetail}
          dataDetailJob={dataRenderDetailFormula}
        />
      ),
    },
    {
      label: 'Thêm điều kiện',
      key: 'normalization',
      children: (
        <Normalization
          isDetail={isDetail}
          isUpdate={isUpdate}
          dataDetailJob={dataRenderDetailFormula}
        />
      ),
    },
  ];

  return isLoading ? (
    <AppLoader />
  ) : (
    <div className={clsx(style.wrapDetailFormula)}>
      <AppPageMetadata
        title={
          isDetail
            ? messages['table.formula_detail']
            : messages['table.formula_update']
        }
      />
      <SubHeaderApp>
        <SubHeaderAppTemplate
          isShowGoBack
          title={
            <Space align={'center'} className={'whitespace-nowrap'}>
              <IntlMessages
                id={isDetail ? 'table.formula_detail' : 'table.formula_update'}
              />
            </Space>
          }
        />
      </SubHeaderApp>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <AppTabs
            tabBarStyle={{
              marginBottom: '0',
            }}
            type='card'
            onChange={() => {}}
            items={tabItems}
          />
        </Col>
      </Row>
    </div>
  );
}

DetailFormula.defaultProps = {
  onlySelectQuery: false,
};

export default DetailFormula;
