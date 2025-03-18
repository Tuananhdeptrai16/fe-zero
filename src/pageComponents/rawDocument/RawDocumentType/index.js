import React, { useState } from 'react';
import { Space, Typography } from 'antd';
import Icon from '@ant-design/icons';
import { AcEditIcon } from 'src/assets/icon/action';
import DialogConfirm from 'src/@crema/component/DialogConfirm';
import FormChangeDocumentType from 'src/pageComponents/rawDocument/RawDocumentType/FormChangeDocumentType';
import { instanceCoreApi } from 'src/@crema/services/setupAxios';
import API from 'src/@crema/services/apis';
import { RAW_DOCUMENT_STATUS_VERIFIED } from 'src/shared/constants/DataTableStatus';

const RawDocumentType = ({ data, reloadData, disabled }) => {
  const [openPopupConfirm, setOpenPopupConfirm] = useState(false);
  return (
    <Space size={[8, 0]}>
      <Typography.Title level={3} className='my-0'>
        {data?.document_template?.name}
      </Typography.Title>
      {data?.state !== RAW_DOCUMENT_STATUS_VERIFIED && !disabled && (
        <Icon
          className='pointer fz-16'
          component={AcEditIcon}
          onClick={() => setOpenPopupConfirm(true)}
        />
      )}
      <DialogConfirm
        visible={openPopupConfirm}
        onClose={() => setOpenPopupConfirm(false)}
        textTitle={'confirm.textTitleChangeDocumentType'}
        initialValues={{
          id: data?.id,
          document_template: data?.document_template,
        }}
        onSaveToServer={(dataUpdate) =>
          instanceCoreApi.put(API.UPDATE_TEMPLATE_RAW_DOCUMENT(data?.id), {
            document_template_id: dataUpdate?.document_template?.id,
          })
        }
        onSuccess={reloadData}>
        <FormChangeDocumentType />
      </DialogConfirm>
    </Space>
  );
};

RawDocumentType.propTypes = {};

RawDocumentType.defaultProps = {};

export default RawDocumentType;
