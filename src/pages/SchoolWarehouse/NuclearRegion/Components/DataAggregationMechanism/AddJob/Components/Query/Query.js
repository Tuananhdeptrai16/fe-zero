import React, { useEffect, useRef, useState } from 'react';
import AntButton from 'src/@crema/component/AntButton';
import { Col, Form, Row } from 'antd';
import AppTabs from 'src/@crema/core/AppTabs/AppTabs';
import AppCard from 'src/@crema/core/AppCard';
import SelectQuery from './SelectQuery/SelectQuery';
import QueryCode from './QueryCode/QueryCode';
import { getDataContextAddJob } from '../..';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { isEmpty } from 'src/shared/utils/Typeof';
import {
  KEY_SELECT_QUERY_SQL,
  MODE_QUERY_JOB,
} from 'src/shared/constants/DataFixed';
import style from './Query.module.scss';
import clsx from 'clsx';
import FormHidden from 'src/@crema/core/Form/FormHidden';
import { format } from 'sql-formatter';
import notification from 'src/shared/utils/notification';
import { renderKeyModeQueryDetail } from 'src/shared/utils/Object';
import { extractViewTableAndColumns } from 'src/shared/utils/String';
import { handleAnalyzeSQL } from 'src/shared/utils/Array';

// import PropTypes from 'prop-types';

Query.propTypes = {};

function Query({
  isDetail = false,
  isUpdate = false,
  dataDetailJob,
  refGroupByUpdate,
  onlySelectQuery = false,
}) {
  const form = Form.useFormInstance();

  const { prevStep, setDataCreateJob, nextStep, dataCreateJob } =
    getDataContextAddJob();
  const [dataQueryWhere, setDataQueryWhere] = useState();
  const isCodeQuery =
    Boolean(dataCreateJob?.config_condition?.type === 'sql') ||
    Boolean(
      dataDetailJob?.scheduler_response?.config_condition?.type === 'sql',
    );
  const [dataCodeQuery, setDataCodeQuery] = useState(
    isCodeQuery
      ? dataCreateJob?.config_condition?.sql ||
          dataDetailJob?.scheduler_response?.config_condition?.sql
      : '',
  );
  const refFormGroupBy = isUpdate ? refGroupByUpdate : useRef();
  const [isGroupBy, setIsGroupBy] = useState(
    Boolean(dataCreateJob?.group_by) ||
      Boolean(dataDetailJob?.scheduler_response?.group_by),
  );

  const [codeSQL, setCodeSql] = useState(
    dataCreateJob?.sql || dataDetailJob?.scheduler_response?.sql_query || '',
  );

  const keyModeQuey =
    dataCreateJob?.keyModeQuey || renderKeyModeQueryDetail(dataDetailJob);

  const renderActiveKey = () => {
    if (
      dataCreateJob?.config_condition?.type === 'sql' ||
      dataDetailJob?.scheduler_response?.config_condition?.type === 'sql'
    ) {
      return KEY_SELECT_QUERY_SQL.CODE_QUERY;
    }
    return KEY_SELECT_QUERY_SQL.SELECT_QUERY;
  };
  const [activeKey, setActiveKey] = useState(renderActiveKey());
  // console.log('keyModeQuey', keyModeQuey);
  const handleClickNextStep = () => {
    if (keyModeQuey === MODE_QUERY_JOB.QUERY_CODE) {
      if (isEmpty(codeSQL)) {
        notification.error('Câu lệnh truy vấn là bắt buộc');
        return;
      }

      const { columns, table } = extractViewTableAndColumns(
        handleAnalyzeSQL(codeSQL),
      );
      if (isEmpty(columns) || isEmpty(table)) {
        notification.error(
          'Câu lệnh truy vấn không đúng định dạng. Không nhận diện được cột và tên bảng',
        );
        return;
      }

      const existAllColumn = columns.find((column) => column.includes('*'));

      if (existAllColumn) {
        notification.error('Câu lệnh tạo view cần liệt kê cụ thể các cột');
        return;
      }
    }
    if (keyModeQuey === MODE_QUERY_JOB.SELECT_QUERY) {
      if (activeKey === KEY_SELECT_QUERY_SQL.SELECT_QUERY) {
        if (dataQueryWhere?.isWhere) {
          setDataCreateJob((prev) => {
            return {
              ...prev,
              config_condition: {
                type: 'condition',
                sql: dataQueryWhere?.codeSql,
              },
            };
          });
        } else {
          setDataCreateJob((prev) => {
            return {
              ...prev,
              config_condition: null,
            };
          });
        }
      }
      if (activeKey === KEY_SELECT_QUERY_SQL.CODE_QUERY) {
        if (!isEmpty(dataCodeQuery)) {
          setDataCreateJob((prev) => {
            return {
              ...prev,
              config_condition: {
                type: 'sql',
                sql: dataCodeQuery,
              },
            };
          });
        } else {
          setDataCreateJob((prev) => {
            return {
              ...prev,
              config_condition: null,
            };
          });
        }
      }

      if (isGroupBy) {
        if (!isEmpty(refFormGroupBy?.current)) {
          refFormGroupBy?.current.submit();
        } else {
          nextStep();
        }
      } else {
        setDataCreateJob((prev) => {
          return {
            ...prev,
            group_by: null,
          };
        });
        nextStep();
      }
    } else {
      try {
        const codeSqlFormat = format(codeSQL, { language: 'postgresql' });
        setDataCreateJob((prev) => {
          return {
            ...prev,
            config_condition: null,
            group_by: null,
            sql: codeSqlFormat || '',
          };
        });
        nextStep();
      } catch (error) {
        console.log('co loi trong cau lenh format:', error);
        notification.error(
          `Có lỗi trong câu lệnh SQL, vui lòng kiểm tra lại ${error?.message}`,
        );
      }
    }
  };

  // sql update
  let config_condition_update = null;
  if (activeKey === KEY_SELECT_QUERY_SQL.SELECT_QUERY) {
    if (dataQueryWhere?.isWhere) {
      config_condition_update = {
        type: 'condition',
        sql: dataQueryWhere?.codeSql,
      };
    } else {
      config_condition_update = null;
    }
  }
  if (activeKey === KEY_SELECT_QUERY_SQL.CODE_QUERY) {
    if (!isEmpty(dataCodeQuery)) {
      config_condition_update = {
        type: 'sql',
        sql: dataCodeQuery,
      };
    } else {
      config_condition_update = null;
    }
  }

  useEffect(() => {
    if (isUpdate) {
      form.setFieldValue('config_condition', config_condition_update);
      form.setFieldValue('isGroupBy', isGroupBy);
    }
  }, [
    activeKey,
    dataQueryWhere?.codeSql,
    dataQueryWhere?.isWhere,
    isUpdate,
    dataCodeQuery,
    form,
    config_condition_update,
    isGroupBy,
  ]);

  const tabItems = onlySelectQuery
    ? [
        {
          label: 'Chọn truy vấn',
          key: KEY_SELECT_QUERY_SQL.SELECT_QUERY,
          children: (
            <SelectQuery
              isDetail={isDetail}
              isUpdate={isUpdate}
              dataDetailJob={dataDetailJob}
              setDataQueryWhere={setDataQueryWhere}
              refFormGroupBy={refFormGroupBy}
              isGroupBy={isGroupBy}
              setIsGroupBy={setIsGroupBy}
              formUpdate={form}
            />
          ),
        },
      ]
    : [
        {
          label: 'Chọn truy vấn',
          key: KEY_SELECT_QUERY_SQL.SELECT_QUERY,
          children: (
            <SelectQuery
              isDetail={isDetail}
              isUpdate={isUpdate}
              dataDetailJob={dataDetailJob}
              setDataQueryWhere={setDataQueryWhere}
              refFormGroupBy={refFormGroupBy}
              isGroupBy={isGroupBy}
              setIsGroupBy={setIsGroupBy}
              formUpdate={form}
            />
          ),
        },
        {
          label: 'Code truy vấn',
          key: KEY_SELECT_QUERY_SQL.CODE_QUERY,
          children: (
            <QueryCode
              isDetail={isDetail}
              isUpdate={isUpdate}
              setDataCodeQuery={setDataCodeQuery}
              dataCodeQuery={dataCodeQuery}
            />
          ),
        },
      ];

  return (
    <Row gutter={[24, 24]} className={clsx(style.wrapQueryJob)}>
      <Col span={24}>
        {keyModeQuey === MODE_QUERY_JOB.SELECT_QUERY && (
          <AppTabs
            activeKey={activeKey}
            type='card'
            tabBarStyle={{
              marginBottom: '0',
              borderBottom: '14px solid white',
            }}
            onChange={(key) => {
              setActiveKey(key);
            }}
            items={tabItems}
          />
        )}
        {keyModeQuey === MODE_QUERY_JOB.QUERY_CODE && (
          <QueryCode
            isDetail={isDetail}
            setDataCodeQuery={setCodeSql}
            dataCodeQuery={codeSQL}
          />
        )}
      </Col>
      {isDetail || isUpdate ? (
        <></>
      ) : (
        <Col span={24}>
          <AppCard>
            <div className='d-flex items-center justify-end flex-row gap-2'>
              <AntButton icon={<ArrowLeftOutlined />} onClick={prevStep}>
                Quay lại
              </AntButton>
              <AntButton type='primary' onClick={handleClickNextStep}>
                Tiếp theo
              </AntButton>
            </div>
          </AppCard>
        </Col>
      )}

      {isUpdate && <FormHidden hidden name='config_condition' />}
      {isUpdate && <FormHidden hidden name='isGroupBy' />}
    </Row>
  );
}

export default Query;
