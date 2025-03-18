import { InputNumber } from 'antd';
import React from 'react';
import styles from './style.module.scss';

const AntInputNumber = (props) => {
  // The Number.MAX_SAFE_INTEGER static data property represents the maximum safe integer in JavaScript (2^53 – 1).
  const handleMaxSafeInteger = (value) => {
    if (
      value === null ||
      (typeof value === 'number' && value <= Number.MAX_SAFE_INTEGER)
    ) {
      props.onChange(value);
    }
  };
  return (
    <InputNumber
      className={styles.inputNumber}
      {...props}
      onChange={handleMaxSafeInteger}
    />
  );
};

export default AntInputNumber;
