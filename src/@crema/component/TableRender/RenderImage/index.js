import React from 'react';
import PropTypes from 'prop-types';
import AntImage from '../../AntImage';

const RenderImage = ({ src, alt, width, className }) => {
  if (src) {
    return <AntImage src={src} alt={alt} className={className} width={width} />;
  }
  return null;
};

RenderImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  width: PropTypes.number,
  className: PropTypes.string,
};

RenderImage.defaultProps = {};

export default RenderImage;
