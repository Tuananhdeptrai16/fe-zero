import React from 'react';
import PropTypes from 'prop-types';
import { isObject } from '../../../../shared/utils/Typeof';
import Link from '../../Link';

const RenderLink = ({ to, className, children }) => {
  if (isObject(to)) {
    return (
      <a href={to.pathname} target={to.target} className={className}>
        {children}
      </a>
    );
  }

  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }

  return null;
};
RenderLink.propTypes = {
  children: PropTypes.node,
  to: PropTypes.any,
  className: PropTypes.string,
};

RenderLink.defaultProps = {};

export default RenderLink;
