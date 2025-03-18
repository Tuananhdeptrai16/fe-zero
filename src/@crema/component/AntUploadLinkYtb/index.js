import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import styles from './style.module.scss';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Col, Empty, Modal, Row, Space, Typography } from 'antd';
import AntButton from 'src/@crema/component/AntButton';
import notification from 'src/shared/utils/notification';
import {
  isArray,
  isEmpty,
  isString,
  matchYoutubeUrl,
} from 'src/shared/utils/Typeof';
import AntInput from 'src/@crema/component/AntInput';
import Media from 'src/@crema/component/Media';
import { generateUniqueID } from 'src/@crema/utility/Utils';
import ListMedia from 'src/@crema/component/ListMedia';
import { uniq } from 'lodash';

const AntUploadLinkYtb = (props) => {
  const {
    value: valueProps,
    onChange: onChangeProps,
    disabled,
    // placeholder,
    // ...attrs
  } = props;

  const [isModalUploadVideoOpen, setIsModalUploadVideoOpen] = useState(false);

  const videoList = useMemo(() => {
    if (isArray(valueProps)) {
      return valueProps.map((url) => {
        return {
          id: generateUniqueID(),
          url: url,
        };
      });
    }
    if (isString(valueProps)) {
      return [
        {
          id: generateUniqueID(),
          url: valueProps,
        },
      ];
    }
    return [];
  }, [valueProps]);

  const handleUploadVideo = () => {
    setIsModalUploadVideoOpen(true);
    // onChangeProps([...valueProps, linkYtb]);
  };

  //* Modal upload video
  const ModalUploadVideo = ({ isModalVisible, setIsModalVisible }) => {
    const [url, setUrl] = useState('');

    const handleCancelModal = () => {
      setIsModalVisible(false);
    };

    const handleUploadVideo = () => {
      if (url === '') {
        notification.error('Bạn chưa điền link!');
        return;
      }
      if (!matchYoutubeUrl(url)) {
        notification.error('Link youtube không hợp lệ!');
        return;
      }
      onChangeProps(uniq([...(valueProps || []), url]));
      notification.success('Tạo mới video thành công');
      setIsModalVisible(false);
    };

    const handleChangeUrlVideo = (value) => {
      setUrl(value);
    };
    return (
      <Modal
        width={'766px'}
        closeIcon={<CloseCircleOutlined className={styles.closeIcon} />}
        open={isModalVisible}
        onCancel={handleCancelModal}
        title={<Typography.Title level={3}>Tải video lên</Typography.Title>}
        footer={[
          <AntButton key={'back'} onClick={handleCancelModal}>
            {' '}
            Hủy
          </AntButton>,
          <AntButton key={'add'} type='primary' onClick={handleUploadVideo}>
            Tải lên
          </AntButton>,
        ]}>
        <Row style={{ alignItems: 'center' }}>
          <Col span={6}>
            <Typography.Title level={5}>Link Youtube</Typography.Title>
          </Col>
          <Col span={18} style={{ borderBottom: '1px solid #ccc' }}>
            <AntInput
              bordered={false}
              size='large'
              placeholder='Đính kèm link youtube'
              onChange={(e) => handleChangeUrlVideo(e.target.value)}
            />
          </Col>
        </Row>
      </Modal>
    );
  };

  //? Delete video
  const handleDeleteVideo = (videoUrl, videoId) => {
    const newList = videoList
      ?.filter((video) => video?.url !== videoUrl || video?.id !== videoId)
      ?.map((video) => video?.url);
    onChangeProps(newList);
  };

  if (disabled)
    return (
      <>
        {isEmpty(valueProps) && <Empty description='Không có video nào!' />}

        <ListMedia
          data={valueProps}
          sizeItem={{ width: 150, height: 88 }}
          controls
          wrap
        />
      </>
    );

  return (
    <>
      <AntButton
        type={'primary'}
        onClick={handleUploadVideo}
        className={styles.uploadIcon}>
        Thêm link
      </AntButton>
      <Space size={[40, 40]} wrap>
        {videoList?.map((video, index) => (
          <div key={`media-url-${index}`} className={styles.medias}>
            <Media
              width={313}
              height={176}
              src={video?.url}
              alt={video?.url}
              controls
            />
            <CloseCircleOutlined
              onClick={() => handleDeleteVideo(video?.url, video?.id)}
              className={styles.deleteVideoIcon}
            />
          </div>
        ))}
      </Space>
      {isModalUploadVideoOpen && (
        <ModalUploadVideo
          isModalVisible={isModalUploadVideoOpen}
          setIsModalVisible={setIsModalUploadVideoOpen}
          onChangeProps={onChangeProps}
        />
      )}
    </>
  );
};

AntUploadLinkYtb.propTypes = {
  className: PropTypes.string,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  multiple: PropTypes.bool,
  action: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};

AntUploadLinkYtb.defaultProps = {};

export default AntUploadLinkYtb;
