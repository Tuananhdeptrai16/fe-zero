import React from 'react';
import PropTypes from 'prop-types';
import SimpleBarReact from 'simplebar-react';
import 'simplebar/src/simplebar.css';

const AppScrollbar = React.forwardRef(
  ({ children, className, ...others }, ref) => {
    return (
      <SimpleBarReact ref={ref} {...others} className={className}>
        {children}
      </SimpleBarReact>
    );
  },
);

export default AppScrollbar;

AppScrollbar.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  scrollToTop: PropTypes.bool,
};
