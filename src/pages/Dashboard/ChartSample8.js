import React from 'react';
import { Card, Col, Row } from 'antd';
import EChart from 'src/@crema/core/EChart';

import {
  CHART_8_1,
  CHART_8_2,
  CHART_2_2_1,
  CHART_2_2_2,
  CHART_8_3,
  CHART_8_4,
  CHART_8_5,
  CHART_8_6,
  CHART_8_7,
} from 'src/shared/constants/CHARTFAKEDATA_2';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import useIntl from 'react-intl/lib/src/components/useIntl';

const ChartSample8 = () => {
  const { messages } = useIntl();
  return (
    <>
      <AppPageMetadata title={messages['sidebar.IOC_medical_result']} />
      <Card bordered={false} className='px-0'>
        <Row>
          <Col span={8}>
            <EChart
              title={
                ' Vốn đầu tư thực hiện thuộc nguồn vốn ngân sách nhà nước do địa phương quản lý'
              }
              {...CHART_8_1}
              height={500}
            />
          </Col>
          <Col span={8}>
            <EChart
              title={
                ' Vốn đầu tư thực hiện trên địa bàn theo nguồn vốn và khoản mục đầu tư\n'
              }
              {...CHART_2_2_1}
              height={500}
            />
          </Col>
          <Col span={8}>
            <EChart
              title={'Vốn đầu tư thực hiện trên địa bàn theo mục đích đầu tư\n'}
              {...CHART_2_2_2}
              height={500}
            />
          </Col>
          <Col span={8}>
            <EChart
              title={
                'Tỷ lệ trẻ em dưới 1 tuổi tiêm chủng đầy đủ các loại vắc xin '
              }
              {...CHART_8_2}
              height={500}
            />
          </Col>
          <Col span={8}>
            <EChart
              title={'Tỷ lệ trẻ em dưới 5 tuổi suy dinh dưỡng'}
              {...CHART_8_3}
              height={500}
            />
          </Col>
          <Col span={8}>
            <EChart
              title={'Số bác sĩ, giường bệnh'}
              {...CHART_8_4}
              height={500}
            />
          </Col>

          <Col span={8}>
            <EChart title={'HIV/AIDS'} {...CHART_8_5} height={500} />
          </Col>
          <Col span={8}>
            <EChart
              title={'Thống kê các cơ sở y tế'}
              {...CHART_8_6}
              height={500}
            />
          </Col>
          <Col span={8}>
            <EChart
              title={'Biểu đồ dự đoán tỉ lệ Nhân lực/Giường bệnh 2023'}
              {...CHART_8_7}
              height={500}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

ChartSample8.propTypes = {};

ChartSample8.defaultProps = {};

export default ChartSample8;
