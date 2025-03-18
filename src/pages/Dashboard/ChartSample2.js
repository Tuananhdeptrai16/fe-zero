import React from 'react';
import { Card, Col, Row } from 'antd';
import EChart from 'src/@crema/core/EChart';
import {
  CHART_E,
  CHART_D,
  CHART_F,
  CHART_G,
  CHART_L,
  CHART_M,
} from 'src/shared/constants/ChartFakeData';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import useIntl from 'react-intl/lib/src/components/useIntl';

const ChartSample2 = () => {
  const { messages } = useIntl();
  return (
    <>
      <AppPageMetadata
        title={messages['sidebar.education_training_department']}
      />
      <Card bordered={false} className='px-0'>
        <Row>
          <Col span={12}>
            <EChart title={'Tỉ lệ chuyển đổi số'} {...CHART_L} height={500} />
          </Col>
          <Col span={12}>
            <EChart title={'Số cán bộ các cấp'} {...CHART_D} height={500} />
          </Col>
          <Col span={12}>
            <EChart
              title={'Số giáo viên đạt chuẩn'}
              {...CHART_E}
              height={500}
            />
          </Col>
          <Col span={12}>
            <EChart
              title={'Tỉ lệ đánh giá học lực'}
              {...CHART_M}
              height={500}
            />
          </Col>
          <Col span={12}>
            <EChart
              title={'Số lượng học sinh các cấp'}
              {...CHART_F}
              height={500}
            />
          </Col>
          <Col span={12}>
            <EChart title={'Học lực theo các cấp'} {...CHART_G} height={500} />
          </Col>
        </Row>
      </Card>
    </>
  );
};

ChartSample2.propTypes = {};

ChartSample2.defaultProps = {};

export default ChartSample2;
