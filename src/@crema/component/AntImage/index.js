import React from 'react';
import { Image } from 'antd';
import PropTypes from 'prop-types';
import RenderFileLoad from 'src/@crema/component/RenderFileLoad';
const AntImage = ({ src, ...attrs }) => {
  return <RenderFileLoad src={src} component={Image} {...attrs} />;
};

export default AntImage;

AntImage.propsTypes = {
  src: PropTypes.string,
};
