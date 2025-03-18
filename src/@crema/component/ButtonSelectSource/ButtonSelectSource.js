import { Col, Row, Typography } from 'antd';
import styles from './styles.module.scss';
import React from 'react';

const ButtonSelectSource = ({ onClick, sourceImg, alt, title }) => {
  return (
    <button className={styles.button_select_source} onClick={onClick}>
      <Row align={'middle'} justify={'space-between'}>
        <Col span={18}>
          <Row align={'middle'} justify={'start'}>
            <Col span={6}>
              <img src={sourceImg} alt={alt} className={styles.image_source} />
            </Col>
            <Col span={18} className={styles.button_title_container}>
              <Typography.Text className={styles.button_title} strong>
                {title}
              </Typography.Text>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <p className={styles.tag_text}>Cộng đồng</p>
        </Col>
      </Row>
    </button>
  );
};

export default ButtonSelectSource;
