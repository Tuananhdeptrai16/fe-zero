import Icon, {
  DisconnectOutlined,
  ExportOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button, Col, Divider, Form, Row } from 'antd';
import React, { useState } from 'react';
import FormInput from 'src/@crema/core/Form/FormInput';
import FormTextArea from 'src/@crema/core/Form/FormTextArea';
import { AcRedirectIcon } from 'src/assets/icon/action';
import styles from './FormVerdict.module.scss';
import AppTableContainer from 'src/@crema/core/AppTableContainer';
import Link from 'src/@crema/component/Link';
import { KEY_DOCUMENT_NUMBER } from 'src/shared/constants/SettingSystem';
import { BYPASS_SAVE_SERVER } from 'src/shared/constants/Default';
import DialogConfirm from 'src/@crema/component/DialogConfirm';
import FormAddRelatedDocument from 'src/pageComponents/judicialRecords/detail/thirdStep/FormAddRelatedDocument';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import { isEmpty } from 'src/shared/utils/Typeof';
import { convertLabel2Name, parse } from 'src/shared/utils/String';
import RenderNameUser from 'src/@crema/component/TableRender/RenderNameUser';
import { RenderDate } from 'src/@crema/component/TableRender';
import FormDateText from 'src/@crema/component/FormDateText';
import { useIntl } from 'react-intl';
import AppIconButton from 'src/@crema/core/AppIconButton';
import { FIELD_MAP } from 'src/shared/constants/FieldKeyMap';
import { INPUT_FORM_VERDICT } from 'src/shared/constants/judicialRecord.constant';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import config from 'src/config';

const GUTTER_X = 10;

export const FormVerdict = ({ disabled, name, nameField }) => {
  const { messages } = useIntl();
  const form = Form.useFormInstance();
  const verdict = Form.useWatch(name, form) || form.getFieldValue(name) || {};
  const relatedDocuments = verdict?.relatedDocuments || [];
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
      key: 'document_type',
      dataIndex: 'document_type_name',
      render: (record, row) => record || row?.decision_name,
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
      dataIndex: 'created_by_user',
      render: (record) => <RenderNameUser user={record} />,
    },
    {
      title: 'Thời gian đăng tải hồ sơ',
      dataIndex: 'created_at',
      key: 'created_at',
      align: 'center',
      render: (record) => <RenderDate value={record} />,
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
                form.setFieldValue(name, {
                  ...verdict,
                  relatedDocuments: relatedDocuments.filter((item, i) => {
                    return i !== index;
                  }),
                });
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
                config.routes.detailRawDocument(row?.raw_document_id),
                '_blank',
              );
            }}
          />
        </div>
      ),
    },
  ].map((item) => {
    if (isEmpty(item.dataIndex)) {
      item.key = convertLabel2Name(item.label);
      item.dataIndex = convertLabel2Name(item.label);
    }
    return item;
  });

  return (
    <>
      <Row gutter={GUTTER_X}>
        {INPUT_FORM_VERDICT.map((item, index) => {
          const attrs = {
            label: messages[item.label] || item.label || '',
            required: item.required,
            layout: item.layout,
          };
          if (item.name) {
            attrs.name = [nameField, item.name];
          } else {
            attrs.name = [nameField, convertLabel2Name(attrs.label)];
          }
          return (
            <Col xl={item.colSpan} key={`${item.name}-${index}`}>
              {item.type === 'input' && <FormInput {...attrs} />}
              {item.type === 'select' && (
                <FormSelect {...attrs} options={item.options} />
              )}
              {item.type === 'date' && <FormDateText {...attrs} />}
              {item.type === 'textarea' && <FormTextArea {...attrs} />}
            </Col>
          );
        })}
      </Row>

      <ul className={styles.listDetailSeparate}>
        <li className={styles.detailSeparate}>
          Xem chi tiết văn bản:{'  '}
          <Link
            target='_blank'
            to={config.routes.detailRawDocument(
              verdict?.raw_document_id ||
                verdict?.raw_document_object?.raw_document_id,
            )}>
            {verdict?.[KEY_DOCUMENT_NUMBER]}
            <Icon component={AcRedirectIcon} className={'ml-2'} />
          </Link>
        </li>
        <li className={styles.detailSeparate}>
          Người đăng tải hồ sơ:{' '}
          <RenderNameUser user={verdict?.created_by_user} />
        </li>
        <li className={styles.detailSeparate}>
          Thời gian đăng tải văn bản:{' '}
          <RenderDate value={verdict?.raw_document_object?.created_at} />
        </li>
      </ul>
      <Divider />
      <AppTableContainer
        columns={columns}
        data={relatedDocuments}
        rowKey={'raw_document_id'}
      />
      <DialogConfirm
        visible={openPopupConfirm}
        onClose={() => setOpenPopupConfirm(false)}
        textTitle={'judicial.addRelatedDocument'}
        onSaveToServer={(data) => {
          const newRelateDocument = data?.relate_document;
          if (newRelateDocument) {
            form.setFieldValue(name, {
              ...verdict,
              relatedDocuments: [
                ...relatedDocuments,
                {
                  ...newRelateDocument,
                  ...parse(newRelateDocument?.content),
                },
              ],
            });
          }

          return BYPASS_SAVE_SERVER();
        }}>
        <FormAddRelatedDocument
          caseNumber={verdict?.case_number}
          ignoreIds={relatedDocuments.map((item) => item.id)}
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
    </>
  );
};
