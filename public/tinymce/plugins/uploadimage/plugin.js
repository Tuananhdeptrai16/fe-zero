/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable no-undef */
var API_UPLOAD_MEDIA = tinymce.EditorManager.settings.core_api_upload_media;
var DOMAIN_CDN_MEDIA = tinymce.EditorManager.settings.domain_cdn_media;
var API_UPLOAD_IMAGE = tinymce.EditorManager.settings.core_api_upload_image;

function isValidUrl(url) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return pattern.test(url);
}
var checkURLIsAbsolute = (url) => {
    try {
        if (url[0] === '/') {
            return true;
        }
        return false;
    } catch (err) {
        return false;
    }
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

var imageIsBlobURL = (url) => {
    return url.includes('blob:');
}

var isFunction = (value) => {
    return typeof value === 'function';
};

function isBase64 (data) {
    try {
      return /^data:((?:\w+\/(?:(?!;).)+)?)((?:;[\w\W]*?[^;])*),(.+)|^,[a-zA-Z0-9\/+]*$/.test(data);
    } catch (e) {
      return false;
    }
  }

var blobToBase64 = async (blob) => {
    var response = await fetch(blob);
    var blobParsed = await response.blob();
    var reader = new FileReader();
    reader.readAsDataURL(blobParsed);
    return new Promise((resolve, reject) => {
        reader.onloadend = function () {
            var base64String = reader.result;
            resolve(base64String);
        }
    })
};

var blobToFile = async (blob) => {
    var response = await fetch(blob);
    var blobParsed = await response.blob();

    var blobObject = new Blob([blob], { type: blobParsed.type });
    var blobParsedString = blob.split('/');
    var urlFile = blobParsedString[blobParsedString.length - 1];
    var file = new File([blobObject], urlFile2, { lastModified: Date.now(), type: blobObject.type });
    return file;
}


var uploadFile = async ({ data, onSuccess, onError, onProgress }) => {
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
                xhr.status === 200 &&
                isFunction(onSuccess)
            ) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    if (response && response.code === 0) {
                        onSuccess(response?.image_url || response?.result?.image_url || response?.result?.file_url || response?.result || response);
                    } else if (isFunction(onError)) {
                        onError(response);
                    }
                } catch (error) {
                    if (onError) {
                        onError(error);
                    }
                }
            } else if (xhr.readyState === 2) {

                xhr.responseType = 'text';

            }
        };

        xhr.onerror = event => {
            if (typeof onError === 'function') onError(event);
        };

        if (isBase64(data)) {
            xhr.open('POST', API_UPLOAD_IMAGE);
            var index = data.indexOf(';base64,') + 7;
            xhr.send(JSON.stringify({ data: data.substr(index) }));
        } else {
            xhr.open('GET', `${API_UPLOAD_MEDIA}?remote_file=${encodeURIComponent(data)}`);
            xhr.send();
        }

        if (isFunction(onProgress)) {
            setTimeout(() => {
                onProgress(100);
            }, 100);
        }

    } else {
        if (typeof onError === 'function') {
            onError({
                code: 500,
                message:
                    'To upload image, you have pass token and image data as base 64 string'
            });
        } else {
            console.error(
                'To upload image, you have pass token and image data as base 64 string'
            );
        }
    }
};

tinymce.PluginManager.add('convert_image_cdn', function (editor, url) {
    async function solvingImage(image) {
        var src = image.getAttribute('src');
        if (checkURLFromInternal(src) || checkURLIsAbsolute(src) || !isValidUrl(src)) {
            return;
        }
        var random = Math.random();
        image.setAttribute('data-image', random);
        var loading = `<img data-image=${random} src=${src}>
        <div class="progress-absolute">
            <div class="progress-bar">
                <div class="children-progress"></div>
            </div>
        </div>
    </div>`;
        var div = document.createElement('div');
        div.className = 'loading-element loading-image';
        div.setAttribute('id-loading', random);
        div.innerHTML = loading;
        image.replaceWith(div);
        var frame = editor.iframeElement.contentWindow.document;
        var loadingElement = frame.querySelector("[id-loading='" + random + "']");
        var dataSrc = src;
        var imageIsBlob = imageIsBlobURL(dataSrc);
        if (imageIsBlob) {
            var base64URL = await blobToBase64(dataSrc);
            dataSrc = base64URL;
        }
        uploadFile({
            data: dataSrc,
            onSuccess: function (result) {
                var image = document.createElement('img');
                image.onload = function () {
                    image.width = this.width > 692 ? 692 : this.width;
                    image.height = this.height;
                }
                image.src = result;
                image.setAttribute('data-image', random);
                loadingElement.replaceWith(image);
                // tinymce.triggerSave();
            },
            onProgress: (value) => {
                var loadingContent = frame.querySelector(`[id-loading="${random}"] .children-progress`);
                if (loadingContent) {
                    loadingContent.style.width = `${value}%`;
                }
            },
            onError: (err) => {
                console.log(err);
                alert('Ảnh của bạn đã bị lỗi, xin vui lòng chọn ảnh khác');
                loadingElement.remove();
            },
        })
    }
    var execEditor = function () {
        editor.on('change', (event) => {
            var parser = editor.iframeElement.contentWindow.document;
            // video
            var images = parser.querySelectorAll('img:not([data-image])');
            var imageToolBarBlob = [...parser.querySelectorAll('img[data-image]')];
            var filterBlobImage = imageToolBarBlob.filter(item => {
                return imageIsBlobURL(item.src);
            });
            var imagesNeedUploading = [...images, ...filterBlobImage];
            imagesNeedUploading.forEach(async (item) => {
                solvingImage(item);
            });
        });
    }
    execEditor();
});