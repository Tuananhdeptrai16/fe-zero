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
import { isFunction, isEmpty } from 'src/shared/utils/Typeof';
import IntlMessages from '../../utility/IntlMessages';
import { useIntl } from 'react-intl';
import useCallApi from 'src/@crema/hook/useCallApi';
import { Button } from 'antd';
import notification from 'src/shared/utils/notification';
import { convertObjectMapper } from 'src/shared/utils/Modal';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import FormContent from 'src/@crema/component/FormContent';
import { handleRedundantData } from 'src/shared/utils/Object';
import { useLocation, useNavigate } from 'react-router-dom';
import config from 'src/config';

const FormContinueStep = ({
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
  isSaveDraft,
  layout = 'vertical',
  customErrorMessage,
  onSuccess,
  apiPostSaveDraft,
  category,
  ...restProps
}) => {
  const refForm = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const { dataSave } = location.state || {};
  const refFormId = useRef(`form-table-${generateUniqueID()}`);
  const [errorCheckConnection, setErrorCheckConnection] = useState('');
  const [isError, setIsError] = useState(true);
  const [cancelClicked, setCancelClicked] = useState(false);
  const { messages } = useIntl();
  const { reloadPage } = useDataTableContext();

  const onSaveToServer = (data) => {
    if (method === METHOD_FETCH.PUT) {
      return instanceCoreApi.put(resource, data);
    } else {
      return instanceCoreApi.post(resource, data);
    }
  };

  const handleNavigate = (path, state = {}) => {
    navigate(path, { state });
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
      reloadPage();
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
      reloadPage();
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
      const errorMessage =
        parseResponse?.jobInfo?.failureReason?.externalMessage ||
        parseResponse?.message ||
        'Nhập đúng thông tin kết nối !';
      setErrorCheckConnection(errorMessage);
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
      const messageError =
        getMessageResponse(err) || 'Nhập đúng thông tin kết nối !';
      setErrorCheckConnection(messageError);
    },
  });

  const onSave = (data, saveDraft, resBeforeCheck) => {
    let dataSave = {
      ...initialValues,
      ...data,
    };
    if (isFunction(preSaveData)) {
      dataSave = preSaveData(dataSave, resBeforeCheck);
    }
    if (isEmpty(dataSave)) return;

    return isEmpty(saveDraft) ? send(dataSave) : saveDraft(dataSave);
  };

  const onSaveWithBeforeCheck = (data) => {
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
    console.log('sendBeforeSave', sendBeforeSave);
    const newDataSave = {
      ...dataSave,
      category,
    };
    handleNavigate(`${config.routes.configClearView}`, {
      dataSave: newDataSave,
      currentPath: location.pathname,
    });
  };

  const onSaveDraft = () => {
    const data = { ...refForm?.current?.getFieldsValue(true), status: 'draft' };
    return onSave(data, sendDraft);
  };

  const handleCancel = () => {
    setIsError(true);
    setCancelClicked(true);
    handleNavigate(location.pathname, { dataSave: {} });
    onClose();
  };

  const initialDataSave = {
    ...dataSave,
    source: {
      airbyte_source_id: dataSave?.source_id,
      display_name: dataSave?.source_display_name,
    },
    destination: {
      id: dataSave?.destination_id,
      display_name: dataSave?.destination_display_name,
    },
    replication_frequency: dataSave?.schedule_data?.basic_schedule?.units,
  };

  return (
    <AntModal
      title={
        <h3 style={{ margin: 0 }}>
          <IntlMessages id={title || configForm?.title} />
        </h3>
      }
      bodyStyle={{ maxHeight: '75vh', overflow: 'auto' }}
      onCancel={handleCancel}
      afterClose={() => {
        refFormId.current = `form-table-${generateUniqueID()}`;
        setCancelClicked(false);
      }}
      centered
      open={cancelClicked ? visible : !isEmpty(dataSave) || visible}
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
                handleNavigate(location.pathname, { dataSave: {} });
              }}>
              <IntlMessages id={'form.continue'} />
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
        initialValues={!isEmpty(dataSave) ? initialDataSave : {}}
        layout={layout}
        onFinish={onSaveWithBeforeCheck}
        disabled={readOnly}
        {...restProps}>
        {children}
        {isError === false && (
          <div>
            <h5 style={{ color: 'red' }}>Vui lòng kiểm tra lại !</h5>
            <p style={{ color: 'red' }}>{errorCheckConnection}</p>
          </div>
        )}
      </FormContent>
    </AntModal>
  );
};

FormContinueStep.propTypes = {
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

FormContinueStep.defaultProps = {
  initialValues: {},
  fieldMapper: {},
  preSaveData: null,
  method: 'post',
};

export default FormContinueStep;
