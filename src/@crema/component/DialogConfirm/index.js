import { Button } from 'antd';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { useIntl } from 'react-intl';
import notification from 'src/shared/utils/notification';
import AntModal from 'src/@crema/component/AntModal';
import { useDataTableContext } from 'src/@crema/core/DataTable/DataTableContext';
import useCallApi from 'src/@crema/hook/useCallApi';
import {
  getErrorsResponse,
  getMessageResponse,
} from 'src/shared/utils/Service';
import { isEmpty, isFunction } from 'src/shared/utils/Typeof';
import IntlMessages from '../../../@crema/utility/IntlMessages';
// import { convertObjectMapper } from '../../../shared/utils/Modal';
import { generateUniqueID } from '../../utility/Utils';
import FormContent from 'src/@crema/component/FormContent';

const DialogConfirm = (props) => {
  const {
    anotherButtons,
    layout = 'vertical',
    size,
    visible,
    initialValues,
    // fieldMapper,
    messageValue,
    onClose,
    children,
    onSaveToServer,
    preSaveData,
    textTitle,
    textSuccess,
    onSave: onSaveProp,
    textButtonConfirm,
    textButtonCancel,
    onSuccess,
    formProps,
    isCloseModalAfterSuccess = true,
    disableBtnOk = false,
    ...rest
  } = props;
  const refForm = useRef();
  const refFormId = useRef(`form-table-${generateUniqueID()}`);
  const { messages } = useIntl();
  const { reloadPage, removeSelectedRowKeys } = useDataTableContext() || {};

  const { loading, send } = useCallApi({
    success: (response, request) => {
      if (reloadPage) {
        reloadPage();
      }
      if (removeSelectedRowKeys) {
        removeSelectedRowKeys();
      }
      if (isCloseModalAfterSuccess) {
        onClose();
      }
      if (isFunction(onSuccess)) {
        onSuccess(response, request);
      }
      const textSuccessShow = messages[textSuccess] || textSuccess;
      if (textSuccessShow) {
        notification.success(textSuccessShow);
      }
    },
    callApi: onSaveToServer,
    error: (err) => {
      const messageError = getMessageResponse(err);
      const errors = getErrorsResponse(err?.raw, messages);
      console.log(errors);
      console.log(isEmpty(errors));
      if (isEmpty(errors) || errors?.message) {
        notification.error(
          messages[messageError] || errors?.message || messageError,
        );
      } else {
        for (const key in errors) {
          notification.error(errors[key]);
        }
      }
    },
  });

  const onSave = (data) => {
    let dataSave = data;
    if (isFunction(preSaveData)) {
      dataSave = preSaveData(dataSave);
    }

    if (onSaveProp) {
      return onSaveProp(dataSave);
    } else {
      return send(dataSave);
    }
  };

  return (
    <AntModal
      {...rest}
      title={
        <h3 style={{ margin: 0 }}>
          <IntlMessages {...rest} id={textTitle} values={messageValue} />
        </h3>
      }
      bodyStyle={{ maxHeight: '75vh', overflow: 'auto' }}
      onCancel={onClose}
      centered
      open={visible}
      afterClose={() => {
        refFormId.current = `form-table-${generateUniqueID()}`;
      }}
      footer={
        <>
          {textButtonCancel && (
            <Button htmlType='button' onClick={onClose} disabled={false}>
              <IntlMessages id={textButtonCancel} values={messageValue} />
            </Button>
          )}
          {textButtonConfirm && (onSaveToServer || onSaveProp) && (
            <Button
              disabled={disableBtnOk}
              loading={loading}
              form={refFormId.current}
              htmlType='submit'
              type='primary'>
              <IntlMessages id={textButtonConfirm} values={messageValue} />
            </Button>
          )}
          {anotherButtons}
        </>
      }
      size={size}>
      <FormContent
        key={refFormId.current}
        id={refFormId.current}
        ref={refForm}
        initialValues={initialValues}
        layout={layout}
        onFinish={onSave}
        {...formProps}>
        {children}
      </FormContent>
    </AntModal>
  );
};

DialogConfirm.propTypes = {
  anotherButtons: PropTypes.any,
  initialValues: PropTypes.object,
  layout: PropTypes.string,
  size: PropTypes.string,
  fieldMapper: PropTypes.object,
  messageValue: PropTypes.object,
  visible: PropTypes.bool.isRequired,
  textTitle: PropTypes.string.isRequired,
  textSuccess: PropTypes.string,
  textButtonConfirm: PropTypes.string.isRequired,
  textButtonCancel: PropTypes.string.isRequired,
  preSaveData: PropTypes.func,
  children: PropTypes.node.isRequired,

  onClose: PropTypes.func.isRequired,
  onSaveToServer: PropTypes.func,
  onSuccess: PropTypes.func,
};

DialogConfirm.defaultProps = {
  initialValues: {},
  fieldMapper: {},
  messageValue: {},
  textButtonCancel: 'dialog.button.cancel',
  textButtonConfirm: 'dialog.button.confirm',
};

export default DialogConfirm;
