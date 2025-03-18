import React from 'react';
import { Col, Row } from 'antd';
const Transformation = () => {
  return (
    <Row>
      <Col span={24}>
        <div
          style={{
            backgroundColor: 'white',
            textAlign: 'center',
            maxWidth: 500,
            minHeight: 100,
            display: 'flex',
            alignItems: 'center',
            margin: 'auto',
            borderRadius: '5px',
          }}>
          <p
            style={{
              fontSize: '.875rem',
              fontWeight: 500,
              lineHeight: 1.3,
              marginTop: '15px',
            }}>
            Normalization and Transformation operations are not supported for
            this connection.
          </p>
        </div>
      </Col>
    </Row>
  );
};

export default Transformation;
