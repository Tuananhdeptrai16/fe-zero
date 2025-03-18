import { isEqual } from 'lodash';
import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const useEffectDepth = (effectFunction, deps = []) => {
  const oldDeps = useRef();

  useEffect(() => {
    if (!isEqual(oldDeps.current, deps)) {
      oldDeps.current = deps;

      return effectFunction();
    }
    // eslint-disable-next-line
  }, deps);
};

useEffectDepth.propTypes = {
  effectFunction: PropTypes.func.isRequired,
  deps: PropTypes.array,
};

useEffectDepth.defaultProps = {};

export default useEffectDepth;
