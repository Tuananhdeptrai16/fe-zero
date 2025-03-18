import { ADDITIAL_API } from 'src/@crema/services/apis';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import { CATEGORY_ADDITIAL_DATA } from 'src/shared/constants/DataFixed';

export const requestDelete = ({ category, information_data }) => {
  delete information_data.myIndex;
  return instanceCoreApi.post(ADDITIAL_API.REQUEST_ADDITIAL_DATA, {
    action: 'DELETE',
    category,
    information_data,
  });
};
// export const requestAdd = ({ category, information_data }) => {
//   delete information_data.myIndex;
//   return instanceCoreApi.post(ADDITIAL_API.REQUEST_ADDITIAL_DATA, {
//     action: 'ADD',
//     category,
//     information_data,
//   });
// };
// export const requestUpdate = ({ category, information_data }) => {
//   delete information_data.myIndex;
//   return instanceCoreApi.post(ADDITIAL_API.REQUEST_ADDITIAL_DATA, {
//     action: 'UPDATE',
//     category,
//     information_data,
//   });
// };
export const updateStatusRequest = ({ id, status }) => {
  return instanceCoreApi.post(
    ADDITIAL_API.UPDATE_STATUS_ADDITIAL_DATA(id),
    {},
    { params: { status } },
  );
};

export const uploadFileCSV = (data, category) => {
  const bodyFormData = new FormData();
  const field = data.required ? 'force_import' : 'import';
  bodyFormData.append('file', data.file);
  bodyFormData.append('category', category);
  bodyFormData.append('action', field);
  return instanceCoreApi.post(ADDITIAL_API.UPLOAD_FILE, bodyFormData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
export const uploadFile = ({ file, onProgress }) => {
  const bodyFormData = new FormData();
  bodyFormData.append('file', file);
  return instanceCoreApi.post(
    '/api/v1/admin/additional-data/upload-file',
    bodyFormData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (event) => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        onProgress({ percent });
      },
    },
  );
};
export const downloadFileUploadExample = ({ category }) => {
  const name_file = {
    [CATEGORY_ADDITIAL_DATA.ACHIEVES]: 'Farchive.xlsx',
    [CATEGORY_ADDITIAL_DATA.INFOR]: 'Finfor.xlsx',
    [CATEGORY_ADDITIAL_DATA.LEADERS]: 'Fleader-teacher.xlsx',
    [CATEGORY_ADDITIAL_DATA.TEACHERS]: 'Fleader-teacher.xlsx',
  };
  instanceCoreApi
    .get(ADDITIAL_API.DOWNLOAD_FILE_UPLOAD_EXAMPLE + name_file[category], {
      responseType: 'arraybuffer',
    })
    .then((response) => {
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${category}.xlsx`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    });
};
