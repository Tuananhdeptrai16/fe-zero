import React, { memo, useState } from 'react';
import style from './AddIndexSearchEngine.module.scss';
import clsx from 'clsx';
import { Steps, Skeleton } from 'antd';
import ChooseDataSource from '../ChooseDataSource';
import ChooseColumnsData from '../ChooseColumnsData';
import RenameIndex from '../RenameIndex';
import ReNameColumns from '../ReNameColumns/ReNameColumns';
import CreateFilter from '../CreateFilter';
import ChooseTable from '../ChooseTable';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import API from 'src/@crema/services/apis';
import { useSelector } from 'react-redux';
import { FILTER_OPERATION } from 'src/shared/constants/DataTable';
import { useSearchParams } from 'react-router-dom';

function TableListDataSource() {
  const idOrganization = useSelector(
    (state) => state?.common?.sourceEngineActive,
  );
  const [searchParams] = useSearchParams();
  const idOrganizationParams = searchParams.get('q');

  const [current, setCurrent] = useState(0);
  const nextStep = () => {
    setCurrent(current + 1);
  };
  const prevStep = () => {
    setCurrent(current - 1);
  };
  // get list data source
  const { data, isLoading } = useFetch(
    {
      method: METHOD_FETCH.POST,
      url: API.SEARCH_LIST_DATABASE_SOURCE,
      body: {
        filters: [
          {
            name: 'organization_id',
            operation: FILTER_OPERATION.EQ,
            value: idOrganization || idOrganizationParams,
          },
        ],
        pageable: {
          page: 1,
          page_size: 1000,
        },
      },
    },
    [],
  );
  const listDataSource = data?.result?.items || [];

  const steps = [
    {
      title: 'Chọn nguồn dữ liệu',
      content: (
        <>
          {isLoading ? (
            <>
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </>
          ) : (
            <ChooseDataSource
              nextStep={nextStep}
              listDataSource={listDataSource}
            />
          )}
        </>
      ),
    },
    {
      title: 'Chọn bảng',
      content: <ChooseTable nextStep={nextStep} prevStep={prevStep} />,
    },
    {
      title: 'Chọn cột trong nguồn dữ liệu',
      content: <ChooseColumnsData nextStep={nextStep} prevStep={prevStep} />,
    },
    {
      title: 'Thay đổi tên chỉ mục',
      content: <RenameIndex nextStep={nextStep} prevStep={prevStep} />,
    },
    {
      title: 'Thay đổi tên thay thế cho cột',
      content: <ReNameColumns prevStep={prevStep} nextStep={nextStep} />,
    },
    {
      title: 'Chọn trường tạo bộ lọc',
      content: <CreateFilter prevStep={prevStep} />,
    },
  ];
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <div className={clsx(style.wrapAddIndex)}>
      <div className={clsx(style.addIndexContent)}>
        <div>
          <h3 className={clsx(style.addIndexContent_title)}>
            Thêm chỉ mục tìm kiếm
          </h3>
          <Steps
            current={current}
            items={items}
            direction='vertical'
            labelPlacement='vertical'
            className={clsx(style.steps)}
          />
        </div>

        <div className={clsx(style.contentSteps)}>
          <div className={clsx(style.stepContent_custom)}>
            {steps[current].content}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(TableListDataSource);
