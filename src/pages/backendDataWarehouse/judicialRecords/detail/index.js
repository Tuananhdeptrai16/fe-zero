import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import API from 'src/@crema/services/apis';
import {
  CITIZEN_PROFILE_ORGANIZATION_NAME,
  CITIZEN_PROFILE_REQUEST_NAME,
  PROHIBIT_POSITION_DOCUMENT_REQUEST_LIST,
  VERDICT_DOCUMENT_REQUEST_LIST_NAME,
} from 'src/pages/judicialRecords/createRecordInformation/utils';
import AppPageMetadata from 'src/@crema/core/AppPageMetadata';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import SubHeaderApp from 'src/@crema/component/SubHeaderApp';
import SubHeaderAppTemplate from 'src/@crema/component/SubHeaderApp/SubHeaderAppTemplate';
import AppCard from 'src/@crema/core/AppCard';
import FormContent from 'src/@crema/component/FormContent';
import AppTabs from 'src/@crema/core/AppTabs/AppTabs';
import { FormCitizenInfo } from 'src/pageComponents/judicialRecords/detail/thirdStep/criminal/FormCitizenInfo';
import { FormCriminal } from 'src/pageComponents/judicialRecords/detail/thirdStep/criminal/FormCriminal';
import { BanHoldingPositionTable } from 'src/pageComponents/judicialRecords/detail/thirdStep/criminal/BanHoldingPositionTable';
import { useIntl } from 'react-intl';
import { Drawer, Space } from 'antd';
import AntButton from 'src/@crema/component/AntButton';
import config from 'src/config';
import { CloseOutlined } from '@ant-design/icons';
import AppScrollbar from 'src/@crema/core/AppScrollbar';
import { ListComment } from 'src/pageComponents/judicialRecords/ListComment';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import { getDateIso } from 'src/shared/utils/DateTime';
import { parse } from 'src/shared/utils/String';
import { useCourtAccount } from 'src/hooks/useCourtAccount';

const DetailJudicialRecordBDW = () => {
  const { id } = useParams();
  const { messages } = useIntl();
  const navigate = useNavigate();
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const { isCourtAccount: isShowProhibitTab } = useCourtAccount();

  const { data, isLoading } = useFetch(
    {
      url: API.EDIT_JUDICIAL_RECORD(id),
    },
    [id],
  );

  const { result } = data || {};
  const {
    request_relate_documents = [],
    request_citizen_profile = {},
    request_organizations = [],
    request_verdicts = [],
    prohibit_positions_documents = [],
  } = result || {};
  const initialValues = {
    [CITIZEN_PROFILE_REQUEST_NAME]: {
      ...request_citizen_profile,
      cccd_date: getDateIso(request_citizen_profile?.cccd_date),
    },
    [CITIZEN_PROFILE_ORGANIZATION_NAME]: request_organizations,
    [VERDICT_DOCUMENT_REQUEST_LIST_NAME]: request_verdicts?.map((item) => {
      const parseObject = parse(item?.raw_document_object?.object);
      delete parseObject?.id;
      return {
        ...item,
        ...parse(item?.content),
        ...parseObject,
      };
    }),
    [PROHIBIT_POSITION_DOCUMENT_REQUEST_LIST]: prohibit_positions_documents,
  };

  const relateDocsByVerdict = (request_relate_documents || [])?.map(
    (relateDoc) => ({
      [relateDoc?.verdict_number]: relateDoc,
    }),
  );

  const { data: dataComment } = useFetch({
    url: API.SEARCH_COMMENT_ORGANIZATION_JUDICIAL_RECORD,
    method: METHOD_FETCH.POST,
    body: {
      filters: [],
      pageable: {
        page: 1,
        page_size: 100,
        sort: [{ property: 'id', direction: 'desc' }],
      },
      id: request_citizen_profile?.id,
    },
  });
  const listDataComment = dataComment?.result?.items || [];
  const dataCommentByOrgan = Object.groupBy(
    listDataComment,
    (item) =>
      item?.citizen_profile_request_organization?.organization?.display_name,
  );

  const tabItems = [
    {
      label: <IntlMessages id={'confirm.informationCitizenRelation'} />,
      key: 'item-1',
      children: <FormCitizenInfo rootName={CITIZEN_PROFILE_REQUEST_NAME} />,
    },
    isShowProhibitTab && {
      label: (
        <span>
          Thông tin cấm đảm nhiệm chức vụ{' '}
          {prohibit_positions_documents?.length > 0 &&
            `(${prohibit_positions_documents?.length})`}
        </span>
      ),
      key: 'item-2',
      children: <BanHoldingPositionTable data={prohibit_positions_documents} />,
    },
    {
      label: (
        <span>
          <IntlMessages id={'judicial.verdictInfo'} />
          {request_verdicts?.length > 0 && `(${request_verdicts?.length})`}
        </span>
      ),
      key: 'item-3',
      children: (
        <FormCriminal
          verdicts={request_verdicts}
          relateDocsByVerdict={relateDocsByVerdict}
        />
      ),
    },
  ].filter(Boolean);

  const noteTabItems = request_organizations.map((requestOrganization) => ({
    label: requestOrganization?.organization?.display_name,
    key: requestOrganization?.organization?.display_name,
    children: (
      <ListComment
        data={
          dataCommentByOrgan?.[requestOrganization?.organization?.display_name]
        }
      />
    ),
  }));

  const onGoBack = () => {
    navigate(config.routes.searchJudicialRecords);
  };

  const onCloseDrawer = () => {
    setIsOpenDrawer(false);
  };
  const onShowHistoryNote = () => {
    setIsOpenDrawer(true);
  };

  return (
    <div>
      <AppPageMetadata title={messages['judicial.recordTitle']} />
      <SubHeaderApp>
        <SubHeaderAppTemplate
          title={<IntlMessages id={'judicial.recordTitle'} />}
          isShowGoBack
        />
      </SubHeaderApp>
      <div className={'min-h-100'}>
        <AppCard loading={isLoading}>
          <FormContent
            key={request_citizen_profile?.id}
            initialValues={initialValues}
            disabled>
            <AppTabs items={tabItems} />
          </FormContent>
        </AppCard>
      </div>
      <AppCard className={'sticky-footer z-index-20 text-right'}>
        <Space>
          <AntButton onClick={onGoBack}>
            {messages['dialog.button.close']}
          </AntButton>
          <AntButton onClick={onShowHistoryNote}>
            {messages['button.showHistoryNote']}
          </AntButton>
        </Space>
      </AppCard>
      <Drawer
        bodyStyle={{ paddingTop: 0 }}
        title={messages['button.showHistoryNote']}
        destroyOnClose
        open={isOpenDrawer}
        closable={false}
        width={600}
        extra={<CloseOutlined onClick={onCloseDrawer} />}
        onClose={onCloseDrawer}>
        <AppScrollbar>
          <AppTabs items={noteTabItems} />
        </AppScrollbar>
      </Drawer>
    </div>
  );
};

export default DetailJudicialRecordBDW;
