import React from 'react';
import { Avatar } from 'antd';
import RenderFileLoad from 'src/@crema/component/RenderFileLoad';

const AntAvatar = ({ src, ...attrs }) => {
  return <RenderFileLoad src={src} component={Avatar} {...attrs} />;
};

AntAvatar.propTypes = {};

AntAvatar.defaultProps = {};

export default AntAvatar;
