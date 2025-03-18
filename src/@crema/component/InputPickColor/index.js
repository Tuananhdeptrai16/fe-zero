import { Space } from 'antd';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AntInputNumber from 'src/@crema/component/AntInputNumber';
import BasicPickColor from '../BasicPickColor';
import './input-pick-color.styles.less';

const InputPickColor = (props) => {
  const { value: valueProp, onChange: onChangeProp } = props;
  const [inputData, setInputData] = useState(valueProp);
  useEffect(() => {
    if (valueProp !== inputData) {
      setInputData(valueProp);
    }
  }, [valueProp]);

  const onChangeData = (newValue = {}) => {
    setInputData((prev) => {
      const newData = { ...(prev || {}), ...newValue };
      onChangeProp(newData);
      return newData;
    });
  };

  return (
    <div className='input-pick-color'>
      <Space size={[8, 0]}>
        <AntInputNumber
          suffix='px'
          value={inputData?.width}
          onChange={(e) => {
            onChangeData({ width: e });
          }}
        />
        <BasicPickColor
          value={inputData?.color}
          onChange={(value) => {
            onChangeData({ color: value });
          }}
        />
      </Space>
    </div>
  );
};

InputPickColor.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func,
};

InputPickColor.defaultProps = {
  value: { width: '', color: '' },
};

export default InputPickColor;
