import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import API from 'src/@crema/services/apis';
import notification from 'src/shared/utils/notification';
import { isErrorResponse } from 'src/shared/utils/Service';

export const editorSetup = {
  // a11y_advanced_options: true,
  selector: 'textarea',
  autosave_ask_before_unload: true,
  file_picker_types: 'image',
  image_caption: true,
  images_upload_handler: async function (blobInfo) {
    const imageFile = new FormData();
    imageFile.append('file', blobInfo.blob());
    try {
      const res = await instanceCoreApi.post(API.MEDIA_UPLOAD, imageFile, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const { data } = res;
      if (isErrorResponse(data)) {
        notification.error('Tải ảnh thất bại!');
        return;
      }
      const { url } = await data?.result;
      return url;
    } catch (error) {
      notification.error(error);
      return;
    }
  },

  font_size_formats:
    '8px 9px 10px 11px 12px 14px 18px 24px 30px 36px 48px 60px 72px 96px',
  plugins:
    'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons',
  toolbar:
    'undo redo | blocks fontsize| ' +
    'bold italic forecolor |link image |alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent| ' +
    'fontfamily removeformat | help',
  toolbar_mode: 'sliding',
  font_family_formats:
    'Andale Mono=andale mono,times;' +
    'Arial=arial,helvetica,sans-serif;' +
    'Georgia=georgia,palatino;' +
    'Helvetica=helvetica;' +
    'Impact=impact,chicago;' +
    'Symbol=symbol;' +
    'Tahoma=tahoma,arial,helvetica,sans-serif;' +
    'Terminal=terminal,monaco;' +
    'Times New Roman=times new roman,times;' +
    'Open Sans=Open Sans,sans-serif;' +
    'Verdana=verdana,geneva;' +
    'Webdings=webdings;' +
    'Wingdings=wingdings,zapf dingbats',
  content_style: 'body { font-family:Open Sans,sans-serif; font-size:16px }',
};
