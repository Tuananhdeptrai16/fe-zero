import React from 'react';
import { Card, Col, Row } from 'antd';
import EChart from 'src/@crema/core/EChart';
import {
  CHART_1_1,
  CHART_1_2,
  CHART_1_3,
} from 'src/shared/constants/ChartFakeData';
import { CHART_1_4 } from 'src/shared/constants/CHARTFAKEDATA_2';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import useIntl from 'react-intl/lib/src/components/useIntl';
import Vaccinated from 'src/assets/image/vaccinated.jpeg';
const ChartSample4 = () => {
  const { messages } = useIntl();
  return (
    <>
      <AppPageMetadata title={messages['sidebar.IOC_medical_result']} />
      <Card bordered={false} className='px-0'>
        <Row>
          <Col span={8}>
            <img src={Vaccinated} height={200} width={500} />
          </Col>
          <Col span={8}>
            <EChart
              title={'Thống kê tỷ suất sinh tử'}
              {...CHART_1_1}
              height={500}
            />
          </Col>

          <Col span={8}>
            <EChart
              title={
                'Thống kê tỉ lệ phụ nữ mang thai có các biện pháp can thiệp'
              }
              {...CHART_1_2}
              height={500}
            />
          </Col>

          <Col span={8}>
            <EChart
              title={'Thống kê số người từ 15 tuổi sử dụng chất kích thích'}
              {...CHART_1_3}
              height={500}
            />
          </Col>

          <Col span={8}>
            <EChart
              title={'Tỉ số giới tính khi sinh (nam/100 nữ)'}
              {...CHART_1_4}
              height={500}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

ChartSample4.propTypes = {};

ChartSample4.defaultProps = {};

export default ChartSample4;
