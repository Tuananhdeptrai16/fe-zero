/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-undef */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */

var DOMAIN_CDN_PARSE_URL = tinymce.EditorManager.settings.core_api_parse_url;
var DOMAIN_CDN_MEDIA = tinymce.EditorManager.settings.domain_cdn_media;

var isFunction = function (value) {
  return typeof value === 'function';
}
var checkURLFromInternal = (url) => {
  if (url) {
    try {
      return DOMAIN_CDN_MEDIA.some(domain => url.includes(domain));
    } catch (err) {
      return false;
    }
  }
  return false;
}

var getParseUrl = ({ data, onProgress }) => {
  return new Promise((resolve, reject) => {
    if (data) {
      let xhr = new XMLHttpRequest();

      let percent = 0;
      xhr.onload = () => {
        percent = 100;
        if (isFunction(onProgress)) onProgress(percent);
      };

      xhr.upload.onprogress = event => {
        const { loaded, total } = event;
        let percent = 100;
        if (total) {
          percent = (loaded / total).toFixed(2) * 100;
        }
        if (onProgress) {
          onProgress(percent);
        }
      };

      xhr.onreadystatechange = () => {
        if (
          xhr.readyState === 4 &&
          xhr.status === 200
        ) {
          try {
            const response = JSON.parse(xhr.responseText);
            if (response && response.code === 0) {
              resolve(response);
            } else {
              reject(response);
            }
          } catch (error) {
            reject(error);
          }
        }
      };

      xhr.onerror = event => {
        reject(event);
      };
      xhr.open('GET', `${DOMAIN_CDN_PARSE_URL}?url=${data}`);
      xhr.send();
      if (isFunction(onProgress)) {
        setTimeout(() => {
          onProgress(100);
        }, 100);
      }

    } else {
      reject({
        code: 500,
        message:
          'To upload image, you have pass token and image data as base 64 string'
      })
    }
  })
};


var checkURLFromInternal = (url) => {
  if (url) {
    try {
      return DOMAIN_CDN_MEDIA.some(value => url.includes(value));
    } catch (err) {
      return false;
    }
  }

  return false;
}

var encodedStr = (string) => {

  return String(string).replace(/&/g, '&amp;').replace(/>/g, '&gt;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

}

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

tinymce.PluginManager.add('detectlink', function (editor, url) {
  async function solvingURL(element) {
    var imagePreviewDefault = 'https://cdn.noron.vn/2022/02/25/17823523489528-1645780147_256.png';
    var id = Math.random();
    var getSrc = element.getAttribute('href');
    if (checkURLFromInternal(getSrc)) {
      return;
    }
    var loading = `<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>`;
    var divLoading = document.createElement('div');
    divLoading.setAttribute('contentEditable', false);
    divLoading.setAttribute('process-id', id);
    divLoading.className = 'loading-element';
    divLoading.innerHTML = loading;
    element.replaceWith(divLoading);
    var rng = editor.selection.getRng(true);
    var txt = rng.startContainer.textContent;
    var urlResult = await getParseUrl({ data: getSrc });
    element.setAttribute('process-id', id);
    var { description, host, image, title, url } = urlResult.result;
    title = encodedStr(title);
    var randomID = Math.random();
    var content = `
          <div class="e-embed-image">
           <img
            process-id='${id}' 
            class="image obj-cover" src='${image || imagePreviewDefault}'
            alt="media-object" title='${title}'/>
          </div>
          <div class="e-embed-info">
            <p class="e-embed-title">${title}</p>
            <p class="e-embed-host">${host}</p>
          </div><br/>`;
    if (checkURLFromInternal(image)) {
      content = `
             <div class="e-embed-image">
                <img
                    data-image='${id}'
                    process-id='${id}' 
                    class="image obj-cover" src='${image || imagePreviewDefault}' 
                    alt="media-object" title='${title}'/>
                </div>
                <div class="e-embed-info">
                    <p class="e-embed-title">${title}</p>
                    <p class="e-embed-host">${host}</p>
                </div><br/>`;
    }
    var div = document.createElement('a');
    var divParent = document.createElement('div');
    divParent.className = 'content-embed link';
    div.href = url;
    div.className = 'e-link-previewer';
    div.setAttribute('contentEditable', 'false');
    div.setAttribute('process-id', randomID);
    div.insertAdjacentHTML('beforeend', content);
    divParent.insertAdjacentHTML('beforeend', div.outerHTML);
    divLoading.replaceWith(divParent);
    tinymce.triggerSave();
  }

  var execEditor = function () {
    editor.on('change', (event) => {
      var parser = editor.iframeElement.contentWindow.document;
      var urlsDetect = parser.querySelectorAll('a[data-preview]:not([process-id])');
      urlsDetect.forEach(item => {
        solvingURL(item);
        tinymce.triggerSave();
      });
    });
    // tinymce.activeEditor.selection.setContent
  }

  execEditor();
});
