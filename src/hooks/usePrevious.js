import { useState } from 'react';
import { isEqual } from 'lodash';

export function usePrevious(value) {
  const [current, setCurrent] = useState(value);
  const [previous, setPrevious] = useState(null);

  if (!isEqual(value, current)) {
    setPrevious(current);
    setCurrent(value);
  }

  return previous;
}

export default usePrevious;
