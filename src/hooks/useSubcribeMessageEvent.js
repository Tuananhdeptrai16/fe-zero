import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { KEY_SOURCE_EVENT_MESSAGE } from 'src/shared/constants/DataFixed';
const useSubscribeMessageEvent = (callback, options) => {
  const { event: eventListener, deps = [] } = options;

  useEffect(() => {
    const eventListenerMessage = (e) => {
      const eventMessage = e.data?.payload?.event;
      if (
        eventListener &&
        eventListener === eventMessage &&
        e.data.source === KEY_SOURCE_EVENT_MESSAGE
      ) {
        callback(e.data?.payload?.payload);
      }
    };
    window.addEventListener('message', eventListenerMessage, false);

    return () => {
      window.removeEventListener('message', eventListenerMessage);
    };
  }, deps);
};

useSubscribeMessageEvent.propTypes = {
  callback: PropTypes.func.isRequired,
  options: PropTypes.object,
};

useSubscribeMessageEvent.defaultProps = {
  options: {},
};

export default useSubscribeMessageEvent;
