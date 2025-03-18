import { Divider, Form, message, Space, Spin } from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';
import AntButton from 'src/@crema/component/AntButton';
import AntTag from 'src/@crema/component/AntTag';
import BreadcrumbList from 'src/@crema/component/BreadcrumbList';
import FormContent from 'src/@crema/component/FormContent';
import SubHeaderApp from 'src/@crema/component/SubHeaderApp';
import SubHeaderAppTemplate from 'src/@crema/component/SubHeaderApp/SubHeaderAppTemplate';
import AppCard from 'src/@crema/core/AppCard';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import AppTabs from 'src/@crema/core/AppTabs/AppTabs';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import config from 'src/config';
import { FormBanHoldingPosition } from 'src/pageComponents/judicialRecords/detail/thirdStep/FormBanHoldingPosition';
import { FormCriminalInfo } from 'src/pageComponents/judicialRecords/detail/thirdStep/FormCriminalInfo';
import CommentJudicialRecord from 'src/pageComponents/judicialRecords/detail/thirdStep/CommentJudicialRecord';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import API from 'src/@crema/services/apis';
import { parse } from 'src/shared/utils/String';
import useCallApi from 'src/@crema/hook/useCallApi';
import notification from 'src/shared/utils/notification';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import { MODAL_CONFIRM, MODAL_TYPE } from 'src/shared/constants/CitizenProfile';
import FormTextArea from 'src/@crema/core/Form/FormTextArea';
import DialogConfirm from 'src/@crema/component/DialogConfirm';
import {
  JUDICIAL_STATUS,
  ORGANIZATION_STATUS,
} from 'src/shared/constants/DataTableStatus';
import RenderDate from 'src/@crema/component/TableRender/RenderDate';
import { FormCitizenInfo } from 'src/pageComponents/judicialRecords/detail/thirdStep/criminal/FormCitizenInfo';
import {
  calculateDiffTwoDate,
  formatDateJs,
  getDateIso,
} from 'src/shared/utils/DateTime';
import { findAddedAndRemovedItems } from 'src/shared/utils/Array';
import { isEmpty } from 'src/shared/utils/Typeof';
import { editVerifyJudicialRecord } from 'src/@crema/services/judicialRecord.service';
import { useJWTAuthActions } from 'src/@crema/services/auth/jwt-auth/JWTAuthProvider';
import { useAuthUser } from 'src/@crema/utility/AuthHooks';
import { getStatusOrganization } from 'src/shared/utils/CitizenProfile';
import { ROUTER_NAME } from 'src/pages/routeConfig';
import { ITEM_PERMISSIONS } from 'src/shared/constants/Permission';
import { useCourtAccount } from 'src/hooks/useCourtAccount';

const RenderDueDate = ({ due_date }) => {
  if (!due_date) return null;
  const style = { marginBottom: 2, display: 'block' };
  const diffDay = calculateDiffTwoDate(due_date, new Date());
  if (diffDay < 0)
    return (
      <AntTag color='error' style={style}>
        Hết hạn xác thực: <RenderDate value={due_date} />
      </AntTag>
    );
  if (diffDay < 3)
    return (
      <AntTag color='error' style={style}>
        Sắp hết hạn xác thực: <RenderDate value={due_date} />
      </AntTag>
    );
  return (
    <AntTag color={'processing'} style={style}>
      Hạn xác thực: <RenderDate value={due_date} />
    </AntTag>
  );
};

const DetailVerifyJudicialPage = () => {
  const [form] = Form.useForm();
  const params = useParams();
  const { checkPermissionAction } = useJWTAuthActions();
  const { user = {} } = useAuthUser();
  const judicialId = params?.id;
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { isCourtAccount } = useCourtAccount();

  let { isLoading, data } = useFetch(
    {
      url: API.DETAIL_CITIZEN_PROFILE_REQUEST_ORGANIZATION(judicialId),
      useCache: false,
    },
    [judicialId],
  );
  data = data?.result || {};
  const verifiedBy = data?.request_organization?.verified_by;

  const { messages } = useIntl();
  const navigate = useNavigate();
  const modalConfigReject = MODAL_CONFIRM[MODAL_TYPE.RETRY_VERIFY];
  const isLocked = data?.request_citizen_profile?.locked;
  let statusTag = getStatusOrganization({
    profile_status: data?.request_citizen_profile?.status,
    profile_locked: data?.request_citizen_profile?.locked,
    status: data?.request_organization?.status,
    verified_by: data?.request_organization?.verified_by,
    reject_reason: data?.request_organization?.reject_reason,
  });

  const isCheckApprove =
    data?.request_organization?.status === ORGANIZATION_STATUS.VERIFIED;
  const isCheckRetry =
    data?.request_organization?.status === ORGANIZATION_STATUS.APPROVED;

  const { request_relate_documents } = data || [];
  const judicialRecord = {
    personalInfo: {
      ...data.request_citizen_profile,
      cccd_date: getDateIso(data?.request_citizen_profile?.cccd_date),
      date_of_birth: formatDateJs(data?.request_citizen_profile?.date_of_birth),
    },
    verdicts: data?.request_verdicts?.map((verdict) => {
      return {
        ...(parse(verdict.content) || {}),
        ...verdict,
        relatedDocuments: request_relate_documents
          ?.filter((relate_document) => {
            return relate_document.verdict_number === verdict.case_number;
          })
          .map((item, index) => ({
            index: index + 1,
            ...(parse(item.content) || {}),
            ...item,
          })),
      };
    }),
    prohibitPositionsDocuments: data?.prohibit_positions_documents?.map(
      (item, index) => ({
        index: index + 1,
        ...(parse(item.content) || {}),
        ...item,
      }),
    ),
  };

  const receiveRecordToServer = () => {
    return instanceCoreApi.put(
      API.RECEIVE_CITIZEN_PROFILE_REQUEST_ORGANIZATION(
        data?.request_organization?.id,
      ),
    );
  };

  const { send: sendReceiveRecord, loading: loadingReceiveRecord } = useCallApi(
    {
      callApi: receiveRecordToServer,
      success: () => {
        notification.success('Nhận hồ sơ thành công');
        navigate(-1);
      },
    },
  );

  const rejectRecordToServer = () => {
    return instanceCoreApi.put(
      API.UN_RECEIVE_CITIZEN_PROFILE_REQUEST_ORGANIZATION(
        data?.request_organization?.id,
      ),
    );
  };

  const { send: sendRejectRecord, loading: loadingRejectRecord } = useCallApi({
    callApi: rejectRecordToServer,
    success: () => {
      notification.success('Bỏ nhận hồ sơ thành công');
      navigate(-1);
    },
  });

  const verifyRecordToServer = () => {
    return instanceCoreApi.put(
      API.VERIFY_CITIZEN_PROFILE_REQUEST_ORGANIZATION(
        data?.request_organization?.id,
      ),
    );
  };
  const onVerifySuccess = () => {
    notification.success('Đề xuất duyệt hồ sơ thành công');
    navigate(-1);
  };
  const { send: sendVerifyRecord, loading: loadingVerifyRecord } = useCallApi({
    callApi: verifyRecordToServer,
    success: onVerifySuccess,
  });
  const { send: sendEditVerifyRecord } = useCallApi({
    callApi: editVerifyJudicialRecord,
    success: onVerifySuccess,
  });

  const approveRecordToServer = (rejectRecordUpdated) => {
    console.log('rejectRecordUpdated', rejectRecordUpdated);
    return instanceCoreApi.put(
      API.APPROVE_CITIZEN_PROFILE_REQUEST_ORGANIZATION(
        data?.request_organization?.id,
      ),
    );
  };

  const { send: sendApproveRecord, loading: loadingApproveRecord } = useCallApi(
    {
      callApi: approveRecordToServer,
      success: () => {
        notification.success('Xác thực hồ sơ thành công');
        navigate(-1);
      },
    },
  );

  const retryVerifyRecordToServer = ({ reason }) => {
    return instanceCoreApi.put(
      API.REJECT_CITIZEN_PROFILE_REQUEST_ORGANIZATION(
        data?.request_organization?.id,
      ),
      { reason },
    );
  };

  const { send: sendRetryVerifyRecord, loading: loadingRetryVerifyRecord } =
    useCallApi({
      callApi: retryVerifyRecordToServer,
      success: () => {
        notification.success('Yêu cầu kiểm tra lại hồ sơ thành công');
        navigate(-1);
      },
    });

  const mapDocuments = (items) => {
    return items?.map((item) => ({
      id: item?.id,
      raw_document_object_id:
        item?.raw_document_object?.id || item?.raw_document_object_id,
      raw_document_id:
        item?.raw_document_id || item?.raw_document_object?.raw_document_id,
    }));
  };
  const convertEmptyArrayToUndefined = (arr) => {
    if (arr?.length === 0) {
      return undefined;
    }
    return arr;
  };

  const onSendVerifyRecord = (data) => {
    const mapAndFindChanges = (initial, changed) =>
      findAddedAndRemovedItems(mapDocuments(initial), mapDocuments(changed));

    const { addedItems: add_verdicts, removedItems: remove_verdicts } =
      mapAndFindChanges(judicialRecord?.verdicts, data?.verdicts);

    const {
      addedItems: add_prohibit_positions_documents,
      removedItems: remove_prohibit_positions_documents,
    } = mapAndFindChanges(
      judicialRecord?.prohibitPositionsDocuments,
      data?.prohibitPositionsDocuments,
    );

    const {
      addedItems: add_relate_documents,
      removedItems: remove_relate_documents,
    } = mapAndFindChanges(
      request_relate_documents,
      data?.verdicts?.flatMap((item) => item?.relatedDocuments).filter(Boolean),
    );
    const hasChanges = [
      add_verdicts,
      remove_verdicts,
      add_prohibit_positions_documents,
      remove_prohibit_positions_documents,
      add_relate_documents,
      remove_relate_documents,
    ].some((changes) => !isEmpty(changes));

    return hasChanges
      ? sendEditVerifyRecord({
          id: judicialId,
          data: {
            add_verdicts: convertEmptyArrayToUndefined(add_verdicts),
            remove_verdicts: convertEmptyArrayToUndefined(remove_verdicts),
            add_prohibit_positions_documents: convertEmptyArrayToUndefined(
              add_prohibit_positions_documents,
            ),
            remove_prohibit_positions_documents: convertEmptyArrayToUndefined(
              remove_prohibit_positions_documents,
            ),
            add_relate_documents:
              convertEmptyArrayToUndefined(add_relate_documents),
            remove_relate_documents: convertEmptyArrayToUndefined(
              remove_relate_documents,
            ),
          },
        })
      : sendVerifyRecord();
  };

  const tabItems = [
    {
      label: 'Thông tin nhân thân',
      key: 'item-1',
      forceRender: true,
      children: <FormCitizenInfo disabled rootName='personalInfo' />,
    },
    {
      label: 'Thông tin về án tích',
      key: 'item-2',
      forceRender: true,
      children: (
        <FormCriminalInfo
          disabled={
            isCheckApprove ||
            isCheckRetry ||
            statusTag === JUDICIAL_STATUS.NEW_REQUEST
          }
          name='verdicts'
          data={judicialRecord.verdicts}
        />
      ),
    },
    isCourtAccount && {
      label: 'Thông tin cấm đảm nhiệm chức vụ',
      key: 'item-3',
      forceRender: true,
      children: (
        <FormBanHoldingPosition
          disabled={
            isCheckApprove ||
            isCheckRetry ||
            statusTag === JUDICIAL_STATUS.NEW_REQUEST
          }
          name='prohibitPositionsDocuments'
          data={judicialRecord.prohibitPositionsDocuments}
        />
      ),
    },
  ].filter(Boolean);

  const breadcrumbs = [
    {
      path: config.routes.judicialRecordVerify,
      title: 'sidebar.judicial_record.verify',
    },
    {
      path: config.routes.judicialRecordVerifyDetail,
      title: 'form.formTitleInfo',
    },
  ];

  const isLoadingForm =
    loadingRejectRecord ||
    loadingVerifyRecord ||
    loadingRetryVerifyRecord ||
    loadingReceiveRecord ||
    loadingApproveRecord;

  let listButton = [];

  switch (statusTag) {
    case JUDICIAL_STATUS.NEW_REQUEST:
      listButton = [
        <AntButton key='receive' type='primary' onClick={sendReceiveRecord}>
          {messages['judicial.receiveRecordBtn']}
        </AntButton>,
      ];
      break;
    case JUDICIAL_STATUS.WAITING_CHECK:
      listButton = [
        <AntButton key='reject' type='danger' onClick={sendRejectRecord}>
          {messages['judicial.rejectRecordBtn']}
        </AntButton>,
        <AntButton key='verify' type='primary' onClick={() => form.submit()}>
          {messages['judicial.verifyRecordBtn']}
        </AntButton>,
      ];
      break;
    case JUDICIAL_STATUS.RECHECK:
      listButton = [
        <AntButton key='verify' type='primary' onClick={() => form.submit()}>
          {messages['judicial.verifyRecordBtn']}
        </AntButton>,
      ];
      break;
    case JUDICIAL_STATUS.WAITING_VERIFY:
      listButton = [
        <AntButton
          key='retryVerify'
          type='danger'
          onClick={() => setDialogOpen(true)}>
          {messages['judicial.retryVerifyRecordBtn']}
        </AntButton>,
        <AntButton key='approve' type='primary' onClick={sendApproveRecord}>
          {messages['judicial.approveRecordBtn']}
        </AntButton>,
      ];
      break;
    case JUDICIAL_STATUS.VERIFIED:
      //stp-api.internal.mhsolution.vn:9090/api/v1/admin/workstation-configuration/get-by-user-id/44
      listButton = [
        <AntButton
          key='retryVerify'
          type='danger'
          onClick={() => setDialogOpen(true)}>
          {messages['judicial.retryVerifyRecordBtn']}
        </AntButton>,
      ];
      break;
    case JUDICIAL_STATUS.LOCKED:
      listButton = [];
      break;
  }

  listButton = listButton.filter(({ key }) => {
    if (key === 'receive') {
      return checkPermissionAction(
        ROUTER_NAME.JUDICIAL_VERIFY_RECORD,
        ITEM_PERMISSIONS.VERIFY,
      );
    }

    if (key === 'reject' || key === 'verify') {
      return (
        verifiedBy === user?.id &&
        checkPermissionAction(
          ROUTER_NAME.JUDICIAL_VERIFY_RECORD,
          ITEM_PERMISSIONS.VERIFY,
        )
      );
    }

    if (key === 'retryVerify' || key === 'approve') {
      return checkPermissionAction(
        ROUTER_NAME.JUDICIAL_VERIFY_RECORD,
        ITEM_PERMISSIONS.APPROVE,
      );
    }
  });
  return (
    <>
      <AppPageMetadata
        title={message['breadcrumb.judicialRecord.infoVerify']}
      />
      <SubHeaderApp deps={[data?.request_organization?.due_date]}>
        <SubHeaderAppTemplate
          isShowGoBack
          title={
            <Space align={'center'} className={'whitespace-nowrap'}>
              <IntlMessages id='breadcrumb.judicialRecord.infoVerify' />
              {!isEmpty(data?.request_organization?.due_date) && (
                <RenderDueDate
                  due_date={getDateIso(data?.request_organization?.due_date)}
                />
              )}
            </Space>
          }
          subTitle={<BreadcrumbList items={breadcrumbs} />}
        />
      </SubHeaderApp>
      <Spin spinning={isLoadingForm}>
        <AppCard loading={isLoading}>
          {judicialRecord?.personalInfo?.id && (
            <FormContent
              className={'min-h-half-screen'}
              key={`data-${judicialRecord?.personalInfo?.id}-${isLoading}`}
              form={form}
              initialValues={judicialRecord}
              labelWrap
              onFinish={onSendVerifyRecord}
              disabled>
              <AppTabs items={tabItems} forceRender={true} />
            </FormContent>
          )}

          <Divider />
          <CommentJudicialRecord
            requestOrganizationId={data?.request_organization?.id}
            id={data?.request_citizen_profile?.id}
          />
        </AppCard>
      </Spin>
      <DialogConfirm
        visible={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        textTitle={modalConfigReject?.textTitle}
        textSuccess={modalConfigReject?.textSuccess}
        onSaveToServer={sendRetryVerifyRecord}>
        <p>
          <IntlMessages id={modalConfigReject?.contentId} />
          <span className='warning-text-color ml-1'>
            {data?.request_citizen_profile?.full_name}
          </span>
          <FormTextArea label='reason.reject' name='reason' required />
        </p>
      </DialogConfirm>
      {!isLocked && !isEmpty(listButton) && (
        <AppCard className='sticky-footer'>
          <div className='ant-d-flex ant-align-center ant-justify-end'>
            <Space>{listButton}</Space>
          </div>
        </AppCard>
      )}
    </>
  );
};

export default DetailVerifyJudicialPage;
