import PropTypes from 'prop-types';
import React from 'react';
import { Card, Divider } from 'antd';
import StepsForm from 'src/@crema/component/StepsForm';
import useCallApi from 'src/@crema/hook/useCallApi';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';

import styles from './style.module.scss';
import {
  getErrorsResponse,
  getMessageResponse,
} from 'src/shared/utils/Service';
import notification from 'src/shared/utils/notification';
import { useIntl } from 'react-intl';
import { isEmpty } from 'src/shared/utils/Typeof';

const FormStepPage = (props) => {
  const {
    initialValues,
    configRequest,
    items,
    note,
    onSuccess,
    onCancel,
    preSaveData,
    ...attrs
  } = props;
  const { messages } = useIntl();
  const onSaveSuccess = (rs) => {
    onSuccess(rs);
  };

  const callApi = (data) => {
    let dataSend = data;
    if (preSaveData) {
      dataSend = preSaveData(dataSend);
    }
    return instanceCoreApi({
      ...configRequest,
      data: dataSend,
    });
  };

  const { loading, send } = useCallApi({
    success: onSaveSuccess,
    callApi: callApi,
    error: (err) => {
      const messageError = getMessageResponse(err);
      const errors = getErrorsResponse(err?.raw) || {};
      const errorFields = Object.values(errors);
      if (isEmpty(errorFields)) {
        notification.error(messages[messageError] || messageError);
      } else {
        errorFields.forEach((textError) => notification.error(textError));
      }
    },
  });

  const onSave = (data) => {
    return send(data);
  };

  return (
    <Card bordered={false} className={styles.stepsFormPage}>
      <StepsForm
        isLoading={loading}
        items={items}
        onSave={onSave}
        onCancel={onCancel}
        initialValues={initialValues}
        {...attrs}
      />
      {note && (
        <>
          <Divider className={styles.divider} />
          <div className={styles.note}>{note}</div>
        </>
      )}
    </Card>
  );
};

FormStepPage.propTypes = {
  initialValues: PropTypes.object,
  configRequest: PropTypes.object,
  items: PropTypes.array,
  note: PropTypes.node,
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func,
  preSaveData: PropTypes.func,
};

FormStepPage.defaultProps = {
  initialValues: {},
};

export default FormStepPage;
