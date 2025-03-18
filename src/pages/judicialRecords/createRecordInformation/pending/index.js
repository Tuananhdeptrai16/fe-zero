import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import API from 'src/@crema/services/apis';
import {
  CITIZEN_PROFILE_ORGANIZATION_NAME,
  CITIZEN_PROFILE_REQUEST_NAME,
  KEY_GROUP_TYPE,
  KEY_STATUS_CREATE_JUDICIAL_RECORD,
  PROHIBIT_POSITION_DOCUMENT_REQUEST_LIST,
  RELATED_DOCUMENT_REQUEST_LIST_NAME,
  VERDICT_DOCUMENT_REQUEST_LIST_NAME,
} from 'src/pages/judicialRecords/createRecordInformation/utils';
import { getDateIso } from 'src/shared/utils/DateTime';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import { useIntl } from 'react-intl';
import SubHeaderApp from 'src/@crema/component/SubHeaderApp';
import SubHeaderAppTemplate from 'src/@crema/component/SubHeaderApp/SubHeaderAppTemplate';
import AppCard from 'src/@crema/core/AppCard';
import FormContent from 'src/@crema/component/FormContent';
import { Space, Typography } from 'antd';
import FormDatePicker from 'src/@crema/core/Form/FormDatePicker';
import AntButton from 'src/@crema/component/AntButton';
import config from 'src/config';
import { JudicialSendVerifyRequestToUnit } from 'src/pageComponents/judicialRecords/detail/thirdStep/JudicialSendVerifyRequestToUnit';
import useCallApi from 'src/@crema/hook/useCallApi';
import { lockJudicialRecord } from 'src/@crema/services/judicialRecord.service';
import { useJWTAuthActions } from 'src/@crema/services/auth/jwt-auth/JWTAuthProvider';
import { ROUTER_NAME } from 'src/pages/routeConfig';
import { ITEM_PERMISSIONS } from 'src/shared/constants/Permission';
import { parse } from 'src/shared/utils/String';

const DetailPendingJudicialCreateRecord = () => {
  const navigate = useNavigate();
  const { checkPermissionAction } = useJWTAuthActions();
  const { messages } = useIntl();
  const { id } = useParams();
  const [verifyRequests, setVerifyRequests] = useState([]);

  const { send: sendVerify, loading } = useCallApi({
    callApi: lockJudicialRecord,
    success: () => {
      navigate({
        pathname: config.routes.judicialCreateRecord,
        search: `?status=verified`,
      });
    },
  });
  const { data, isLoading } = useFetch(
    {
      url: API.EDIT_JUDICIAL_RECORD(id),
    },
    [id],
  );

  const { result } = data || {};
  const {
    request_citizen_profile,
    request_organizations,
    request_verdicts,
    request_relate_documents,
    prohibit_positions_documents,
  } = result || '';

  const initialValues = {
    [CITIZEN_PROFILE_REQUEST_NAME]: {
      ...request_citizen_profile,
      due_date: getDateIso(request_citizen_profile?.due_date),
      cccd_date: getDateIso(request_citizen_profile?.cccd_date),
    },
    [CITIZEN_PROFILE_ORGANIZATION_NAME]: request_organizations,
    [VERDICT_DOCUMENT_REQUEST_LIST_NAME]: (request_verdicts || []).map(
      (item) => {
        const raw_document_object = item?.raw_document_object || {};
        return {
          ...parse(item?.content),
          ...item,
          group_type: KEY_GROUP_TYPE.VERDICT,
          raw_document_object: {
            ...parse(raw_document_object?.object),
            ...raw_document_object,
          },
        };
      },
    ),
    [RELATED_DOCUMENT_REQUEST_LIST_NAME]: (request_relate_documents || []).map(
      (item) => {
        const raw_document_object = item?.raw_document_object || {};
        return {
          ...parse(item?.content),
          ...item,
          group_type: KEY_GROUP_TYPE.VERDICT,
          raw_document_object: {
            ...parse(raw_document_object?.object),
            ...raw_document_object,
          },
        };
      },
    ),
    [PROHIBIT_POSITION_DOCUMENT_REQUEST_LIST]: (
      prohibit_positions_documents || []
    ).map((item) => {
      const raw_document_object = item?.raw_document_object || {};
      return {
        ...parse(item?.content),
        ...item,
        group_type: KEY_GROUP_TYPE.PROHIBIT,
        raw_document_object: {
          ...parse(raw_document_object?.object),
          ...raw_document_object,
        },
      };
    }),
  };

  useEffect(() => {
    setVerifyRequests(
      (request_organizations || []).map((item) => ({
        ...item,
        due_date: getDateIso(item?.due_date),
      })),
    );
  }, [prohibit_positions_documents, request_organizations, request_verdicts]);

  const isDisabledVerify = verifyRequests?.some(
    (item) => item?.status !== KEY_STATUS_CREATE_JUDICIAL_RECORD.APPROVED,
  );

  const onGoBack = () => {
    navigate({
      pathname: config.routes.judicialCreateRecord,
      search: `?status=${KEY_STATUS_CREATE_JUDICIAL_RECORD.WAITING}`,
    });
  };

  const onVerify = async () => {
    await sendVerify(id);
  };

  return (
    <div>
      <AppPageMetadata title={messages['judicial.verifyInfo']} />
      <SubHeaderApp>
        <SubHeaderAppTemplate
          title={messages['judicial.verifyInfo']}
          isShowGoBack
        />
      </SubHeaderApp>
      <FormContent
        initialValues={initialValues}
        disabled
        key={request_citizen_profile?.id}>
        <AppCard bodyStyle={{ padding: 15 }}>
          <div className={'d-flex items-center justify-between'}>
            <Typography.Title level={3} className={'mb-0'}>
              {messages['judicial.recordTitle']}
            </Typography.Title>
            <FormDatePicker
              name={[CITIZEN_PROFILE_REQUEST_NAME, 'due_date']}
              label={'judicial.verifiedExpireDay'}
              layout={{ style: { marginBottom: 0 } }}
              required
            />
          </div>
        </AppCard>
        <br />
        <AppCard loading={isLoading}>
          <JudicialSendVerifyRequestToUnit
            verifyRequests={verifyRequests}
            setVerifyRequests={setVerifyRequests}
            isPendingDetailPage
          />
        </AppCard>
      </FormContent>
      <AppCard className={'sticky-footer z-index-20 text-right'}>
        <Space>
          <AntButton onClick={onGoBack}>
            {messages['dialog.button.close']}
          </AntButton>
          {checkPermissionAction(
            ROUTER_NAME.JUDICIAL_CREATE_RECORDS,
            ITEM_PERMISSIONS.APPROVE,
          ) && (
            <AntButton
              type={'primary'}
              onClick={onVerify}
              loading={loading}
              disabled={isLoading || isDisabledVerify}>
              {messages['button.verifyAndUpdateInfo']}
            </AntButton>
          )}
        </Space>
      </AppCard>
    </div>
  );
};

export default DetailPendingJudicialCreateRecord;
