import { Dropdown } from 'antd';
import React, { useState, useEffect } from 'react';
import { SketchPicker } from 'react-color';
import { AiOutlineBgColors } from 'react-icons/ai';
import './basic-pick-color.styles.less';
import PropTypes from 'prop-types';
const BasicPickColor = (props) => {
  const { onChange: onChangeProps, value: valueProps, className } = props;
  const [color, setColor] = useState('');

  useEffect(() => {
    if (valueProps !== color) {
      setColor(valueProps);
    }
  }, [valueProps]);

  const handleChange = (color) => {
    setColor(color.hex);
    onChangeProps(color.hex);
  };

  return (
    <div className={`picker-container ${className}`}>
      <Dropdown
        overlayStyle={{ zIndex: 1052 }}
        trigger={['click']}
        dropdownRender={() => (
          <SketchPicker color={color} onChange={handleChange} />
        )}>
        <div className='button-picker-color'>
          <AiOutlineBgColors />
        </div>
      </Dropdown>
    </div>
  );
};

BasicPickColor.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  className: PropTypes.string,
};

export default BasicPickColor;
