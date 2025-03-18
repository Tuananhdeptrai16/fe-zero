import React from 'react';
import { Button } from 'antd';

const HeaderActionButton = (props) => {
  return <Button {...props} />;
};

export default HeaderActionButton;

HeaderActionButton.propsTypes = Button.propTypes;
