import React from 'react';
import './index.style.less';
import { Card, Col, Row } from 'antd';
import EChart from 'src/@crema/core/EChart';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import clsx from 'clsx';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import API from 'src/@crema/services/apis';
import useFetch from 'src/@crema/hook/fetchData/useFetch';

const WorkspaceDashboard = () => {
  const { data } = useFetch(
    {
      method: METHOD_FETCH.POST,
      url: API.GET_COUNT_JOB,
      body: {
        group_by: [
          {
            keyword: '',
            pageable: {
              page: 1,
              pageSize: 10,
            },
            filters: [
              {
                name: 'category',
                value: 'ORGANIZATION',
                operation: 'eq',
              },
            ],
          },
          {
            keyword: '',
            pageable: {
              page: 1,
              pageSize: 10,
            },
            filters: [
              {
                name: 'category',
                value: 'E_LEARNING',
                operation: 'eq',
              },
            ],
          },
          {
            keyword: '',
            pageable: {
              page: 1,
              pageSize: 10,
            },
            filters: [
              {
                name: 'category',
                value: 'DMDC',
                operation: 'eq',
              },
            ],
          },
          {
            keyword: '',
            pageable: {
              page: 1,
              pageSize: 10,
            },
            filters: [
              {
                name: 'category',
                value: 'NCKH',
                operation: 'eq',
              },
              { name: 'type', value: 'ATM', operation: 'eq' },
            ],
          },
          {
            keyword: '',
            pageable: {
              page: 1,
              pageSize: 10,
            },
            filters: [
              {
                name: 'category',
                value: 'SUPPORT',
                operation: 'eq',
              },
            ],
          },
          {
            keyword: '',
            pageable: {
              page: 1,
              pageSize: 10,
            },
            filters: [
              {
                name: 'category',
                value: 'EXAMINATION',
                operation: 'eq',
              },
            ],
          },
          {
            keyword: '',
            pageable: {
              page: 1,
              pageSize: 10,
            },
            filters: [
              {
                name: 'category',
                value: 'DOCUMENT',
                operation: 'eq',
              },
            ],
          },
          {
            keyword: '',
            pageable: {
              page: 1,
              pageSize: 10,
            },
            filters: [
              {
                name: 'category',
                value: 'OFFICE',
                operation: 'eq',
              },
            ],
          },
        ],
      },
    },
    [],
  );

  const count = data?.result?.total?.map((item) => {
    if (item.name === 'ORGANIZATION') return { ...item, name: 'Đào tạo' };
    else if (item.name === 'E_LEARNING') return { ...item, name: 'E-Learning' };
    else if (item.name === 'SUPPORT')
      return { ...item, name: 'Hỗ trợ đào tạo' };
    else if (item.name === 'EXAMINATION') return { ...item, name: 'Khảo thí' };
    else if (item.name === 'DOCUMENT') return { ...item, name: 'VBĐH' };
    else if (item.name === 'OFFICE') return { ...item, name: 'QLVP' };
    else return item;
  });

  const totalCount = count?.reduce((acc, obj) => acc + obj.value, 0);

  const CHART = {
    option: {
      tooltip: {
        trigger: 'item',
      },
      title: {
        text: totalCount,
        left: '39%',
        top: 'center',
        textAlign: 'center',
        textStyle: {
          fontSize: 32,
        },
      },
      legend: {
        orient: 'vertical',
        right: 30,
        top: 50,
        bottom: 50,
        textStyle: {
          fontSize: 16,
          lineHeight: 30,
          // fontWeight: 600,
        },
      },
      series: [
        {
          name: 'Đơn vị: Job',
          type: 'pie',
          radius: ['35%', '65%'],
          center: ['40%', '50%'],
          avoidLabelOverlap: false,
          itemStyle: {
            // borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            alignTo: 'labelLine',
            formatter: '{name|{b}}\n{time|{d} %}',
            minMargin: 5,
            edgeDistance: 10,
            lineHeight: 18,
            fontSize: 16,
            rich: {
              time: {
                fontSize: 12,
                color: '#999',
              },
            },
          },
          labelLine: {
            length: 50,
            length2: 50,
            maxSurfaceAngle: 80,
          },
          data: count,
        },
      ],
    },
  };
  return (
    <div>
      <AppPageMetadata title={'Bàn làm việc'} />
      <div className='workspaceContainer'>
        <h1>Thống kê các job tổng hợp dữ liệu</h1>
        <Row gutter={32}>
          <Col span={8}>
            <Row gutter={[24, 24]}>
              {count?.map((item, index) => {
                if (index % 2 === 0)
                  return (
                    <Col span={12} key={item.name}>
                      <Card className={clsx('dashCard dashCard-blue')}>
                        <div className='cardName'>{item.name}</div>
                        <div className='cardValue'>{item.value}</div>
                      </Card>
                    </Col>
                  );
                else
                  return (
                    <Col span={12} key={item.name}>
                      <Card className={clsx('dashCard dashCard-purple')}>
                        <div className='cardName'>{item.name}</div>
                        <div className='cardValue'>{item.value}</div>
                      </Card>
                    </Col>
                  );
              })}
            </Row>
          </Col>
          <Col span={16}>
            <Card className='dashChart'>
              <EChart {...CHART} height={450} />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default WorkspaceDashboard;
