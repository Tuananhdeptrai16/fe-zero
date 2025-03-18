var controllerOpensource = {
  _KEY_SOURCE: 'datamine',
  _POST_MESSAGE_EVENT: {
    INIT: 'init',
    RESIZE_WINDOW: 'resize_window',
  },
  _LISTENER_MESSAGE_EVENT: {
    ADD_SCRIPT: 'add_script',
    ADD_STYLE: 'add_style',
  },
  _PLATFORM: {
    AIRBYTE: 'airbyte',
    AIRFLOW: 'airflow',
    GRAFANA: 'grafana',
  },
  isInit: false,
  init: function () {
    if (!this.isInit && document.body) {
      this.isInit = true;
      this.handleBindThis();
      this.addListenerMessage();
      this.addListenerResizeBody();
      this.addListenerStateHistory();

      this.sendEventInitPage();
    }
  },
  handleBindThis: function () {
    Object.keys(this).forEach((property) => {
      if (typeof this[property] === 'function' && this[property].bind) {
        this[property] = this[property].bind(this);
      }
    });
  },
  sendEventInitPage: function () {
    this.postMessage({
      event: this._POST_MESSAGE_EVENT.INIT,
      payload: {
        ...this.getWindowSize(),
        href: window.location.href,
      },
    });
  },
  addListenerStateHistory: function () {
    let oldPushState = history.pushState;
    history.pushState = function pushState() {
      let ret = oldPushState.apply(this, arguments);
      window.dispatchEvent(new Event('pushstate'));
      window.dispatchEvent(new Event('locationchange'));
      return ret;
    };

    let oldReplaceState = history.replaceState;
    history.replaceState = function replaceState() {
      let ret = oldReplaceState.apply(this, arguments);
      window.dispatchEvent(new Event('replacestate'));
      window.dispatchEvent(new Event('locationchange'));
      return ret;
    };

    var that = this;
    window.addEventListener('locationchange', function () {
      that.sendEventInitPage();
    });
  },
  getWindowSize: function () {
    return {
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      outerWidth: window.outerWidth,
      outerHeight: window.outerHeight,
      scrollHeight: this.getScrollElHeight(),
    };
  },
  checkPlatform: function () {
    const url = window.location.href;
    switch (true) {
      case url.includes('airbyte'):
        return this._PLATFORM.AIRBYTE;
      case url.includes('airflow'):
        return this._PLATFORM.AIRFLOW;
      case url.includes('graf'):
        return this._PLATFORM.GRAFANA;
      default:
        return 'unknown';
    }
  },
  getScrollElHeight: function () {
    const scrollHeightBody = document.body.scrollHeight;
    switch (this.checkPlatform()) {
      case this._PLATFORM.AIRBYTE: {
        const elScroll = document.querySelector(
          'div[class^=MainPageWithScroll-module__content__]',
        );
        if (
          elScroll &&
          elScroll.offsetHeight &&
          elScroll.parentElement &&
          elScroll.parentElement.offsetHeight
        ) {
          return (
            scrollHeightBody +
            elScroll.offsetHeight -
            elScroll.parentElement.offsetHeight
          );
        }
        return scrollHeightBody;
      }
      default:
        return scrollHeightBody;
    }
  },
  addListenerResizeBody: function () {
    if (window.MutationObserver) {
      var that = this;

      var windowSizeOld = that.getWindowSize();
      var observer = new MutationObserver(function () {
        var windowSizeCurrent = that.getWindowSize();
        if (
          JSON.stringify(windowSizeOld) !== JSON.stringify(windowSizeCurrent)
        ) {
          windowSizeOld = windowSizeCurrent;
          that.postMessage({
            event: that._POST_MESSAGE_EVENT.RESIZE_WINDOW,
            payload: that.getWindowSize(),
          });
        }
      });

      observer.observe(document.body, {
        characterDataOldValue: true,
        subtree: true,
        childList: true,
        characterData: true,
        attributes: true,
      });
    }
  },
  eventListenerMessage: function (e) {
    if (e && e.data && e.data.source === this._KEY_SOURCE) {
      const { event = '', payload = {} } = e.data.payload || {};
      console.log('event:', event);
      console.log('payload:', payload);
      switch (event) {
        case this._LISTENER_MESSAGE_EVENT.ADD_SCRIPT: {
          if (payload.content) {
            var scriptStr = payload.content;

            var scriptEl = document.createElement('script');
            scriptEl.innerText = scriptStr;
            document.body.appendChild(scriptEl);
          }
          break;
        }
        case this._LISTENER_MESSAGE_EVENT.ADD_STYLE:
          if (payload.content) {
            var styleSheet = document.createElement('style');
            styleSheet.innerText = payload.content;
            document.head.prepend(styleSheet);
          }
          break;
      }
    }
  },
  addListenerMessage: function () {
    window.addEventListener('message', this.eventListenerMessage, false);
  },
  postMessage: function (payload) {
    var data = {
      source: this._KEY_SOURCE,
      payload: payload,
    };
    if (window && window.parent && window.parent.postMessage) {
      window.parent.postMessage(data, {
        targetOrigin: '*',
      });
    }

    if (
      window &&
      window.ReactNativeWebView &&
      window.ReactNativeWebView.postMessage
    ) {
      try {
        window.ReactNativeWebView.postMessage(data, {
          targetOrigin: '*',
        });
      } catch (e) {
        console.log('postMessageError', e);
      }
    }
  },
};

(function () {
  controllerOpensource.init();
  document.addEventListener('readystatechange', () => {
    if (
      document.readyState === 'interactive' ||
      document.readyState === 'complete'
    ) {
      controllerOpensource.init();
    }
  });
  window.addEventListener('load', () => {
    controllerOpensource.init();
  });
})();
