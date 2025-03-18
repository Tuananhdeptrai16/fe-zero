import React from 'react';
import { Card, Col, Row } from 'antd';
import EChart from 'src/@crema/core/EChart';
import AverageTotal from 'src/assets/image/Average_Total.jpeg';
import Human from 'src/assets/image/Human.jpeg';
import Student from 'src/assets/image/Student.jpeg';
import {
  CHART_7_1,
  CHART_7_2,
  CHART_7_3,
  CHART_7_4,
  CHART_7_5,
} from 'src/shared/constants/CHARTFAKEDATA_2';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import useIntl from 'react-intl/lib/src/components/useIntl';

const ChartSample7 = () => {
  const { messages } = useIntl();
  return (
    <>
      <AppPageMetadata title={messages['sidebar.IOC_medical_result']} />
      <Card bordered={false} className='px-0'>
        <Row>
          <Col span={8}>
            <img src={AverageTotal} height={200} width={500} />
          </Col>
          <Col span={8}>
            <img src={Human} height={200} width={500} />
          </Col>
          <Col span={8}>
            <img src={Student} height={200} width={500} />
          </Col>
          <Col span={8}>
            <EChart
              title={'Tỷ lệ chi NSNN cho y tế trong tổng chi NSNN'}
              {...CHART_7_1}
              height={500}
            />
          </Col>
          <Col span={8}>
            <EChart
              title={'Thống kê tỷ lệ chi so với tổng chi y tế '}
              {...CHART_7_2}
              height={500}
            />
          </Col>
          <Col span={8}>
            <EChart
              title={'Thống kê Nhân lực y tế'}
              {...CHART_7_3}
              height={500}
            />
          </Col>
          <Col span={8}>
            <EChart title={'Thống kê Cơ sở y tế'} {...CHART_7_4} height={500} />
          </Col>

          <Col span={8}>
            <EChart
              title={
                'Tỷ lệ Trạm y tế xã phường có bác sĩ, hộ sinh hoặc y sỹ sản nhi'
              }
              {...CHART_7_5}
              height={500}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

ChartSample7.propTypes = {};

ChartSample7.defaultProps = {};

export default ChartSample7;
