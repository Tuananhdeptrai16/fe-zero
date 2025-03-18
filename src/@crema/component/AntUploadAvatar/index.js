import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useIntl } from 'react-intl';
import useCallApi from 'src/@crema/hook/useCallApi';
import API from 'src/@crema/services/apis';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
// import { generateUniqueID } from 'src/@crema/utility/Utils';
import { getMessageResponse } from 'src/shared/utils/Service';
import { isArray, isString } from 'src/shared/utils/Typeof';
import notification from 'src/shared/utils/notification';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const AntUploadAvatar = (props) => {
  const {
    className,
    accept,
    name = 'file',
    multiple = true,
    value: valueProps,
    onChange: onChangeProps,
    placeholder,
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
  console.log(messages, placeholder);
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
    const newValueProp = (info.fileList || []).map(
      (file) => file?.response || file?.url,
    );
    const { status } = info.file;
    if (status === 'done') {
      notification.success(`${info.file.name} file uploaded successfully.`);
      if (multiple) {
        onChangeProps(newValueProp);
      } else {
        onChangeProps(info.file.response);
      }
    } else if (status === 'removed') {
      console.log({ newValueProp });
      onChangeProps(newValueProp);
    } else if (status === 'error') {
      notification.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleCancel = () => setPreviewOpen(false);

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

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}>
        Upload
      </div>
    </div>
  );

  return (
    <>
      <Upload
        {...attrs}
        className={`${className} `}
        accept={accept}
        name={name}
        listType='picture-card'
        defaultFileList={fileList}
        maxCount={1}
        customRequest={(options) => {
          const { onSuccess, onError, file, onProgress } = options;
          send({ file, onProgress })
            .then((rs) => {
              onSuccess(rs?.result?.file_url);
            })
            .catch((e) => {
              onError(getMessageResponse(e));
            });
        }}
        onPreview={handlePreview}
        onChange={onChange}>
        {uploadButton}
      </Upload>
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

AntUploadAvatar.propTypes = {
  className: PropTypes.string,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  action: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};

AntUploadAvatar.defaultProps = {};

export default AntUploadAvatar;
