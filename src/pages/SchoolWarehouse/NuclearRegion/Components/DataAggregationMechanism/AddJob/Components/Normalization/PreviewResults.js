import React from 'react';
import { getDataContextAddJob } from '../..';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import API from 'src/@crema/services/apis';
import { Spin } from 'antd';
import { isEmpty, isObject, isString } from 'src/shared/utils/Typeof';
// import RenderContentHTML from 'src/@crema/component/TableRender/RenderContentHTML';
import { stringify } from 'src/shared/utils/String';
import DataTable from 'src/@crema/core/DataTable';
import {
  MODE_QUERY_JOB,
  TYPE_DATA_MARK_SCHOOL_WAREHOUSE,
} from 'src/shared/constants/DataFixed';
// import PropTypes from 'prop-types';

PreviewResults.propTypes = {};

function PreviewResults() {
  const { dataCreateJob } = getDataContextAddJob();
  const { typeDataMark } = dataCreateJob || {};
  const configInfoDB =
    dataCreateJob?.destination_id?.connection_configuration || {};
  const dataPreviewResult = {
    config_tables: dataCreateJob?.config_tables?.map((item) => {
      if (typeDataMark === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.ATM) {
        return {
          destination_id: item?.destination_id,
          table_name: item?.table_name,
          join_mapping: item?.join_mapping,
          order: item?.order,
        };
      }
      if (typeDataMark === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DTM) {
        return {
          nuclear_region_id: item?.nuclear_region_id,
          table_name: item?.table_name,
          join_mapping: item?.join_mapping,
          order: item?.order,
        };
      }
    }),
    config_condition: dataCreateJob?.config_condition,
    group_by: dataCreateJob?.group_by,
    config_fields: dataCreateJob?.config_fields.map((item) => {
      return {
        is_key: item?.is_key,
        old_field_name: item?.old_field_name,
        new_field_name: item?.new_field_name,
        table_order: item?.table_order,
        display_name: item?.display_name,
      };
    }),
    rules: dataCreateJob?.rules || [],
    is_code_sql_expression: Boolean(
      dataCreateJob?.keyModeQuey === MODE_QUERY_JOB.QUERY_CODE,
    ),
  };
  const dataPreviewResultSQL = {
    create_view_sql: dataCreateJob?.sql,
    config_fields: dataCreateJob?.config_fields.map((item) => {
      return {
        is_key: item?.is_key,
        old_field_name: item?.old_field_name,
        new_field_name: item?.new_field_name,
        table_order: item?.table_order,
        display_name: item?.display_name,
      };
    }),
    db_info: {
      database: configInfoDB?.database,
      host: configInfoDB?.host,
      port: configInfoDB?.port,
      schema: configInfoDB?.schema,
      password: configInfoDB?.password,
      username: configInfoDB?.username,
      database_type: dataCreateJob?.destination_id?.destination_type,
    },
  };

  const getUrlCheckData = () => {
    if (typeDataMark === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.ATM) {
      return dataCreateJob?.keyModeQuey === MODE_QUERY_JOB.QUERY_CODE
        ? API.GET_PREVIEW_RESULT_JOB_SQL
        : API.GET_PREVIEW_RESULT_JOB;
    }
    if (typeDataMark === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DTM) {
      return API.CHECK_PREVIEW_RESULT_DATA_MARK;
    }
  };

  // get columns
  const { data, isLoading } = useFetch(
    {
      method: METHOD_FETCH.POST,
      url: getUrlCheckData(),
      body: {
        pageable: {
          page: 1,
          page_size: 10,
        },
        ...(dataCreateJob?.keyModeQuey === MODE_QUERY_JOB.QUERY_CODE
          ? dataPreviewResultSQL
          : dataPreviewResult),
      },
    },
    [dataCreateJob?.isReloadCallPreviewResult],
  );
  const dataRes = data?.result?.items;
  const columns = isEmpty(dataRes)
    ? []
    : Object.keys(dataRes[0])?.map((item, index) => {
        return {
          title: item,
          dataIndex: item,
          key: `${item}_${index}`,
          // sorter: true,
          width: 180,
          render: (value) => {
            if (isString(value)) {
              // return (
              //   <RenderContentHTML
              //     content={value}
              //     shortNumWord={42}
              //     isShowHTML
              //   />
              // );
              return value;
            } else if (isObject(value)) {
              // return (
              //   <RenderContentHTML
              //     content={stringify(value)}
              //     shortNumWord={42}
              //     isShowHTML
              //   />
              // );
              return stringify(value);
            }
            return value;
          },
        };
      });

  return (
    <Spin spinning={isLoading}>
      <DataTable
        key={`data-table-${isLoading}`}
        url={getUrlCheckData()}
        columns={columns}
        isShowHeaderTable={false}
        syncURL={false}
        method={METHOD_FETCH.POST}
        initTable={
          dataCreateJob?.keyModeQuey === MODE_QUERY_JOB.QUERY_CODE
            ? {
                body: {
                  ...dataPreviewResultSQL,
                },
              }
            : {
                body: {
                  ...dataPreviewResult,
                },
              }
        }
      />
    </Spin>
  );
}

export default PreviewResults;
