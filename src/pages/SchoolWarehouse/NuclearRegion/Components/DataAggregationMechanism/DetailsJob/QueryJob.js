import { Col, Row } from 'antd';
import React from 'react';
import NameJob from '../AddJob/Components/NameJob/NameJob';
import Query from '../AddJob/Components/Query/Query';
// import PropTypes from 'prop-types';

QueryJob.propTypes = {};

function QueryJob({ dataDetailJob }) {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <NameJob isDetail dataDetailJob={dataDetailJob} />
      </Col>
      <Col span={24}>
        <Query isDetail dataDetailJob={dataDetailJob} />
      </Col>
    </Row>
  );
}

export default QueryJob;
