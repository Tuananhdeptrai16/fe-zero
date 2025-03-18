import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import notification from 'src/shared/utils/notification';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import API from 'src/@crema/services/apis';
import PropTypes from 'prop-types';
import RenderContentHTML from 'src/@crema/component/TableRender/RenderContentHTML';
import AntSpin from 'src/@crema/component/AntSpin';
import { stringIsHTML } from 'src/shared/utils/String';
import {
  facebookUrlDetect,
  genUrlDetector,
  youtubeUrlDetect,
} from 'src/shared/utils/LinkDetect';

const file_picker_callback = (callback, value, meta, setLoading) => {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  if (meta.filetype === 'image') {
    input.setAttribute('accept', 'image/*');
  }
  if (meta.filetype === 'media') {
    input.setAttribute('accept', 'video/*');
  }
  console.log({ meta });
  input.onchange = function (e) {
    setLoading(true);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = async () => {
      let formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'upload_img/');
      formData.append('override', false);
      try {
        const response = await instanceCoreApi.post(
          API.UPLOAD_FILE_MIN_IO,
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          },
        );
        console.log('response', response);
        if (response?.data?.code !== 0) {
          notification.error(`Tệp ${file?.name} tải lên thất bại`);
        } else {
          if (meta?.filetype === 'image') {
            callback(response?.data?.result, { title: file?.name });
            setLoading(false);
          }
          if (meta?.filetype === 'media') {
            callback(response?.data?.result);
            setLoading(false);
          }
        }
      } catch (error) {
        setLoading(false);
        notification.error.error(
          `Tệp ${file?.name} lỗi: ${error?.response?.data?.errors[0]?.message}`,
        );
      }
    };
    reader.readAsDataURL(file);
  };
  input.click();
};

export default function TextEditor({
  disabled,
  value: valueProps,
  onChange: onChangeProps,
  placeholder,
  onBlur,
  minHeight = 200,
  maxHeight = 500,
  onFocus,
}) {
  const [loading, setLoading] = useState(false);
  // const [value, setValue] = useState();
  // useEffect(() => {
  //   if (valueProps !== value) {
  //     setValue(valueProps);
  //   }
  // }, [valueProps]);

  const onChange = (newValue) => {
    // setValue(newValue);
    onChangeProps(newValue);
  };

  if (disabled)
    return (
      <div
        className='html-view-disable ant-input'
        style={{ minHeight: minHeight ? minHeight / 2 : 'auto' }}>
        {valueProps && (
          <RenderContentHTML
            content={valueProps}
            isShowHTML
            shortNumWord={400}
          />
        )}
      </div>
    );

  return (
    <>
      <AntSpin spinning={loading}>
        <Editor
          tinymceScriptSrc={'/tinymce/tinymce.min.js'}
          plugins='image autoresize paste advlist autolink lists link preview mediaembed searchreplace visualblocks anchor autosave visualchars insertdatetime media table codesample help wordcount emoticons quickbars'
          init={{
            min_height: minHeight,
            max_height: maxHeight,
            selector: 'textarea',
            font_size_formats: '1.2rem 1.4rem 1.6rem 2rem 2.6rem 3.2rem 4rem',
            contextmenu_never_use_native: true,
            contextmenu: false,
            quickbars_insert_toolbar: false,
            branding: false,
            convert_fonts_to_spans: true,
            toolbar_sticky: true,
            statusbar: false,
            menu: false,
            placeholder: placeholder,
            toolbar_mode: 'sliding',
            toolbar:
              'undo redo | ' +
              'bold italic backcolor | alignleft aligncenter ' +
              'alignright alignjustify | link | bullist numlist outdent indent | ' +
              'removeformat image media',
            inline_styles: true,
            menubar: false,
            autoresize_on_init: false,
            image_caption: true,
            images_reuse_filename: true,
            file_picker_types: 'image media',
            file_picker_callback: (callback, value, meta) =>
              file_picker_callback(callback, value, meta, setLoading),
            image_title: true,
            images_file_types: 'jpg,svg,png,jpeg,gif',
            language: 'vi',
            paste_preprocess: async function (plugin, args) {
              const content = args.content;
              if (!stringIsHTML(content)) {
                let youtubeVideoUrl = youtubeUrlDetect(content);
                const facebookVideoUrl = facebookUrlDetect(content);
                if (youtubeVideoUrl) {
                  youtubeVideoUrl = genUrlDetector(youtubeVideoUrl);
                  const iframe = `<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden"><iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%" src=${youtubeVideoUrl}/></div><br/>`;
                  args.content = iframe;
                } else if (facebookVideoUrl) {
                  const iframe = `<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden"><iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%" src=${`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
                    content,
                  )}`}></iframe></div><br/>`;
                  args.content = iframe;
                }
              }
            },
          }}
          value={valueProps}
          onEditorChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
        />
      </AntSpin>
    </>
  );
}

TextEditor.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  minHeight: PropTypes.number,
  maxHeight: PropTypes.number,
};

TextEditor.defaultProps = {};
