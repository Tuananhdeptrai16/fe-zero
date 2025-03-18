import React, { memo } from 'react';
import style from '../../ViewSyncStatus.module.scss';
import clsx from 'clsx';
import { Table } from 'antd';
import AppCard from 'src/@crema/core/AppCard';
import { generatorStatusSync } from 'src/pages/judicialRecords/createRecordInformation/utils';
import { useNavigate } from 'react-router-dom';

function VerdictInfo({ columns, isLoadingSyncStatus, resultDataSyncStatus }) {
  const navigate = useNavigate();
  const dataRenderVerdictInfo = resultDataSyncStatus
    ? resultDataSyncStatus?.verdict_jobs?.map((item) => {
        // console.log('id van ban:', item?.verdict?.raw_document_id);
        return {
          id: item?.id,
          numberJudgments: item?.job_id,
          status: item?.status,
          dataTable: [
            {
              key: item?.verdict?.id,
              decisionType:
                item?.document_template_response?.document_type?.display_name,
              decisionNumber: item?.verdict?.raw_document_object?.case_number,
              status: item?.status,
              detailRawDocument: item?.verdict?.raw_document_id,
            },
          ],
        };
      })
    : [];

  return (
    <AppCard
      loading={isLoadingSyncStatus}
      className={clsx(style.wrapInfoSyncItem)}
      title='Thông tin Bản án'>
      {/* thong tin ban an */}
      {dataRenderVerdictInfo.length > 0 ? (
        dataRenderVerdictInfo?.map((item, index) => {
          return (
            <div className={clsx(style.judgmentInformation)} key={item?.id}>
              <div className={clsx(style.judgmentInformation_header)}>
                <h5
                  className={clsx(style.judgmentInformation_header_title)}
                  onClick={() => {
                    navigate(
                      `/document/raw-document/${item?.dataTable[0].detailRawDocument}`,
                    );
                  }}>
                  {index + 1}. {item?.numberJudgments}
                </h5>
                <>
                  {item?.status?.toUpperCase() === 'WAIT_FOR_MIGRATE'
                    ? // cho dong bo
                      generatorStatusSync('null')
                    : item?.status?.toUpperCase() === 'PENDING'
                    ? // dang dong bo
                      generatorStatusSync('pending')
                    : item?.status?.toUpperCase() === 'DONE'
                    ? // dong bo thanh cong
                      generatorStatusSync('done')
                    : // dong bo that bai
                    item?.status?.toUpperCase() === 'FAIL'
                    ? generatorStatusSync('failed', 'Lỗi đồng bộ !')
                    : generatorStatusSync('null')}
                </>
              </div>
              {/*  table*/}
              <div className={clsx(style.judgmentInformation_table)}>
                <Table
                  columns={columns}
                  dataSource={item?.dataTable}
                  loading={false}
                  pagination={false}
                  scroll={{
                    y: 350,
                    x: 600,
                  }}
                />
              </div>
            </div>
          );
        })
      ) : (
        <p
          style={{
            color: '#f04f47',
            fontSize: '15px',
          }}>
          Chưa có bản án nào
        </p>
      )}
    </AppCard>
  );
}

export default memo(VerdictInfo);
