import React, { useMemo } from 'react';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import API from 'src/@crema/services/apis';
import { useNavigate, useParams } from 'react-router-dom';
import { isArray, isEmpty } from 'src/shared/utils/Typeof';
import { parse } from 'src/shared/utils/String';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import SubHeaderApp from 'src/@crema/component/SubHeaderApp';
import Error404 from 'src/pages/errorPages/Error404';
import { Col, Form, Row, Space, Spin } from 'antd';
import SubHeaderAppTemplate from 'src/@crema/component/SubHeaderApp/SubHeaderAppTemplate';
// import config from 'src/config';
import AppCard from 'src/@crema/core/AppCard';
import DocumentDisplay from 'src/@crema/core/DataDisplay/DocumentDisplay';
import RawDocumentType from 'src/pageComponents/rawDocument/RawDocumentType';
import FormContent from 'src/@crema/component/FormContent';
import FormDocumentInformation from 'src/pageComponents/rawDocument/FormDocumentInformation';
import ListCitizenDocument from 'src/pageComponents/rawDocument/ListCitizenDocument';
import AntButton from 'src/@crema/component/AntButton';
import { useIntl } from 'react-intl';

const DetailRawDocumentPage = () => {
  const { id: documentId } = useParams();
  const { messages } = useIntl();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { isLoading, data } = useFetch(
    {
      url: API.DETAIL_RAW_DOCUMENT(documentId),
    },
    [documentId],
  );

  const dataShow = data?.result;

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
    <Spin spinning={isLoading}>
      <AppPageMetadata title={messages['sidebar.detailRawDocument']} />
      <SubHeaderApp deps={[isLoading]}>
        <SubHeaderAppTemplate title={'Thông tin văn bản'} />
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
                <RawDocumentType data={dataShow} disabled />
              </div>
              <div className='w-full px-8 py-4'>
                <FormContent
                  key={`data-${dataShow?.id}-${isLoading}`}
                  form={form}
                  disabled
                  initialValues={initialValues}
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
                    disabled
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
              {messages['dialog.button.close']}
            </AntButton>
          </Space>
        </div>
      </AppCard>
    </Spin>
  );
};

export default DetailRawDocumentPage;
