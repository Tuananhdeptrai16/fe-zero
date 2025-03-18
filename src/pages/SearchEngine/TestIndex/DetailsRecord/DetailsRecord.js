import React from 'react';
import style from './DetailsRecord.module.scss';
import clsx from 'clsx';
import { Col, Row } from 'antd';
import PropTypes from 'prop-types';

DetailsRecord.propTypes = {
  dataDetailRecord: PropTypes.object,
};

function DetailsRecord({ dataDetailRecord }) {
  const keyObject = Object.keys(dataDetailRecord).filter(
    (item) => item !== 'key',
  );
  return (
    <div className={clsx(style.wrapDetailRecord)}>
      <Row gutter={[12, 12]}>
        {keyObject?.map((item, index) => {
          return (
            <Col key={index} span={12}>
              <div className={clsx(style.record_item)}>
                <span className={clsx(style.label)}>{item}:</span>
                <span className={clsx(style.content)}>
                  {dataDetailRecord[item]}
                </span>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default DetailsRecord;
