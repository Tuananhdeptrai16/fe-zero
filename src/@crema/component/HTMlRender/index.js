import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import AppErrorBoundary from 'src/@crema/core/AppErrorBoundary';

const HTMLRender = forwardRef((props, ref) => {
  const { className, children, as: Component = 'div', ...restProps } = props;
  return (
    <AppErrorBoundary>
      <Component {...restProps} ref={ref} className={className}>
        {children}
      </Component>
    </AppErrorBoundary>
  );
});

HTMLRender.propTypes = {
  as: PropTypes.oneOfType([PropTypes.elementType, PropTypes.any]),
  className: PropTypes.string,
};

HTMLRender.defaultProps = {
  as: 'div',
  className: '',
};

export default HTMLRender;
