import React from 'react';
import { Button } from 'antd';

const AntButton = (props) => {
  return <Button {...props} />;
};

export default AntButton;

AntButton.propsTypes = Button.propTypes;
