import React, { useRef } from 'react';
import { Col, Row } from 'antd';
import { isString } from 'src/shared/utils/Typeof.js';
import API from 'src/@crema/services/apis/index';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
// import RenderContentHTML from 'src/@crema/component/TableRender/RenderContentHTML';
import DataTable from 'src/@crema/core/DataTable';
import { stringify } from 'src/shared/utils/String';
import { TABLE_SORT_VALUE } from 'src/shared/constants/DataTable';
import ExportToExcel from 'src/pages/SchoolWarehouse/Components/ExportToExcel';
import { TYPE_DATA_MARK_SCHOOL_WAREHOUSE } from 'src/shared/constants/DataFixed';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
// import ExportToPDF from 'src/pages/SchoolWarehouse/Components/ExportToPDF';
import { useReactToPrint } from 'react-to-print';
import AppIconButton from 'src/@crema/core/AppIconButton';
import PrintContent from './PrintContent';
import { isEmpty } from 'lodash';
import { PrinterOutlined } from '@ant-design/icons';

export const FormSearch = ({
  data,
  type = TYPE_DATA_MARK_SCHOOL_WAREHOUSE.ATM,
}) => {
  const nuclearRegionId = data?.nuclear_region_id;
  const regionDataMarkId = data?.dtm_region_id;

  const getTableDetails = () => {
    let tableName, body, urls;
    if (type === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.ATM) {
      tableName = data?.nuclear_table_name;
      body = { nuclear_region_id: nuclearRegionId, table_name: tableName };
      urls = {
        fetch: API.GET_LOOKUP_COLLECTED_RESULTS,
        columns: API.GET_LIST_TABLE_NUCLEAR_REGION(nuclearRegionId),
        exportExcel: API.EXPORT_EXCEL_LOOKUP_NUCLEAR_REGION,
        exportPDF: API.EXPORT_PDF_LOOKUP_NUCLEAR_REGION,
      };
    } else if (type === TYPE_DATA_MARK_SCHOOL_WAREHOUSE.DTM) {
      tableName = data?.dtm_table_name;
      body = { dtm_region_id: regionDataMarkId, table_name: tableName };
      urls = {
        fetch: API.GET_LOOKUP_COLLECTED_RESULTS_DATA_MARK,
        columns: API.GET_LIST_TABLE_DATA_MARK(regionDataMarkId),
        exportExcel: API.EXPORT_EXCEL_LOOKUP_DATA_MARK,
        exportPDF: API.EXPORT_PDF_LOOKUP_DATA_MARK,
      };
    }
    return { tableName, body, urls };
  };
  const { tableName, body, urls } = getTableDetails();

  // get columns by data
  const { data: dataColumns, isLoading: isLoadingGetColumns } = useFetch(
    {
      method: METHOD_FETCH.GET,
      url: urls.columns,
      params: {
        tableName: tableName,
      },
    },
    [tableName, nuclearRegionId, regionDataMarkId],
  );

  const { data: dataNuclear } = useFetch(
    {
      method: METHOD_FETCH.POST,
      url: API.GET_LOOKUP_COLLECTED_RESULTS,
      body: {
        nuclear_region_id: nuclearRegionId,
        table_name: tableName,
      },
    },
    [nuclearRegionId, tableName],
  );

  const { data: dataDTM } = useFetch(
    {
      method: METHOD_FETCH.POST,
      url: API.GET_LOOKUP_COLLECTED_RESULTS_DATA_MARK,
      body: {
        dtm_region_id: regionDataMarkId,
        table_name: tableName,
      },
    },
    [regionDataMarkId, tableName],
  );

  const dataSourceNuclear = isEmpty(dataNuclear)
    ? []
    : dataNuclear?.result?.items?.map((item, index) => {
        return {
          ...item,
          key: index,
        };
      });

  const dataSourceDTM = isEmpty(dataDTM)
    ? []
    : dataDTM?.result?.items?.map((item, index) => {
        return {
          ...item,
          key: index,
        };
      });

  const columnsRes = dataColumns?.result?.tables[0]?.column_list || [];

  const columns = columnsRes
    .map((column, index) => {
      return {
        title: column?.column_name,
        dataIndex: column?.column_name,
        key: column?.column_name,
        width: 220,
        sorter: true,
        defaultSortOrder: index === 0 ? TABLE_SORT_VALUE.DESCEND : false,
        render: (value) =>
          // isString(value) || isObject(value) ? (
          //   <RenderContentHTML
          //     content={isString(value) ? value : stringify(value)}
          //     shortNumWord={42}
          //     isShowHTML
          //   />
          // ) : (
          isString(value) ? value : stringify(value),
        // ),
      };
    })
    ?.filter((item) => {
      return item?.key !== 'key_map' && item?.key !== 'extract_time';
    });

  // Print content
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className={'ant-tab-table'}>
      <Row>
        <Col span={24}>
          {tableName && (
            <b
              style={{
                fontSize: '16px',
              }}>
              Tên bảng: {tableName}
            </b>
          )}
        </Col>
        <Col span={24}>
          <DataTable
            key={`data-table-${tableName}-${isLoadingGetColumns}`}
            columns={columns}
            rowKey={(data) => {
              return data?.id || data?.myIndex;
            }}
            syncURL={false}
            method={METHOD_FETCH.POST}
            toolbars={[
              <ExportToExcel
                key={'export-excel-component'}
                nuclear_region_id={nuclearRegionId}
                dtm_region_id={regionDataMarkId}
                urlExportExcel={urls.exportExcel}
                tableName={tableName}
                disabled={!tableName}
                type={type}
              />,
            ]}
            toolbarsMini={[
              // <ExportToPDF
              //   key={`download-pdf`}
              //   nuclear_region_id={nuclearRegionId}
              //   dtm_region_id={regionDataMarkId}
              //   urlExportPDF={urls.exportPDF}
              //   tableName={tableName}
              //   disabled={!tableName}
              //   type={type}
              // />,
              <AppIconButton
                key={`download-pdf`}
                disabled={!tableName}
                icon={<PrinterOutlined />}
                title={'In'}
                onClick={() => handlePrint()}
              />,
            ]}
            initTable={{ body }}
            url={urls.fetch}></DataTable>
          <div style={{ display: 'none' }}>
            <PrintContent
              title='Kết quả tra cứu'
              ref={componentRef}
              dataSource={
                !isEmpty(dataSourceNuclear) ? dataSourceNuclear : dataSourceDTM
              }
              columns={columns}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};
