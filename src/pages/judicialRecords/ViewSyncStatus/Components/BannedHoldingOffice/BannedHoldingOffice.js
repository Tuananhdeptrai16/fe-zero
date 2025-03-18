import React, { memo } from 'react';
import style from '../../ViewSyncStatus.module.scss';
import clsx from 'clsx';
import AppCard from 'src/@crema/core/AppCard';
import { generatorStatusSync } from 'src/pages/judicialRecords/createRecordInformation/utils';
import { useNavigate } from 'react-router-dom';

function BannedHoldingOffice({ isLoadingSyncStatus, resultDataSyncStatus }) {
  const navigate = useNavigate();
  const dataBannedHoldingOffice = resultDataSyncStatus
    ? resultDataSyncStatus?.prohibit_jobs
      ? resultDataSyncStatus?.prohibit_jobs?.map((item) => {
          return {
            id: item?.id,
            numberBannedHoldingOffice: item?.job_id,
            status: item?.status,
            raw_document_id: item?.prohibit_positions_document?.raw_document_id,
          };
        })
      : []
    : [];

  return (
    // Thông tin Cấm đảm nhiệm chức vụ
    <AppCard
      loading={isLoadingSyncStatus}
      className={clsx(style.wrapInfoSyncItem)}
      title='Thông tin Cấm đảm nhiệm chức vụ'>
      <div className={clsx(style.judgmentInformation)}>
        {dataBannedHoldingOffice.length > 0 ? (
          dataBannedHoldingOffice?.map((item, index) => {
            return (
              <div
                className={clsx(style.judgmentInformation_header)}
                key={item?.id}>
                <h5
                  className={clsx(style.judgmentInformation_header_title)}
                  onClick={() => {
                    navigate(`/document/raw-document/${item?.raw_document_id}`);
                  }}>
                  {index + 1}. {item?.numberBannedHoldingOffice}
                </h5>
                {item?.status?.toUpperCase() === 'WAIT_FOR_MIGRATE'
                  ? // cho dong bo
                    generatorStatusSync('null')
                  : item?.status?.toUpperCase() === 'PENDING'
                  ? // dang dong bo
                    generatorStatusSync('pending')
                  : item?.status?.toUpperCase() === 'DONE'
                  ? // dong bo thanh cong
                    generatorStatusSync('done')
                  : item?.status?.toUpperCase() === 'FAIL'
                  ? generatorStatusSync('failed', 'Lỗi đồng bộ !')
                  : generatorStatusSync('null')}
              </div>
            );
          })
        ) : (
          <p
            style={{
              color: 'rgb(240, 79, 71)',
              fontSize: '15px',
            }}>
            Chưa có thông tin Cấm đảm nhiệm chức vụ nào !
          </p>
        )}
      </div>
    </AppCard>
  );
}

export default memo(BannedHoldingOffice);
