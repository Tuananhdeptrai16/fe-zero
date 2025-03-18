import React from 'react';
import { Card, Col, Row } from 'antd';
import EChart from 'src/@crema/core/EChart';

import {
  CHART_10_1,
  CHART_10_2,
  CHART_10_3,
  CHART_10_4,
} from 'src/shared/constants/CHARTFAKEDATA_2';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import useIntl from 'react-intl/lib/src/components/useIntl';

const ChartSample10 = () => {
  const { messages } = useIntl();
  return (
    <>
      <AppPageMetadata title={messages['sidebar.IOC_medical_result']} />
      <Card bordered={false} className='px-0'>
        <Row>
          <Col span={8}>
            <EChart
              title={'Lượng nhiên liệu tiêu thụ trong ngành GTVT'}
              {...CHART_10_1}
              height={500}
            />
          </Col>
          <Col span={8}>
            <EChart
              title={'Sản lượng dịch vụ vận tải'}
              {...CHART_10_2}
              height={500}
              style={{ marginTop: '20px' }}
            />
          </Col>
          <Col span={8}>
            <EChart
              title={'Chiều dài các tuyến đường hiện có'}
              {...CHART_10_3}
              height={500}
            />
          </Col>
          <Col span={8}>
            <EChart
              title={'Các công trình giao thông'}
              {...CHART_10_4}
              height={500}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

ChartSample10.propTypes = {};

ChartSample10.defaultProps = {};

export default ChartSample10;
