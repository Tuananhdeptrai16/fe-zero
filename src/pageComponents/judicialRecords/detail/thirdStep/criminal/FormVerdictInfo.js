import Icon from '@ant-design/icons';
import { Divider, Form } from 'antd';
import React, { useEffect } from 'react';
import { AcRedirectIcon } from 'src/assets/icon/action';
import styles from '../FormVerdict.module.scss';
import { Link } from 'react-router-dom';
import { FormInputVerdict } from 'src/pageComponents/judicialRecords/detail/thirdStep/criminal/FormInputVerdict';
import { ListRelateDocumentTable } from 'src/pageComponents/judicialRecords/detail/thirdStep/criminal/ListRelateDocumentTable';
import { RELATED_DOCUMENT_REQUEST_LIST_NAME } from 'src/pages/judicialRecords/createRecordInformation/utils';
import { KEY_DOCUMENT_NUMBER } from 'src/shared/constants/SettingSystem';
import RenderNameUser from 'src/@crema/component/TableRender/RenderNameUser';
import { RenderDate } from 'src/@crema/component/TableRender';
import { removeDuplicateInArr } from 'src/shared/utils/String';
import config from 'src/config';

export const FormVerdictInfo = ({ titleTable, verdict, index, relateDocs }) => {
  const form = Form.useFormInstance();

  useEffect(() => {
    if (relateDocs) {
      const relatedDocs =
        form.getFieldValue(RELATED_DOCUMENT_REQUEST_LIST_NAME) || [];
      const saveRelatedDocs = [
        ...relatedDocs,
        ...(relateDocs || []).map((item) => ({
          id: item?.id,
          raw_document_object_id: item?.raw_document_object?.id,
        })),
      ];
      form.setFieldValue(
        RELATED_DOCUMENT_REQUEST_LIST_NAME,
        removeDuplicateInArr(saveRelatedDocs),
      );
    }
  }, [form, relateDocs]);
  return (
    <>
      <FormInputVerdict key={index} rootName={[index]} />

      <ul className={styles.listDetailSeparate}>
        <li className={styles.detailSeparate}>
          Xem chi tiết văn bản:{' '}
          <Link
            target='_blank'
            to={config.routes.detailRawDocument(
              verdict?.raw_document_id ||
                verdict?.raw_document_object?.raw_document_id,
            )}>
            {verdict?.[KEY_DOCUMENT_NUMBER]}
            <Icon
              style={{ stroke: '#007bed', marginLeft: 4 }}
              component={AcRedirectIcon}
            />
          </Link>
        </li>
        <li className={styles.detailSeparate}>
          Người đăng tải hồ sơ:{' '}
          <RenderNameUser user={verdict?.created_by_user} />
        </li>
        <li className={styles.detailSeparate}>
          Thời gian đăng tải văn bản: <RenderDate value={verdict?.created_at} />
        </li>
      </ul>
      <Divider />
      <ListRelateDocumentTable
        titleTable={titleTable}
        // isLoading={isLoading}
        listRelateDoc={relateDocs || []}
      />
    </>
  );
};
