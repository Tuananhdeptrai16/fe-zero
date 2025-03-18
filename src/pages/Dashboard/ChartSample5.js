import React from 'react';
import { Card, Col, Row } from 'antd';
import EChart from 'src/@crema/core/EChart';
import BirthRate from 'src/assets/image/Birth_Rate.jpeg';
import TotalHIV from 'src/assets/image/Total_HIV.jpeg';
import OverweightRate from 'src/assets/image/Overweight_Rate.jpeg';
import {
  CHART_2_0,
  CHART_2_1,
  CHART_2_2,
  CHART_2_3,
} from 'src/shared/constants/CHARTFAKEDATA_2';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import useIntl from 'react-intl/lib/src/components/useIntl';

const ChartSample5 = () => {
  const { messages } = useIntl();
  return (
    <>
      <AppPageMetadata title={messages['sidebar.IOC_medical_result']} />
      <Card bordered={false} className='px-0'>
        <Row>
          <Col span={8}>
            <img src={BirthRate} height={200} width={500} />
          </Col>
          <Col span={8}>
            <img src={OverweightRate} height={200} width={500} />
          </Col>

          <Col span={8}>
            <img src={TotalHIV} height={200} width={500} />
          </Col>
          <Col span={8}>
            <EChart
              title={'Tỉ lệ trẻ em dưới 5 tuổi suy dinh dưỡng'}
              {...CHART_2_0}
              height={500}
            />
          </Col>
          <Col span={8}>
            <EChart title={'Thống kê HIV/AIDS'} {...CHART_2_1} height={500} />
          </Col>
          <Col span={8}>
            <EChart
              title={' Thống kê tỷ lệ tử vong theo nguyên nhân'}
              {...CHART_2_2}
              height={500}
            />
          </Col>

          <Col span={8}>
            <EChart
              title={' Thống kê số ca mắc các bệnh truyền nhiễm nguy hiểm'}
              {...CHART_2_3}
              height={500}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

ChartSample5.propTypes = {};

ChartSample5.defaultProps = {};

export default ChartSample5;
