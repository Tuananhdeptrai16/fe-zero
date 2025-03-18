import { Divider, Drawer, Form, Popconfirm, Space, Typography } from 'antd';
import React, { useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import AppTableContainer from 'src/@crema/core/AppTableContainer';
import FormSearchCitizen from 'src/pageComponents/judicialRecords/detail/firstStep/FormSearchCitizen';
import Link from 'src/@crema/component/Link';
import { CloseOutlined, SearchOutlined } from '@ant-design/icons';
import AppScrollbar from 'src/@crema/core/AppScrollbar';
import FormContent from 'src/@crema/component/FormContent';
import { FormCompareCitizenInfo } from './FormCompareCitizenInfo';
import './index.style.less';
import AntButton from 'src/@crema/component/AntButton';
import { RenderFieldRawContent } from 'src/@crema/component/TableRender';
import { parse } from 'src/shared/utils/String';
import { DrawFooter } from './DrawFooter';
import {
  CITIZEN_PROFILE_REQUEST_NAME,
  JUDICIAL_SEARCH_NAME,
  KEY_GROUP_TYPE,
  PROHIBIT_POSITION_DOCUMENT_REQUEST_LIST,
  VERDICT_DOCUMENT_REQUEST_LIST_NAME,
} from 'src/pages/judicialRecords/createRecordInformation/utils';
import { TableVerdictSuggest } from 'src/pageComponents/judicialRecords/detail/firstStep/TableVerdictSuggest';
import { TableProhibitSuggest } from 'src/pageComponents/judicialRecords/detail/firstStep/TableProhibitSuggest';
import { isNullUndefEmptyStrObj } from 'src/shared/utils/Typeof';
import { uniqWith } from 'lodash';
import {
  KEY_BIRTHDAY,
  KEY_FULL_NAME,
  KEY_GENDER,
} from 'src/shared/constants/SettingSystem';
import RenderGender from 'src/@crema/component/TableRender/RenderGender';
import { generateUniqueID } from 'src/@crema/utility/Utils';
import { FIELD_MAP } from 'src/shared/constants/FieldKeyMap';

export const JudicialCitizenInformation = () => {
  const { messages } = useIntl();
  const form = Form.useFormInstance();
  const judicialSearchField = Form.useWatch(JUDICIAL_SEARCH_NAME);
  const listVerdict = Form.useWatch(VERDICT_DOCUMENT_REQUEST_LIST_NAME);
  const listProhibitDocument = Form.useWatch(
    PROHIBIT_POSITION_DOCUMENT_REQUEST_LIST,
  );

  const infoCitizens = useMemo(() => {
    return [...(listVerdict || []), ...(listProhibitDocument || [])];
  }, [listVerdict, listProhibitDocument]);

  const [openDrawer, setOpenDrawer] = useState(false);
  const [filters, setFilters] = useState(
    form.getFieldValue(JUDICIAL_SEARCH_NAME),
  );
  const [rowData, setRowData] = useState(null);
  const [refetchId, setRefetchId] = useState('');

  const onCloseDrawer = () => {
    setOpenDrawer(false);
    setRowData(null);
  };
  const removeDuplicates = (list, key) => {
    return uniqWith(list, (a, b) => {
      if (!key) {
        return a?.id === b?.id;
      } else {
        return a.id === b.id && a?.[key] === b?.[key];
      }
    });
  };

  const onConfirmDocument = () => {
    if (!rowData) return;
    const { group_type, raw_document_object = {} } = rowData;
    const parseRowData = {
      ...parse(rowData?.content),
      ...rowData,
      group_type,
      raw_document_object: {
        ...parse(raw_document_object?.object),
        ...raw_document_object,
      },
    };

    const fieldName =
      group_type === KEY_GROUP_TYPE.VERDICT
        ? VERDICT_DOCUMENT_REQUEST_LIST_NAME
        : PROHIBIT_POSITION_DOCUMENT_REQUEST_LIST;

    const arrayFieldList =
      (group_type === KEY_GROUP_TYPE.VERDICT
        ? listVerdict
        : listProhibitDocument) || [];
    form.setFieldValue(
      fieldName,
      removeDuplicates([...arrayFieldList, parseRowData]),
    );

    onCloseDrawer();
  };

  const onUnConfirm = (record) => {
    const id = record?.id;
    const group_type = record?.group_type;
    const fieldName =
      group_type === KEY_GROUP_TYPE.VERDICT
        ? VERDICT_DOCUMENT_REQUEST_LIST_NAME
        : PROHIBIT_POSITION_DOCUMENT_REQUEST_LIST;
    const list =
      group_type === KEY_GROUP_TYPE.VERDICT
        ? listVerdict
        : listProhibitDocument;
    const removeFieldList = (list || []).filter((item) => item?.id !== id);
    form.setFieldValue(fieldName, removeFieldList);
  };

  const columns = [
    {
      title: messages['table.documentNumber'],
      dataIndex: 'case_number',
      width: 200,
      fixed: 'left',
    },
    {
      title: messages['judicial.sentenceDay'],
      dataIndex: 'date_of_verdict',
      width: 200,
      render: (record, row) => {
        if (record) return record;
        return (
          (
            <RenderFieldRawContent
              field={FIELD_MAP.NGAY_TUYEN_AN}
              rawText={row?.content}
            />
          ) || (
            <RenderFieldRawContent
              field={FIELD_MAP.NGAY_QUYET_DINH}
              rawText={row?.content}
            />
          )
        );
      },
    },
    {
      title: messages['common.name'],
      dataIndex: 'raw_document_object',
      width: 200,
      render: (record) => (
        <RenderFieldRawContent field={KEY_FULL_NAME} rawText={record?.object} />
      ),
    },
    {
      title: messages['common.gender'],
      dataIndex: ['raw_document_object', 'object'],
      width: 120,
      render: (record) => (
        <RenderGender
          value={RenderFieldRawContent({ field: KEY_GENDER, rawText: record })}
        />
      ),
    },
    {
      title: messages['common.birthday'],
      dataIndex: ['raw_document_object', 'object'],
      width: 150,
      render: (record) => (
        <RenderFieldRawContent field={KEY_BIRTHDAY} rawText={record} />
      ),
    },

    {
      title: messages['table.action'],
      key: 'KEY_ACTION_COLUMN',
      fixed: 'right',
      width: 150,
      render: (record) => {
        const isSelected = (listVerdict || []).some(
          (document) => document?.id === record?.id,
        );
        if (isSelected) {
          return (
            <Popconfirm
              title={
                <span>
                  Bản án này sẽ bị xoá khỏi hồ sơ <br /> công dân {''}
                  <b>
                    <RenderFieldRawContent
                      rawText={record?.content}
                      field={'citizens.name'}
                    />
                    . Bạn vẫn muốn tiếp tục?
                  </b>
                </span>
              }
              okText={messages['confirm.agree']}
              onConfirm={() =>
                onUnConfirm({ ...record, group_type: KEY_GROUP_TYPE.VERDICT })
              }>
              <Link>{messages['common.unConfirm']}</Link>
            </Popconfirm>
          );
        }
        return (
          <>
            <Link
              onClick={() => {
                setOpenDrawer(true);
                setRowData({ ...record, group_type: KEY_GROUP_TYPE.VERDICT });
              }}>
              {messages['common.checkInfo']}
            </Link>
          </>
        );
      },
    },
  ];

  const prohibitColumns = columns.map((col) => {
    if (col.dataIndex === 'case_number') {
      return {
        ...col,
        render: (_, row) => (
          <RenderFieldRawContent
            field={FIELD_MAP.SO_QUYET_DINH}
            rawText={row?.content}
          />
        ),
      };
    }
    if (col.dataIndex === 'date_of_verdict') {
      return {
        ...col,
        title: messages['judicial.decisionDay'],
        render: (_, row) => (
          <RenderFieldRawContent
            field={FIELD_MAP.NGAY_QUYET_DINH}
            rawText={row?.content}
          />
        ),
      };
    }
    if (col.key === 'KEY_ACTION_COLUMN') {
      return {
        ...col,
        render: (record) => {
          const isSelected = (listProhibitDocument || []).some(
            (document) => document?.id === record?.id,
          );
          if (isSelected) {
            return (
              <Popconfirm
                title={
                  <span>
                    Quyết định này sẽ bị xoá khỏi hồ sơ <br /> công dân {''}
                    <b>
                      <RenderFieldRawContent
                        rawText={record?.content}
                        field={'citizens.name'}
                      />
                      . Bạn vẫn muốn tiếp tục?
                    </b>
                  </span>
                }
                okText={messages['confirm.agree']}
                onConfirm={() =>
                  onUnConfirm({
                    ...record,
                    group_type: KEY_GROUP_TYPE.PROHIBIT,
                  })
                }>
                <Link>{messages['common.unConfirm']}</Link>
              </Popconfirm>
            );
          }
          return (
            <>
              <Link
                onClick={() => {
                  setOpenDrawer(true);
                  setRowData({
                    ...record,
                    group_type: KEY_GROUP_TYPE.PROHIBIT,
                  });
                }}>
                {messages['common.checkInfo']}
              </Link>
            </>
          );
        },
      };
    }
    return col;
  });

  const banColumns = [
    {
      title: messages['table.documentType'],
      width: 400,
      fixed: 'left',
      dataIndex: 'document_type_name',
    },
    {
      title: messages['table.documentNumber'],
      dataIndex: 'case_number',
      width: 200,
      render: (data, row) =>
        data || (
          <RenderFieldRawContent
            rawText={row?.content}
            field={FIELD_MAP.SO_QUYET_DINH}
          />
        ),
    },
    {
      title: `${messages['judicial.sentenceDay']} /${messages['judicial.decisionDay']}`,
      dataIndex: 'date_of_verdict',
      width: 200,
      render: (data, row) => {
        return (
          data ||
          RenderFieldRawContent({
            field: FIELD_MAP.NGAY_TUYEN_AN,
            rawText: row?.content,
          }) || (
            <RenderFieldRawContent
              field={FIELD_MAP.NGAY_QUYET_DINH}
              rawText={row?.content}
            />
          )
        );
      },
    },
    {
      title: messages['common.name'],
      dataIndex: ['raw_document_object', 'object'],
      width: 200,
      render: (record) => (
        <RenderFieldRawContent field={KEY_FULL_NAME} rawText={record} />
      ),
    },
    {
      title: messages['common.gender'],
      dataIndex: ['raw_document_object', 'object'],
      width: 120,
      render: (record) => (
        <RenderGender
          value={RenderFieldRawContent({ field: KEY_GENDER, rawText: record })}
        />
      ),
    },
    {
      title: messages['common.birthday'],
      dataIndex: ['raw_document_object', 'object'],

      width: 150,
      render: (record) => (
        <RenderFieldRawContent field={KEY_BIRTHDAY} rawText={record} />
      ),
    },

    {
      title: messages['table.action'],
      key: 'KEY_ACTION_COLUMN',
      fixed: 'right',
      width: 150,
      render: (record) => {
        return (
          <Popconfirm
            title={
              <span>
                Bản án/Quyết định này sẽ bị xoá khỏi hồ sơ <br /> công dân {''}
                <b>
                  <RenderFieldRawContent
                    rawText={record?.content}
                    field={'citizens.name'}
                  />
                  . Bạn vẫn muốn tiếp tục?
                </b>
              </span>
            }
            okText={messages['confirm.agree']}
            onConfirm={() => onUnConfirm(record)}>
            <Link>{messages['common.unConfirm']}</Link>
          </Popconfirm>
        );
      },
    },
  ];

  const renderInitialValues = () => {
    const { object } = rowData?.raw_document_object || '';
    const contentObj = parse(object);
    return { ...rowData, ...contentObj };
  };

  const onSearchCitizen = () => {
    const data = form.getFieldValue(JUDICIAL_SEARCH_NAME);

    setFilters(data);
    setRefetchId(generateUniqueID());
    const citizenProfileRequest = form.getFieldValue(
      CITIZEN_PROFILE_REQUEST_NAME,
    );
    form.setFieldValue(CITIZEN_PROFILE_REQUEST_NAME, {
      ...citizenProfileRequest,
      ...data,
    });
  };

  const onReset = () => {
    form.setFieldValue(JUDICIAL_SEARCH_NAME, null);
    setFilters(null);
  };

  return (
    <>
      <div>
        <FormSearchCitizen />
        <Space className='d-flex ant-justify-end'>
          <AntButton htmlType='button' onClick={onReset}>
            {messages['button.clearFilter']}
          </AntButton>
          <AntButton
            type='primary'
            htmlType='button'
            icon={<SearchOutlined />}
            disabled={isNullUndefEmptyStrObj(judicialSearchField)}
            onClick={onSearchCitizen}>
            {messages['button.search']}
          </AntButton>
        </Space>
      </div>
      <Divider />
      <Typography.Title level={3} className='mb-6'>
        {messages['judicial.summaryInfoCitizenRecord']}
      </Typography.Title>
      <Typography.Title level={3} className='mb-6'>
        {messages['judicial.suggestVerdict']}
      </Typography.Title>
      <TableVerdictSuggest
        columns={columns}
        filters={filters}
        refetchId={refetchId}
      />
      <Divider />
      <Typography.Title level={3} className='mb-6'>
        Quyết định cấm ĐNCV
      </Typography.Title>
      <TableProhibitSuggest
        filters={filters}
        columns={prohibitColumns}
        refetchId={refetchId}
      />
      <Divider />
      <Typography.Title level={3} className='mb-6'>
        Danh sách Bản án/Quyết định cấm ĐNCV đã xác nhận
      </Typography.Title>
      <AppTableContainer
        rowKey={(item) => item?.raw_document_object?.id}
        columns={banColumns}
        data={infoCitizens}
      />

      <Drawer
        // key={`Drawer-${rowData?.id}-${rowData?.created_at}`}
        bodyStyle={{ paddingBottom: 10 }}
        open={openDrawer}
        destroyOnClose
        onClose={onCloseDrawer}
        closable={false}
        width={936}
        extra={<CloseOutlined onClick={onCloseDrawer} />}
        title={<b>{messages['common.checkInfo']}</b>}
        footer={
          <DrawFooter
            onCloseDrawer={onCloseDrawer}
            onConfirmDocument={onConfirmDocument}
            rowData={rowData}
          />
        }>
        <>
          <AppScrollbar>
            <Space
              className='space_wrap h-100'
              size={'large'}
              split={<Divider type='vertical' style={{ height: '100%' }} />}>
              <FormContent
                className={'h-100'}
                name='form1'
                disabled
                labelWrap
                labelAlign='left'
                initialValues={form.getFieldValue(JUDICIAL_SEARCH_NAME)}>
                <FormCompareCitizenInfo
                  title={messages['judicial.infoBySearchRequest']}
                />
              </FormContent>
              <FormContent
                className={'h-100'}
                name='form2'
                disabled
                labelWrap
                labelAlign='left'
                initialValues={renderInitialValues()}>
                <FormCompareCitizenInfo
                  title={messages['judicial.infoByVerdict']}
                />
              </FormContent>
            </Space>
          </AppScrollbar>
        </>
      </Drawer>
    </>
  );
};
