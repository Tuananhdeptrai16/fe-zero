import React from 'react';
import PropTypes from 'prop-types';
import { Slider } from 'antd';

const AntSlider = (props) => {
  return <Slider {...props} />;
};

export default AntSlider;

AntSlider.propTypes = {
  pickerType: PropTypes.string,
};
