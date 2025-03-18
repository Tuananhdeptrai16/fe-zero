import { Col, Collapse, Empty, Table } from 'antd';
import clsx from 'clsx';
import React from 'react';
import { Panel } from 'src/@crema/component/AntCollapse';
import './index.style.less';
import API from 'src/@crema/services/apis';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import { isEmpty } from 'lodash';

const FormDetailKPI = ({ rowDataId }) => {
  const { data } = useFetch(
    {
      url: API.GET_DETAIL_KPI(rowDataId),
      method: METHOD_FETCH.POST,
    },
    [rowDataId],
  );
  const columns = [
    {
      title: 'Tên điều kiện',
      dataIndex: 'name',
      key: 'name',
      width: 100,
    },
    {
      title: 'Đơn vị',
      dataIndex: 'unit',
      key: 'unit',
      align: 'center',
      width: 100,
    },
    {
      title: 'Kết quả',
      dataIndex: 'result_total',
      key: 'result_total',
      align: 'center',
      width: 100,
    },
    {
      title: 'Kế hoạch',
      dataIndex: 'result_plan',
      key: 'result_plan',
      align: 'center',
      width: 100,
    },
    {
      title: 'Tỷ lệ (%)',
      dataIndex: 'result_percent',
      key: 'result_percent',
      align: 'center',
      width: 100,
    },
    {
      title: 'Đánh giá',
      dataIndex: 'review',
      key: 'review',
      align: 'center',
      width: 100,
      render: (evaluate) => (
        <span className={clsx(evaluate === true ? 'green' : 'red')}>
          {evaluate === true ? 'Đạt' : 'Chưa đạt'}
        </span>
      ),
    },
  ];
  return (
    <div>
      <Col span={24}>
        {!isEmpty(data?.result) ? (
          <Collapse accordion expandIconPosition='top' defaultActiveKey='0'>
            {data?.result?.map((item, index) => (
              <Panel header={item?.criterion_name} key={index}>
                <Table
                  scroll={{ y: 450 }}
                  columns={columns}
                  dataSource={
                    item?.calculation_formula_response?.result_formula_response
                  }
                />
              </Panel>
            ))}
          </Collapse>
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description='Không có chỉ tiêu nào!'
          />
        )}
      </Col>
    </div>
  );
};

export default FormDetailKPI;
