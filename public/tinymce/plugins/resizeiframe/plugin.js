/* eslint-disable vars-on-top */
/* eslint-disable wrap-iife */
/* eslint-disable no-var */
/* eslint-disable no-undef */

var m = (function() {
  function isObject(value) {
    return typeof value === 'object';
  }
  function gid(selector, parent = document) {
    return parent.getElementById(selector);
  }
  function qs(selector, parent = document) {
    return parent.querySelector(selector)
  }
  function qsa(selector, parent = document) {
    return Array.from(parent.querySelectorAll(selector));
  }
  return {
    isObject: isObject,
    gid: gid,
    qsa: qsa,
    qs: qs
  };
})();

tinymce.PluginManager.add('resizeiframe', function(editor) {

  function listenerResize() {
    var windowIframe = editor.iframeElement.contentWindow;
    windowIframe.addEventListener('message', function(event) {
      if (m.isObject(event.data) && event.data.type === 'resize-tiktok') {
        var data = event.data && event.data.data;
        var parent = event.source;
        var iframeParent = parent[0] && parent[0].parent.frameElement;
        var heightIframe = data.height;
        if (iframeParent) {
          iframeParent.height = heightIframe;
          tinymce.triggerSave();
        }
      }
    });
  }
  editor.on('init', function(event) {
    listenerResize();
  });
});