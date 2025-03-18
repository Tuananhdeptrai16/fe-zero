import React from 'react';
import AppTabs from 'src/@crema/core/AppTabs/AppTabs';
import { FormVerdictInfo } from 'src/pageComponents/judicialRecords/detail/thirdStep/criminal/FormVerdictInfo';
import { Form } from 'antd';
import { VERDICT_DOCUMENT_REQUEST_LIST_NAME } from 'src/pages/judicialRecords/createRecordInformation/utils';
import style from './FormTable.module.scss';
import clsx from 'clsx';

export const FormCriminal = ({
  verdicts,
  relateDocsByVerdict,
  organization_id,
}) => {
  const filterRelateDocs = (relateDocs) => {
    return (relateDocs || []).filter(
      (item) => item?.organization_id === Number(organization_id),
    );
  };

  const tabItems = (verdicts || []).map((verdict, index) => {
    return {
      label: `Bản án ${index + 1}`,
      key: `verdict-${index + 1}`,
      children: (
        <FormVerdictInfo
          titleTable={'Danh sách quyết định đi kèm bản án'}
          verdict={verdict}
          index={index}
          relateDocs={
            filterRelateDocs(relateDocsByVerdict?.[verdict?.case_number]) || []
          }
        />
      ),
    };
  });

  if (!verdicts || verdicts.length === 0) {
    return <div className='text-center'>Không có bản án nào!</div>;
  }

  return (
    <Form.List name={VERDICT_DOCUMENT_REQUEST_LIST_NAME}>
      {() => (
        <AppTabs
          items={tabItems}
          type='card'
          tabBarStyle={{
            backgroundColor: 'rgba(0, 0, 0, 0.06)',
            padding: '8px 8px 0 8px',
          }}
          className={clsx(style.wrapFormCriminal_tab)}
        />
      )}
    </Form.List>
  );
};
