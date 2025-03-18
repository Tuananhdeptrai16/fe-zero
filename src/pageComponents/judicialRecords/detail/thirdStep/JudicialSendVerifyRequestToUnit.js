/* eslint-disable react-hooks/exhaustive-deps */
import { Collapse, Divider, Form, Typography } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import AppTabs from 'src/@crema/core/AppTabs/AppTabs';
import CodeBox from 'src/@crema/core/DataDisplay/CodeBox';
import { useIntl } from 'react-intl';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import API from 'src/@crema/services/apis';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import { HeaderCollapse } from './HeaderCollapse';
import AntTextArea from 'src/@crema/component/AntTextArea';
import { FormCriminal } from 'src/pageComponents/judicialRecords/detail/thirdStep/criminal/FormCriminal';
import { BanHoldingPositionTable } from 'src/pageComponents/judicialRecords/detail/thirdStep/criminal/BanHoldingPositionTable';
import {
  FormCitizenInfo,
  INPUT_FORM,
} from 'src/pageComponents/judicialRecords/detail/thirdStep/criminal/FormCitizenInfo';
import {
  CITIZEN_PROFILE_REQUEST_NAME,
  KEY_GROUP_TYPE,
  PROHIBIT_POSITION_DOCUMENT_REQUEST_LIST,
  RELATED_DOCUMENT_REQUEST_LIST_NAME,
  VERDICT_DOCUMENT_REQUEST_LIST_NAME,
} from 'src/pages/judicialRecords/createRecordInformation/utils';
import AppCard from 'src/@crema/core/AppCard';
import { HeaderCollapsePending } from 'src/pageComponents/judicialRecords/detail/thirdStep/criminal/HeaderCollapsePending';
import useCallApi from 'src/@crema/hook/useCallApi';
import { searchRelateDocumentByCitizen } from 'src/@crema/services/judicialRecord.service';
import { isArray, isEmpty, isUndefined } from 'src/shared/utils/Typeof';
import { groupBy } from 'lodash';
import { parse, removeDuplicateInArr } from 'src/shared/utils/String';

const { Panel } = Collapse;

export const JudicialSendVerifyRequestToUnit = ({
  setVerifyRequests,
  verifyRequests,
  isPendingDetailPage,
}) => {
  const form = Form.useFormInstance();
  const { messages } = useIntl();
  const listVerdict =
    Form.useWatch(VERDICT_DOCUMENT_REQUEST_LIST_NAME) ||
    form.getFieldValue(VERDICT_DOCUMENT_REQUEST_LIST_NAME);
  const listRelateDocument =
    Form.useWatch(RELATED_DOCUMENT_REQUEST_LIST_NAME) ||
    form.getFieldValue(RELATED_DOCUMENT_REQUEST_LIST_NAME);
  const listProhibitDocument =
    Form.useWatch(PROHIBIT_POSITION_DOCUMENT_REQUEST_LIST) ||
    form.getFieldValue(PROHIBIT_POSITION_DOCUMENT_REQUEST_LIST);

  const relateDocsByVerdict = useMemo(() => {
    if (isArray(listRelateDocument)) {
      return groupBy(listRelateDocument, 'case_number');
    }
    return {};
  }, [listRelateDocument]);

  const searchValue = Form.useWatch(CITIZEN_PROFILE_REQUEST_NAME);
  const { data: organizationListRes, isLoading: isLoadingPanel } = useFetch({
    url: API.SELECT_ORGANIZATION,
    method: METHOD_FETCH.POST,
    body: {
      filters: [],
      pageable: {
        page: 1,
      },
    },
  });

  useEffect(() => {
    [...(listVerdict || []), ...(listProhibitDocument || [])].forEach(
      ({ raw_document_object }) => {
        INPUT_FORM.forEach(({ name }) => {
          if (
            isUndefined(searchValue?.[name]) &&
            !isEmpty(raw_document_object?.[name])
          ) {
            form.setFieldValue(
              [CITIZEN_PROFILE_REQUEST_NAME, name],
              raw_document_object[name],
            );
          }
        });
      },
    );
  }, [listVerdict, listProhibitDocument, searchValue, form]);

  const organizationList = useMemo(
    () => organizationListRes?.result?.items || [],
    [organizationListRes?.result?.items],
  );
  const [activeKey, setActiveKey] = useState('');
  const { send } = useCallApi({
    callApi: searchRelateDocumentByCitizen,
    success: (res, params) => {
      if (params?.case_number) {
        form.setFieldValue(
          RELATED_DOCUMENT_REQUEST_LIST_NAME,
          removeDuplicateInArr([
            ...(listRelateDocument || []),
            ...(res?.result?.items || []).map((item) => {
              const raw_document_object = item?.raw_document_object || {};
              return {
                ...parse(item?.content),
                ...item,
                group_type: KEY_GROUP_TYPE.RELATE_DOCUMENT,
                raw_document_object: {
                  ...parse(raw_document_object?.object),
                  ...raw_document_object,
                },
              };
            }),
          ]),
        );
      }
    },
  });

  useEffect(() => {
    if (isArray(listVerdict)) {
      listVerdict?.forEach((verdict) => {
        const caseNumber = verdict?.case_number;
        if (
          !isEmpty(caseNumber) &&
          isUndefined(relateDocsByVerdict[caseNumber])
        ) {
          send({
            verdictSuggestionRequest: {
              full_name: searchValue?.full_name,
              gender: searchValue?.gender,
            },
            case_number: verdict?.case_number,
          });
        }
      });
    }
  }, [listVerdict]);

  const tabItems = [
    {
      label: 'Thông tin về án tích',
      key: 'item-2',
      children: (
        <FormCriminal
          verdicts={listVerdict}
          relateDocsByVerdict={relateDocsByVerdict}
          organization_id={activeKey}
        />
      ),
    },
    {
      label: 'Thông tin cấm đảm nhiệm chức vụ',
      key: 'item-3',
      children: <BanHoldingPositionTable data={listProhibitDocument} />,
    },
  ];

  return (
    <div>
      <Typography.Title level={3} className='mb-4'>
        {messages['confirm.informationCitizenRelation']}
      </Typography.Title>
      <CodeBox className='px-4 py-6'>
        <FormCitizenInfo rootName={CITIZEN_PROFILE_REQUEST_NAME} />
      </CodeBox>
      {isLoadingPanel && <AppCard loading={isLoadingPanel} />}
      <Collapse
        expandIcon={() => null}
        activeKey={activeKey}
        accordion
        onChange={(newKey) => setActiveKey(newKey)}>
        {organizationList?.map((item) => (
          <Panel
            key={item?.id}
            header={
              isPendingDetailPage ? (
                <HeaderCollapsePending
                  id={item?.id}
                  title={item?.display_name}
                  isOpenPanel={activeKey === String(item?.id)}
                  verifyRequests={verifyRequests}
                />
              ) : (
                <HeaderCollapse
                  verifyRequests={verifyRequests}
                  setVerifyRequests={setVerifyRequests}
                  id={item?.id}
                  title={item?.display_name}
                  isOpenPanel={activeKey === String(item?.id)}
                />
              )
            }>
            <AppTabs
              items={
                (listProhibitDocument || []).some(
                  (prohibit) => prohibit?.organization_id === item?.id,
                )
                  ? tabItems
                  : tabItems?.filter((tab) => tab?.key !== 'item-3')
              }
            />
            <Divider />
            <div className='d-flex flex-col'>
              <label className='font-bold mb-2' htmlFor='organization_note'>
                {messages['table.note']}
              </label>
              <AntTextArea
                rows={3}
                id='organization_note'
                disabled={
                  isPendingDetailPage ||
                  (verifyRequests || []).every(
                    (verify) => verify?.organization_id !== item.id,
                  )
                }
                value={
                  verifyRequests?.find(
                    (verify) => verify?.organization_id === item?.id,
                  )?.note
                }
                onChange={(e) => {
                  setVerifyRequests((prev) =>
                    [...prev].map((req) => {
                      if (req?.organization_id === item?.id) {
                        return {
                          ...req,
                          note: e.target.value,
                        };
                      }
                      return req;
                    }),
                  );
                }}
              />
            </div>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};
