import React from 'react';
import { Switch } from 'antd';

const AntSwitch = ({ value, ...props }) => {
  return (
    <div>
      <Switch {...props} checked={value} />
    </div>
  );
};

AntSwitch.propTypes = {};

AntSwitch.defaultProps = {};

export default AntSwitch;
