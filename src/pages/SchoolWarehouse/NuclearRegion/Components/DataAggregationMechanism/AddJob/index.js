import { Col, Row, Space, Steps } from 'antd';
import React, { createContext, useContext, useEffect, useState } from 'react';
import useIntl from 'react-intl/lib/src/components/useIntl';
import SubHeaderApp from 'src/@crema/component/SubHeaderApp';
import SubHeaderAppTemplate from 'src/@crema/component/SubHeaderApp/SubHeaderAppTemplate';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import Query from './Components/Query/Query';
import SelectColumns from './Components/SelectColumns/SelectColumns';
import Normalization from './Components/Normalization/Normalization';
import NameJob from './Components/NameJob/NameJob';
import { useSearchParams } from 'react-router-dom';
import {
  KEY_PARAM_DATA_MARK,
  KEY_SEARCH_PARAM_NUCLEAR,
} from 'src/shared/constants/SearchParams';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import API from 'src/@crema/services/apis';
import { TYPE_DATA_MARK_SCHOOL_WAREHOUSE } from 'src/shared/constants/DataFixed';
// import PropTypes from 'prop-types';

AddJob.propTypes = {};

const ThemContextAddJob = createContext();
export const getDataContextAddJob = () => {
  const dataContextAddJob = useContext(ThemContextAddJob);
  return dataContextAddJob || {};
};

function AddJob(props) {
  const { messages } = useIntl();
  const [current, setCurrent] = useState(0);
  const [searchParams] = useSearchParams();
  const category = searchParams.get(KEY_SEARCH_PARAM_NUCLEAR);
  const typeDataMark = searchParams.get(KEY_PARAM_DATA_MARK);

  const [dataCreateJob, setDataCreateJob] = useState({});
  const nextStep = () => {
    setCurrent(current + 1);
  };
  const prevStep = () => {
    setCurrent(current - 1);
  };

  // get nuclear_region_id by type
  const { data } = useFetch(
    {
      method: METHOD_FETCH.GET,
      enabled: typeDataMark === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.ATM,
      url: API.GET_LIST_NUCLEAR_REGION,
      params: {
        category: category,
      },
    },
    [category, typeDataMark],
  );
  const listNuclearByType = data?.result || [];

  // get vung chuyen nganh
  const { data: dataMark } = useFetch(
    {
      method: METHOD_FETCH.GET,
      enabled: typeDataMark === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DTM,
      url: API.GET_LIST_DATA_MARK,
      // params: {
      //   category: category,
      // },
      params:
        category === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.NCKH ||
        category === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.THDT
          ? { category: category }
          : {},
    },
    [category, typeDataMark],
  );
  const listDataMark = dataMark?.result || [];

  useEffect(() => {
    setDataCreateJob((prev) => {
      if (typeDataMark === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.ATM) {
        return {
          ...prev,
          category,
          typeDataMark,
          nuclear_region_id: listNuclearByType[0]?.id,
        };
      }
      if (typeDataMark === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DTM) {
        return {
          ...prev,
          category,
          typeDataMark,
          dtm_region_id: listDataMark[0]?.id,
        };
      }
      if (typeDataMark === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.FML) {
        return {
          ...prev,
          category,
          typeDataMark,
        };
      }
    });
  }, [category, typeDataMark, listNuclearByType?.length, listDataMark?.length]);

  //  list menu layout
  const listStepItems = [
    {
      title:
        typeDataMark === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.FML
          ? 'Tên công thức'
          : 'Tên Job',
      content: <NameJob />,
    },
    {
      title: 'Truy vấn',
      content: <Query onlySelectQuery={props.onlySelectQuery} />,
    },
    {
      title: 'Chọn cột',
      content: <SelectColumns />,
    },
    {
      title:
        typeDataMark === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.FML
          ? 'Thêm điều kiện'
          : 'Chuẩn hóa',
      content: <Normalization />,
    },
  ];
  const itemsRenderTab = listStepItems?.map((item, index) => ({
    key: `${item?.title}_${index}`,
    title: item?.title,
  }));
  return (
    <ThemContextAddJob.Provider
      value={{
        dataCreateJob,
        setDataCreateJob,
        nextStep,
        prevStep,
      }}>
      <Row>
        <AppPageMetadata title={messages['sidebar.add_job']} />
        <SubHeaderApp>
          <SubHeaderAppTemplate
            isShowGoBack
            title={
              <Space align={'center'} className={'whitespace-nowrap'}>
                {typeDataMark === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.FML
                  ? 'Thêm mới'
                  : 'Tạo mới'}
              </Space>
            }
          />
        </SubHeaderApp>
        <Col span={24}>
          <Steps current={current} items={itemsRenderTab} progressDot />
          <div className='mt-10'>{listStepItems[current]?.content}</div>
        </Col>
      </Row>
    </ThemContextAddJob.Provider>
  );
}
AddJob.defaultProps = {
  onlySelectQuery: false,
};

export default AddJob;
