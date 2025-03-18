import React, { useState } from 'react';
import ConfirmAdManagement from 'src/pages/AdManagementRedirect/AdManagementAddNew/ConfirmAdManagement/';
import PropTypes from 'prop-types';
import AntModal from '../AntModal/index';
import { MODAL_SIZE } from 'src/shared/constants/Modal';
import DialogConfirm from '../DialogConfirm/index';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import AntButton from '../AntButton/index';
import API from 'src/@crema/services/apis/index';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import './modal-approve-ads.styles.less';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import FormTextArea from 'src/@crema/core/Form/FormTextArea/index';
import AntSpin from '../AntSpin/index';
import { useIntl } from 'react-intl';
import { convertDataAdsEdit } from 'src/pages/AdManagementRedirect/AdManagementAddNew/ConfirmAdManagement/utils';

const ModalApproveAds = ({ data, visible, onClose }) => {
  const [isOpenDialogModal, setIsOpenDialogModal] = useState(false);
  const [actionState, setActionState] = useState(null);
  const { messages } = useIntl();
  const { id } = data || {};
  const { isLoading, data: adsData } = useFetch(
    {
      url: API.DETAIL_BANNER,
      method: METHOD_FETCH.POST,
      params: { id },
      useCache: false,
    },
    [id],
  );
  const adsInfoData = adsData?.data;

  const dialogContent = {
    approve: {
      title: 'confirm.approveAdsRedirect',
      success: 'adsRedirect.approveSuccess',
      warning: 'adsRedirect.approveConfirm',
    },
    reject: {
      title: 'confirm.rejectAdsRedirect',
      success: 'adsRedirect.rejectSuccess',
      warning: 'adsRedirect.rejectConfirm',
    },
  };
  const changeStatusAdsRedirectToServer = (data = {}) => {
    return instanceCoreApi.post(API.CHANGE_STATUS_ADS_REDIRECT, {
      id: id,
      status: actionState,
      ...data,
    });
  };

  const closeDialog = () => {
    setIsOpenDialogModal(false);
  };

  const rejectDialog = () => {
    setIsOpenDialogModal(true);
    setActionState('reject');
  };

  const approveDialog = () => {
    setIsOpenDialogModal(true);
    setActionState('approve');
  };

  const preSaveData = (data = {}) => {
    return data;
  };

  return (
    <AntModal
      className='modal-approve-ads'
      centered
      title={messages['modal.titleApproved']}
      size={MODAL_SIZE.XLARGE}
      onCancel={onClose}
      open={visible}
      footer={[
        <AntButton key='close' onClick={onClose}>
          <IntlMessages id='dialog.button.cancel' />
        </AntButton>,
        <AntButton key='reject' onClick={rejectDialog} type='danger'>
          <IntlMessages id='dialog.button.reject' />
        </AntButton>,
        <AntButton key='approve' onClick={approveDialog} type='primary'>
          <IntlMessages id='dialog.button.approve' />
        </AntButton>,
      ]}>
      <AntSpin spinning={isLoading} delay={500}>
        <ConfirmAdManagement allFormData={convertDataAdsEdit(adsInfoData)} />
        <DialogConfirm
          onSuccess={() => {
            onClose();
          }}
          key={data?.id}
          onClose={closeDialog}
          textTitle={dialogContent[actionState]?.title || ''}
          textSuccess={dialogContent[actionState]?.success}
          onSaveToServer={changeStatusAdsRedirectToServer}
          visible={isOpenDialogModal}
          preSaveData={preSaveData}>
          <IntlMessages id={dialogContent[actionState]?.warning} />
          <p className='warning-text-color'>{data?.name}</p>
          {actionState === 'reject' && (
            <FormTextArea label='reason.reject' name='reason' required />
          )}
        </DialogConfirm>
      </AntSpin>
    </AntModal>
  );
};

export default ModalApproveAds;

ModalApproveAds.propTypes = {
  data: PropTypes.object,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
};
