import React, { memo, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import style from './ViewSyncStatus.module.scss';
import clsx from 'clsx';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import API from 'src/@crema/services/apis';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import notification from 'src/shared/utils/notification';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import SubHeaderApp from 'src/@crema/component/SubHeaderApp';
import SubHeaderAppTemplate from 'src/@crema/component/SubHeaderApp/SubHeaderAppTemplate';
import AppCard from 'src/@crema/core/AppCard';
import { useIntl } from 'react-intl';
import { Space } from 'antd';
import AntButton from 'src/@crema/component/AntButton';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';

import PersonalInfo from './Components/PersonalInfo';
import VerdictInfo from './Components/VerdictInfo';
import BannedHoldingOffice from './Components/BannedHoldingOffice';
import SyncCitizen from './Components/SyncCitizen';
import SyncError from './Components/SyncError';
import { generatorStatusSync } from '../createRecordInformation/utils';

function ViewSyncStatus() {
  const { messages } = useIntl();
  const navigate = useNavigate();
  const [isReSync, setIsReSync] = useState(false);
  const [loading, setIsloading] = useState(false);
  // const { checkPermissionAction } = useJWTAuthActions();
  const idCitizenSync = useParams();
  const [errorMessSync, setErrorMessSync] = useState('Lỗi đồng bộ');

  const {
    data: dataSyncStatus,
    isLoading: isLoadingSyncStatus,
    // fetchData: reloadFetchData,
  } = useFetch({
    url: API.GET_VIEW_SYNC_STATUS_JUDICIAL(Number.parseInt(idCitizenSync?.id)),
    method: METHOD_FETCH.GET,
  });

  const resultDataSyncStatus = dataSyncStatus?.result;

  const checkSyncErrorPersonalInfo = resultDataSyncStatus?.status || '';

  const onGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    //  call api sync
    const handleSyncMinistry = (data) => {
      return instanceCoreApi
        .post(API.LOGIN_BOT_SYNC_JUDICIAL(data.client), {})
        .then(() => {
          instanceCoreApi
            .post(API.SYNC_DATA_JUDICIAL_RECORD(data.id, data.client), {})
            .then(() => {})
            .catch((err) => {
              setErrorMessSync(`Đồng bộ thất bại !${JSON.stringify(err)}`);
            });
        })
        .catch(() => {
          notification.error('Đăng nhập bot thất bại !');
        });
    };

    handleSyncMinistry({
      id: resultDataSyncStatus?.citizen_profile_id,
      client: 'stp.mhdigital.vn',
    });
  });

  //  call api sync retry
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
              setIsloading(false);
            } else {
              notification.success(
                resSync?.data?.result ||
                  resSync?.data?.message ||
                  'Đồng bộ lại thành công',
              );
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

  const columns = [
    {
      title: 'STT',
      key: 'stt',
      width: 58,
      align: 'center',
      render: (_, __, index) => {
        return index + 1;
      },
    },
    {
      title: 'Loại quyết định',
      dataIndex: 'decisionType',
      key: 'decisionType',
      width: 405,
      render: (data, row) => {
        return (
          <Link
            to={`/document/raw-document/${row?.detailRawDocument}`}
            style={{
              color: 'rgba(0, 123, 236, 1)',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            title={data}>
            {data}
          </Link>
        );
      },
    },
    {
      title: 'Số quyết định',
      dataIndex: 'decisionNumber',
      key: 'decisionNumber',
      width: 196,
      sorter: (a, b) => {
        return a.decisionNumber - b.decisionNumber;
      },
      showSorterTooltip: false,
    },
    {
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'status',
      width: 405,
      align: 'right',
      render: (data) => {
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}>
            {data.toUpperCase() === 'WAIT_FOR_MIGRATE'
              ? // cho dong bo
                generatorStatusSync('null')
              : data.toUpperCase() === 'PENDING'
              ? // dang dong bo
                generatorStatusSync('pending')
              : data.toUpperCase() === 'DONE'
              ? // dong bo thanh cong
                generatorStatusSync('done')
              : data.toUpperCase() === 'FAIL'
              ? // dong bo that bai
                generatorStatusSync('failed', 'Lỗi đồng bộ !')
              : generatorStatusSync('null')}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <AppPageMetadata title={messages['judicial.viewSyncStatus']} />
      {/*sub header*/}
      <SubHeaderApp>
        <SubHeaderAppTemplate
          title={<IntlMessages id={'judicial.viewSyncStatus'} />}
          isShowGoBack
        />
      </SubHeaderApp>

      {/*content*/}
      <div className={clsx(style.wrapContentSyncViewStatus, 'min-h-100')}>
        {/*sync citizen */}
        <SyncCitizen
          isLoadingSyncStatus={isLoadingSyncStatus}
          resultDataSyncStatus={resultDataSyncStatus}
          checkSyncErrorPersonalInfo={checkSyncErrorPersonalInfo}
        />

        {/*Thông tin nhân thân*/}
        <PersonalInfo
          isLoadingSyncStatus={isLoadingSyncStatus}
          resultDataSyncStatus={resultDataSyncStatus}
        />

        {/* thong tin ban an */}
        <VerdictInfo
          columns={columns}
          isLoadingSyncStatus={isLoadingSyncStatus}
          resultDataSyncStatus={resultDataSyncStatus}
        />

        {/*  Thông tin Cấm đảm nhiệm chức vụ*/}
        <BannedHoldingOffice
          isLoadingSyncStatus={isLoadingSyncStatus}
          resultDataSyncStatus={resultDataSyncStatus}
        />

        {/*  sync error*/}
        <SyncError
          errorMessSync={errorMessSync}
          setIsReSync={setIsReSync}
          dataSyncStatus={dataSyncStatus}
          resultDataSyncStatus={resultDataSyncStatus}
          checkSyncErrorPersonalInfo={checkSyncErrorPersonalInfo}
        />
      </div>

      {/* close view status sync*/}
      <AppCard className={'sticky-footer z-index-20 text-right'}>
        <Space>
          {!isReSync ? (
            <AntButton onClick={onGoBack}>
              {messages['dialog.button.close']}
            </AntButton>
          ) : (
            <AntButton
              onClick={() => {
                setIsloading(true);
                handleSyncMinistryRetry({
                  id: resultDataSyncStatus?.citizen_profile_id,
                  client: 'stp.mhdigital.vn',
                });
              }}
              type='primary'
              loading={loading}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
              icon={
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='14'
                  viewBox='0 0 16 14'
                  fill='none'>
                  <path
                    d='M13.3465 4.44513C12.5286 2.2862 10.4447 0.750488 8.00362 0.750488C5.56255 0.750488 3.47862 2.28442 2.66077 4.44335C1.12327 4.8487 -0.00887613 6.25406 5.24419e-05 7.92192C0.0107667 9.7862 1.4572 11.3023 3.27862 11.4648C3.36255 11.4719 3.43398 11.4058 3.43398 11.3219V10.2433C3.43398 10.1719 3.38041 10.1112 3.30898 10.1023C2.82684 10.0416 2.37148 9.83085 2.02148 9.4862C1.59291 9.06656 1.3572 8.50227 1.3572 7.90406C1.3572 7.40406 1.5197 6.93263 1.82505 6.53977C2.12327 6.15763 2.54291 5.88085 3.00541 5.75942L3.6822 5.58085L3.93041 4.92549C4.08398 4.51835 4.29827 4.1362 4.56791 3.79156C4.83398 3.4487 5.15005 3.1487 5.50362 2.8987C6.23755 2.38263 7.10184 2.10942 8.00362 2.10942C8.90541 2.10942 9.7697 2.38263 10.5036 2.90049C10.859 3.15049 11.1733 3.45049 11.4393 3.79335C11.709 4.13799 11.9233 4.52013 12.0768 4.92727L12.3233 5.58085L12.9983 5.75942C13.9661 6.01656 14.6429 6.89692 14.6429 7.90227C14.6429 8.50227 14.4072 9.06477 13.9786 9.48442C13.6304 9.82727 13.1768 10.0398 12.6947 10.1005C12.6233 10.1094 12.5715 10.1701 12.5715 10.2416V11.3219C12.5715 11.4058 12.6447 11.4719 12.7286 11.4648C14.5447 11.3005 15.9876 9.7862 16.0001 7.92549C16.0108 6.25763 14.8804 4.85227 13.3465 4.44513Z'
                    fill='white'
                  />
                  <path
                    d='M5.58767 9.58275C5.61981 8.98454 5.86802 8.42739 6.29302 8.00061C6.7466 7.54525 7.36445 7.28989 8.00731 7.28989C8.65374 7.28989 9.26267 7.54168 9.7216 8.00061C9.7466 8.02561 9.76981 8.05061 9.79481 8.07739L9.34838 8.42739C9.32711 8.44385 9.31092 8.46597 9.30166 8.49122C9.29241 8.51647 9.29047 8.54381 9.29606 8.57012C9.30166 8.59642 9.31457 8.62061 9.3333 8.6399C9.35203 8.65919 9.37583 8.67281 9.40195 8.67918L11.1555 9.10775C11.2448 9.12918 11.3323 9.06132 11.3323 8.97025L11.3412 7.16132C11.3412 7.04168 11.2055 6.97382 11.1109 7.04882L10.6966 7.37382C10.043 6.62382 9.08231 6.14882 8.0091 6.14882C6.09124 6.14882 4.52695 7.66846 4.44838 9.57203C4.44481 9.65239 4.5091 9.72025 4.59124 9.72025H5.4466C5.5216 9.71846 5.5841 9.65954 5.58767 9.58275ZM11.4109 9.71846H10.5555C10.4805 9.71846 10.418 9.77739 10.4127 9.85418C10.3805 10.4524 10.1323 11.0095 9.70731 11.4363C9.25374 11.8917 8.63588 12.147 7.99302 12.147C7.3466 12.147 6.73767 11.8952 6.27874 11.4363C6.25374 11.4113 6.23052 11.3863 6.20552 11.3595L6.65195 11.0095C6.67322 10.9931 6.68942 10.971 6.69867 10.9457C6.70793 10.9205 6.70987 10.8931 6.70427 10.8668C6.69868 10.8405 6.68577 10.8163 6.66704 10.797C6.6483 10.7777 6.62451 10.7641 6.59838 10.7577L4.84481 10.3292C4.75552 10.3077 4.66802 10.3756 4.66802 10.4667L4.66088 12.2774C4.66088 12.397 4.7966 12.4649 4.89124 12.3899L5.30552 12.0649C5.9591 12.8149 6.91981 13.2899 7.99302 13.2899C9.91088 13.2899 11.4752 11.7702 11.5537 9.86668C11.5573 9.78632 11.493 9.71846 11.4109 9.71846Z'
                    fill='white'
                  />
                </svg>
              }>
              Đồng bộ lại
            </AntButton>
          )}
        </Space>
      </AppCard>
    </div>
  );
}

export default memo(ViewSyncStatus);
