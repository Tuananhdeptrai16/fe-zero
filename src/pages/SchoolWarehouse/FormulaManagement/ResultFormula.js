import { Table, Tag } from 'antd';
import React from 'react';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import API from 'src/@crema/services/apis';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
// import PropTypes from 'prop-types';

ResultFormula.propTypes = {};

function ResultFormula({ rowData }) {
  const { data, isLoading } = useFetch(
    {
      method: METHOD_FETCH.GET,
      url: API.CHECK_RESULT_FORMULA(rowData?.id),
    },
    [rowData?.id],
  );
  const dataResultFormula = data?.result || [];
  const columns = [
    {
      title: 'Tên điều kiện',
      dataIndex: 'name',
      width: 180,
      fixed: 'left',
      key: 'name',
    },
    {
      title: 'Đơn vị',
      dataIndex: 'unit',
      width: 120,
      key: 'unit',
    },
    {
      title: 'Kết quả',
      dataIndex: 'result_total',
      width: 120,
      key: 'result_total',
    },
    {
      title: 'Kế hoạch',
      dataIndex: 'result_plan',
      width: 120,
      key: 'result_plan',
    },
    {
      title: 'Tỷ lệ (%)',
      dataIndex: 'result_percent',
      width: 120,
      key: 'result_percent',
    },
    {
      title: 'Đánh giá',
      dataIndex: 'review',
      width: 120,
      key: 'review',
      render: (data) => {
        if (data) {
          return <Tag color='success'>Đạt</Tag>;
        }
        return <Tag color='error'>Chưa đạt</Tag>;
      },
    },
  ];

  return (
    <Table
      loading={isLoading}
      key={`result_formula`}
      columns={columns}
      dataSource={dataResultFormula}
      pagination={false}
      scroll={{
        y: 800,
      }}
      rowKey={(data) => {
        return data?.id;
      }}
    />
  );
}

export default ResultFormula;
