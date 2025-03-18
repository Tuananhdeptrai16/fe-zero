import React from 'react';
import PropTypes from 'prop-types';

import styles from './style.module.scss';

const BoxScale = ({ className, children, aspectRatio, ...attrs }) => {
  return (
    <div
      className={`${styles.boxScale} ${className}`}
      style={{ paddingTop: `${100 / aspectRatio}%`, width: '100%' }}
      {...attrs}>
      {children}
    </div>
  );
};

BoxScale.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  aspectRatio: PropTypes.number,
};

BoxScale.defaultProps = {
  className: '',
  aspectRatio: 1,
};

export default BoxScale;
