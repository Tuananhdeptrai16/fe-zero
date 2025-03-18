import React, { useState } from 'react';
import AppTableContainer from 'src/@crema/core/AppTableContainer';
import RenderNameUser from 'src/@crema/component/TableRender/RenderNameUser';
import {
  DisconnectOutlined,
  ExportOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import DialogConfirm from 'src/@crema/component/DialogConfirm';
import { BYPASS_SAVE_SERVER } from 'src/shared/constants/Default';
import { Button, Form } from 'antd';
import FormAddProhibitPositionsDocument from 'src/pageComponents/judicialRecords/detail/thirdStep/FormAddProhibitPositionsDocument';
import AppIconButton from 'src/@crema/core/AppIconButton';
import { parse } from 'src/shared/utils/String';
import FormListHidden from 'src/@crema/component/FormListHidden';
import { FIELD_MAP } from 'src/shared/constants/FieldKeyMap';
import { RenderDate } from 'src/@crema/component/TableRender';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import config from 'src/config';

export const FormBanHoldingPosition = ({ disabled, name }) => {
  const form = Form.useFormInstance();
  const prohibitPositionsDocuments =
    Form.useWatch(name, form) || form.getFieldValue(name) || [];

  const [openPopupConfirm, setOpenPopupConfirm] = useState(false);
  const columns = [
    {
      title: 'STT',
      key: 'index',
      dataIndex: 'index',
      align: 'center',
      render: (_, _row, index) => index + 1,
    },
    {
      title: 'Loại quyết định',
      key: 'document_template_name',
      dataIndex: 'raw_document',
      render: (record, row) =>
        record?.document_template?.name || row?.decision_name,
    },
    {
      title: 'Số quyết định',
      key: FIELD_MAP.SO_QUYET_DINH,
      dataIndex: FIELD_MAP.SO_QUYET_DINH,
      render: (record, row) => {
        if (record) return record;
        return row?.decision_number;
      },
    },
    {
      title: <IntlMessages id={'judicial.decisionDay'} />,
      key: FIELD_MAP.NGAY_QUYET_DINH,
      dataIndex: FIELD_MAP.NGAY_QUYET_DINH,
      render: (record, row) => {
        if (!record) return row?.decision_date;
        return record;
      },
    },
    {
      title: 'Người đăng tải hồ sơ',
      key: 'created_by_user',
      dataIndex: 'raw_document',
      render: (record, row) => {
        if (row?.created_by_user) {
          return <RenderNameUser user={row?.created_by_user} />;
        }
        return (
          <RenderNameUser user={record?.document_template?.created_user} />
        );
      },
    },
    {
      title: 'Thời gian đăng tải hồ sơ',
      key: 'created_at',
      dataIndex: 'created_at',
      align: 'center',
      render: (record) => {
        return <RenderDate value={record} />;
      },
    },
    {
      title: 'Thao tác',
      render: (_, row, index) => (
        <div className='ant-d-flex ant-align-center ant-justify-center'>
          {!disabled && (
            <AppIconButton
              disabled={false}
              title={'Gỡ'}
              size={'small'}
              icon={<DisconnectOutlined style={{ fontSize: '16px' }} />}
              onClick={() => {
                form.setFieldValue(
                  name,
                  prohibitPositionsDocuments.filter((item, i) => {
                    return i !== index;
                  }),
                );
              }}
            />
          )}
          <AppIconButton
            disabled={false}
            title={'Xem chi tiết'}
            size={'small'}
            icon={<ExportOutlined style={{ fontSize: '16px' }} />}
            onClick={() => {
              window.open(
                config.routes.detailRawDocument(
                  row?.raw_document_object?.raw_document_id ||
                    row?.raw_document_id,
                ),
                '_blank',
              );
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <AppTableContainer
        columns={columns}
        data={prohibitPositionsDocuments}
        rowKey={'raw_document_id'}
      />
      <FormListHidden name={name} />
      <DialogConfirm
        visible={openPopupConfirm}
        onClose={() => setOpenPopupConfirm(false)}
        textTitle={'judicial.addRelatedDocument'}
        onSaveToServer={(data) => {
          const newDocument = data?.document;
          if (newDocument) {
            form.setFieldValue(name, [
              ...prohibitPositionsDocuments,

              {
                index: prohibitPositionsDocuments.length + 1,
                ...(parse(newDocument.content) || {}),
                ...newDocument,
              },
            ]);
          }
          return BYPASS_SAVE_SERVER();
        }}>
        <FormAddProhibitPositionsDocument
          ignoreIds={prohibitPositionsDocuments.map((item) => item.id)}
        />
      </DialogConfirm>
      {!disabled && (
        <Button
          onClick={() => {
            setOpenPopupConfirm(true);
          }}
          className='mt-4'
          disabled={false}
          type='link'
          icon={<PlusOutlined />}>
          Bổ sung văn bản
        </Button>
      )}
    </div>
  );
};
