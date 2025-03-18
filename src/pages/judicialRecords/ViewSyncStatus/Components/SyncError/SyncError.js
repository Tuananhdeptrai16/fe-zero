import React, { memo, useEffect, useState } from 'react';
import { Button, Modal, Result } from 'antd';
import style from './SyncError.module.scss';
import clsx from 'clsx';
import SimpleBarReact from 'simplebar-react';
import 'simplebar/src/simplebar.css';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import notification from 'src/shared/utils/notification';
import API from 'src/@crema/services/apis';
import { useNavigate } from 'react-router-dom';

function SyncError({
  setIsReSync,
  resultDataSyncStatus,
  checkSyncErrorPersonalInfo,
  errorMessSync,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setIsloading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isErrorVerdicts = resultDataSyncStatus?.verdict_jobs
      ? resultDataSyncStatus?.verdict_jobs?.filter((item) => {
          return (
            item?.status.trim().toLowerCase() === 'failed' ||
            item?.status.trim().toLowerCase() === 'fail'
          );
        })
      : [];

    const isErrorBannedHoldingPositions = resultDataSyncStatus?.prohibit_jobs
      ? resultDataSyncStatus?.prohibit_jobs?.filter((item) => {
          return (
            item?.status.trim().toLowerCase() === 'failed' ||
            item?.status.trim().toLowerCase() === 'fail'
          );
        })
      : [];
    if (
      checkSyncErrorPersonalInfo.trim().toLowerCase() === 'failed' ||
      checkSyncErrorPersonalInfo.trim().toLowerCase() === 'fail' ||
      isErrorVerdicts.length > 0 ||
      isErrorBannedHoldingPositions.length > 0
    ) {
      setIsModalOpen(true);
    }
  }, [resultDataSyncStatus, checkSyncErrorPersonalInfo]);

  //  call api sync
  const handleSyncMinistryRetry = (data) => {
    return instanceCoreApi
      .post(API.LOGIN_BOT_SYNC_JUDICIAL(data.client), {})
      .then(() => {
        instanceCoreApi
          .post(API.SYNC_DATA_JUDICIAL_RECORD_RETRY(data.id, data.client), {})
          .then((resSync) => {
            if (resSync?.data?.code === 400) {
              notification.error(
                resSync?.data?.result ||
                  resSync?.data?.message ||
                  'Đồng bộ lại thất bại',
              );
              setIsModalOpen(false);
              setIsloading(false);
              // setTimeout(() => {
              //   navigate(-1);
              // }, 1000);
            } else {
              notification.success(
                resSync?.data?.result ||
                  resSync?.data?.message ||
                  'Đồng bộ lại thành công',
              );
              setIsModalOpen(false);
              setIsloading(false);
              setTimeout(() => {
                navigate(-1);
              }, 1000);
            }
          })
          .catch(() => {
            notification.error('Đồng bộ thất bại !');
            setIsloading(false);
          });
      })
      .catch(() => {
        notification.error('Đăng nhập bot thất bại !:');
      });
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
    setIsReSync(true);
  };
  return (
    <Modal
      open={isModalOpen}
      onOk={() => {
        setIsloading(true);
        handleSyncMinistryRetry({
          id: resultDataSyncStatus?.citizen_profile_id,
          client: 'stp.mhdigital.vn',
        });
      }}
      onCancel={handleCancelModal}
      footer={null}
      centered
      className={clsx(style.syncError_modal)}
      closable={false}>
      <Result
        status='error'
        title='Lỗi đồng bộ'
        subTitle={
          <SimpleBarReact
            style={{
              maxHeight: 350,
            }}>
            <p className={clsx(style.contentEroor)}>{errorMessSync}</p>
          </SimpleBarReact>
        }
        extra={[
          <Button key='btn-cancel-modal' onClick={handleCancelModal}>
            Đóng
          </Button>,
          <Button
            loading={loading}
            key='btn-ok-modal'
            onClick={() => {
              setIsloading(true);
              handleSyncMinistryRetry({
                id: resultDataSyncStatus?.citizen_profile_id,
                client: 'stp.mhdigital.vn',
              });
            }}
            type='primary'>
            Đồng bộ lại
          </Button>,
        ]}></Result>
    </Modal>
  );
}

export default memo(SyncError);
