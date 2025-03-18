import React from 'react';
import { Input } from 'antd';

const AntInputPassword = (props) => {
  return <Input.Password autoComplete='off' {...props} />;
};

export default AntInputPassword;
