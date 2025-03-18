import React, { useEffect, useState } from 'react';
import { DetailJudicialRecord } from 'src/pageComponents/judicialRecords/detail';
import config from 'src/config';
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
import useCallApi from 'src/@crema/hook/useCallApi';
import {
  postCreateJudicialRecord,
  postSaveDraftJudicialRecord,
} from 'src/@crema/services/judicialRecord.service';
import { parse } from 'src/shared/utils/String';
import { renderErrorNotification } from 'src/shared/utils/Service';
import notification from 'src/shared/utils/notification';
import { Form } from 'antd';

const EditJudicialRecord = () => {
  const [form] = Form.useForm();
  const nav = useNavigate();
  const { id } = useParams();
  const [infoCitizens, setInfoCitizens] = useState([]);
  const [verifyRequests, setVerifyRequests] = useState([]);

  const { data, isLoading } = useFetch(
    {
      url: API.EDIT_JUDICIAL_RECORD(id),
    },
    [id],
  );

  const { loading, send } = useCallApi({
    callApi: postCreateJudicialRecord,
    success: () => {
      nav({
        pathname: config.routes.judicialCreateRecord,
        search: `?status=${KEY_STATUS_CREATE_JUDICIAL_RECORD.WAITING}`,
      });
      notification.success('Đã gửi yêu cầu xác thực đến đơn vị thành công');
    },
    error: (err) => {
      renderErrorNotification(err, form);
    },
  });
  const { loading: isLoadingDraft, send: saveDraft } = useCallApi({
    callApi: postSaveDraftJudicialRecord,
    success: () => {
      notification.success('Lưu nháp thành công');
      nav({
        pathname: config.routes.judicialCreateRecord,
        search: `?status=${KEY_STATUS_CREATE_JUDICIAL_RECORD.IM_COMPLETED}`,
      });
    },
    error: (err) => {
      renderErrorNotification(err, form);
    },
  });

  const { result } = data || {};
  const {
    request_citizen_profile,
    request_organizations,
    request_verdicts,
    prohibit_positions_documents,
    request_relate_documents,
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
    [RELATED_DOCUMENT_REQUEST_LIST_NAME]: (request_relate_documents || []).map(
      (item) => {
        const raw_document_object = item?.raw_document_object || {};
        return {
          ...parse(item?.content),
          ...item,
          group_type: KEY_GROUP_TYPE.RELATE_DOCUMENT,
          raw_document_object: {
            ...parse(raw_document_object?.object),
            ...raw_document_object,
          },
        };
      },
    ),
  };
  const breadcrumbs = [
    {
      path: config.routes.judicialCreateRecord,
      title: 'judicial.createRecordBtn',
    },
    {
      path: config.routes.judicialCreateRecordAdd,
      title: 'breadcrumb.judicialRecord.edit',
    },
  ];

  useEffect(() => {
    setInfoCitizens(
      [...(request_verdicts || []), ...(prohibit_positions_documents || [])] ||
        [],
    );
    setVerifyRequests(
      (request_organizations || []).map((item) => ({
        ...item,
        due_date: getDateIso(item.due_date),
      })),
    );
  }, [prohibit_positions_documents, request_organizations, request_verdicts]);

  const onDraft = async (data) => {
    if (!data) return;
    await saveDraft({ data });
  };
  const onSubmit = async (data) => {
    await send({ data });
  };

  return (
    <div>
      <DetailJudicialRecord
        key={`edit-${request_citizen_profile?.id}`}
        breadcrumbs={breadcrumbs}
        initialValues={initialValues}
        isLoading={isLoading}
        infoCitizens={infoCitizens}
        setInfoCitizens={setInfoCitizens}
        verifyRequests={verifyRequests}
        setVerifyRequests={setVerifyRequests}
        isLoadingSubmit={loading}
        isLoadingDraft={isLoadingDraft}
        onSubmit={onSubmit}
        onDraft={onDraft}
        form={form}
      />
    </div>
  );
};

export default EditJudicialRecord;
