import React from 'react';
import AntInput from 'src/@crema/component/AntInput';
import Media from 'src/@crema/component/Media';
import { Space } from 'antd';

const LinkSocial = ({ value, preview, ...attrs }) => {
  return (
    <Space direction={'vertical'} style={{ width: '100%' }}>
      <AntInput value={value} {...attrs} />
      <Media width={preview?.width} height={preview?.height} src={value} />
    </Space>
  );
};

LinkSocial.propTypes = {};

LinkSocial.defaultProps = {};

export default LinkSocial;
