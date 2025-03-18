import { Col, Form, Radio, Row, Space, Tag, Tooltip, Typography } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import AntButton from 'src/@crema/component/AntButton';
import FormContent from 'src/@crema/component/FormContent';
import AppCard from 'src/@crema/core/AppCard';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import { getDataContextAddJob } from '../..';
import { CloseCircleOutlined, PlusOutlined } from '@ant-design/icons';
import FormSelectTable from './FormSelectTable';
import AntModal from 'src/@crema/component/AntModal';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import { isEmpty } from 'src/shared/utils/Typeof';
import {
  IconFullJoin,
  IconInnerJoin,
  IconLeftJoin,
  IconRightJoin,
} from 'src/assets/icon';
import style from './NameJob.module.scss';
import clsx from 'clsx';
import API from 'src/@crema/services/apis';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';

import PropTypes from 'prop-types';
import FormNameJob from './FormNameJob';
import {
  MODE_QUERY_JOB,
  TYPE_DATA_MARK_SCHOOL_WAREHOUSE,
} from 'src/shared/constants/DataFixed';
import FormNameFormula from './FormNameFormula';
import notification from 'src/shared/utils/notification';
import { fetchDataItemTableOld } from './fetchItemTableOld';
import AppTabs from 'src/@crema/core/AppTabs/AppTabs';
import { renderKeyModeQueryDetail } from 'src/shared/utils/Object';

NameJob.propTypes = {
  isDetail: PropTypes.bool,
};

function NameJob({ isDetail = false, isUpdate = false, dataDetailJob }) {
  const formRefSelectTable = useRef();
  const formRefConfigTable = useRef();
  const formRefNameJob = useRef();
  const { dataCreateJob, setDataCreateJob, nextStep } = getDataContextAddJob();
  const [keyModeQuey, setKeyModeQuery] = useState(
    dataCreateJob?.keyModeQuey ||
      renderKeyModeQueryDetail(dataDetailJob) ||
      MODE_QUERY_JOB.SELECT_QUERY,
  );

  const [keyActiveContentSelectTable, setKeyActiveContentSelectTable] =
    useState('firstTable');
  const { typeDataMark } =
    dataCreateJob || dataDetailJob?.scheduler_response || {};
  const listTableDetail =
    isDetail || isUpdate
      ? dataDetailJob?.scheduler_response?.config_tables?.map((item) => {
          return item?.table_name;
        })
      : dataCreateJob?.config_tables?.map((item) => {
          return item?.table_name;
        });

  const [isShowModalIntermediate, setIsShowModalIntermediate] = useState(false);
  const [listTable, setListTable] = useState(listTableDetail || []);
  const [isErrorSelectTable, setIsErrorSelectTable] = useState(false);
  const [configTable, setConfigTable] = useState(
    dataCreateJob?.config_tables || [],
  );

  const tableConfigOld = configTable?.slice(0, configTable?.length - 1);
  const tableConfigCurrent = configTable[configTable?.length - 1];

  const initialValuesNameJob = {
    job_name: dataCreateJob?.job_name || dataDetailJob?.job_name,
    unit: dataCreateJob?.unit || dataDetailJob?.scheduler_response?.unit,
    quantity:
      dataCreateJob?.quantity || dataDetailJob?.scheduler_response?.quantity,

    formula_name: dataCreateJob?.formula_name || dataDetailJob?.formula_name,
    criterion_id:
      dataCreateJob?.criterion_id ||
      dataDetailJob?.scheduler_response?.criterion_id,

    mode_scheduler:
      dataCreateJob?.mode_scheduler || dataDetailJob?.mode_scheduler,
    cron_expression: dataCreateJob?.cron_expression || dataDetailJob?.scheduler,
    is_auto_update:
      dataCreateJob?.mode_scheduler === 'mode_auto' ||
      dataDetailJob?.mode_scheduler === 'mode_auto',

    destination_id: dataCreateJob?.destination_id,
    nuclear_region_id: dataCreateJob?.nuclear_region_id,
    dtm_region_id: dataCreateJob?.dtm_region_id,
  };

  const [listTableOldJoinTable, setListTableOldJoinTable] = useState([]);
  useEffect(() => {
    const handleFetchData = async () => {
      const listTableOld = await fetchDataItemTableOld(
        tableConfigOld,
        typeDataMark,
      );
      if (!isEmpty(listTableOld)) {
        setListTableOldJoinTable(listTableOld?.flat());
      }
    };
    handleFetchData();
  }, [tableConfigOld.length, typeDataMark]);

  // list table old join
  const optionsRenderColumnOld = listTableOldJoinTable?.map((item) => {
    return {
      label: `${item?.field_name} (${item?.schema} - ${item?.table_name} - ${item?.data_type})`,
      value: item?.column_name,
      data_type: item?.data_type,
    };
  });

  // get list table destination key Current
  const renderUrlTableCurrent = (type) => {
    if (type === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.ATM) {
      return tableConfigCurrent?.select_table_waiting
        ? API.GET_LIST_TABLE_WAITING_DESTINATION(
            tableConfigCurrent?.destination_id,
          )
        : API.GET_LIST_TABLE_DESTINATION(tableConfigCurrent?.destination_id);
    }

    if (type === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DTM) {
      return tableConfigCurrent?.select_table_waiting
        ? API.GET_LIST_TABLE_WAITING_NUCLEAR_REGION(
            tableConfigCurrent?.nuclear_region_id,
          )
        : API.GET_LIST_TABLE_NUCLEAR_REGION(
            tableConfigCurrent?.nuclear_region_id,
          );
    }
    if (type === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.FML) {
      return tableConfigCurrent?.select_table_waiting
        ? API.GET_LIST_TABLE_WAITING_DATA_MARK(
            tableConfigCurrent?.dtm_region_id,
          )
        : API.GET_LIST_TABLE_DATA_MARK(tableConfigCurrent?.dtm_region_id);
    }
  };
  const { data: listTableCurrent } = useFetch(
    {
      enabled: !isEmpty(tableConfigCurrent),
      method: METHOD_FETCH.GET,
      url: renderUrlTableCurrent(typeDataMark),
    },
    [configTable, typeDataMark],
  );
  const listColumnsTableCurrent = !isEmpty(listTableCurrent)
    ? listTableCurrent?.result?.tables?.find(
        (item) => item?.table_name === tableConfigCurrent?.table_name,
      )?.column_list
    : [];

  const optionsRenderColumnCurrent = listColumnsTableCurrent?.map((item) => {
    return {
      label: `${item?.column_name} (${listTableCurrent?.result?.schema} - ${tableConfigCurrent?.table_name} - ${item?.data_type})`,
      value: `"${listTableCurrent?.result?.schema}"."${tableConfigCurrent?.table_name}"."${item?.column_name}"`,
      data_type: item?.data_type,
    };
  });

  // handle close tags
  const handleClose = (removedTag) => {
    const newListTable = listTable?.filter((tag) => tag !== removedTag);
    const newConfigTableRemove = configTable?.filter((item) =>
      newListTable?.includes(item?.table_name),
    );
    newConfigTableRemove[newConfigTableRemove?.length - 1] = {
      ...newConfigTableRemove[newConfigTableRemove?.length - 1],
      join_mapping: null,
    };

    setConfigTable(newConfigTableRemove);
    setListTable(newListTable);
  };

  // handle click continue
  const handleClickNextStep = () => {
    if (!isEmpty(formRefNameJob.current)) {
      formRefNameJob.current.submit();
    }
    if (isEmpty(listTable)) {
      setIsErrorSelectTable(true);
    } else {
      setIsErrorSelectTable(false);
    }
  };

  useEffect(() => {
    if (listTable?.length >= 1) {
      setIsErrorSelectTable(false);
    }
  }, [listTable?.length]);

  // list contents select table
  const CONTENT_SELECT_TABLE_CONFIG = {
    firstTable: {
      footer: (
        <AntButton
          key='addNew'
          onClick={() => {
            formRefSelectTable.current.submit();
          }}
          type='primary'>
          {listTable?.length >= 1 ? (
            'Tiếp theo'
          ) : (
            <IntlMessages id='table.toolbar.addNew' />
          )}
        </AntButton>
      ),
      content: (
        <FormContent
          ref={formRefSelectTable}
          onFinish={(data) => {
            const dataConfigTable = {
              destination_id: data?.destination_id,
              table_name: data?.select_table,
              join_mapping: null,
              order: 0,
              select_table_waiting: Boolean(data?.select_table_waiting),
            };

            const dataConfigTableNuclear = {
              nuclear_region_id: data?.nuclear_region_id,
              table_name: data?.select_table,
              join_mapping: null,
              order: 0,
              select_table_waiting: Boolean(data?.select_table_waiting),
            };

            const dataConfigTableFormula = {
              dtm_region_id: data?.dtm_region_id,
              table_name: data?.select_table,
              join_mapping: null,
              order: 0,
              select_table_waiting: Boolean(data?.select_table_waiting),
            };
            // TYPE ATM => vung hat nhan
            if (typeDataMark === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.ATM) {
              setConfigTable((prev) => {
                const findIndex = prev?.findIndex(
                  (item) =>
                    item?.destination_id === dataConfigTable?.destination_id &&
                    item?.table_name === dataConfigTable?.table_name,
                );
                if (findIndex === -1) {
                  return [...prev, dataConfigTable];
                } else {
                  notification.warning(
                    'Bảng bạn vừa chọn trùng với bảng trước đó !',
                  );
                  const newConfig = [...prev];
                  newConfig[findIndex] = dataConfigTable;
                  return newConfig;
                }
              });
            }

            // TYPE DTM => vung chuyen nganh
            if (typeDataMark === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DTM) {
              setConfigTable((prev) => {
                const findIndexDTM = prev?.findIndex(
                  (item) =>
                    item?.nuclear_region_id ===
                      dataConfigTableNuclear?.nuclear_region_id &&
                    item?.table_name === dataConfigTableNuclear?.table_name,
                );
                if (findIndexDTM === -1) {
                  return [...prev, dataConfigTableNuclear];
                } else {
                  notification.warning(
                    'Bảng bạn vừa chọn trùng với bảng trước đó !',
                  );
                  const newConfigDTM = [...prev];
                  newConfigDTM[findIndexDTM] = dataConfigTableNuclear;
                  return newConfigDTM;
                }
              });
            }

            // TYPE FML => ql cong thuc
            if (typeDataMark === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.FML) {
              setConfigTable((prev) => {
                const findIndexFML = prev?.findIndex(
                  (item) =>
                    item?.dtm_region_id ===
                      dataConfigTableFormula?.dtm_region_id &&
                    item?.table_name === dataConfigTableFormula?.table_name,
                );
                if (findIndexFML === -1) {
                  return [...prev, dataConfigTableFormula];
                } else {
                  notification.warning(
                    'Bảng bạn vừa chọn trùng với bảng trước đó !',
                  );
                  const newConfigFML = [...prev];
                  newConfigFML[findIndexFML] = dataConfigTableFormula;
                  return newConfigFML;
                }
              });
            }

            if (listTable?.length >= 1) {
              setKeyActiveContentSelectTable('manyTable');
            } else {
              setIsShowModalIntermediate(false);
              setListTable((prev) => {
                return [...prev, data?.select_table];
              });
            }
          }}
          layout='vertical'>
          <FormSelectTable />
        </FormContent>
      ),
    },
    manyTable: {
      footer: (
        <AntButton
          key='addNew'
          onClick={() => {
            formRefConfigTable.current.submit();
          }}
          type='primary'>
          <IntlMessages id='table.toolbar.addNew' />
        </AntButton>
      ),
      content: (
        <FormContent
          ref={formRefConfigTable}
          onFinish={(data) => {
            const newConfigTable = configTable?.map((item, index) => {
              return {
                ...item,
                order: index,
              };
            });

            if (newConfigTable?.length >= 2) {
              newConfigTable[newConfigTable?.length - 2] = {
                ...newConfigTable[newConfigTable?.length - 2],
                join_mapping: {
                  join_type: data?.join_type,
                  key_joins: data?.key_joins,
                },
              };
            }
            newConfigTable[newConfigTable?.length - 1] = {
              ...newConfigTable[newConfigTable?.length - 1],
              join_mapping: null,
            };
            setConfigTable(newConfigTable);
            setListTable(() => {
              return newConfigTable?.map((item) => item?.table_name);
            });
            setIsShowModalIntermediate(false);
          }}
          layout='vertical'>
          <Row gutter={[12, 12]}>
            <Col span={24}>
              <Form.Item
                name={'join_type'}
                label={'Chọn loại join'}
                rules={[
                  {
                    required: true,
                    message: 'Chọn loại join là bắt buộc',
                  },
                ]}>
                <Radio.Group className={clsx(style.wrapListIconJoin)}>
                  <Radio.Button
                    value='inner_join'
                    className={clsx(style.wrapIconRadio)}>
                    <IconInnerJoin className={clsx(style.icon)} />
                    <p className={clsx(style.textTypeJoin)}>Inner join</p>
                  </Radio.Button>
                  <Radio.Button
                    value='left_join'
                    className={clsx(style.wrapIconRadio)}>
                    <IconLeftJoin className={clsx(style.icon)} />
                    <p className={clsx(style.textTypeJoin)}>Left join</p>
                  </Radio.Button>
                  <Radio.Button
                    value='right_join'
                    className={clsx(style.wrapIconRadio)}>
                    <IconRightJoin className={clsx(style.icon)} />
                    <p className={clsx(style.textTypeJoin)}>Right join</p>
                  </Radio.Button>
                  <Radio.Button
                    value='full_outer'
                    className={clsx(style.wrapIconRadio)}>
                    <IconFullJoin className={clsx(style.icon)} />
                    <p className={clsx(style.textTypeJoin)}>Full outer</p>
                  </Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col span={24} className={clsx(style.wrapFormAddKeys)}>
              <label className='mb-5 d-block'>
                Chọn key join
                <span
                  style={{
                    color: '#ff4d4f',
                    fontFamily: 'SimSun, sans-serif',
                  }}>
                  *
                </span>
              </label>
              <Form.List
                name={'key_joins'}
                rules={[
                  {
                    required: true,
                    message: 'Chọn key join là bắt buộc',
                  },
                  {
                    validator: async (_, values) => {
                      const errors = [];
                      values?.forEach((value, index) => {
                        const keyJoinLeft = value?.key_join_left;
                        const keyJoinRight = value?.key_join_right;

                        const dataTypeLeft = optionsRenderColumnOld?.find(
                          (option) => option?.value === keyJoinLeft,
                        )?.data_type;

                        const dataTypeRight = optionsRenderColumnCurrent.find(
                          (option) => option?.value === keyJoinRight,
                        )?.data_type;
                        if (
                          dataTypeLeft !== undefined &&
                          dataTypeRight !== undefined &&
                          dataTypeLeft !== dataTypeRight
                        ) {
                          errors.push({
                            message:
                              'Hai kiểu dữ liệu được chọn không trùng khớp !',
                            key: index,
                            name: index,
                          });
                        }
                      });

                      if (!isEmpty(errors)) {
                        return Promise.reject(errors[0]);
                      }
                    },
                  },
                ]}>
                {(fields, { add, remove }, { errors }) => {
                  return (
                    <>
                      <Form.ErrorList errors={errors} />
                      {fields?.map(({ key, name, ...restField }) => {
                        return (
                          <Space
                            key={key}
                            style={{
                              display: 'flex',
                              marginBottom: 8,
                            }}
                            align='baseline'>
                            <FormSelect
                              style={{
                                width: '306px',
                              }}
                              required
                              options={optionsRenderColumnOld}
                              renderItem={(option, index) => {
                                return (
                                  <div key={`item-${index}`}>
                                    <div>{option.label}</div>
                                    <Typography.Text type='secondary'>
                                      Kiểu dữ liệu: {option.data_type}
                                    </Typography.Text>
                                  </div>
                                );
                              }}
                              getPopupContainer={() => document.body}
                              dropdownMatchSelectWidth={268}
                              placement='bottomLeft'
                              name={[name, 'key_join_left']}
                              labelHidden='Chọn key join'
                              {...restField}
                            />
                            <span className={clsx(style.iconEqual)}>=</span>
                            <FormSelect
                              required
                              options={optionsRenderColumnCurrent}
                              style={{
                                width: '306px',
                              }}
                              name={[name, 'key_join_right']}
                              labelHidden='Chọn key join'
                              getPopupContainer={() => document.body}
                              dropdownMatchSelectWidth={268}
                              placement='bottomLeft'
                              renderItem={(option, index) => {
                                return (
                                  <div key={`item-${index}`}>
                                    <div>{option.label}</div>
                                    <Typography.Text type='secondary'>
                                      Kiểu dữ liệu: {option.data_type}
                                    </Typography.Text>
                                  </div>
                                );
                              }}
                              {...restField}
                            />
                            <CloseCircleOutlined
                              style={{
                                color: 'rgba(255, 77, 79, 1)',
                              }}
                              onClick={() => remove(name)}
                            />
                          </Space>
                        );
                      })}
                      <AntButton
                        onClick={() => add()}
                        className={clsx(style.nameJob_addKey)}
                        icon={<PlusOutlined />}>
                        Thêm key
                      </AntButton>
                    </>
                  );
                }}
              </Form.List>
            </Col>
          </Row>
        </FormContent>
      ),
    },
  };

  const renderTabDetail = () => {
    const is_code_sql_expression =
      dataDetailJob?.is_code_sql_expression || false;

    if (is_code_sql_expression) {
      return [
        {
          label: 'Code truy vấn',
          key: MODE_QUERY_JOB.QUERY_CODE,
          children: <></>,
        },
      ];
    }
    return [
      {
        label: 'Chọn truy vấn',
        key: MODE_QUERY_JOB.SELECT_QUERY,
        children: <></>,
      },
    ];
  };

  // items mode query
  const tabItemsModeQuery = isDetail
    ? renderTabDetail()
    : [
        {
          label: 'Chọn truy vấn',
          key: MODE_QUERY_JOB.SELECT_QUERY,
          children: <></>,
        },
        {
          label: 'Code truy vấn',
          key: MODE_QUERY_JOB.QUERY_CODE,
          children: <></>,
        },
      ]?.filter(Boolean);

  useEffect(() => {
    if (!isEmpty(setDataCreateJob)) {
      setDataCreateJob((prev) => {
        return {
          ...prev,
          keyModeQuey,
        };
      });
    }
  }, [keyModeQuey]);

  // return jsx
  return (
    <Row
      gutter={[24, 24]}
      className={clsx(style.wrapNameJob)}
      style={{
        marginTop: isDetail ? '8px' : 0,
      }}>
      <Col span={24}>
        <Row>
          {typeDataMark !== TYPE_DATA_MARK_SCHOOL_WAREHOUSE.FML && (
            <Col span={24}>
              <AppTabs
                activeKey={keyModeQuey}
                type='card'
                tabBarStyle={{
                  marginBottom: '0',
                }}
                onChange={(key) => {
                  setIsErrorSelectTable(false);
                  if (!isEmpty(formRefNameJob?.current)) {
                    formRefNameJob.current.resetFields();
                  }
                  setKeyModeQuery(key);
                }}
                items={tabItemsModeQuery}
              />
            </Col>
          )}
          <Col span={24}>
            <AppCard>
              <FormContent
                ref={formRefNameJob}
                initialValues={initialValuesNameJob}
                onFinish={(data) => {
                  if (keyModeQuey === MODE_QUERY_JOB.SELECT_QUERY) {
                    if (!isEmpty(listTable)) {
                      setDataCreateJob((prev) => {
                        return {
                          ...prev,
                          ...data,
                          ...(data?.quantity && {
                            quantity: Number.parseInt(data?.quantity),
                          }),
                          config_tables: configTable,
                          config_fields: [],
                        };
                      });
                      nextStep();
                    }
                  } else {
                    setDataCreateJob((prev) => {
                      return {
                        ...prev,
                        ...data,
                        ...(data?.quantity && {
                          quantity: Number.parseInt(data?.quantity),
                        }),
                        config_tables: configTable,
                        config_fields: [],
                      };
                    });
                    nextStep();
                  }
                }}
                labelCol={{ span: 6 }}
                labelAlign='left'>
                {typeDataMark === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.FML ? (
                  <FormNameFormula isDetail={isDetail} />
                ) : (
                  <>
                    <FormNameJob isDetail={isDetail} />
                  </>
                )}
                {keyModeQuey === MODE_QUERY_JOB.SELECT_QUERY && (
                  <Row>
                    <Col span={24}>
                      <label className={clsx(style.label_select_table)}>
                        Chọn bảng
                      </label>
                      {isErrorSelectTable && (
                        <p
                          style={{
                            color: 'red',
                          }}>
                          Chọn bảng là bắt buộc
                        </p>
                      )}
                      <div className='d-flex items-center justify-start'>
                        <div>
                          {listTable?.map((tag, index) => {
                            const isLongTag = tag?.length > 20;
                            const tagElem = (
                              <Tag
                                style={{
                                  padding: '5.2px',
                                }}
                                key={`${tag},${index}`}
                                closable={isDetail || isUpdate ? false : true}
                                onClose={() => handleClose(tag)}>
                                <span>
                                  {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                                </span>
                              </Tag>
                            );
                            return isLongTag ? (
                              <Tooltip title={tag} key={tag}>
                                {tagElem}
                              </Tooltip>
                            ) : (
                              tagElem
                            );
                          })}
                        </div>
                        {isDetail ||
                          (isUpdate ? (
                            <></>
                          ) : (
                            <AntButton
                              icon={<PlusOutlined />}
                              onClick={() => {
                                setKeyActiveContentSelectTable('firstTable');
                                setIsShowModalIntermediate(true);

                                !isEmpty(formRefSelectTable?.current) &&
                                  formRefSelectTable.current.resetFields();

                                !isEmpty(formRefConfigTable?.current) &&
                                  formRefConfigTable.current.resetFields();
                              }}>
                              Thêm bảng
                            </AntButton>
                          ))}
                      </div>
                    </Col>
                  </Row>
                )}

                {/* modal add table */}
                <AntModal
                  okButtonProps={{ hidden: true }}
                  bodyStyle={{ maxHeight: '75vh', overflow: 'auto' }}
                  size='708px'
                  footer={[
                    <AntButton
                      key='close'
                      onClick={() => {
                        const newConfigTableCancel = configTable?.filter(
                          (item) => listTable?.includes(item?.table_name),
                        );
                        setConfigTable(newConfigTableCancel);
                        setIsShowModalIntermediate(false);
                      }}>
                      <IntlMessages id='dialog.button.cancel' />
                    </AntButton>,
                    CONTENT_SELECT_TABLE_CONFIG[keyActiveContentSelectTable]
                      ?.footer,
                  ]}
                  centered
                  title={'Thêm bảng'}
                  open={isShowModalIntermediate}
                  onCancel={() => {
                    const newConfigTableCancel = configTable?.filter((item) =>
                      listTable?.includes(item?.table_name),
                    );
                    setConfigTable(newConfigTableCancel);
                    setIsShowModalIntermediate(false);
                  }}>
                  {
                    CONTENT_SELECT_TABLE_CONFIG[keyActiveContentSelectTable]
                      ?.content
                  }
                </AntModal>
              </FormContent>
            </AppCard>
          </Col>
        </Row>
      </Col>

      {isDetail ||
        (isUpdate ? (
          <></>
        ) : (
          <Col span={24}>
            <AppCard className='d-flex items-center justify-end flex-row'>
              <AntButton type='primary' onClick={handleClickNextStep}>
                Tiếp theo
              </AntButton>
            </AppCard>
          </Col>
        ))}
    </Row>
  );
}

export default NameJob;
