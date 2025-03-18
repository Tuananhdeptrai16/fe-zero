import React from 'react';
import { Card, Col, Row } from 'antd';
import EChart from 'src/@crema/core/EChart';

import HospitalBed from 'src/assets/image/Hospital_Bed.jpeg';
import Inpatient from 'src/assets/image/Inpatient.jpeg';
import MedicalExamination from 'src/assets/image/Medical_Examination.jpeg';

import {
  CHART_6_1,
  CHART_6_2,
  CHART_6_3,
} from 'src/shared/constants/CHARTFAKEDATA_2';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import useIntl from 'react-intl/lib/src/components/useIntl';

const ChartSample6 = () => {
  const { messages } = useIntl();
  return (
    <>
      <AppPageMetadata title={messages['sidebar.IOC_medical_result']} />
      <Card bordered={false} className='px-0'>
        <Row>
          <Col span={8}>
            <img src={HospitalBed} height={200} width={500} />
          </Col>
          <Col span={8}>
            <img src={Inpatient} height={200} width={500} />
          </Col>
          <Col span={8}>
            <img src={MedicalExamination} height={200} width={500} />
          </Col>
          <Col span={8}>
            <EChart
              title={'Tỉ lệ người bệnh hài lòng với dịch vụ khám bệnh'}
              {...CHART_6_1}
              height={500}
              marginTop={20}
            />
          </Col>

          <Col span={8}>
            <EChart
              title={'Số mẫu thuốc được lấy để kiểm tra chất lượng'}
              {...CHART_6_2}
              height={500}
            />
          </Col>

          <Col span={8}>
            <EChart
              title={'Thống kê số ca tai biến y khoa'}
              {...CHART_6_3}
              height={500}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

ChartSample6.propTypes = {};

ChartSample6.defaultProps = {};

export default ChartSample6;
