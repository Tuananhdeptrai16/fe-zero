import { Col, Form, Row, Space, Switch } from 'antd';
import React, { useEffect, useState } from 'react';
import AppCard from 'src/@crema/core/AppCard';
import { QueryBuilderAntD } from '@react-querybuilder/antd';
import style from './SelectQuey.module.scss';
import clsx from 'clsx';
import 'react-querybuilder/dist/query-builder.css';
import { getDataContextAddJob } from '../../..';
import {
  QueryBuilder,
  formatQuery,
  defaultValidator,
  parseSQL,
} from 'react-querybuilder';
import FormContent from 'src/@crema/component/FormContent';
import FormSelect from 'src/@crema/core/Form/FormSelect';
import { CloseCircleOutlined } from '@ant-design/icons';
import AntButton from 'src/@crema/component/AntButton';
import FormInput from 'src/@crema/core/Form/FormInput';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import API from 'src/@crema/services/apis';
import { flatColumnsTable } from 'src/shared/utils/filter';
import { isArray, isEmpty } from 'src/shared/utils/Typeof';
import { TYPE_DATA_MARK_SCHOOL_WAREHOUSE } from 'src/shared/constants/DataFixed';
// import PropTypes from 'prop-types';

function SelectQuery({
  isDetail = false,
  isUpdate = false,
  dataDetailJob,
  setDataQueryWhere,
  refFormGroupBy,
  isGroupBy,
  setIsGroupBy,
}) {
  const { dataCreateJob, setDataCreateJob, nextStep } = getDataContextAddJob();
  const { config_tables, typeDataMark } =
    dataCreateJob || dataDetailJob?.scheduler_response || {};
  const [isWhere, setIsWhere] = useState(
    Boolean(dataCreateJob?.config_condition?.type === 'condition') ||
      Boolean(
        dataDetailJob?.scheduler_response?.config_condition?.type ===
          'condition',
      ),
  );

  const renderUrlGetTable = (type, data) => {
    if (type === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.ATM) {
      return data?.select_table_waiting
        ? API.GET_LIST_TABLE_WAITING_DESTINATION(data?.destination_id)
        : API.GET_LIST_TABLE_DESTINATION(data?.destination_id);
    }
    if (type === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DTM) {
      return data?.select_table_waiting
        ? API.GET_LIST_TABLE_WAITING_NUCLEAR_REGION(data?.nuclear_region_id)
        : API.GET_LIST_TABLE_NUCLEAR_REGION(data?.nuclear_region_id);
    }
    if (type === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.FML) {
      return data?.select_table_waiting
        ? API.GET_LIST_TABLE_WAITING_DATA_MARK(data?.dtm_region_id)
        : API.GET_LIST_TABLE_DATA_MARK(data?.dtm_region_id);
    }
  };

  config_tables?.forEach((item) => {
    const { data } = useFetch(
      {
        method: METHOD_FETCH.GET,
        url: renderUrlGetTable(typeDataMark, item),
        params: item?.table_name
          ? {
              tableName: item?.table_name,
            }
          : {},
      },
      [],
    );
    const schemaName = data?.result?.schema;
    const listTable = data?.result?.tables || [];
    const listTableFilter = listTable?.find((table) => {
      return table?.table_name === item?.table_name;
    });

    item.columnsTable = flatColumnsTable(
      [listTableFilter],
      schemaName,
      item?.order,
    );
  });

  const listColumnsOptions = config_tables
    ?.map((item) => {
      return item?.columnsTable;
    })
    ?.flat();

  const renderSql = () => {
    if (
      dataCreateJob?.config_condition?.type === 'condition' ||
      dataDetailJob?.scheduler_response?.config_condition?.type === 'condition'
    ) {
      return (
        dataCreateJob?.config_condition?.sql ||
        dataDetailJob?.scheduler_response?.config_condition?.sql
      );
    }
    return '(1 = 1)';
  };

  const initialQueryWhere = parseSQL(renderSql());

  const addQuotes = (str) => {
    const parts = str.split(/(?<!")\.(?!")/);
    const quotedParts = parts?.map((part) => {
      if (!part.startsWith('"') && !part.endsWith('"')) {
        part = `"${part}"`;
      }
      return part;
    });
    return quotedParts.join('.');
  };
  const addQuotesRecursive = (rules) => {
    rules?.forEach((rule) => {
      if (!isEmpty(rule.field)) {
        rule.field = addQuotes(rule.field);
      }
      if (!isEmpty(rule.rules) && isArray(rule.rules)) {
        addQuotesRecursive(rule.rules);
      }
    });
  };

  addQuotesRecursive(initialQueryWhere?.rules);

  const fieldsWhere = listColumnsOptions?.map((item) => {
    return {
      name: item?.column_name,
      label: `${item?.field_name} (${item?.schema} - ${item?.table_name})`,
    };
  });

  const [queryWhere, setQueryWhere] = useState(initialQueryWhere);
  const codeSql = formatQuery(queryWhere, {
    format: 'sql',
    // parseNumbers: true,
  });
  useEffect(() => {
    setQueryWhere(initialQueryWhere);
  }, [initialQueryWhere?.rules?.length]);

  useEffect(() => {
    setDataQueryWhere({
      isWhere,
      codeSql,
    });
  }, [codeSql, isWhere]);

  useEffect(() => {
    if (!isEmpty(setDataCreateJob)) {
      setDataCreateJob((prev) => {
        return {
          ...prev,
          listColumnsOptions: listColumnsOptions,
        };
      });
    }
  }, [listColumnsOptions?.length]);

  return (
    <div className={clsx(style.wrapSelectQuery)}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <AppCard>
            <Row>
              <Col span={24}>
                <div className='d-flex justify-between items-center'>
                  <h4>Điều kiện</h4>
                  {isDetail || isUpdate ? (
                    <></>
                  ) : (
                    <Switch
                      checked={isWhere}
                      onChange={(checked) => {
                        setIsWhere(checked);
                      }}
                    />
                  )}
                </div>
                {(isDetail || isUpdate) &&
                  !isWhere &&
                  (typeDataMark === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.FML ? (
                    <span>Công thức này chưa có điều kiện truy vấn</span>
                  ) : (
                    <span>Job này chưa có điều kiện truy vấn</span>
                  ))}
              </Col>
              {isWhere && (
                <Col span={24}>
                  <QueryBuilderAntD>
                    <QueryBuilder
                      fields={fieldsWhere}
                      query={queryWhere}
                      onQueryChange={setQueryWhere}
                      validator={defaultValidator}
                      disabled={isDetail || isUpdate}
                      controlClassnames={{
                        queryBuilder: 'queryBuilder-branches',
                      }}
                    />
                  </QueryBuilderAntD>
                </Col>
              )}
            </Row>
          </AppCard>
        </Col>
        <Col span={24}>
          <AppCard>
            <Row>
              <Col span={24}>
                <div className='d-flex justify-between items-center'>
                  <h4>Nhóm theo</h4>
                  {isDetail || isUpdate ? (
                    <></>
                  ) : (
                    <Switch
                      checked={isGroupBy}
                      onChange={(checked) => {
                        setIsGroupBy(checked);
                      }}
                    />
                  )}
                </div>
                {(isDetail || isUpdate) &&
                  !isGroupBy &&
                  (typeDataMark === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.FML ? (
                    <span>Công thức này chưa có điều kiện nhóm theo</span>
                  ) : (
                    <span>Job này chưa có điều kiện nhóm theo</span>
                  ))}
              </Col>

              {isGroupBy && (
                <Col span={24} className={clsx(style.wrapContentGroupBy)}>
                  <FormContent
                    layout='vertical'
                    ref={refFormGroupBy}
                    initialValues={
                      !isEmpty(dataCreateJob?.group_by) ||
                      !isEmpty(dataDetailJob?.scheduler_response?.group_by)
                        ? {
                            field_name_group:
                              dataCreateJob?.group_by?.field_name_group ||
                              dataDetailJob?.scheduler_response?.group_by
                                ?.field_name_group,
                            functions:
                              dataCreateJob?.group_by?.functions ||
                              dataDetailJob?.scheduler_response?.group_by
                                ?.functions,
                          }
                        : {}
                    }
                    onFinish={(data) => {
                      if (isUpdate) {
                        console.log('update:');
                      } else {
                        if (isGroupBy) {
                          setDataCreateJob((prev) => {
                            return {
                              ...prev,
                              listColumnsOptions: listColumnsOptions,
                              group_by: {
                                field_name_group: data?.field_name_group,
                                functions: data?.functions?.map((item) => {
                                  return {
                                    field_name_apply: item?.field_name_apply,
                                    new_field_name: item?.new_field_name,
                                    function: item?.function,
                                  };
                                }),
                              },
                            };
                          });
                        } else {
                          setDataCreateJob((prev) => {
                            return {
                              ...prev,
                              listColumnsOptions: listColumnsOptions,
                              group_by: null,
                            };
                          });
                        }
                        nextStep();
                      }
                    }}>
                    <Row gutter={[10, 10]}>
                      <Col span={6} className={clsx(style.optionNameGroup)}>
                        <FormSelect
                          required={isGroupBy}
                          options={listColumnsOptions?.map((item) => {
                            return {
                              label: `${item?.field_name} (${item?.schema} - ${item?.table_name})`,
                              value: item?.column_name,
                            };
                          })}
                          mode='multiple'
                          disabled={isDetail || isUpdate}
                          name={'field_name_group'}
                          label='Nhóm theo trường dữ liệu:'
                        />
                      </Col>
                      <Col span={24}>
                        <Form.List
                          name={'functions'}
                          rules={[
                            {
                              required: isGroupBy,
                              message: 'Dữ liệu tổng hợp là bắt buộc',
                            },
                          ]}>
                          {(fields, { add, remove }, { errors }) => {
                            return (
                              <>
                                <Form.ErrorList errors={errors} />
                                <div className='d-flex items-center justify-start gap-3 mb-2'>
                                  <label
                                    className={clsx(style.labelSelectOption)}>
                                    Dữ liệu tổng hợp:
                                  </label>
                                  {isDetail || isUpdate ? (
                                    <></>
                                  ) : (
                                    <AntButton
                                      type='text'
                                      danger
                                      onClick={() => add()}>
                                      Thêm mới
                                    </AntButton>
                                  )}
                                </div>

                                {fields?.map(({ key, name, ...restField }) => (
                                  <Space
                                    key={key}
                                    style={{
                                      display: 'flex',
                                      marginBottom: 8,
                                    }}
                                    align='baseline'>
                                    <FormSelect
                                      required
                                      style={{
                                        minWidth: '162px',
                                      }}
                                      options={[
                                        {
                                          label: 'count',
                                          value: 'count',
                                        },
                                        {
                                          label: 'sum',
                                          value: 'sum',
                                        },
                                        {
                                          label: 'avg',
                                          value: 'avg',
                                        },
                                        {
                                          label: 'max',
                                          value: 'max',
                                        },
                                        {
                                          label: 'min',
                                          value: 'min',
                                        },
                                      ]}
                                      name={[name, 'function']}
                                      labelHidden='Hàm tổng hợp'
                                      disabled={isDetail || isUpdate}
                                      {...restField}
                                    />
                                    <FormSelect
                                      required={isGroupBy}
                                      style={{
                                        minWidth: '200px',
                                      }}
                                      options={listColumnsOptions?.map(
                                        (item) => {
                                          return {
                                            label: `${item?.field_name} (${item?.schema} - ${item?.table_name})`,
                                            value: item?.column_name,
                                          };
                                        },
                                      )}
                                      disabled={isDetail || isUpdate}
                                      name={[name, 'field_name_apply']}
                                      labelHidden='Chọn cột'
                                      {...restField}
                                    />
                                    <FormInput
                                      required={isGroupBy}
                                      style={{
                                        minWidth: '200px',
                                      }}
                                      options={[]}
                                      name={[name, 'new_field_name']}
                                      labelHidden='Giá trị mới'
                                      disabled={isDetail || isUpdate}
                                      rules={{
                                        maxLength: [{ value: 128 }],
                                      }}
                                      {...restField}
                                    />
                                    {isDetail || isUpdate ? (
                                      <></>
                                    ) : (
                                      <CloseCircleOutlined
                                        style={{
                                          color: 'rgba(255, 77, 79, 1)',
                                        }}
                                        onClick={() => remove(name)}
                                      />
                                    )}
                                  </Space>
                                ))}
                              </>
                            );
                          }}
                        </Form.List>
                      </Col>
                    </Row>
                  </FormContent>
                </Col>
              )}
            </Row>
          </AppCard>
        </Col>
      </Row>
    </div>
  );
}

SelectQuery.propTypes = {};

export default SelectQuery;
