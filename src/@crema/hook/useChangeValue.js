import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const useEffectDepth = (callback, value) => {
  const refValue = useRef(null);

  useEffect(() => {
    if (value) {
      if (!refValue.current) {
        refValue.current = value;
      } else if (refValue.current !== value) {
        refValue.current = value;
        return callback();
      }
    }
  }, [value]);
};

useEffectDepth.propTypes = {
  callback: PropTypes.func.isRequired,
  value: PropTypes.any.isRequired,
};

useEffectDepth.defaultProps = {};

export default useEffectDepth;
