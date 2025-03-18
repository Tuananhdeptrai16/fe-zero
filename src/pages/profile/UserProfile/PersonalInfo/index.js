import React, { useState } from 'react';
import { Button, Col, Form } from 'antd';
import { AppRowContainer } from '../../../../@crema';
import { useDropzone } from 'react-dropzone';
import { useAuthUser } from 'src/@crema/utility/AuthHooks';
import './index.style.less';
import FormContent from 'src/@crema/component/FormContent';
import FormInput from 'src/@crema/core/Form/FormInput';
import { useIntl } from 'react-intl';
import notification from 'src/shared/utils/notification';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import API from 'src/@crema/services/apis';
import useCallApi from 'src/@crema/hook/useCallApi';
import { CloudUploadOutlined, LoadingOutlined } from '@ant-design/icons';
import { changeUserInfo } from 'src/@crema/services/user.service';

import {
  getErrorsResponse,
  getMessageResponse,
} from 'src/shared/utils/Service';
import { isEmpty } from 'src/shared/utils/Typeof';
import { FormSelectOrganization } from 'src/@crema/component/FormItem';
import AntAvatar from 'src/@crema/component/AntAvatar/AntAvatar';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';

const validateImage = (file) => {
  if (file.size / 1024 / 1024 > 0.8) {
    notification.error('Vui lòng tải file có dung lượng dưới 800KB');
    return;
  }
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    notification.error('Vui lòng tải đúng định dạng file');
  }
};

const uploadFile = ({ file }) => {
  const bodyFormData = new FormData();
  bodyFormData.append('file', file);
  bodyFormData.append('folder', 'upload_img/');
  bodyFormData.append('override', true);

  return instanceCoreApi.post(API.UPLOAD_FILE_MIN_IO, bodyFormData);
};

const PersonalInfo = () => {
  const { user } = useAuthUser();
  const { messages } = useIntl();

  const [userImage, setUserImage] = useState(user?.photoURL);

  const getUserAvatar = () => {
    if (user?.displayName) {
      return user?.displayName
        .split(' ')
        ?.map((name) => name?.[0])
        ?.join('')
        .toUpperCase();
    }
    if (user?.email) {
      return user?.email.charAt(0).toUpperCase();
    }
  };

  const { send, loading: isLoadingImg } = useCallApi({
    callApi: uploadFile,
    success: handleUploadSuccess,
    error: () => notification.error('Tải ảnh lên thất bại'),
  });

  const { send: saveUserInfo, loading: loadingSubmit } = useCallApi({
    callApi: changeUserInfo,
    error: handleSaveInfoError,
    success: handleSaveInfoSuccess,
  });

  function handleSaveInfoError(err) {
    const messageError = getMessageResponse(err);
    const errors = getErrorsResponse(err?.raw, messages);
    if (isEmpty(errors)) {
      notification.error(messages[messageError] || messageError);
    } else {
      Object.keys(user).find((key) => {
        Object.keys(errors).find((keyError) => {
          if (keyError === key) {
            notification.error(messages[errors[key]]);
          }
        });
      });
    }
  }

  function handleSaveInfoSuccess() {
    notification.success('Chỉnh sửa thông tin thành công');
  }

  function handleUploadSuccess(res) {
    notification.success('Tải ảnh lên thành công');

    const resultUrlMinIo = res?.result;
    const getNameImgUser = resultUrlMinIo?.split('?name=')[1];
    setUserImage(getNameImgUser || '');
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDropAccepted: (acceptedFiles) => {
      const file = acceptedFiles[0];
      send({ file });
    },

    maxFiles: 1,
    maxSize: 838860.8,
    validator: validateImage,
  });

  const onFinish = (values) => {
    const data = {
      ...values,
      avatar_url: userImage,
      phone_number: values?.phone_number !== '' ? values?.phone_number : null,
    };
    saveUserInfo({ data });
  };

  return (
    <>
      <AppPageMetadata title={messages['userProfile.personalInfo']} />
      <FormContent
        onFinish={onFinish}
        initialValues={{
          ...user,
          userImage: user?.photoURL,
        }}
        labelAlign={'left'}
        labelWrap
        labelCol={{ xxl: { span: 5 }, sm: { span: 6 } }}>
        <Form.Item className='info-upload'>
          <AntAvatar
            className={
              userImage ? 'info-upload-avatar' : 'info-upload-avatar-no-avatar'
            }
            src={!isLoadingImg && userImage}
            icon={
              isLoadingImg && (
                <LoadingOutlined
                  style={{
                    fontSize: 30,
                    marginTop: userImage ? '15px' : '',
                  }}
                />
              )
            }>
            {!userImage && getUserAvatar()}
          </AntAvatar>
          <div className='info-upload-content'>
            <div className='info-upload-btn-group'>
              <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <label htmlFor='icon-button-file'>
                  <Button type='primary'>
                    <CloudUploadOutlined />
                    {messages['table.toolbar.upload']}
                  </Button>
                </label>
              </div>
              {/*<Button onClick={onReset}>*/}
              {/*  {messages['table.toolbar.reload']}*/}
              {/*</Button>*/}
            </div>
            <p>Chỉ tải định dạng JPG, GIF or PNG. Kích cỡ tối đa 800KB</p>
          </div>
        </Form.Item>
        <AppRowContainer gutter={16}>
          <Col xs={24} md={12}>
            <FormInput name='id' label={'common.idUser'} disabled />
          </Col>
          <Col xs={24} md={12}>
            <FormInput
              name='email'
              disabled
              label={'common.email'}
              rules={{ email: [] }}
            />
          </Col>
          <Col xs={24} md={12}>
            <FormInput name='name' required label='common.name' />
          </Col>
          <Col xs={24} md={12}>
            <FormInput
              name='phone_number'
              label='common.phone'
              rules={{ phone: [] }}
            />
          </Col>
          <Col xs={24} md={12}>
            <FormInput name='roles' label={'table.role_group'} disabled />
          </Col>
          <Col xs={24} md={12}>
            <FormSelectOrganization label='table.organization' disabled />
          </Col>
          <Col xs={24} md={24}>
            <Form.Item shouldUpdate className='user-profile-group-btn'>
              <Button type='primary' htmlType='submit' loading={loadingSubmit}>
                {messages['dialog.button.save']}
              </Button>
            </Form.Item>
          </Col>
        </AppRowContainer>
      </FormContent>
    </>
  );
};

export default PersonalInfo;
