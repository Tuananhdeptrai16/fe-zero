import React from 'react';
import { Card, Col, Row } from 'antd';
import EChart from 'src/@crema/core/EChart';
import {
  CHART_A,
  CHART_C,
  CHART_I,
  CHART_J,
  CHART_K,
  CHART_N,
} from 'src/shared/constants/ChartFakeData';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import useIntl from 'react-intl/lib/src/components/useIntl';

const ChartSample1 = () => {
  const { messages } = useIntl();
  return (
    <>
      <AppPageMetadata title={messages['sidebar.department_VHTT_DL']} />
      <Card bordered={false} className='px-0'>
        <Row>
          <Col span={8}>
            <EChart
              title={'Tổng chi ngân sách nhà nước'}
              {...CHART_A}
              height={500}
            />
          </Col>
          <Col span={8}>
            <EChart
              title={'Thống kê số lượng di tích'}
              {...CHART_I}
              height={500}
            />
          </Col>
          <Col span={8}>
            <EChart
              title={'Số cơ sở lưu trú Du Lịch'}
              {...CHART_N}
              height={500}
            />
          </Col>
          <Col span={8}>
            <EChart
              title={'Thống kê vụ bạo lực gia đình'}
              {...CHART_C}
              height={600}
            />
          </Col>
          <Col span={8}>
            <EChart
              title={'Giải tham dự và huy chương thi đấu chuyên nghiệp'}
              {...CHART_K}
              height={600}
            />
          </Col>
          <Col span={8}>
            <EChart
              title={'Thống kê lượng khách du lịch'}
              {...CHART_J}
              height={600}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

ChartSample1.propTypes = {};

ChartSample1.defaultProps = {};

export default ChartSample1;
