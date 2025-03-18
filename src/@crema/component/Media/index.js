import React from 'react';
import ReactPlayer from 'react-player';
import {
  isFacebookURL,
  isImageURL,
  isTiktokURL,
  isVideoURL,
  isYoutubeURL,
} from 'src/shared/utils/URL';
import AntImage from 'src/@crema/component/AntImage';

const Media = (props) => {
  const { width, height, src, ...attrs } = props;
  switch (true) {
    case isImageURL(src):
      return <AntImage width={width} height={height} src={src} {...attrs} />;
    case isVideoURL(src):
    case isFacebookURL(src):
    case isYoutubeURL(src):
    case isTiktokURL(src):
      return <ReactPlayer width={width} height={height} url={src} {...attrs} />;
    default:
      return null;
  }
};

Media.propTypes = {};

Media.defaultProps = {};

export default Media;
