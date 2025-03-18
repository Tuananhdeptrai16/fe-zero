/* eslint-disable react/display-name */
import React from 'react';
import useFetch from './useFetch';

const wrapperFetchData = (Component) => {
  return (config) => {
    return React.forwardRef((props, ref) => {
      const fetchResponse = useFetch(config);
      return <Component ref={ref} {...props} fetchResponse={fetchResponse} />;
    });
  };
};

export default wrapperFetchData;
