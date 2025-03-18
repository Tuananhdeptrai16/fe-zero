import React, { useMemo, useState } from 'react';
import { Col, Form, Row, Space, Spin } from 'antd';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import SubHeaderApp from 'src/@crema/component/SubHeaderApp';
import SubHeaderAppTemplate from 'src/@crema/component/SubHeaderApp/SubHeaderAppTemplate';
import BreadcrumbList from 'src/@crema/component/BreadcrumbList';
import AntButton from 'src/@crema/component/AntButton';
import AppCard from 'src/@crema/core/AppCard';
import ListCitizenDocument from 'src/pageComponents/rawDocument/ListCitizenDocument';
import FormContent from 'src/@crema/component/FormContent';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import config from 'src/config';
import { useIntl } from 'react-intl';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import API from 'src/@crema/services/apis';
import { isArray, isEmpty } from 'src/shared/utils/Typeof';
import notification from 'src/shared/utils/notification';
import useCallApi from 'src/@crema/hook/useCallApi';
import { parse, stringify } from 'src/shared/utils/String';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import Error404 from 'src/pages/errorPages/Error404';
import FormDocumentInformation from 'src/pageComponents/rawDocument/FormDocumentInformation';
import { omit, pick, some } from 'lodash';
import { FIELDS_REMOVE_DOCUMENT } from 'src/shared/constants/RawDocument';
import { useAuthUser } from 'src/@crema/utility/AuthHooks';
import DocumentDisplay from 'src/@crema/core/DataDisplay/DocumentDisplay';
import RawDocumentType from 'src/pageComponents/rawDocument/RawDocumentType';
import {
  RAW_DOCUMENT_STATUS_OCR_PROCESSING,
  RAW_DOCUMENT_STATUS_VERIFIED,
} from 'src/shared/constants/DataTableStatus';
import { usePrompt } from 'src/hooks/usePrompt';
import { FIELD_MAP } from 'src/shared/constants/FieldKeyMap';

const EditRawDocument = () => {
  const { user } = useAuthUser();
  const { messages } = useIntl();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [form] = Form.useForm();
  const documentId = params?.id;
  const dataDetail = location?.state?.data;

  const [isSaveDraft, setIsSaveDraft] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const { isLoading, data, fetchData } = useFetch(
    {
      url: API.DETAIL_RAW_DOCUMENT(documentId),
    },
    [documentId],
  );

  let dataShow;
  if (dataDetail?.id === documentId) {
    dataShow = dataDetail;
  }

  if (data?.result) {
    dataShow = data?.result;
  }
  const isOwner = dataShow?.created_user?.id === user?.id;
  const state = dataShow?.state;

  const initialValues = useMemo(() => {
    if (
      isEmpty(dataShow?.document) &&
      isEmpty(dataShow?.raw_document_objects)
    ) {
      const parseRawText = parse(dataShow?.raw_text);
      const { objects: citizens, ...document } = parseRawText || {};
      return {
        citizens: isEmpty(citizens) ? [{}] : citizens,
        document: isEmpty(document) ? {} : document,
      };
    }
    const contentDoc = parse(dataShow?.document?.content) || {};
    const initDoc = { ...dataShow?.document, ...contentDoc };
    const initCitizen = dataShow?.raw_document_objects?.map(
      (rawDocumentObject) => {
        const object = parse(rawDocumentObject.object);
        if (object) {
          return { ...rawDocumentObject, ...object };
        }
        return {};
      },
    );
    return {
      citizens: isEmpty(initCitizen) ? [{}] : initCitizen,
      document: isEmpty(initDoc) ? {} : initDoc,
    };
  }, [dataShow?.document, dataShow?.raw_document_objects, dataShow?.raw_text]);

  const configTemplate = parse(dataShow?.document_template?.config_template);
  const objectTemplate = parse(dataShow?.document_template?.object_template);

  const verifyDocumentToServer = (data) => {
    return instanceCoreApi.put(
      `${API.VERIFY_RAW_DOCUMENT}/${dataShow?.id}`,
      data,
    );
  };
  const saveDraftDocToServer = (data) => {
    return instanceCoreApi.put(API.SAVE_DRAFT_RAW_DOCUMENT(dataShow?.id), data);
  };

  const { send: saveDraft, loading: loadingDraft } = useCallApi({
    callApi: saveDraftDocToServer,
    success: () => {
      notification.success('Lưu nháp văn bản thành công');
      navigate({ search: '?t=todo', pathname: config.routes.rawDocument });
      setIsSaveDraft(false);
    },
  });

  const { send, loading } = useCallApi({
    callApi: verifyDocumentToServer,
    success: () => {
      notification.success('Xác minh văn bản thành công');
      navigate(-1);
    },
    error: (error) => {
      const result = error?.raw?.data?.result;
      if (!result) return notification.error(error?.raw?.data?.message);
      return notification.error(Object.values(result)?.[0]);
    },
  });

  const processDocumentData = (documentUpdate, citizensUpdate) => {
    const raw_document_object_ids_remove = (initialValues?.citizens || [])
      .filter((citizenInit) => !some(citizensUpdate, { id: citizenInit?.id }))
      .map((citizen) => citizen?.id)
      .filter((citizenId) => !isEmpty(citizenId));

    return {
      document: {
        ...documentUpdate,
        id: documentId,
        old_case_number: initialValues?.document?.case_number, //BE can truyen
        old_prohibit_number: initialValues?.document?.[FIELD_MAP.SO_QUYET_DINH], //Be can truyen
        old_relate_number: initialValues?.document?.[FIELD_MAP.SO_QUYET_DINH], //Be can truyen
        content: stringify(omit(documentUpdate, FIELDS_REMOVE_DOCUMENT)),
      },
      raw_document_objects: citizensUpdate.map((citizen) => ({
        ...citizen,
        object: stringify(omit(citizen, FIELDS_REMOVE_DOCUMENT)),
      })),
      raw_document_object_ids_remove,
    };
  };

  const processAndSaveDocument = async (
    documentUpdate,
    citizensUpdate,
    onSave,
  ) => {
    if (isEmpty(documentUpdate)) {
      return notification.error('Thông tin văn bản không được để trống');
    }

    const dataUpdate = processDocumentData(documentUpdate, citizensUpdate);
    await onSave(dataUpdate);
  };

  const onSaveDraft = async () => {
    setIsSaveDraft(true);
    const documentUpdate = form.getFieldValue('document') || {};
    const citizensUpdate = form.getFieldValue('citizens') || [];
    await processAndSaveDocument(documentUpdate, citizensUpdate, saveDraft);
  };

  const getCustomItem = (custom) => {
    return (custom || []).map((item) => pick(item, ['field', 'value']));
  };

  const verifyDocument = async (data) => {
    const documentUpdate = data?.document || {};
    documentUpdate.custom = getCustomItem(documentUpdate.custom || []);
    const citizensUpdate = (data?.citizens || []).map((citizen) => ({
      ...citizen,
      custom: getCustomItem(citizen.custom),
    }));

    await processAndSaveDocument(documentUpdate, citizensUpdate, send);
  };

  const reloadData = () => {
    fetchData();
  };

  usePrompt({
    when: isDirty && !isSaveDraft,
  });

  if (!isLoading && !dataShow) {
    return (
      <>
        <AppPageMetadata title={'Văn bản không tồn tại trong hệ thống'} />
        <SubHeaderApp deps={[]}></SubHeaderApp>
        <Error404 />
      </>
    );
  }

  return (
    <Spin spinning={loading || isLoading}>
      <AppPageMetadata title={messages['sidebar.detailRawDocument']} />
      <SubHeaderApp deps={[loading, isLoading]}>
        <SubHeaderAppTemplate
          title={'Thông tin văn bản'}
          subTitle={
            <BreadcrumbList
              items={[
                {
                  path: config.routes.rawDocument,
                  title: 'sidebar.rawDocument',
                },
                {
                  title: 'sidebar.detailRawDocument',
                },
              ]}
            />
          }
        />
      </SubHeaderApp>
      {dataShow && (
        <AppCard bodyStyle={{ padding: 0 }}>
          <Row>
            <Col span={12}>
              <div className='px-8 py-6 h-100 border-r'>
                <div style={{ position: 'sticky', top: 80 }}>
                  <DocumentDisplay
                    src={dataShow?.link}
                    width={'100%'}
                    height={window.innerHeight - 120}
                  />
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className='border-b w-full px-8 py-4'>
                <RawDocumentType data={dataShow} reloadData={reloadData} />
              </div>
              <div className='w-full px-8 py-4'>
                <FormContent
                  onValuesChange={() => setIsDirty(true)}
                  key={`data-${dataShow?.id}-${isLoading}`}
                  form={form}
                  disabled={isLoading || !isOwner}
                  initialValues={initialValues}
                  onFinish={verifyDocument}
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 18 }}
                  layout='horizontal'>
                  <div className='block-document'>
                    <div className='block-content'>
                      <p className='block-title'>Thông tin văn bản</p>
                      <FormDocumentInformation
                        field={{
                          name: 'document',
                        }}
                        configTemplate={configTemplate}
                      />
                    </div>
                  </div>
                  <ListCitizenDocument
                    name={'citizens'}
                    configTemplate={
                      isArray(objectTemplate) ? objectTemplate : []
                    }
                    numCitizenInit={initialValues?.citizens?.length}
                  />
                </FormContent>
              </div>
            </Col>
          </Row>
        </AppCard>
      )}
      <AppCard className='sticky-footer'>
        <div className='ant-d-flex ant-align-center ant-justify-end'>
          <Space>
            <AntButton
              onClick={() => {
                // navigate(config.routes.rawDocument);
                navigate(-1);
              }}>
              Hủy
            </AntButton>
            {isOwner &&
              state !== RAW_DOCUMENT_STATUS_VERIFIED &&
              state !== RAW_DOCUMENT_STATUS_OCR_PROCESSING && (
                <AntButton loading={loadingDraft} onClick={onSaveDraft}>
                  {messages['form.saveDraft']}
                </AntButton>
              )}
            {isOwner && (
              <AntButton
                type='primary'
                htmlType='submit'
                loading={loading || isLoading}
                onClick={() => form.submit()}>
                {state === RAW_DOCUMENT_STATUS_VERIFIED
                  ? 'Cập nhật'
                  : 'Hoàn thành'}
              </AntButton>
            )}
          </Space>
        </div>
      </AppCard>
    </Spin>
  );
};

EditRawDocument.propTypes = {};

EditRawDocument.defaultProps = {};

export default EditRawDocument;
