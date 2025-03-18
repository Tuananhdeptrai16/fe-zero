import { Space } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import AntInputNumber from '../AntInputNumber';

const AntInputNumberRange = ({
  value: valueProps = [],
  onChange: onChangeProps,
  placeholderMin,
  placeholderMax,
  minNumber,
  maxNumber,
  ...attrs
}) => {
  return (
    <Space size={[8, 0]}>
      <AntInputNumber
        {...attrs}
        value={valueProps[0]}
        style={{ width: '100%' }}
        onChange={(e) => {
          onChangeProps([e, valueProps[1]]);
        }}
        addonBefore='Min'
        placeholder={placeholderMin}
        min={minNumber}
        max={maxNumber}
      />
      <AntInputNumber
        {...attrs}
        value={valueProps[1]}
        style={{ width: '100%' }}
        onChange={(e) => {
          onChangeProps([valueProps[0], e]);
        }}
        addonBefore='Max'
        placeholder={placeholderMax}
        min={minNumber}
        max={maxNumber}
      />
    </Space>
  );
};

AntInputNumberRange.propTypes = {
  value: PropTypes.array,
  onChange: PropTypes.func,
  placeholderMin: PropTypes.string,
  placeholderMax: PropTypes.string,
  minNumber: PropTypes.number,
  maxNumber: PropTypes.number,
};

AntInputNumberRange.defaultProps = {};

export default AntInputNumberRange;
