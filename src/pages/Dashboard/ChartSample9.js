import React from 'react';
import { Card, Col, Row } from 'antd';
import EChart from 'src/@crema/core/EChart';

import {
  CHART_9_1,
  CHART_9_2,
  CHART_9_3,
  CHART_9_4,
  CHART_9_5,
} from 'src/shared/constants/CHARTFAKEDATA_2';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import useIntl from 'react-intl/lib/src/components/useIntl';

const ChartSample9 = () => {
  const { messages } = useIntl();
  return (
    <>
      <AppPageMetadata title={messages['sidebar.IOC_medical_result']} />
      <Card bordered={false} className='px-0'>
        <Row>
          <Col span={8}>
            <EChart title={'Tổng chi cho KH&CN'} {...CHART_9_1} height={500} />
          </Col>
          <Col span={8}>
            <EChart title={'Nhiệm vụ KH&CN'} {...CHART_9_2} height={500} />
          </Col>
          <Col span={8}>
            <EChart
              title={
                'Số phương tiện đo, chuẩn đo lường được kiểm định, hiệu chuẩn, thử nghiệm'
              }
              {...CHART_9_3}
              height={500}
            />
          </Col>
          <Col span={8}>
            <EChart
              title={
                'Số người hoạt động trong lĩnh vực năng lượng nguyên tử, an toàn bức xạ và hạt nhân'
              }
              {...CHART_9_4}
              height={500}
            />
          </Col>

          <Col span={8}>
            <EChart
              title={
                'Số thiết bị bức xạ, nguồn phóng xạ, giấy phép tiến hành công việc bức xạ được cấp'
              }
              {...CHART_9_5}
              height={500}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

ChartSample9.propTypes = {};

ChartSample9.defaultProps = {};

export default ChartSample9;
