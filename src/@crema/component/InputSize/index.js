import { Space } from 'antd';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AntInputNumber from 'src/@crema/component/AntInputNumber';
import './input-size.styles.less';
const SIZE_POSITION = ['top', 'right', 'bottom', 'left'];

const InputSize = (props) => {
  const { value: valueProps, onChange: onChangeProps } = props;
  const [spaceSize, setSpaceSize] = useState(valueProps || {});

  useEffect(() => {
    if (valueProps !== spaceSize) {
      setSpaceSize(valueProps || {});
    }
  }, [valueProps]);

  return (
    <Space size={[8, 0]} className='input-size'>
      {SIZE_POSITION.map((size) => (
        <div className='input-size_item' key={`input-size-${size}`}>
          <div className='input-size-preview'>
            <div className={`input-size-preview-${size}`} />
          </div>
          <AntInputNumber
            value={spaceSize?.[size]}
            step={false}
            onChange={(e) => {
              setSpaceSize((prev) => {
                const newSize = {
                  ...(prev || {}),
                  [size]: e,
                };
                onChangeProps(newSize);
                return newSize;
              });
            }}
          />
        </div>
      ))}
      <p>px</p>
    </Space>
  );
};

export default InputSize;

InputSize.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
};

InputSize.defaultProps = {
  value: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
};

InputSize.defaultProps = {};
