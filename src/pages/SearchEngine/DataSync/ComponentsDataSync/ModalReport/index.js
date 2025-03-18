import { Col, Row, Space } from 'antd';
import React from 'react';
import AntModal from 'src/@crema/component/AntModal';
import style from './ModalReport.module.scss';
import clsx from 'clsx';
import { IconCall, MessengerIcon, ZaloIcon } from 'src/@crema/component/icon';
import PropTypes from 'prop-types';

ModalReport.propTypes = {
  isModalReport: PropTypes.bool,
  setIsModalReport: PropTypes.func,
};

function ModalReport({ isModalReport = false, setIsModalReport }) {
  return (
    <AntModal
      title='Báo cáo'
      centered
      open={isModalReport}
      onOk={() => {
        setIsModalReport(false);
      }}
      footer={null}
      className={clsx(style.wrapModalErrorStatus)}
      onCancel={() => {
        setIsModalReport(false);
      }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <h4 className={clsx(style.modal_title_error)}>
            Hướng dẫn tự phát hiện và sửa lỗi đồng bộ dữ liệu tìm kiếm:
          </h4>
          <div>
            <video width='100%' height='240' controls>
              <source src='/assets/video/video_support.mp4' type='video/mp4' />
              <source
                src='%PUBLIC_URL%/assets/video/video_support.mp4'
                type='video/mp4'
              />
              Trình duyệt không hỗ trợ xem video
            </video>
          </div>
        </Col>
        <Col span={24}>
          <h4 className={clsx(style.modal_title_error)}>
            Liên hệ yêu cầu trợ giúp :
          </h4>
          <div className={clsx(style.pageHelp)}>
            <h4>Bạn vẫn cần trợ giúp?</h4>
            <p className={clsx(style.description)}>
              Chúng tôi sẽ hỗ trợ bạn trong khung giờ hành chính (7am-5pm). Bạn
              có thể liên hệ với chúng tôi qua các phương thức dưới đây.
            </p>
            <Space>
              <IconCall className={'pointer'} />
              <ZaloIcon className={'pointer'} />
              <MessengerIcon className={'pointer'} />
            </Space>
          </div>
        </Col>
      </Row>
    </AntModal>
  );
}

export default ModalReport;
