import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const Context = React.createContext({});

const { Provider } = Context;

function SubHeaderAppContext({ initPage, children }) {
  const { pathname } = useLocation();
  const [content, setContent] = useState(initPage);
  const pathnameContent = useRef(pathname);

  useEffect(() => {
    if (content !== initPage && pathnameContent.current !== pathname) {
      setContent(initPage);
    }
  }, [content, initPage, pathname]);

  const changeContent = (newContent) => {
    pathnameContent.current = pathname;
    setContent(newContent);
  };

  const contextValue = {
    content,
    setContent: changeContent,
  };

  return <Provider value={contextValue}>{children}</Provider>;
}

SubHeaderAppContext.propTypes = {
  children: PropTypes.node,
  initPage: PropTypes.node,
};

SubHeaderAppContext.defaultProps = {};

export const useSubHeaderApp = () => React.useContext(Context);

export default SubHeaderAppContext;
