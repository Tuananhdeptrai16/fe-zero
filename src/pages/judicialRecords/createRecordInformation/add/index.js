import React, { useState } from 'react';
import { DetailJudicialRecord } from 'src/pageComponents/judicialRecords/detail';
import config from 'src/config/index';
import useCallApi from 'src/@crema/hook/useCallApi';
import {
  postCreateJudicialRecord,
  postSaveDraftJudicialRecord,
} from 'src/@crema/services/judicialRecord.service';
import { useNavigate } from 'react-router-dom';
import {
  CITIZEN_PROFILE_ORGANIZATION_NAME,
  CITIZEN_PROFILE_REQUEST_NAME,
  JUDICIAL_SEARCH_NAME,
  KEY_STATUS_CREATE_JUDICIAL_RECORD,
  PROHIBIT_POSITION_DOCUMENT_REQUEST_LIST,
  RELATED_DOCUMENT_REQUEST_LIST_NAME,
  VERDICT_DOCUMENT_REQUEST_LIST_NAME,
} from 'src/pages/judicialRecords/createRecordInformation/utils';
import { renderErrorNotification } from 'src/shared/utils/Service';
import notification from 'src/shared/utils/notification';
import { Form } from 'antd';

const AddJudicialRecord = () => {
  const [form] = Form.useForm();
  const nav = useNavigate();
  const [infoCitizens, setInfoCitizens] = useState([]);
  const [verifyRequests, setVerifyRequests] = useState([]);
  const initialValues = {
    [CITIZEN_PROFILE_REQUEST_NAME]: {
      profile_type: 1,
    },
    [CITIZEN_PROFILE_ORGANIZATION_NAME]: [],
    [VERDICT_DOCUMENT_REQUEST_LIST_NAME]: [],
    [PROHIBIT_POSITION_DOCUMENT_REQUEST_LIST]: [],
    [RELATED_DOCUMENT_REQUEST_LIST_NAME]: [],
    [JUDICIAL_SEARCH_NAME]: {},
  };
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

  const breadcrumbs = [
    {
      path: config.routes.judicialCreateRecord,
      title: 'judicial.createRecordBtn',
    },
    {
      path: config.routes.judicialCreateRecordAdd,
      title: 'breadcrumb.judicialRecord.add',
    },
  ];

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
        key={'add'}
        breadcrumbs={breadcrumbs}
        isLoadingSubmit={loading}
        isLoadingDraft={isLoadingDraft}
        onSubmit={onSubmit}
        onDraft={onDraft}
        initialValues={initialValues}
        infoCitizens={infoCitizens}
        setInfoCitizens={setInfoCitizens}
        verifyRequests={verifyRequests}
        setVerifyRequests={setVerifyRequests}
        form={form}
      />
    </div>
  );
};

export default AddJudicialRecord;
