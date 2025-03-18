import React, { useState } from 'react';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import { useIntl } from 'react-intl';
import SubHeaderApp from 'src/@crema/component/SubHeaderApp';
import SubHeaderAppTemplate from 'src/@crema/component/SubHeaderApp/SubHeaderAppTemplate';
import BreadcrumbList from 'src/@crema/component/BreadcrumbList';
import AntButton from 'src/@crema/component/AntButton';
import { Form, Space, Steps, Typography } from 'antd';
import { JudicialCitizenInformation } from './firstStep/JudicialCitizenInformation';
import AppCard from 'src/@crema/core/AppCard';
import { SampleFormRadio } from './secondStep/SampleFormRadio';
import { JudicialSendVerifyRequestToUnit } from './thirdStep/JudicialSendVerifyRequestToUnit';
import FormContent from 'src/@crema/component/FormContent';
import {
  CITIZEN_PROFILE_ORGANIZATION_NAME,
  CITIZEN_PROFILE_REQUEST_NAME,
  PROHIBIT_POSITION_DOCUMENT_REQUEST_LIST,
  RELATED_DOCUMENT_REQUEST_LIST_NAME,
  VERDICT_DOCUMENT_REQUEST_LIST_NAME,
} from 'src/pages/judicialRecords/createRecordInformation/utils';
import { useNavigate } from 'react-router-dom';
import config from 'src/config';
import FormDatePicker from 'src/@crema/core/Form/FormDatePicker';
import { formatDateJs } from 'src/shared/utils/DateTime';
import { disabledDateBeforeToday } from 'src/shared/utils/ui';
import { handleRedundantData } from 'src/shared/utils/Object';
import { usePrompt } from 'src/hooks/usePrompt';

export const DetailJudicialRecord = ({
  isLoadingSubmit,
  isLoadingDraft,
  breadcrumbs,
  onSubmit,
  onDraft,
  initialValues,
  isLoading,
  infoCitizens,
  verifyRequests,
  setVerifyRequests,
  setInfoCitizens,
  form: formSendRequest,
}) => {
  const navigate = useNavigate();
  const { messages } = useIntl();

  const [current, setCurrent] = useState(0);
  const [isDirty, setIsDirty] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const preSaveData = () => {
    const citizenProfile = formSendRequest.getFieldValue(
      CITIZEN_PROFILE_REQUEST_NAME,
    );
    const listVerdict =
      formSendRequest.getFieldValue(VERDICT_DOCUMENT_REQUEST_LIST_NAME) || [];
    const listRelateDocument =
      formSendRequest.getFieldValue(RELATED_DOCUMENT_REQUEST_LIST_NAME) || [];
    const listProhibitPositionDocument =
      formSendRequest.getFieldValue(PROHIBIT_POSITION_DOCUMENT_REQUEST_LIST) ||
      [];
    const requestVerdicts = listVerdict.map((item) => {
      return {
        id: item?.id,
        document_object_id: item?.id,
        group_type: 'verdict',
        raw_document_id: item?.raw_document_object?.raw_document_id,
        raw_document_object_id: item?.raw_document_object.id,
      };
    });

    const prohibitList = listProhibitPositionDocument.map((item) => {
      return {
        id: item?.id,
        document_object_id: item?.id,
        group_type: 'prohibit-position-document',
        raw_document_id: item?.raw_document_object?.raw_document_id,
        raw_document_object_id: item?.raw_document_object.id,
      };
    });

    const relateDocumentList = listRelateDocument.map((item) => {
      return {
        id: item?.id,
        document_object_id: item?.id,
        group_type: 'related-document',
        raw_document_id: item?.raw_document_object?.raw_document_id,
        raw_document_object_id: item?.raw_document_object.id,
      };
    });
    const organizationList = (verifyRequests || []).filter(
      (item) => item?.due_date,
    );

    const dataReturn = {
      [CITIZEN_PROFILE_REQUEST_NAME]: {
        ...citizenProfile,
        profile_type: citizenProfile?.profile_type || 1,
        cccd_date: formatDateJs(citizenProfile?.cccd_date),
      },
      [CITIZEN_PROFILE_ORGANIZATION_NAME]: organizationList,
      [VERDICT_DOCUMENT_REQUEST_LIST_NAME]: requestVerdicts,
      [PROHIBIT_POSITION_DOCUMENT_REQUEST_LIST]: prohibitList,
      [RELATED_DOCUMENT_REQUEST_LIST_NAME]: relateDocumentList,
    };
    return handleRedundantData(dataReturn);
  };

  const onSaveDraft = () => {
    setIsSubmit(true);
    const draftData = preSaveData();
    return onDraft(draftData);
  };
  const onSave = () => {
    setIsSubmit(true);
    const newData = preSaveData();
    return onSubmit(newData);
  };

  const steps = [
    {
      title: 'judicial.selectCitizen',
      content: (
        <JudicialCitizenInformation
          infoCitizens={infoCitizens}
          setInfoCitizens={setInfoCitizens}
        />
      ),
    },
    {
      title: 'judicial.selectSampleForm',
      content: <SampleFormRadio />,
    },
    {
      title: 'judicial.sendVerifyReqToUnit',
      content: (
        <JudicialSendVerifyRequestToUnit
          verifyRequests={verifyRequests}
          setVerifyRequests={setVerifyRequests}
        />
      ),
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: messages[item?.title],
  }));

  const onGoBack = () => {
    navigate(config.routes.judicialCreateRecord);
  };

  usePrompt({ when: isDirty && !isSubmit });

  return (
    <div className={'ant-h-full'}>
      <AppPageMetadata title={messages[breadcrumbs?.[1]?.title]} />
      <SubHeaderApp>
        <SubHeaderAppTemplate
          title={messages[breadcrumbs?.[1]?.title]}
          isShowGoBack
          subTitle={<BreadcrumbList items={breadcrumbs} />}
        />
      </SubHeaderApp>
      <AppCard>
        <Steps current={current} items={items} onChange={setCurrent} />
      </AppCard>
      <br />
      <FormContent
        onValuesChange={() => setIsDirty(true)}
        className={'min-h-half-screen'}
        form={formSendRequest}
        onFinish={onSave}
        initialValues={initialValues}>
        {current === steps.length - 1 && (
          <>
            <AppCard>
              <div className={'d-flex items-center justify-between'}>
                <Typography.Title level={3} className={'mb-0'}>
                  {messages['judicial.recordTitle']}
                </Typography.Title>
                <FormDatePicker
                  disabledDate={disabledDateBeforeToday}
                  name={[CITIZEN_PROFILE_REQUEST_NAME, 'due_date']}
                  label={'judicial.verifiedExpireDay'}
                  layout={{ style: { marginBottom: 0 } }}
                  required
                />
              </div>
            </AppCard>
            <br />
          </>
        )}
        <Form.Item
          name={VERDICT_DOCUMENT_REQUEST_LIST_NAME}
          style={{ display: 'none' }}
        />
        <Form.Item
          name={RELATED_DOCUMENT_REQUEST_LIST_NAME}
          style={{ display: 'none' }}
        />
        <Form.Item
          name={PROHIBIT_POSITION_DOCUMENT_REQUEST_LIST}
          style={{ display: 'none' }}
        />
        <Form.Item
          name={CITIZEN_PROFILE_REQUEST_NAME}
          style={{ display: 'none' }}
        />
        <AppCard loading={isLoading}>
          <div className='steps-content'>{steps[current].content}</div>
        </AppCard>
      </FormContent>
      <AppCard className={'sticky-footer z-index-20'}>
        <div className='steps-action text-right'>
          <Space size={[8, 0]}>
            <AntButton onClick={onGoBack}>
              {messages['dialog.button.cancel']}
            </AntButton>
            {current !== 0 && (
              <AntButton onClick={() => prev()}>
                {messages['dialog.button.goBack']}
              </AntButton>
            )}
            <AntButton
              key='draft'
              htmlType='button'
              loading={isLoadingDraft}
              onClick={onSaveDraft}>
              {messages['form.saveDraft']}
            </AntButton>
            {current < steps.length - 1 && (
              <AntButton type='primary' onClick={() => next()}>
                Tiếp tục
              </AntButton>
            )}
            {current === steps.length - 1 && (
              <AntButton
                type='primary'
                htmlType='submit'
                loading={isLoadingSubmit}
                onClick={() => {
                  formSendRequest.submit();
                }}>
                {messages['form.sendVerifyReq']}
              </AntButton>
            )}
          </Space>
        </div>
      </AppCard>
      {/* <AntModal
        title={messages['judicial.cancelCreateModalTitle']}
        open={showWarningModal}
        onOk={onGoBack}
        centered
        okText={messages['confirm.agree']}
        cancelText={messages['dialog.button.close']}
        onCancel={() => setShowWarningModal(false)}>
        <ConfirmInfo message={'judicial.cancelCreateModalContent'} />
      </AntModal> */}
    </div>
  );
};
