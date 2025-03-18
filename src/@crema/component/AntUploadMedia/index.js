import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Upload, Modal, Empty } from 'antd';
import Icon from '@ant-design/icons';
import { useIntl } from 'react-intl';
import useCallApi from 'src/@crema/hook/useCallApi';
import API from 'src/@crema/services/apis';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
// import { generateUniqueID } from 'src/@crema/utility/Utils';
import { getMessageResponse } from 'src/shared/utils/Service';
import { isArray, isEmpty, isString } from 'src/shared/utils/Typeof';
import { ReactComponent as UploadSvg } from 'src/assets/icon/UploadIcon.svg';
const { Dragger } = Upload;

import styles from './style.module.scss';
import ListMedia from 'src/@crema/component/ListMedia';
import notification from 'src/shared/utils/notification';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

/**
 *
 * Chỉ có đồng bộ value lúc init, chưa có đồng bộ value khi props thay đổi
 * TODO: Đang chưa có tích hợp download file về xem trước
 */
const AntUploadMedia = (props) => {
  const {
    className,
    accept,
    name = 'file',
    maxSize,
    maxCount,
    multiple = true,
    value: valueProps,
    onChange: onChangeProps,
    placeholder,
    uploadText,
    disabled,
    ...attrs
  } = props;

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

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

    return instanceCoreApi.post(API.MEDIA_UPLOAD, bodyFormData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (event) => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        onProgress({ percent });
      },
    });
  };

  const { send } = useCallApi({
    callApi: uploadFile,
  });

  const onChange = (info) => {
    console.log('onChange', info);
    const newValueProp = (info.fileList || []).map(
      (file) => file?.response || file?.url,
    );
    const { status } = info.file;
    if (status === 'done') {
      notification.success(`Tải lên file ${info.file.name} thành công.`);
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
      notification.error(`Tải lên file ${info.file.name} thất bại.`);
    }
  };

  const handleCancel = () => setPreviewOpen(false);

  const beforeUpload = (file) => {
    return checkFile(file, true) || Upload.LIST_IGNORE;
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    );
  };

  if (disabled) {
    if (isEmpty(valueProps)) return <Empty description='Không có tệp nào!' />;
    return (
      <>
        <ListMedia
          wrap
          data={valueProps}
          sizeItem={{ width: 150, height: 88 }}
        />
      </>
    );
  }

  return (
    <>
      <Dragger
        {...attrs}
        className={`${className} ${styles.antUploadMedia}`}
        accept={accept}
        name={name}
        beforeUpload={beforeUpload}
        listType='picture-card'
        defaultFileList={fileList}
        multiple={multiple}
        maxCount={maxCount}
        customRequest={(options) => {
          const { onSuccess, onError, file, onProgress } = options;
          send({ file, onProgress })
            .then((rs) => {
              onSuccess(rs?.result?.url);
            })
            .catch((e) => {
              const messageError = getMessageResponse(e);
              onError(messageError);
              if (messageError) {
                notification.error(messageError);
              }
            });
        }}
        onPreview={handlePreview}
        onChange={onChange}>
        <p className='ant-upload-drag-icon'>
          <Icon component={UploadSvg} />
        </p>
        <p className='ant-upload-text'>
          {uploadText ? uploadText : messages['input.uploadMedia.title']}
        </p>
        <p className='ant-upload-hint'>
          {messages[placeholder] ||
            placeholder ||
            (accept
              ? `${messages['input.uploadMedia.placeholder']} ${accept}`
              : '')}
        </p>
        {maxSize && (
          <p className='ant-upload-hint'>Tệp kích thước tối đa {maxSize}MB</p>
        )}
      </Dragger>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}>
        <img alt={previewImage} style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

AntUploadMedia.propTypes = {
  className: PropTypes.string,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  accept: PropTypes.string,
  maxSize: PropTypes.number,
  maxCount: PropTypes.number,
  multiple: PropTypes.bool,
  action: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};

AntUploadMedia.defaultProps = {};

export default AntUploadMedia;
