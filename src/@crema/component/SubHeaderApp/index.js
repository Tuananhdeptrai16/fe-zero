import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSubHeaderApp } from './SubHeaderAppContext';

const SubHeaderApp = (props) => {
  const { children, deps = [] } = props;
  const { setContent } = useSubHeaderApp();

  useEffect(() => {
    setContent(children);
    // eslint-disable-next-line
  }, [...deps]);

  return null;
};

SubHeaderApp.propTypes = {
  children: PropTypes.node,
};

SubHeaderApp.defaultProps = {};

export default SubHeaderApp;
