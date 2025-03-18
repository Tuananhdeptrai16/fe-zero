import { Tag } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
const AntTag = (props) => {
  const { children, ...rest } = props;
  return <Tag {...rest}>{children}</Tag>;
};

export default AntTag;

AntTag.propTypes = {
  children: PropTypes.node,
};
