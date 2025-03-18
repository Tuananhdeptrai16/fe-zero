import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import API from 'src/@crema/services/apis';
import style from './VerifiedLLTPInfo.module.scss';
import clsx from 'clsx';
import {
  CITIZEN_PROFILE_ORGANIZATION_NAME,
  CITIZEN_PROFILE_REQUEST_NAME,
  KEY_STATUS_CREATE_JUDICIAL_RECORD,
  PROHIBIT_POSITION_DOCUMENT_REQUEST_LIST,
  VERDICT_DOCUMENT_REQUEST_LIST_NAME,
  generatorStatusSync,
} from 'src/pages/judicialRecords/createRecordInformation/utils';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import SubHeaderApp from 'src/@crema/component/SubHeaderApp';
import SubHeaderAppTemplate from 'src/@crema/component/SubHeaderApp/SubHeaderAppTemplate';
import AppCard from 'src/@crema/core/AppCard';
import FormContent from 'src/@crema/component/FormContent';
import AppTabs from 'src/@crema/core/AppTabs/AppTabs';
import { FormCitizenInfo } from 'src/pageComponents/judicialRecords/detail/thirdStep/criminal/FormCitizenInfo';
import { FormCriminal } from 'src/pageComponents/judicialRecords/detail/thirdStep/criminal/FormCriminal';
import { BanHoldingPositionTable } from 'src/pageComponents/judicialRecords/detail/thirdStep/criminal/BanHoldingPositionTable';
import { useIntl } from 'react-intl';
import { Drawer, Space, Modal } from 'antd';
import AntButton from 'src/@crema/component/AntButton';
import config from 'src/config';
// import { AcUnlockIcon, AcLockJudicial } from 'src/assets/icon/action';
import { CloseOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';
import useCallApi from 'src/@crema/hook/useCallApi';
import {
  lockJudicialRecord,
  unlockJudicialRecord,
} from 'src/@crema/services/judicialRecord.service';
import AppScrollbar from 'src/@crema/core/AppScrollbar';
import { ListComment } from 'src/pageComponents/judicialRecords/ListComment';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import { useJWTAuthActions } from 'src/@crema/services/auth/jwt-auth/JWTAuthProvider';
import { ROUTER_NAME } from 'src/pages/routeConfig';
import { ITEM_PERMISSIONS } from 'src/shared/constants/Permission';
import { getDateIso } from 'src/shared/utils/DateTime';
import { parse } from 'src/shared/utils/String';
import { useCourtAccount } from 'src/hooks/useCourtAccount';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import notification from 'src/shared/utils/notification';

const DetailCitizenVerifyLLTP = () => {
  const { id } = useParams();
  const { messages } = useIntl();
  const navigate = useNavigate();
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  let { isCourtAccount: isShowProhibitTab } = useCourtAccount();
  let { checkPermissionAction } = useJWTAuthActions();
  const [loading, setIsloading] = useState(false);

  isShowProhibitTab = true;

  const { data, isLoading } = useFetch(
    {
      url: API.EDIT_JUDICIAL_RECORD(id),
    },
    [id],
  );

  const { result } = data || {};
  const {
    request_relate_documents = [],
    request_citizen_profile = {},
    request_organizations = [],
    request_verdicts = [],
    prohibit_positions_documents = [],
  } = result || {};
  const profileStatus = request_citizen_profile?.status;
  const isLocked = request_citizen_profile?.locked;
  const initialValues = {
    [CITIZEN_PROFILE_REQUEST_NAME]: {
      ...request_citizen_profile,
      cccd_date: getDateIso(request_citizen_profile?.cccd_date),
    },
    [CITIZEN_PROFILE_ORGANIZATION_NAME]: request_organizations,
    [VERDICT_DOCUMENT_REQUEST_LIST_NAME]: request_verdicts?.map((item) => ({
      ...item,
      ...parse(item?.content),
      ...parse(item?.raw_document_object?.object),
    })),
    [PROHIBIT_POSITION_DOCUMENT_REQUEST_LIST]: prohibit_positions_documents,
  };

  const relateDocsByVerdict = (request_relate_documents || [])?.map(
    (relateDoc) => ({
      [relateDoc?.verdict_number]: relateDoc,
    }),
  );

  const { loading: isLoadingChangeStatus, send } = useCallApi({
    callApi: isLocked ? unlockJudicialRecord : lockJudicialRecord,
    useToastShowError: true,
  });

  const { data: dataComment } = useFetch({
    url: API.SEARCH_COMMENT_ORGANIZATION_JUDICIAL_RECORD,
    method: METHOD_FETCH.POST,
    body: {
      filters: [],
      pageable: {
        page: 1,
        page_size: 100,
        sort: [{ property: 'id', direction: 'desc' }],
      },
      id: request_citizen_profile?.id,
    },
  });
  const listDataComment = dataComment?.result?.items || [];
  const dataCommentByOrgan = Object.groupBy(
    listDataComment,
    (item) =>
      item?.citizen_profile_request_organization?.organization?.display_name,
  );

  const tabItems = [
    {
      label: <IntlMessages id={'confirm.informationCitizenRelation'} />,
      key: 'item-1',
      children: <FormCitizenInfo rootName={CITIZEN_PROFILE_REQUEST_NAME} />,
    },

    isShowProhibitTab && {
      label: (
        <span>
          Thông tin cấm đảm nhiệm chức vụ
          {prohibit_positions_documents?.length > 0 &&
            `(${prohibit_positions_documents?.length})`}
        </span>
      ),
      key: 'item-2',
      children: <BanHoldingPositionTable data={prohibit_positions_documents} />,
    },
    {
      label: (
        <span>
          <IntlMessages id={'judicial.verdictInformation'} />
          {request_verdicts?.length > 0 && `(${request_verdicts?.length})`}
        </span>
      ),
      key: 'item-3',
      children: (
        <FormCriminal
          verdicts={request_verdicts}
          relateDocsByVerdict={relateDocsByVerdict}
        />
      ),
    },
  ].filter(Boolean);

  let noteTabItems = request_organizations.map((requestOrganization) => ({
    label: requestOrganization?.organization?.display_name,
    key: requestOrganization?.organization?.display_name,
    children: (
      <ListComment
        data={
          dataCommentByOrgan?.[requestOrganization?.organization?.display_name]
        }
      />
    ),
  }));

  const onGoBack = () => {
    navigate(config.routes.judicialCreateRecord);
  };

  const onCloseDrawer = () => {
    setIsOpenDrawer(false);
  };
  const onShowHistoryNote = () => {
    setIsOpenDrawer(true);
  };

  const onChangeStatus = async () => {
    await send(id);
    onGoBack();
  };

  const confirmUnLock = (isLock) => {
    Modal.confirm({
      title: `${
        isLock
          ? 'Bạn có chắc muốn mở khoá hồ sơ?'
          : 'Bạn có chắc muốn khoá hồ sơ?'
      }`,
      icon: <ExclamationCircleOutlined />,
      content: `${
        isLock
          ? 'Thông tin hồ sơ sẽ được tổng hợp lại và cần chờ các đơn vị liên quan xác nhận. Bạn vẫn muốn tiếp tục?'
          : 'Thông tin hồ sơ sẽ bị khóa. Bạn vẫn muốn tiếp tục?'
      }`,
      okText: `${isLock ? 'Mở khoá hồ sơ' : 'Khoá hồ sơ'}`,
      cancelText: 'Huỷ',
      // centered: true,
      onOk: () => {
        onChangeStatus();
      },
    });
  };

  //  call api sync
  const handleSyncMinistry = (data) => {
    return instanceCoreApi
      .post(API.LOGIN_BOT_SYNC_JUDICIAL(data.client), {})
      .then(() => {
        instanceCoreApi
          .post(API.SYNC_DATA_JUDICIAL_RECORD(data.id, data.client), {})
          .then((resSync) => {
            notification.success(
              resSync?.data?.result ||
                resSync?.data?.message ||
                'Đồng bộ thành công',
            );
            setIsloading(false);
            setTimeout(() => {
              navigate(config.routes.judicialCreateRecord);
            }, 1000);
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
  return (
    <div className={clsx(style.wrapDetailsVerified)}>
      <AppPageMetadata title={messages['judicial.recordTitle']} />
      <SubHeaderApp>
        <SubHeaderAppTemplate
          title={<IntlMessages id={'judicial.recordTitle'} />}
          isShowGoBack
        />
      </SubHeaderApp>
      <div className={'min-h-100'}>
        <AppCard loading={isLoading}>
          <FormContent
            key={request_citizen_profile?.id}
            initialValues={initialValues}
            disabled>
            <AppTabs items={tabItems} />
          </FormContent>
        </AppCard>
      </div>
      <AppCard className={'sticky-footer z-index-20 text-right'}>
        <Space>
          <AntButton onClick={onGoBack}>
            {messages['dialog.button.close']}
          </AntButton>
          <AntButton onClick={onShowHistoryNote}>
            {messages['button.showHistoryNote']}
          </AntButton>
          {/* khoa || mo khoa ho so */}
          {profileStatus !== KEY_STATUS_CREATE_JUDICIAL_RECORD.DONE &&
            checkPermissionAction(
              ROUTER_NAME.JUDICIAL_CREATE_RECORDS,
              ITEM_PERMISSIONS.LOCK,
            ) && (
              <AntButton
                // onClick={onChangeStatus}
                onClick={() => {
                  confirmUnLock(isLocked);
                }}
                loading={isLoadingChangeStatus}>
                <Space>
                  {/* <Icon
                    className='icon-path-fill-black'
                    component={isLocked ? <UnlockOutlined /> : <LockOutlined />}
                  /> */}
                  {isLocked ? <UnlockOutlined /> : <LockOutlined />}
                  {isLocked
                    ? messages['table.action.unlockRecord']
                    : messages['table.action.lockRecord']}
                </Space>
              </AntButton>
            )}

          {/* dong bo len bo tu phap */}
          {request_citizen_profile?.status_synchronize &&
          request_citizen_profile?.status_synchronize.toLowerCase().trim() !==
            'notyet' ? (
            <div className={clsx(style.wrapAcSync)}>
              {request_citizen_profile?.status_synchronize?.toUpperCase() ===
              'WAIT_FOR_MIGRATE'
                ? // cho dong bo
                  generatorStatusSync('null')
                : request_citizen_profile?.status_synchronize?.toUpperCase() ===
                  'PENDING'
                ? // dang dong bo
                  generatorStatusSync('pending')
                : request_citizen_profile?.status_synchronize?.toUpperCase() ===
                  'DONE'
                ? // dong bo thanh cong
                  generatorStatusSync('done')
                : request_citizen_profile?.status_synchronize?.toUpperCase() ===
                  'FAIL'
                ? generatorStatusSync('failed', 'Lỗi đồng bộ !')
                : generatorStatusSync('null')}
              <AntButton
                className={clsx(style.btnSync)}
                onClick={() => {
                  navigate(
                    config.routes.judicialViewSyncStatus(
                      request_citizen_profile?.id,
                    ),
                  );
                }}
                icon={
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='12'
                    viewBox='0 0 16 12'
                    fill='currentColor'>
                    <path
                      d='M15.6822 5.53991C13.9894 1.97384 11.4305 0.179199 8.0001 0.179199C4.56796 0.179199 2.01082 1.97384 0.31796 5.5417C0.250059 5.68548 0.214844 5.84251 0.214844 6.00152C0.214844 6.16053 0.250059 6.31756 0.31796 6.46134C2.01082 10.0274 4.56975 11.8221 8.0001 11.8221C11.4322 11.8221 13.9894 10.0274 15.6822 6.45956C15.8197 6.17027 15.8197 5.83456 15.6822 5.53991ZM8.0001 10.5363C5.11975 10.5363 3.01082 9.07563 1.52332 6.00063C3.01082 2.92563 5.11975 1.46491 8.0001 1.46491C10.8805 1.46491 12.9894 2.92563 14.4769 6.00063C12.9912 9.07563 10.8822 10.5363 8.0001 10.5363ZM7.92867 2.85777C6.19296 2.85777 4.78582 4.26491 4.78582 6.00063C4.78582 7.73634 6.19296 9.14349 7.92867 9.14349C9.66439 9.14349 11.0715 7.73634 11.0715 6.00063C11.0715 4.26491 9.66439 2.85777 7.92867 2.85777ZM7.92867 8.00063C6.82332 8.00063 5.92867 7.10599 5.92867 6.00063C5.92867 4.89527 6.82332 4.00063 7.92867 4.00063C9.03403 4.00063 9.92868 4.89527 9.92868 6.00063C9.92868 7.10599 9.03403 8.00063 7.92867 8.00063Z'
                      fill='currentColor'
                      fillOpacity='1'
                    />
                  </svg>
                }>
                {messages['judicial.viewSyncStatus']}
              </AntButton>
            </div>
          ) : (
            <AntButton
              loading={loading}
              type='primary'
              onClick={() => {
                setIsloading(true);
                handleSyncMinistry({
                  id: request_citizen_profile?.id,
                  client: 'stp.mhdigital.vn',
                });
              }}
              className={clsx(style.btnSync)}
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
              {messages['table.SynInformationWithMinistryJustice']}
            </AntButton>
          )}
        </Space>
      </AppCard>
      <Drawer
        bodyStyle={{ paddingTop: 0 }}
        title={messages['button.showHistoryNote']}
        destroyOnClose
        open={isOpenDrawer}
        closable={false}
        width={600}
        extra={<CloseOutlined onClick={onCloseDrawer} />}
        onClose={onCloseDrawer}>
        <AppScrollbar>
          <AppTabs items={noteTabItems} />
        </AppScrollbar>
      </Drawer>
    </div>
  );
};

export default DetailCitizenVerifyLLTP;
