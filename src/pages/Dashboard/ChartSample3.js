import React from 'react';
import { Card, Col, Row } from 'antd';
import EChart from 'src/@crema/core/EChart';
import {
  CHART_1,
  CHART_2,
  CHART_3,
  CHART_4,
  CHART_5,
  CHART_6,
} from 'src/shared/constants/ChartFakeData';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import useIntl from 'react-intl/lib/src/components/useIntl';

const ChartSample3 = () => {
  const { messages } = useIntl();
  return (
    <>
      <AppPageMetadata title={messages['sidebar.department_of_labor']} />
      <Card bordered={false} className='px-0'>
        <Row>
          <Col span={8}>
            <EChart
              title={'Tỉ lệ lao động đã qua đào tạo'}
              {...CHART_1}
              height={500}
            />
          </Col>
          <Col span={8}>
            <EChart
              title={'Tổng số lao động đã qua đào tạo'}
              {...CHART_2}
              height={500}
            />
          </Col>
          <Col span={8}>
            <EChart
              title={'Tỉ lệ nam/nữ đã qua đào tạo'}
              {...CHART_3}
              height={500}
            />
          </Col>
          <Col span={8}>
            <EChart
              title={'Số lượng lao động có việc làm và thất nghiệp'}
              {...CHART_4}
              height={500}
            />
          </Col>
          <Col span={8}>
            <EChart
              title={'Tỉ lệ thất nghiệp so sánh với khu vực'}
              {...CHART_5}
              height={500}
            />
          </Col>
          <Col span={8}>
            <EChart
              title={'Số việc làm mới tạo ra theo từng năm'}
              {...CHART_6}
              height={500}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

ChartSample3.propTypes = {};

ChartSample3.defaultProps = {};

export default ChartSample3;
