import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import AntModal from 'src/@crema/component/AntModal';
import { useDataTableContext } from 'src/@crema/core/DataTable/DataTableContext';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import { generateUniqueID } from 'src/@crema/utility/Utils';
import { FORM_CONFIG } from 'src/shared/constants/FormDataTable';
import {
  getMessageResponse,
  getErrorsResponse,
} from 'src/shared/utils/Service';
import { isFunction, isEmpty, isPromise } from 'src/shared/utils/Typeof';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import { useIntl } from 'react-intl';
import useCallApi from 'src/@crema/hook/useCallApi';
import { Button } from 'antd';
import notification from 'src/shared/utils/notification';
import { convertObjectMapper } from 'src/shared/utils/Modal';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import FormContent from 'src/@crema/component/FormContent';
import { handleRedundantData } from 'src/shared/utils/Object';
import { PrinterOutlined } from '@ant-design/icons';
import AntButton from '../AntButton';
import { useReactToPrint } from 'react-to-print';
import PrintImage from 'src/pages/SchoolWarehouse/NuclearRegion/Components/LookCollectedResults/PrintImage';

const FormRowDataTable = ({
  noAction = false,
  readOnly = false,
  title,
  buttonText,
  formType,
  visible,
  onClose,
  preSaveData,
  children,
  resource,
  fieldMapper,
  beforeSave,
  initialValues,
  size,
  method,
  isExport,
  isSaveDraft,
  layout = 'vertical',
  customErrorMessage,
  onSuccess,
  apiPostSaveDraft,
  rowData,
  ...restProps
}) => {
  const refForm = useRef();
  const refFormId = useRef(`form-table-${generateUniqueID()}`);
  const [errorCheckConnection, setErrorCheckConnection] = useState('');
  const [isError, setIsError] = useState(true);
  const { messages } = useIntl();
  const { reloadPage } = useDataTableContext();

  const onSaveToServer = (data) => {
    if (method === METHOD_FETCH.PUT) {
      if (isPromise(data)) {
        return data.then((res) => instanceCoreApi.post(resource, res));
      }
      return instanceCoreApi.put(resource, data);
    } else {
      if (isPromise(data)) {
        return data.then((res) => instanceCoreApi.post(resource, res));
      }
      return instanceCoreApi.post(resource, data);
    }
  };

  const configForm = FORM_CONFIG.find(({ type }) => type === formType) || {};

  const getErrorResponse = (err) => {
    const messageError = customErrorMessage || getMessageResponse(err);
    const errors = getErrorsResponse(err?.raw, messages);
    if (isEmpty(errors)) {
      notification.error(messages[messageError] || messageError);
    } else {
      const errorMapper = convertObjectMapper({ errors, fieldMapper });
      notification.error(errorMapper?.[0]?.errors);

      if (refForm?.current?.setFields) {
        refForm.current.setFields(errorMapper);
      }
    }
  };

  const { loading: loadingDraft, send: sendDraft } = useCallApi({
    success: (response, request) => {
      if (!isEmpty(reloadPage)) {
        reloadPage();
      }
      onClose();
      notification.success(messages[configForm?.successDraftMessage]);
      if (isFunction(onSuccess)) {
        onSuccess(response, request);
      }
    },
    callApi: (data) => instanceCoreApi.post(apiPostSaveDraft, data),
    error: getErrorResponse,
  });

  const { loading, send } = useCallApi({
    success: (response, request) => {
      if (!isEmpty(reloadPage)) {
        reloadPage();
      }
      onClose();
      notification.success(messages[configForm?.successMessage]);
      if (isFunction(onSuccess)) {
        onSuccess(response, request);
      }
    },
    callApi: onSaveToServer,
    error: getErrorResponse,
  });

  const { loading: loadingBeforeSave, send: sendBeforeSave } = useCallApi({
    success: (res) => {
      const data = handleRedundantData({
        ...refForm?.current?.getFieldsValue(true),
      });
      const parseResponse = JSON.parse(res.result);
      setErrorCheckConnection(
        parseResponse?.jobInfo?.failureReason?.externalMessage ||
          parseResponse?.message ||
          'Nhập đúng thông tin kết nối !',
      );
      if (
        parseResponse?.jobInfo?.succeeded === false ||
        parseResponse?.status === 'failed'
      ) {
        setIsError(false);
      } else {
        setIsError(true);
      }
      if (
        parseResponse?.jobInfo?.succeeded === true &&
        parseResponse?.status !== 'failed'
      ) {
        return onSave(data, null, res);
      } else {
        notification.error('Có lỗi vui lòng kiểm tra lại !');
      }
    },
    callApi: beforeSave,
    error: (err) => {
      setIsError(false);
      const messageError = getMessageResponse(err);
      setErrorCheckConnection(messageError || 'Nhập đúng thông tin kết nối !');
    },
  });

  const onSave = (data, saveDraft, resBeforeCheck) => {
    let dataSave = {
      ...(initialValues || {}),
      ...data,
    };
    if (isFunction(preSaveData)) {
      dataSave = preSaveData(dataSave, resBeforeCheck);
    }
    if (isEmpty(dataSave)) {
      return;
    }
    if (isEmpty(saveDraft)) {
      return send(dataSave);
    }
    return saveDraft(dataSave);
  };

  const onSaveWithBeforeCheck = (data, saveDraft) => {
    let dataSave = {
      ...(initialValues || {}),
      ...data,
    };
    if (isFunction(preSaveData)) {
      dataSave = preSaveData(dataSave);
    }
    if (isEmpty(dataSave)) {
      return;
    }

    if (isEmpty(saveDraft)) {
      if (!isEmpty(beforeSave)) {
        return sendBeforeSave(dataSave);
      } else {
        return send(dataSave);
      }
    }
    return saveDraft(dataSave);
  };

  const onSaveDraft = () => {
    const data = { ...refForm?.current?.getFieldsValue(true), status: 'draft' };
    return onSave(data, sendDraft);
  };

  const handleDownload = () => {
    fetch(rowData?.link_result_snapshot, {
      method: 'GET',
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
          'download',
          `${rowData?.type_report?.type_report_name}.jpg`,
        );

        document.body.appendChild(link);

        link.click();

        link.parentNode.removeChild(link);

        notification.success('Xuất mẫu báo cáo thành công!');
      });
  };

  // Print content
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${rowData?.type_report?.type_report_name}`,
  });
  isError === false &&
    console.log(
      'Đã xảy ra lỗi khi kiểm tra kết nối trong FormRowDataTable:',
      errorCheckConnection,
    );
  return (
    <AntModal
      title={
        <h3 style={{ margin: 0 }}>
          <IntlMessages id={title || configForm?.title} />
        </h3>
      }
      bodyStyle={{ maxHeight: '75vh', overflow: 'auto' }}
      onCancel={() => {
        setIsError(true);
        onClose();
      }}
      afterClose={() => {
        refFormId.current = `form-table-${generateUniqueID()}`;
      }}
      centered
      open={visible}
      footer={
        <>
          <Button
            htmlType='button'
            onClick={() => {
              setIsError(true);
              onClose();
            }}>
            <IntlMessages
              id={
                readOnly
                  ? 'dialog.button.close'
                  : configForm?.configCancelText
                  ? configForm?.configCancelText
                  : 'common.cancel'
              }
            />
          </Button>
          {isSaveDraft && !readOnly && (
            <Button
              loading={loadingDraft}
              form={refFormId.current}
              onClick={onSaveDraft}>
              <IntlMessages id={'form.saveDraft'} />
            </Button>
          )}
          {isExport && (
            <>
              <AntButton
                key={'export-img'}
                type='default'
                onClick={() => handleDownload()}>
                Xuất
              </AntButton>
              <AntButton
                key={'export-file'}
                type='default'
                icon={<PrinterOutlined />}
                onClick={() => handlePrint()}>
                In
              </AntButton>
              <div style={{ display: 'none' }}>
                <PrintImage
                  img_src={rowData?.link_result_snapshot}
                  ref={componentRef}
                />
              </div>
            </>
          )}
          {!noAction && (configForm.buttonText || buttonText) && !readOnly && (
            <Button
              loading={loading || loadingBeforeSave}
              form={refFormId.current}
              type='primary'
              onClick={() => {
                if (refForm?.current) {
                  if (isSaveDraft) {
                    refForm.current
                      .validateFields()
                      .then((data) =>
                        onSave(
                          handleRedundantData({ ...data, status: 'verified' }),
                        ),
                      );
                  } else {
                    refForm.current.submit();
                  }
                }
              }}>
              {isSaveDraft && initialValues?.status === 'draft' ? (
                <IntlMessages id={'form.publishDraft'} />
              ) : (
                <IntlMessages id={buttonText || configForm.buttonText} />
              )}
            </Button>
          )}
        </>
      }
      size={size}>
      <FormContent
        onValuesChange={() => {
          setIsError(true);
        }}
        key={refFormId.current}
        id={refFormId.current}
        ref={refForm}
        initialValues={initialValues}
        layout={layout}
        onFinish={onSaveWithBeforeCheck}
        disabled={readOnly}
        {...restProps}>
        {children}
        {/* {isError === false && (
          <div>
            <h5 style={{ color: 'red' }}>Vui lòng kiểm tra lại !</h5>
            <p style={{ color: 'red' }}>{errorCheckConnection}</p>
          </div>
        )} */}
      </FormContent>
    </AntModal>
  );
};

FormRowDataTable.propTypes = {
  title: PropTypes.string,
  initialValues: PropTypes.object,
  fieldMapper: PropTypes.object,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  beforeSave: PropTypes.func,
  children: PropTypes.node.isRequired,
  formType: PropTypes.string,
  preSaveData: PropTypes.func,
  resource: PropTypes.string,
  size: PropTypes.string,
  layout: PropTypes.string,
  method: PropTypes.string,
  onSuccess: PropTypes.func,
};

FormRowDataTable.defaultProps = {
  initialValues: {},
  fieldMapper: {},
  preSaveData: null,
  method: 'post',
};

export default FormRowDataTable;
