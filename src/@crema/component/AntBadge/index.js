import React from 'react';
import { Badge } from 'antd';

const AntBadge = ({ status, count, ...attrs }) => {
  return (
    <Badge
      status={status}
      className={count ? 'pr-5' : ''}
      count={count}
      overflowCount={99}
      {...attrs}
    />
  );
};

AntBadge.propTypes = {};

AntBadge.defaultProps = {};

export default AntBadge;
