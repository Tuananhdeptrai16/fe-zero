import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useIntl } from 'react-intl';
import useCallApi from 'src/@crema/hook/useCallApi';
import API from 'src/@crema/services/apis';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import {
  getMessageResponse,
  getErrorsResponse,
} from 'src/shared/utils/Service';
import { isArray, isObject, isString } from 'src/shared/utils/Typeof';
import notification from 'src/shared/utils/notification';
import {
  convertURLToFileType,
  getFileNameFromURL,
} from 'src/shared/utils/filter';

const { Dragger } = Upload;

/**
 *
 * Chỉ có đồng bộ value lúc init, chưa có đồng bộ value khi props thay đổi
 */
const AntUploadFile = (props) => {
  const {
    accept,
    name = 'file',
    folder,
    maxSize,
    maxCount,
    multiple = false,
    value: valueProps,
    onChange: onChangeProps,
    placeholder,
    url = API.FILE_UPLOAD,
    returnFile,
    ...attrs
  } = props;

  const [errors, setErrors] = useState([]);

  const { loading, send: downloadFile } = useCallApi({
    success: (data, request) => {
      if (data) {
        const fileType = convertURLToFileType(request) || 'application/pdf';
        const fileName = getFileNameFromURL(request) || Date.now();
        const urlFile = URL.createObjectURL(
          new File([data], fileName, { type: fileType }),
        );
        const link = document.createElement('a');
        link.href = urlFile;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
      } else {
        notification.error('Không thể tải file');
      }
    },
    callApi: (url) => {
      return instanceCoreApi.get(url, {
        responseType: 'blob',
      });
    },
  });

  const fileList = useMemo(() => {
    if (isArray(valueProps)) {
      return valueProps.map((file, index) => {
        return {
          uid: `${file}_${index}`,
          name: file,
          status: 'done',
          url: file,
        };
      });
    }

    if (isString(valueProps)) {
      return [
        {
          uid: valueProps,
          name: valueProps,
          status: 'done',
          url: valueProps,
        },
      ];
    }

    return [];
  }, [valueProps]);

  const { messages } = useIntl();

  const checkFile = (file, showMessage = false) => {
    let isAccept = true;
    const fileTypeAccept = (accept || '').split(',').map((item) => item.trim());
    console.log(fileTypeAccept);
    const fileType = file.type || '';
    if (fileTypeAccept?.length > 0) {
      const isFileAccept = fileTypeAccept.some((typeAccept) => {
        switch (typeAccept) {
          case 'audio/*':
            return fileType?.includes('audio/');
          case 'video/*':
            return fileType?.includes('video/');
          case 'image/*':
            return fileType?.includes('image/');
          case 'application/*':
            return fileType?.includes('application/');
          case '.txt':
            return fileType?.includes('text/plain');
          default: {
            const typeCheck = typeAccept.replace('.', '');
            return fileType.includes(typeCheck);
          }
        }
      });

      if (!isFileAccept) {
        if (showMessage) {
          notification.error(`Bạn chỉ có thể tải tệp ${accept} !`);
        }
        isAccept = false;
      }
    }

    if (maxSize > 0) {
      const isLt2M = file.size / 1024 / 1024 < maxSize;
      if (!isLt2M) {
        if (showMessage) {
          notification.error(`Tệp phải có kích thước nhỏ hơn ${maxSize}MB!`);
        }
        isAccept = false;
      }
    }
    if (maxCount > 1 && isArray(valueProps) && valueProps?.length >= maxCount) {
      if (showMessage) {
        notification.error(`Số tệp tải lên phải nhỏ hơn ${maxCount}!`);
      }
      isAccept = false;
    }

    return isAccept;
  };
  const uploadFile = ({ file, onProgress }) => {
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    if (folder) {
      bodyFormData.append('folder', folder);
    }

    return instanceCoreApi.post(url, bodyFormData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (event) => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        onProgress({ percent });
      },
    });
  };

  const { send } = useCallApi({
    callApi: uploadFile,
    error: (err) => {
      const errors = getErrorsResponse(err?.raw, messages);
      let errorArr = [];
      if (isObject(errors)) {
        for (const key in errors) {
          if (isArray(errors[key])) {
            errorArr = [...errorArr, ...errors[key]];
          }
        }
      }
      if (isArray(errors)) {
        errorArr = [...errorArr, ...errors];
      }
      setErrors(errorArr);
    },
  });

  const onChange = (info) => {
    const newValueProp = (info.fileList || []).map(
      (file) => file?.response || file?.url,
    );

    const { status } = info.file;

    if (returnFile) {
      if (status === 'done') {
        if (multiple) {
          onChangeProps(info?.fileList);
        } else {
          onChangeProps(info.file);
        }
      } else if (status === 'removed') {
        if (multiple) {
          onChangeProps(info?.fileList);
        } else {
          onChangeProps();
        }
      } else {
        if (multiple) {
          onChangeProps(info?.fileList);
        } else {
          onChangeProps(info.file);
        }
      }
      return;
    }

    if (status === 'done') {
      notification.success(`Tải file ${info.file.name} thành công.`);
      if (multiple) {
        onChangeProps(newValueProp);
      } else {
        onChangeProps(info.file.response);
      }
    } else if (status === 'removed') {
      if (multiple) {
        onChangeProps(newValueProp);
      } else {
        onChangeProps();
      }
    } else if (status === 'error') {
      notification.error(`Tải file ${info.file.name} thất bại.`);
    }
  };

  const beforeUpload = (file) => {
    return checkFile(file, true) || Upload.LIST_IGNORE;
  };

  return (
    <>
      <Dragger
        {...attrs}
        accept={accept}
        onRemove={() => {
          setErrors([]);
        }}
        beforeUpload={(file) => {
          if (returnFile) {
            return false;
          }
          return beforeUpload(file);
        }}
        name={name}
        defaultFileList={fileList}
        showUploadList={{
          showDownloadIcon: true,
          showRemoveIcon: true,
        }}
        multiple={multiple}
        maxCount={maxCount}
        customRequest={(options) => {
          const { onSuccess, onError, file, onProgress } = options;
          send({ file, onProgress })
            .then((rs) => {
              onSuccess(rs?.result?.url || rs?.result?.file_url || rs?.result);
            })
            .catch((e) => {
              onError(getMessageResponse(e));
            });
        }}
        onDownload={(file) => {
          const url = file?.response || file?.url;
          if (loading) {
            notification.warning('Đang thực hiện tải file');
            return;
          }
          if (url) {
            downloadFile(url);
          }
        }}
        onChange={onChange}>
        <p className='ant-upload-drag-icon'>
          <InboxOutlined />
        </p>
        <p className='ant-upload-text'>{messages['input.uploadMedia.title']}</p>
        <p className='ant-upload-hint'>
          {messages[placeholder] ||
            placeholder ||
            (accept
              ? `${messages['input.uploadMedia.placeholder']} ${accept}`
              : '')}
        </p>
      </Dragger>
      {errors?.map((err, idx) => (
        <div className='warning-text-color' key={idx}>
          {err}
        </div>
      ))}
    </>
  );
};

AntUploadFile.propTypes = {
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  accept: PropTypes.string,
  maxSize: PropTypes.number,
  maxCount: PropTypes.number,
  multiple: PropTypes.bool,
  action: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  url: PropTypes.string,
  beforeUpload: PropTypes.string,
};

AntUploadFile.defaultProps = {};

export default AntUploadFile;
